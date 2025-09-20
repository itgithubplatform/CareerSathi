"use client"
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';

export default function NotFound() {
  const router = useRouter();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };
  
  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <Head>
        <title>Page Not Found | 404</title>
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
        <motion.div 
          className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-8">
            <div className="text-center">
              {/* Animated 404 number */}
              <div className="relative mb-8">
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -inset-12 bg-indigo-100 rounded-full blur-xl opacity-70"
                ></motion.div>
                
                <motion.h1 
                  className="relative text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
                  variants={itemVariants}
                >
                  404
                </motion.h1>
              </div>
              
              {/* Title */}
              <motion.h2 
                className="text-2xl font-bold text-gray-800 mb-2"
                variants={itemVariants}
              >
                Page Not Found
              </motion.h2>
              
              {/* Description */}
              <motion.p 
                className="text-gray-600 mb-8"
                variants={itemVariants}
              >
                Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL? Be sure to check your spelling.
              </motion.p>
              
              {/* Action buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors"
                >
                  Go Back
                </motion.button>
                
                <Link href="/" passHref>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-lg font-medium shadow-sm hover:bg-indigo-50 transition-colors"
                  >
                    Go Home
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative footer */}
          <motion.div 
            className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          ></motion.div>
        </motion.div>
      </div>
    </>
  );
}