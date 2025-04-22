"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AuthErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An unknown error occurred during authentication.';

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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold mb-4 text-destructive">Authentication Error</h2>
        <p className="text-muted-foreground mb-6">{errorMessage}</p>
        
        <div className="space-y-4">
          <button
            onClick={() => router.push('/auth/login')}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Try Again
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
          >
            Go to Homepage
          </button>
        </div>
      </motion.div>
    </div>
  );
} 