"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Define the maximum expected time for a complex task like roadmap generation (in ms)
// We'll use this to pace the progress bar.
const MAX_EXPECTED_TIME = 18000; // 18 seconds (15s minimum + buffer)

// Define messages relevant to career guidance
const THINKING_MESSAGES = [
  "Analyzing profile & context",
  "Synthesizing career options",
  "Mapping skills to industry demand",
  "Formulating personalized guidance",
  "Structuring your roadmap"
];

export default function TypingIndicator({ isRoadmap = false }) {
  const [dots, setDots] = useState(0);
  const [message, setMessage] = useState(THINKING_MESSAGES[0]);
  const [progress, setProgress] = useState(0);
  
  // Use a longer time for dot animation to reduce resource use
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 600); // Slower dot cycle

    // Cycle through different messages every 3.5 seconds
    const messageInterval = setInterval(() => {
      setMessage(prev => {
        const currentIndex = THINKING_MESSAGES.indexOf(prev);
        return THINKING_MESSAGES[(currentIndex + 1) % THINKING_MESSAGES.length];
      });
    }, 3500);

    // --- Progress Simulation ---
    const totalSteps = isRoadmap ? MAX_EXPECTED_TIME / 1000 : 8; // 8 steps for normal chat (~6-8s)
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) return 99; // Keep it just under 100 to show 'finalizing'

        currentStep++;
        
        // Non-linear progress simulation: fast start, slow middle, fast end
        // Adjust the multiplier to fit the total steps
        let increment;
        if (currentStep < totalSteps * 0.2) {
          // Fast start (20% of the way)
          increment = 5; 
        } else if (currentStep < totalSteps * 0.8) {
          // Slow middle (The "thinking" phase)
          increment = 100 / totalSteps;
        } else {
          // Fast end (Finalizing)
          increment = 8;
        }

        const newProgress = prev + increment;
        return Math.min(newProgress, 99);
      });
      
      // Clear the interval if the time is up
      if (currentStep > totalSteps * 1.5) { 
          clearInterval(progressInterval);
      }

    }, isRoadmap ? 1000 : 800); // Slower updates for roadmap mode

    return () => {
      clearInterval(dotInterval);
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [isRoadmap]);
  
  // Adaptive status message logic
  const getStatusMessage = () => {
    if (progress < 20) return isRoadmap ? "Warming up the AI engine" : "Starting up analysis";
    if (progress < 45) return isRoadmap ? "Collecting latest industry data" : "Gathering context and history";
    if (progress < 75) return isRoadmap ? "Deep diving into your profile and career path" : "Processing request against your profile";
    if (progress < 90) return isRoadmap ? "Drafting skill modules and project outlines" : "Composing final response";
    return "Finalizing and formatting";
  }

  return (
    <div className="my-4 p-4 rounded-2xl shadow-lg inline-flex flex-col gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-100 self-start max-w-xs">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 bg-purple-600 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.8, // Slightly longer duration
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <span className="text-sm text-purple-700 font-medium whitespace-nowrap">
          {message}
          {".".repeat(dots)}
          {/* Ensure the space doesn't jump when dots change */}
          <span className="invisible">...</span> 
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <motion.div 
          className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      {/* Adaptive Status message */}
      <p className="text-xs text-gray-500 mt-1">
        {getStatusMessage()}
      </p>
    </div>
  );
}