"use client";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage } from "@/types/chat";
import Link from "next/link";

export default function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`chat-bubble my-2 px-4 py-2 rounded-xl shadow max-w-[90%] break-words text-sm sm:text-base 
        ${isUser
          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white self-end ml-auto"
          : "bg-gradient-to-r from-blue-50 to-purple-50 text-zinc-900 self-start mr-auto prose prose-sm sm:prose-base"
        }`}
    >
      {isUser ? msg.text : <ReactMarkdown components={{
            p: ({ children }) => <p className="mb-3 text-gray-800 leading-6">{children}</p>,
            ul: ({ children }) => <ul className="list-disc ml-5 mb-3 text-gray-800">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal ml-5 mb-3 text-gray-800">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">{children}</h3>,
            h4: ({ children }) => <h4 className="text-base font-semibold mt-3 mb-1 text-gray-900">{children}</h4>,
            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            a: ({ children, href }) => (
              <Link href={href||"/roadmap"} className="text-blue-600 bg-blue-50 hover:scale-105 transition-all duration-200 hover:bg-blue-100 p-2 border border-blue-400 rounded-lg" rel="noopener noreferrer">
                {children}
              </Link>
            ),
          }} remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>}
    </motion.div>
  );
}
