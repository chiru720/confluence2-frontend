"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MainLayout } from "@/src/components/layouts/main-layout";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const features = [
  {
    icon: "📄",
    title: "Document Management",
    description: "Create, edit, and organize documents with a rich text editor and version history."
  },
  {
    icon: "🔍",
    title: "Powerful Search",
    description: "Find the information you need quickly with full-text search capabilities."
  },
  {
    icon: "👥",
    title: "Team Collaboration",
    description: "Work together in real-time with comments, mentions, and shared workspaces."
  },
  {
    icon: "🔒",
    title: "Secure Access",
    description: "Control who can view and edit your content with fine-grained permissions."
  },
  {
    icon: "📱",
    title: "Responsive Design",
    description: "Access your content from any device with a seamless responsive experience."
  },
  {
    icon: "🔄",
    title: "Integration Ready",
    description: "Connect with your favorite tools through our comprehensive API."
  }
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-12 md:mb-0 md:pr-12"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                variants={fadeIn}
              >
                Your Team's <span className="text-primary">Knowledge Hub</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground mb-8"
                variants={fadeIn}
              >
                Confluence 2.0 is a modern document management system that helps teams collaborate, share knowledge, and work more efficiently.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeIn}
              >
                <Link 
                  href="/auth/login" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 font-medium text-center"
                >
                  Get Started
                </Link>
                <Link 
                  href="/docs" 
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-md px-6 py-3 font-medium text-center"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/knowledge-book.avif"
                    alt="Document collaboration illustration"
                    fill
                    // className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, manage, and share your team's knowledge in one place.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                variants={fadeIn}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Confluence 2.0</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed to boost productivity and streamline knowledge sharing
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="bg-primary/20 text-primary rounded-full p-2 h-10 w-10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Centralized Knowledge</h3>
                    <p className="text-muted-foreground">Store all your team's information in one accessible place</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/20 text-primary rounded-full p-2 h-10 w-10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Enhanced Collaboration</h3>
                    <p className="text-muted-foreground">Work together seamlessly with real-time editing and comments</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/20 text-primary rounded-full p-2 h-10 w-10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Time Saving</h3>
                    <p className="text-muted-foreground">Find information quickly with powerful search capabilities</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="aspect-video bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-lg shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/geometric-shape.avif"
                    alt="Team collaboration illustration"
                    fill
                    // className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform how your team collaborates?</h2>
            <p className="text-xl mb-8 text-primary-foreground/80">
              Join thousands of teams already using Confluence 2.0 to streamline their documentation and knowledge sharing.
            </p>
            <Link
              href="/auth/login"
              className="bg-background text-foreground hover:bg-background/90 rounded-md px-8 py-4 font-medium text-lg inline-block"
            >
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
