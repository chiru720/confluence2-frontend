"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string>('Processing your login...');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setMessage('Authentication failed. No token received.');
      return;
    }

    try {
      // Store the token in localStorage or a secure cookie
      localStorage.setItem('auth_token', token);
      
      // Show success message briefly before redirecting
      setMessage('Authentication successful! Redirecting...');
      
      // Redirect to dashboard or home page after successful login
      const redirectTimeout = setTimeout(() => {
        router.push('/');
      }, 1500);
      
      return () => clearTimeout(redirectTimeout);
    } catch (error) {
      console.error('Error processing authentication:', error);
      setMessage('An error occurred during authentication.');
    }
  }, [token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div
        className="max-w-md w-full p-8 bg-card rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          {token ? (
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </motion.div>

        <h2 className="text-2xl font-bold mb-4">Authentication</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        
        {!token && (
          <button
            onClick={() => router.push('/auth/login')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Return to Login
          </button>
        )}
      </motion.div>
    </div>
  );
} 