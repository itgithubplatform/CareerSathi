"use client";
import { Loader2, Compass } from "lucide-react";
import { motion } from "framer-motion";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { ChatMessage } from "@/types/chat";

export default function ChatWindow({
  messages,
  loading,
  isTyping,
}: {
  messages: ChatMessage[];
  loading: boolean;
  isTyping: boolean;
}) {
  if (loading) {
    return (
      <div className="m-auto text-center text-gray-500">
        <Loader2 className="w-10 h-10 animate-spin mx-auto" />
        <p>Loading Chat...</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="m-auto text-center px-4 py-10">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Compass size={48} className="mx-auto mb-3 text-purple-600" />
        </motion.div>

        <h3 className="text-xl md:text-2xl font-bold text-gray-800">
          Hi, I’m your AI Career Mentor. What’s the next step you want clarity on — jobs, skills, or interviews?
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Every career journey begins with a question — what’s yours?
        </p>
      </div>
    );
  }

  return (
    <>
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} msg={msg} />
      ))}
      {isTyping && <TypingIndicator />}
    </>
  );
}
