"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { createChatSession, saveChatMessage, updateChatSessionTitle } from "@/lib/chatStorage";
import { useChatSessions } from "@/hooks/useChatSessions";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import Header from "@/components/layout/Header";
import ChatSidebar from "@/components/chat/chatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import { ChatMessage } from "@/types/chat";
import { useParams, useRouter } from "next/navigation";

export default function ChatPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const id = useParams().id?.[0];
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string|undefined>(id);
  const router = useRouter();
  const recentConversations = useChatSessions(userId);
  const { messages, loading, setMessages } = useChatMessages(userId, id);
  const chatEndRef = useAutoScroll([messages, isTyping]);

  const startNewChat = () => {
    router.push("/chat");
    setMessages([]);
    setInput("");
    setCurrentSessionId(undefined);
  };

  useEffect(() => {
    if (id) {
      setCurrentSessionId(id);
    }
  }, [id]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: "user", text: input };
    let sessionId = currentSessionId;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      if (!userId) throw new Error("User not logged in");
      
      // Create new session if needed
      if (!sessionId) {
        const generatedSessionId = await createChatSession(userId, "New Chat");
        setCurrentSessionId(generatedSessionId);
        sessionId = generatedSessionId;
        window.history.replaceState(null, "", `/chat/${generatedSessionId}`);
      }

      await saveChatMessage(userId, sessionId, "user", userMessage.text);

      const history = [...messages, userMessage].slice(-30).map((m) => ({ role: m.role, text: m.text }));
      const res = await fetch("/api/careersathi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text, provider: "gemini",chatId: sessionId, history }),
      });
      
      const data = await res.json();
      if (data.title) {
        const newTitle = data.title.substring(0, 40) + (data.title.length > 40 ? "..." : "");
        document.title = data.title;
        await updateChatSessionTitle(userId, sessionId, newTitle);
      }
      const botReply = data.reply || "Sorry, I encountered an error.";
      const botMessage: ChatMessage = { role: "bot", text: botReply };

      setMessages((prev) => [...prev, botMessage]);
      await saveChatMessage(userId, sessionId, "bot", botReply);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`transition-colors duration-500 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200" : "bg-gradient-to-br from-blue-50 to-purple-50"}`}>
      <div className="max-w-[82rem] mx-auto flex h-screen">
        <Header className="pl-8 lg:pl-0" />
        <ChatSidebar
          darkMode={darkMode}
          recentConversations={recentConversations}
          currentSessionId={currentSessionId}
          startNewChat={startNewChat}
        />
        <div className="flex flex-col flex-1 p-4 !pt-20 sm:p-6">
          <motion.div className="flex-1 overflow-y-auto p-4 rounded-2xl flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ChatWindow messages={messages} loading={loading} isTyping={isTyping} />
            <div ref={chatEndRef} />
          </motion.div>
          <ChatInput input={input} setInput={setInput} handleSend={handleSend} darkMode={darkMode} isTyping={isTyping} />
        </div>
      </div>
    </div>
  );
}