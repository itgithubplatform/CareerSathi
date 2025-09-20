import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PlusCircle, MessageSquare, Sparkles, Link, SparklesIcon, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function ChatSidebar({ darkMode, recentConversations, currentSessionId, loadChatSession, startNewChat }:{
  darkMode: boolean;
  recentConversations: any[];
  currentSessionId: string | null;
  loadChatSession: (sessionId: string) => void;
  startNewChat: () => void;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Trigger Button */}
      <motion.button
        initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6 ,delay: 0.3}}
        className="absolute top-5 left-3 z-50 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <MessageCircle size={25} className="text-gray-700" />
      </motion.button>

      {/* Sidebar (lg: static, sm: drawer) */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0 , opacity: 1}}
        transition={{ delay: 0.1}}
        className={`hidden lg:flex lg:w-[35%] xl:w-1/4 pl-3 pr-5 pt-5 border-r mt-20 overflow-y-auto flex-col 
          ${darkMode ? "border-gray-700 bg-transparent" : "border-gray-300 bg-transparent"}`}
      >
        {/* New Conversation Button */}
        <button
          onClick={startNewChat}
          className={`flex items-center gap-3 p-3 rounded-2xl w-full text-left font-semibold mb-4 transition-all duration-300 shadow-md hover:shadow-lg ${darkMode
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
          }`}
        >
          <PlusCircle size={20} />
          New conversation
        </button>

        <h2 className={`text-lg font-bold mb-4 mt-4 ${darkMode ? "text-pink-300" : "text-zinc-900"}`}>
          Career conversations
        </h2>

        <div className="space-y-3">
          {recentConversations.map((conv) => (
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              key={conv.id}
              onClick={() => loadChatSession(conv.id)}
              className={`flex items-center gap-2 p-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg px-3 shadow-sm ${currentSessionId === conv.id
                ? 'bg-purple-50'
                : "bg-white border text-zinc-700"
              }`}
            >
              <MessageSquare size={18} className="flex-shrink-0" />
              <div className="truncate">
                <p className="font-semibold text-sm">{conv.title || "Untitled Chat"}</p>
                <p className="text-xs text-gray-500 truncate">{conv.lastMessage || '...'}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.aside>

      {/* Mobile Drawer + Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden "
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`fixed top-0 left-0 w-3/4 pt-16 max-w-xs h-full z-50 p-5 border-r flex flex-col bg-white shadow-lg
                ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}`}
            >
              
            <Link href="/" className="absolute top-3 left-4 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r p-2 from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Sparkles size={25} className=" md:w-6 md:h-6 text-white" />
            </Link>
              {/* Close Button */}
              <button
                className="absolute top-4 right-4"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={24} className="text-purple-600" />
              </button>

              {/* Content reused */}
              <button
                onClick={startNewChat}
                className={`flex items-center gap-3 p-3 rounded-2xl w-full text-left font-semibold mb-4 transition-all duration-300 shadow-md hover:shadow-lg ${darkMode
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
                }`}
              >
                <PlusCircle size={20} />
                New conversation
              </button>

              <h2 className={`text-lg font-bold mb-4 mt-4 ${darkMode ? "text-pink-300" : "text-zinc-900"}`}>
                Career conversations
              </h2>

              <div className="space-y-3 overflow-y-auto">
                {recentConversations.map((conv) => (
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    key={conv.id}
                    onClick={() => {
                      loadChatSession(conv.id);
                      setSidebarOpen(false); // auto close on select
                    }}
                    className={`flex items-center gap-2 p-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg px-3 shadow-sm ${currentSessionId === conv.id
                      ? 'bg-purple-50'
                      : "bg-white border text-zinc-700"
                    }`}
                  >
                    <MessageSquare size={18} className="flex-shrink-0" />
                    <div className="truncate">
                      <p className="font-semibold text-sm">{conv.title || "Untitled Chat"}</p>
                      <p className="text-xs text-gray-500 truncate">{conv.lastMessage || '...'}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}