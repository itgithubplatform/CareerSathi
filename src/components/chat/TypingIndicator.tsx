"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function TypingIndicator() {
  const [dots, setDots] = useState(0);
  const [message, setMessage] = useState("Thinking");
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 500);
    
    // Cycle through different messages to simulate "thinking"
    const messageInterval = setInterval(() => {
      setMessage(prev => {
        const messages = [
          "Thinking",
          "Processing",
          "Generating response",
          "Analyzing",
          "Formulating answer"
        ];
        const currentIndex = messages.indexOf(prev);
        return messages[(currentIndex + 1) % messages.length];
      });
    }, 3000);
    
    // Simulate progress for demonstration
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 800);
    
    return () => {
      clearInterval(dotInterval);
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);
  
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
                duration: 1.5, 
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <span className="text-sm text-purple-700 font-medium">
          {message}
          {".".repeat(dots)}
          <span className="invisible">.</span>
        </span>
      </div>
      
      {/* Progress bar with random fluctuations to appear more natural */}
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <motion.div 
          className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      {/* Status message that changes based on progress */}
      <p className="text-xs text-gray-500 mt-1">
        {progress < 20 ? "Starting up" : 
         progress < 40 ? "Gathering information" : 
         progress < 60 ? "Processing data" : 
         progress < 80 ? "Formulating response" : 
         "Finalizing"}
      </p>
    </div>
  );
}