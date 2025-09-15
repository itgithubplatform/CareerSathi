"use client";
import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="my-2 px-4 py-2 rounded-xl shadow inline-flex gap-1 bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800 self-start mr-auto">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-purple-700 rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
