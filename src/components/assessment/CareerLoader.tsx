"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  "Reviewing your inputs…",
  "Exploring possible directions…",
  "Checking potential paths…",
  "Refining best-fit options…",
  "Outlining next steps…",
  "Finalizing recommendations…",
  "Almost ready…",
];


export default function CareerLoader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Rotate steps every 15 seconds (4 steps = ~1 min)
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-14 h-14 rounded-full border-4 border-blue-500 border-t-transparent"
      />

      {/* Rotating messages */}
      <div className="mt-6 h-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-gray-700 text-sm sm:text-base"
          >
            {steps[step]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Optional cancel/retry */}
      <button
        onClick={() => window.location.reload()}
        className="mt-8 text-sm text-blue-600 hover:underline"
      >
        Cancel 
      </button>
    </div>
  );
}
