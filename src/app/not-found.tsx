'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, ShoppingBag } from 'lucide-react';

const NotFound = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  const helpfulLinks = [
    {
      title: "Return Home",
      description: "Go back to our homepage",
      icon: Home,
      href: "/"
    },
    {
      title: "Search Products",
      description: "Find what you're looking for",
      icon: Search,
      href: "/search"
    },
    {
      title: "View Catalog",
      description: "Browse our collection",
      icon: ShoppingBag,
      href: "/products"
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-3xl w-full text-center">
        {/* 404 Number */}
        <motion.div 
          className="relative"
          variants={numberVariants}
        >
          <div className="text-9xl font-bold text-[#36302A] opacity-5 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl font-bold text-[#36302A]">
              404
            </h1>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div 
          className="mt-8 space-y-4"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-[#36302A]">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div 
          className="mt-8"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-[#102E6A] hover:text-[#36302A] transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={itemVariants}
        >
          {helpfulLinks.map((link) => (
            <Link 
              key={link.title}
              href={link.href}
            >
              <motion.div
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <div className="flex flex-col items-center space-y-3">
                  <link.icon className="h-8 w-8 text-[#102E6A]" />
                  <h3 className="font-semibold text-[#36302A]">{link.title}</h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Support Message */}
        <motion.p 
          className="mt-12 text-sm text-gray-500"
          variants={itemVariants}
        >
          Need help? Contact our{' '}
          <Link 
            href="/support" 
            className="text-[#102E6A] hover:text-[#36302A] underline transition-colors"
          >
            support team
          </Link>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default NotFound;