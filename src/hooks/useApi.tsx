"use client";

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  useQuery, 
  useMutation, 
  useInfiniteQuery,
  type UseQueryResult,
  type UseQueryOptions,
  type UseMutationResult,
  type UseMutationOptions,
  type UseInfiniteQueryResult,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { useAuth } from './useAuth';

/**
 * The return type for the custom hook `useApi`.
 */
interface ReturnType<TData = any, TVariables = any> {
  /**
   * React Query mutation result object.
   */
  useApiMutation: (
    options?: UseMutationOptions<AxiosResponse<TData>, AxiosError, TVariables> & {
      _401Navigate?: boolean;
    }
  ) => UseMutationResult<AxiosResponse<TData>, AxiosError, TVariables>;

  /**
   * React Query query result object.
   */
  useApiQuery: (
    options: UseQueryOptions<AxiosResponse<TData>, AxiosError> & { _401Navigate?: boolean }
  ) => UseQueryResult<AxiosResponse<TData>, AxiosError>;

  /**
   * React Query infinite query result object.
   */
  useApiInfiniteQuery: (
    options: UseInfiniteQueryOptions<TData, AxiosError> & { _401Navigate?: boolean }
  ) => UseInfiniteQueryResult<TData, AxiosError>;
}

// Add interface for API error response
interface ApiErrorResponse {
  status: string;
  message: string;
  errors?: Array<{
    code: string;
    message: string;
    path: string[];
    minimum?: number;
    type?: string;
    inclusive?: boolean;
    exact?: boolean;
  }>;
}

/**
 * Custom hook for handling API requests and errors with React Query.
 * @returns An object containing the `useApiMutation`, `useApiQuery`, and `useApiInfiniteQuery` functions.
 */
export function useApi<TData = any, TVariables = any>(): ReturnType<TData, TVariables> {
  const router = useRouter();
  const { logout } = useAuth();

  /**
   * Function to handle API errors.
   * @param error - The Axios error object.
   */
  const handleApiError = useCallback(
    async (error: AxiosError, shouldNavigate: boolean = true) => {
      if (error.response) {
        const { status, data } = error.response;
        const errorData = data as ApiErrorResponse;

        // Handle validation errors (422)
        if (status === 422) {
          const validationErrors = errorData.errors || [];

          if (validationErrors.length > 0) {
            // Create numbered list of errors
            const errorMessages = validationErrors
              .map((err, index) => `${index + 1}. ${err.message}`)
              .join('\n');

            toast.error("Data Validation Error", {
              description: errorMessages,
              duration: 7000,
            });
          } else {
            toast.error("Data Validation Error", {
              description: errorData.message || 'Validation failed',
            });
          }
          return;
        }

        // Handle 401 Unauthorized
        if (status === 401) {
          if (shouldNavigate) {
            // Sign out the user
            logout();
            // Redirect to login page
            router.push('/auth/login');
          }
          return;
        }

        // Handle other error statuses
        const errorMessage = errorData.message || error.message;
        switch (status) {
          case 400:
            toast.error("Bad Request", {
              description: errorMessage,
            });
            break;
          case 403:
            toast.error("Forbidden", {
              description: errorMessage,
            });
            break;
          case 404:
            toast.error("Not Found", {
              description: errorMessage,
            });
            break;
          case 500:
            toast.error("Server Error", {
              description: errorMessage,
            });
            break;
          default:
            toast.error("Error", {
              description: errorMessage,
            });
        }
      } else if (error.request) {
        // Network error
        toast.error("Network Error", {
          description: "Please check your internet connection."
        });
      } else {
        // Other errors
        toast.error("Error", {
          description: error.message
        });
      }

      throw error;
    },
    [router, logout]
  );

  /**
   * React Query mutation hook for API requests with error handling.
   * @param options - Options for the mutation.
   * @returns A mutation object for handling API requests.
   */
  const useApiMutation = (
    options?: UseMutationOptions<AxiosResponse<TData>, AxiosError, TVariables> & {
      _401Navigate?: boolean;
    }
  ): UseMutationResult<AxiosResponse<TData>, AxiosError, TVariables> =>
    useMutation<AxiosResponse<TData>, AxiosError, TVariables>({
      ...options,
      mutationFn: async (variables?: TVariables) => {
        try {
          const apiCall = options?.mutationFn as (
            variables?: TVariables
          ) => Promise<AxiosResponse<TData>>;
          const response = await apiCall(variables);
          return response;
        } catch (error) {
          await handleApiError(error as AxiosError, options?._401Navigate);
          throw error;
        }
      },
    });

  /**
   * React Query query hook for GET requests with error handling.
   * @param options - Options for the query.
   * @returns A query object for handling GET requests.
   */
  const useApiQuery = (
    options: UseQueryOptions<AxiosResponse<TData>, AxiosError> & { _401Navigate?: boolean }
  ): UseQueryResult<AxiosResponse<TData>, AxiosError> =>
    useQuery({
      ...options,
      queryFn: async () => {
        try {
          const apiCall = options.queryFn as unknown as () => Promise<AxiosResponse<TData>>;
          const response = await apiCall();
          return response;
        } catch (error) {
          await handleApiError(error as AxiosError, options._401Navigate);
          throw error;
        }
      },
      staleTime: options.staleTime ?? 0,
      gcTime: options.gcTime ?? 0,
      retry: options.retry ?? false,
      refetchOnMount: options.refetchOnMount ?? true,
      refetchOnReconnect: options.refetchOnReconnect ?? true,
      refetchInterval: options.refetchInterval ?? false,
    });

  /**
   * React Query infinite query hook for handling paginated requests with error handling.
   * @param options - Options for the infinite query.
   * @returns An infinite query object for handling paginated GET requests.
   */
  const useApiInfiniteQuery = (
    options: UseInfiniteQueryOptions<TData, AxiosError> & { _401Navigate?: boolean }
  ): UseInfiniteQueryResult<TData, AxiosError> =>
    useInfiniteQuery({
      ...options,
      queryFn: async ({ pageParam }) => {
        try {
          const apiCall = options.queryFn as unknown as ({
            pageParam,
          }: {
            pageParam: any;
          }) => Promise<AxiosResponse<TData>>;
          const response = await apiCall({ pageParam });
          return response.data;
        } catch (error) {
          await handleApiError(error as AxiosError, options._401Navigate);
          throw error;
        }
      },
      getNextPageParam: options.getNextPageParam,
      staleTime: options.staleTime ?? Infinity,
      retry: options.retry ?? false,
      refetchOnWindowFocus: options.refetchOnWindowFocus ?? false,
      refetchOnMount: options.refetchOnMount ?? false,
      refetchOnReconnect: false,
      refetchInterval: false,
    });

  return { useApiMutation, useApiQuery, useApiInfiniteQuery };
} 