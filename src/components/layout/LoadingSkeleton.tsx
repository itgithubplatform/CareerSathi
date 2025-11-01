import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // <-- Import AnimatePresence
// --- UPDATED ICONS ---
import { Server, Cpu, FunctionSquare, Play } from 'lucide-react'; // <-- Import new icons

/**
 * A sub-component to create the moving shimmer effect using Framer Motion.
 * We'll reuse this inside each skeleton box.
 */
const Shimmer = ({ delay = 0 }) => (
  <motion.div
    // This is the shimmer itself, a semi-transparent gradient
    className="absolute top-0 left-0 right-0 bottom-0"
    style={{
      background: `linear-gradient(to right, 
        transparent 0%, 
        rgba(249, 250, 251, 0.6) 50%, 
        transparent 100%
      )`,
    }}
    // Start off-screen to the left
    initial={{ transform: 'translateX(-100%)' }}
    // Animate to off-screen to the right
    animate={{ transform: 'translateX(100%)' }}
    // Define the animation properties
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear', // A steady movement
      delay: delay, // The staggered delay
    }}
  />
);

/**
 * We define the "pulse" animation once and reuse it.
 * This makes the skeleton "breathe" to show it's actively loading.
 */
const pulseAnimation = {
  animate: { opacity: [0.6, 1, 0.6] }, // Pulses from 60% to 100% opacity
  transition: {
    duration: 2, // A slow 2-second "breath"
    repeat: Infinity,
    ease: "easeInOut",
  }
};

/**
 * --- UPDATED ---
 * A component that cycles through loading text and icons for a simulation.
 * I've removed the '...' from the text strings.
 */
const loadingStates = [
  { icon: <Server className="w-5 h-5 mr-3 flex-shrink-0" />, text: "Loading simulation assets" },
  { icon: <Cpu className="w-5 h-5 mr-3 flex-shrink-0" />, text: "Initializing physics engine" },
  { icon: <FunctionSquare className="w-5 h-5 mr-3 flex-shrink-0" />, text: "Calculating initial state" },
  { icon: <Play className="w-5 h-5 mr-3 flex-shrink-0" />, text: "Starting simulation" },
];

/**
 * --- NEW ---
 * A component to render the blinking dots.
 */
const dotAnimation = {
  animate: { opacity: [0.3, 1, 0.3] }, // Pulse from 30% to 100% opacity
  transition: {
    duration: 1.4, // Total animation duration
    repeat: Infinity,
    ease: "easeInOut",
  }
};

const BlinkingDots = () => (
  <motion.div
    className="flex ml-1" // Add a small margin to the left
    variants={{
      start: { transition: { staggerChildren: 0.2 } } // Stagger dots by 0.2s
    }}
    initial="start"
    animate="start"
  >
    {/* @ts-ignore */}
    <motion.span variants={dotAnimation} className="text-xl">.</motion.span>
    {/* @ts-ignore */}
    <motion.span variants={dotAnimation} className="text-xl">.</motion.span>
    {/* @ts-ignore */}
    <motion.span variants={dotAnimation} className="text-xl">.</motion.span>
  </motion.div>
);


const LoadingText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Set up an interval to cycle through the loading states
    // Changed 10000ms back to 2500ms to feel more active and less "stuck"
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % loadingStates.length);
    }, 2500); // Change text every 2.5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    // --- UPDATED --- Changed text color to blue
    <div className="h-10 flex items-center text-lg font-medium text-blue-600">
      <AnimatePresence mode="wait">
        {/* 'mode="wait"' ensures the old text fades out before the new one fades in */}
        <motion.div
          key={index} // This key is crucial for AnimatePresence
          className="flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {loadingStates[index].icon}
          <span>{loadingStates[index].text}</span>
          {/* --- NEW --- Added blinking dots */}
          <BlinkingDots />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};


/**
 * A loading skeleton that uses Framer Motion for a more interactive
 * shimmer animation, replacing the previous CSS-based one.
 */
const LoadingSkeleton = () => (
  <>    
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* --- UPDATED ---
            * We replaced the first skeleton box with our new
            * animated LoadingText component.
            */}
          <LoadingText />

          {/* --- NEW ---
            * Added a reassuring sub-text to manage user expectation.
            */}
          <motion.p
            className="text-sm text-gray-500 -mt-4" // Use negative margin to pull it closer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }} // Fades in slightly after
          >
            This is a complex simulation and may take a moment. Thanks for your patience!
          </motion.p>

          <motion.div
            className="w-full h-64 bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.05} />
          </motion.div>
          <div className="space-y-3">
            <motion.div
              className="h-4 bg-gray-300 rounded-lg relative overflow-hidden"
              {...pulseAnimation}
            >
              <Shimmer delay={0.1} />
            </motion.div>
            <motion.div
              className="h-4 bg-gray-300 rounded-lg relative overflow-hidden"
              {...pulseAnimation}
            >
              <Shimmer delay={0.15} />
            </motion.div>
            <motion.div
              className="h-4 w-5/6 bg-gray-300 rounded-lg relative overflow-hidden"
              {...pulseAnimation}
            >
              <Shimmer delay={0.2} />
            </motion.div>
          </div>
          {/* Skeleton for scenarios */}
          <motion.div
            className="h-24 w-full bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.25} />
          </motion.div>
          <motion.div
            className="h-24 w-full bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.3} />
          </motion.div>
        </div>
        
        {/* Sidebar Skeleton (unchanged) */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            className="w-full h-32 bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.0} />
          </motion.div>
          <motion.div
            className="w-full h-32 bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.05} />
          </motion.div>
          <motion.div
            className="w-full h-32 bg-gray-300 rounded-lg relative overflow-hidden"
            {...pulseAnimation}
          >
            <Shimmer delay={0.1} />
          </motion.div>
        </div>
      </div>
    </div>
  </>
);

export default LoadingSkeleton;

