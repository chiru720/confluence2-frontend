import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './api-client';
import { Document, DocumentCreateRequest, DocumentUpdateRequest } from '@/src/types/documents';

// Query keys for React Query
export const documentKeys = {
  all: ['documents'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...documentKeys.lists(), filters] as const,
  details: () => [...documentKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentKeys.details(), id] as const,
};

// Document service functions
export const DocumentService = {
  // Get documents with optional filters
  getDocuments: async (params?: Record<string, any>): Promise<{ documents: Document[]; total: number }> => {
    return apiClient.get<{ documents: Document[]; total: number }>('/documents', params);
  },

  // Get document by ID
  getDocumentById: async (id: string): Promise<Document> => {
    return apiClient.get<Document>(`/documents/${id}`);
  },

  // Create document
  createDocument: async (document: DocumentCreateRequest): Promise<Document> => {
    return apiClient.post<Document>('/documents', document);
  },

  // Update document
  updateDocument: async ({ id, data }: { id: string; data: DocumentUpdateRequest }): Promise<Document> => {
    return apiClient.patch<Document>(`/documents/${id}`, data);
  },

  // Delete document
  deleteDocument: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/documents/${id}`);
  },
};

// React Query hooks
export const useDocuments = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: documentKeys.list(params || {}),
    queryFn: () => DocumentService.getDocuments(params),
  });
};

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => DocumentService.getDocumentById(id),
    enabled: !!id,
  });
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: DocumentService.createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
    },
  });
};

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: DocumentService.updateDocument,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: DocumentService.deleteDocument,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.detail(variables) });
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
    },
  });
}; 