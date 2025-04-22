"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define User interface
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}

// Define AuthContextType
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

// Parse JWT token
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from stored token
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Parse JWT payload
          const payload = parseJwt(token);
          
          if (payload && payload.exp * 1000 > Date.now()) {
            // Assuming the JWT contains user information
            // In a real app, you might want to fetch the user profile from API
            setUser({
              id: payload.sub,
              email: payload.email,
              // Add other user properties if available in the token
            });
          } else {
            // Token expired, clean up
            localStorage.removeItem('auth_token');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (token: string) => {
    try {
      // Store token
      localStorage.setItem('auth_token', token);
      
      // Parse user from token
      const payload = parseJwt(token);
      
      if (payload) {
        setUser({
          id: payload.sub,
          email: payload.email,
          // Add other user properties if available
        });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
} 