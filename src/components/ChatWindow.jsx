import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Menu,
  Plus,
  Trash2,
  User,
  LogOut,
  Sparkles,
  MessageCircle,
  Clock
} from "lucide-react";
import { GiLotusFlower, GiMeditation } from "react-icons/gi";
import LoadingSpinner from "./LoadingSpinner";
import DivineBg from "./DivineBg";

const ChatWindow = ({
  messages,
  input,
  setInput,
  sendMessage,
  loading,
  chats,
  currentChatId,
  createNewChat,
  loadChat,
  deleteChat,
  user,
  logout,
  showSidebar,
  setShowSidebar
}) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-screen relative flex overflow-hidden bg-gradient-to-br from-orange-50/30 via-rose-50/30 to-amber-50/50">
      {/* Ethereal Background */}
      <DivineBg />

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-80 bg-white/80 backdrop-blur-3xl shadow-2xl flex flex-col relative z-20 border-r border-white/40"
          >
            {/* Sidebar Header */}
            <div className="p-5 border-b border-orange-100/50">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-10 h-10 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Sparkles className="text-white w-5 h-5" />
                  </motion.div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Sacred Chats
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  ✕
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={createNewChat}
                className="w-full bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 text-white py-3.5 rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                New Conversation
              </motion.button>
            </div>

            {/* User Info */}
            <div className="p-5 border-b border-orange-100/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-11 h-11 bg-gradient-to-br from-rose-400 via-pink-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-md"
                  >
                    <User className="text-white w-5 h-5" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {user?.username}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={logout}
                  className="text-rose-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
              {chats.length === 0 ? (
                <div className="p-6 text-center text-gray-500 mt-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <GiMeditation className="text-5xl mx-auto mb-4 text-amber-400/60" />
                  </motion.div>
                  <p className="text-sm font-medium">No conversations yet</p>
                  <p className="text-xs mt-2 text-gray-400">Start your spiritual journey</p>
                </div>
              ) : (
                chats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4, scale: 1.01 }}
                    className={`p-4 cursor-pointer rounded-2xl mb-2 transition-all ${
                      currentChatId === chat.id
                        ? "bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 shadow-md border border-amber-200/50"
                        : "hover:bg-white/70 border border-transparent"
                    }`}
                    onClick={() => loadChat(chat.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <motion.div
                          whileHover={{ rotate: 15 }}
                          className="w-8 h-8 bg-gradient-to-br from-amber-300 to-orange-300 rounded-xl flex items-center justify-center shadow-sm mt-0.5 flex-shrink-0"
                        >
                          <MessageCircle className="w-4 h-4 text-white" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">
                            {chat.title}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                            <Clock className="w-3 h-3" />
                            {new Date(chat.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className="text-rose-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-all flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-2xl shadow-sm p-5 flex items-center justify-between border-b border-orange-100/50">
          <div className="flex items-center gap-4">
            {!showSidebar && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSidebar(true)}
                className="text-gray-400 hover:text-amber-600 p-2 rounded-xl hover:bg-amber-50/50 transition-all"
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            )}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-11 h-11 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <GiLotusFlower className="text-white text-xl" />
              </motion.div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">
                  Gita Guidance
                </h1>
                <p className="text-xs text-gray-500">
                  Divine wisdom from the Bhagavad Gita
                </p>
              </div>
            </div>
          </div>

          {currentChatId && (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={createNewChat}
              className="bg-gradient-to-r from-orange-400 to-amber-400 text-white px-5 py-2.5 rounded-2xl shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              New
            </motion.button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 rounded-3xl mb-6 shadow-2xl"
              >
                <GiMeditation className="text-4xl text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Welcome to Divine Wisdom
              </h2>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                Ask your questions about life, dharma, or karma
              </p>
              <p className="text-amber-600 text-sm mt-2 font-medium">
                Receive guidance from the Bhagavad Gita
              </p>
            </motion.div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-4 rounded-3xl rounded-br-md shadow-lg"
                      : "bg-gradient-to-br from-white/90 to-orange-50/50 backdrop-blur-xl border border-orange-100/50 p-5 rounded-3xl rounded-bl-md shadow-xl"
                  }`}
                >
                  {msg.sender === "bot" && msg.shloka ? (
                    <div className="space-y-4">
                      <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 p-4 rounded-2xl border-2 border-amber-300/40 shadow-inner"
                      >
                        <p className="text-[#D4AF37] font-bold text-base leading-relaxed italic">
                          "{msg.shloka}"
                        </p>
                      </motion.div>
                      <div className="space-y-3">
                        <p className="text-gray-700 text-sm leading-[1.8] font-medium">
                          {msg.meaning}
                        </p>
                        {msg.guidance && (
                          <div className="pt-2 border-t border-amber-200/50">
                            <p className="text-amber-800 text-sm leading-[1.8] font-medium">
                              {msg.guidance}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="leading-relaxed text-sm">{msg.text}</p>
                  )}
                </div>
              </motion.div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl rounded-bl-md border border-orange-100/50 shadow-xl">
                <LoadingSpinner />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white/80 backdrop-blur-2xl border-t border-orange-100/50 p-6">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <textarea
              className="flex-1 p-4 bg-white border-2 border-orange-100/50 rounded-2xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200/50 transition-all resize-none shadow-sm placeholder:text-gray-400"
              placeholder="Ask your question... e.g., 'How do I overcome fear?'"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows="2"
            />
            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="self-end bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 text-white p-4 rounded-2xl disabled:opacity-40 shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <GiLotusFlower className="text-xl" />
                </motion.div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
