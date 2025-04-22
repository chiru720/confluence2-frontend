import React from 'react';
import { motion } from 'framer-motion';
import { animationVariants } from '@/src/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <motion.header 
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial="hidden"
        animate="visible"
        variants={animationVariants.slideDown}
      >
        <div className="container mx-auto px-4 h-14 flex items-center">
          <div className="flex items-center justify-between w-full">
            <motion.h1 
              className="text-2xl font-bold"
              variants={animationVariants.fadeIn}
            >
              KnowledgeNex
            </motion.h1>
            <nav>
              <motion.ul 
                className="flex space-x-4"
                variants={animationVariants.staggerChildren}
              >
                <motion.li variants={animationVariants.fadeIn}>
                  <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </a>
                </motion.li>
                <motion.li variants={animationVariants.fadeIn}>
                  <a href="/documents" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documents
                  </a>
                </motion.li>
                <motion.li variants={animationVariants.fadeIn}>
                  <a href="/auth/login" className="text-muted-foreground hover:text-foreground transition-colors">
                    Login
                  </a>
                </motion.li>
              </motion.ul>
            </nav>
          </div>
        </div>
      </motion.header>

      <motion.main 
        className="flex-grow container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={animationVariants.fadeIn}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.main>

      <motion.footer 
        className="border-t py-6 md:py-0"
        initial="hidden"
        animate="visible"
        variants={animationVariants.slideUp}
      >
        <div className="container mx-auto px-4 flex flex-col items-center gap-4 md:h-14 md:flex-row md:justify-between">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Confluence 2.0. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            <a 
              href="/docs" 
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Documentation
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
} 