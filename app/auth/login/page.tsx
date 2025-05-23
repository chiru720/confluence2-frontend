"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/src/components/ui/button';
import { MainLayout } from '@/src/components/layouts/main-layout';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function LoginPage() {
  const handleGoogleLogin = () => {
    // Redirect to backend Google auth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api/v1'}/auth/google`;
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          className="w-full max-w-md p-8 space-y-8 bg-card text-card-foreground rounded-lg shadow-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to access your documents and workspaces
            </p>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="space-y-2">
              <Button
                className="w-full flex items-center justify-center gap-2 py-5"
                onClick={handleGoogleLogin}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Sign in with Google
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="mt-8 text-center text-sm"
            variants={itemVariants}
          >
            <p className="text-muted-foreground">
              By signing in, you agree to our
              <a href="/terms" className="text-primary hover:underline mx-1">Terms of Service</a>
              and
              <a href="/privacy" className="text-primary hover:underline mx-1">Privacy Policy</a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
} 