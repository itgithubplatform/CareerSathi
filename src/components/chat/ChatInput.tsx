"use client";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatInput({
  input,
  setInput,
  handleSend,
  darkMode,
  isTyping,
}: {
  input: string;
  setInput: (v: string) => void;
  handleSend: () => void;
  darkMode: boolean;
  isTyping: boolean;
}) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex items-end rounded-xl overflow-hidden shadow-lg border border-gray-300 
                 focus-within:border-purple-500 relative bg-white/70 dark:bg-white/20 p-3"
    >
      <textarea
        className={`flex-1 resize-none pr-12 max-h-40 min-h-[10px] outline-none text-sm sm:text-base 
        scrollbar-thin scrollbar-thumb-purple-400/70 scrollbar-track-gray-200/40 scrollbar-thumb-rounded-md scroll-smooth
        ${darkMode ? "bg-transparent text-white placeholder-gray-300" : "bg-transparent placeholder-gray-400"}`}
        placeholder="Ask me about career paths, skills, or interviews..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        onKeyDown={(e) => {
          if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            handleSend()
          }}}
      />
      <button
        className="absolute right-2 bottom-2 p-2 bg-purple-100 rounded-full hover:scale-105 hover:bg-purple-200 transition disabled:opacity-50"
        onClick={handleSend}
        disabled={isTyping}
      >
        <ArrowUp size={22} className="text-purple-600" />
      </button>
    </motion.div>
  );
}
