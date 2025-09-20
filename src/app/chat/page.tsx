"use client";

import { useState, useEffect, useRef, use } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, MessageSquare, PlusCircle, Loader2, ArrowUpCircle, ArrowUp, Compass } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage } from "@/types/chat"; // Assuming you have this type defined
import { db } from "@/lib/firebase";
import { createChatSession, saveChatMessage, updateChatSessionTitle } from "@/lib/chatStorage";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import Header from "@/components/layout/Header";
import ChatSidebar from "@/components/sections/chatSidebar";
import { useSession } from "next-auth/react";

export default function ChatPage() {
  // State Management
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [recentConversations, setRecentConversations] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const {data: session, status}= useSession()
  // Hardcoded user ID for demonstration purposes
  const userId = session?.user?.id
  // Real-time listener for recent chat sessions
  useEffect(() => {
    if (!userId) return;

    const sessionsRef = collection(db, "users", userId, "sessions");
    const q = query(sessionsRef, orderBy("updatedAt", "desc"), limit(10));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const conversations = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentConversations(conversations);
    }, (error) => {
      console.error("Error fetching conversations:", error);
    });

    return () => unsubscribe();
  }, [userId]); // Reruns only if userId changes

  // Smooth scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Function to start a new chat
  const startNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setInput("");
  };

  // Real-time listener for messages in the current session
  useEffect(() => {
    if (!currentSessionId || !userId) {
      setIsLoadingMessages(false);
      return;
    }
    const messagesRef = collection(db, "users", userId, "sessions", currentSessionId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    // Setup a real-time listener for messages
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => doc.data() as ChatMessage);
      setMessages(loadedMessages);
      setIsLoadingMessages(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setIsLoadingMessages(false);
    });
    // Cleanup function to detach the listener when the component unmounts or sessionId changes
    return () => unsubscribe();
  }, [currentSessionId, userId]); // Dependency array to re-run the effect when currentSessionId changes



  // Function to load messages from a selected session
  const loadChatSession = (sessionId: string) => {
    if (currentSessionId === sessionId) return;
    setIsLoadingMessages(true);
    setMessages([]); // Clear messages before loading the new session
    setCurrentSessionId(sessionId);
  };


  // Handle sending a message
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessageText = input;
    const newUserMessage: ChatMessage = { role: "user", text: userMessageText };
    let sessionId = currentSessionId;
    let isNewSession = false;

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);

    try {
      if (!userId) {
        console.error("User ID not found. Please log in.");
        return;
        
      }
      if (!sessionId) {
        isNewSession = true;
        sessionId = await createChatSession(userId, "New Chat");
        setCurrentSessionId(sessionId);
      }

      await saveChatMessage(userId, sessionId, "user", userMessageText);

      if (isNewSession) {
        const newTitle = userMessageText.substring(0, 40) + (userMessageText.length > 40 ? "..." : "");
        await updateChatSessionTitle(userId, sessionId, newTitle);
      }

      const history = [...messages, newUserMessage].map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/careersathi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessageText, history, provider: "gemini" }),
      });

      const data = await res.json();
      const botReplyText = typeof data.reply === "string" ? data.reply : "Sorry, I encountered an error.";
      const newBotMessage: ChatMessage = { role: "bot", text: botReplyText };

      setMessages((prev) => [...prev, newBotMessage]);
      await saveChatMessage(userId, sessionId, "bot", botReplyText);

    } catch (err) {
      console.error("Error sending message:", err);
      const errorMessage: ChatMessage = { role: "bot", text: "Sorry, something went wrong. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <div
      className={`transition-colors duration-500 ${darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200"
        : "bg-gradient-to-br from-blue-50 to-purple-50"
        }`}
    >
      <div className="max-w-[82rem] mx-auto flex h-screen ">
        <Header className="pl-8 lg:pl-0" />
        {/* Sidebar */}
        <ChatSidebar darkMode={darkMode} recentConversations={recentConversations} currentSessionId={currentSessionId} loadChatSession={loadChatSession} startNewChat={startNewChat} />
        {/* Main Chat Area */}
        <div className="flex flex-col flex-1 p-4 !pt-20 sm:p-6 ">
          <motion.div
            className={`flex-1 overflow-y-auto p-4 rounded-2xl  flex flex-col`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {isLoadingMessages ? (
              <div className="m-auto text-center text-gray-500">
                <Loader2 className="w-10 h-10 animate-spin mx-auto" />
                <p>Loading Chat...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="m-auto text-center px-4 py-10">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Compass size={48} className="mx-auto mb-3 text-purple-600" />
                </motion.div>

                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  Hi, I’m your AI Career Mentor What’s the next step you want clarity on — jobs, skills, or interviews?
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Every career journey begins with a question — what’s yours?
                </p>
              </div>

            ) : (
              messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`my-2 px-4 py-2 rounded-xl shadow max-w-[90%] break-words text-sm sm:text-base ${msg.role === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white self-end ml-auto"
                    : "bg-gradient-to-r from-blue-50 to-purple-50 text-zinc-900 self-start mr-auto prose prose-sm sm:prose-base"
                    }`}
                >
                  {msg.role === "bot" ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </motion.div>
              ))
            )}
            {isTyping && (
              <div className="my-2 px-4 py-2 rounded-xl shadow inline-flex gap-1 bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800 self-start mr-auto">
                <motion.span
                  className="w-2 h-2 bg-purple-700 rounded-full"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.span
                  className="w-2 h-2 bg-purple-700 rounded-full"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
                />
                <motion.span
                  className="w-2 h-2 bg-purple-700 rounded-full"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
                />
              </div>
            )}
            <div ref={chatEndRef} />
          </motion.div>
          <motion.div initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3}} className="flex items-end rounded-xl overflow-hidden shadow-lg border border-gray-300 focus-within:border-purple-500 relative bg-white/70 dark:bg-white/20 p-3">
            <textarea
              className={`flex-1 resize-none pr-12 max-h-40 min-h-[10px] outline-none text-sm sm:text-base 
      scrollbar-thin scrollbar-thumb-purple-400/70 scrollbar-track-gray-200/40 scrollbar-thumb-rounded-md scroll-smooth
      ${darkMode
                  ? "bg-transparent text-white placeholder-gray-300"
                  : "bg-transparent  placeholder-gray-400"
                }`}
              placeholder="Ask me about career paths, skills, or interviews..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
                if (e.target.scrollHeight > e.target.clientHeight) {
                  e.target.style.marginBottom = 40 + "px";
                } else {
                  e.target.style.marginBottom = 0 + "px";
                }
              }}

              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            />

            <button
              className="absolute right-2 bottom-2 p-2 bg-purple-100 rounded-full hover:scale-105 hover:bg-purple-200 transition disabled:opacity-50"
              onClick={handleSend}
              disabled={isTyping}
            >
              <ArrowUp size={22} className="text-purple-600" />
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}