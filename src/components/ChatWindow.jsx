import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend,
  FiMenu,
  FiPlus,
  FiTrash2,
  FiUser,
  FiLogOut
} from "react-icons/fi";
import { GiLotusFlower, GiMeditation } from "react-icons/gi";
import { BiInfinite } from "react-icons/bi";
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
    <div className="h-screen relative flex overflow-hidden bg-gradient-to-br from-amber-50 via-purple-50 to-indigo-100">
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
            className="w-80 bg-white/70 backdrop-blur-2xl shadow-2xl flex flex-col relative z-20 border-r border-white/30 rounded-tr-3xl rounded-br-3xl"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-white/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center shadow-md">
                    <GiLotusFlower className="text-white text-base" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                    Divine Chats
                  </h2>
                </div>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-400 hover:text-purple-600 p-2 rounded-lg hover:bg-purple-50 transition-all duration-200"
                >
                  ✕
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={createNewChat}
                className="w-full bg-gradient-to-r from-purple-500 to-amber-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-amber-600 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <FiPlus className="text-lg" />
                Start New Journey
              </motion.button>
            </div>

            {/* User Info */}
            <div className="p-6 border-b border-white/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FiUser className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {user?.username}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                >
                  <FiLogOut />
                </button>
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {chats.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <GiMeditation className="text-4xl mx-auto mb-4 opacity-60" />
                  <p>No sacred conversations yet</p>
                  <p className="text-sm mt-2">Begin your divine dialogue 🌸</p>
                </div>
              ) : (
                chats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 6 }}
                    className={`p-4 border-b border-white/20 cursor-pointer rounded-xl mx-2 mt-2 transition-all ${
                      currentChatId === chat.id
                        ? "bg-gradient-to-r from-purple-100 to-amber-100 shadow-md"
                        : "hover:bg-white/60"
                    }`}
                    onClick={() => loadChat(chat.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-700 truncate">
                          {chat.title}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <BiInfinite className="text-xs" />
                          {new Date(chat.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
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
        <div className="bg-white/70 backdrop-blur-xl shadow-md p-4 flex items-center justify-between border-b border-white/20 rounded-bl-3xl">
          <div className="flex items-center gap-4">
            {!showSidebar && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSidebar(true)}
                className="text-gray-500 hover:text-purple-600 p-2 rounded-lg hover:bg-purple-50"
              >
                <FiMenu className="text-xl" />
              </motion.button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center shadow-md">
                <GiLotusFlower className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Shri Krishna’s Guidance
                </h1>
                <p className="text-sm text-gray-500">
                  “Speak, child. I am listening.”
                </p>
              </div>
            </div>
          </div>

          {currentChatId && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createNewChat}
              className="bg-gradient-to-r from-purple-500 to-amber-500 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-xl flex items-center gap-2"
            >
              <FiPlus />
              New Chat
            </motion.button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full mb-6 shadow-lg">
                <GiMeditation className="text-3xl text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-4">
                Welcome to the Path of Knowledge
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Ask about life, karma, or dharma — receive wisdom from the
                Bhagavad Gita 🌺
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
                  className={`max-w-[75%] p-5 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl rounded-br-none shadow-xl"
                      : "bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl rounded-bl-none shadow-lg"
                  }`}
                >
                  {msg.sender === "bot" && msg.shloka ? (
                    <div className="space-y-3">
                      <div className="text-amber-700 font-semibold italic bg-amber-50 p-3 rounded-xl border border-amber-200">
                        “{msg.shloka}”
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {msg.meaning}
                      </p>
                      <p className="text-purple-700 text-sm leading-relaxed font-medium">
                        {msg.guidance}
                      </p>
                    </div>
                  ) : (
                    <p className="leading-relaxed">{msg.text}</p>
                  )}
                </div>
              </motion.div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/30 shadow-lg">
                <LoadingSpinner />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white/60 backdrop-blur-2xl border-t border-white/30 p-6">
          <div className="flex gap-4 max-w-4xl mx-auto">
            <textarea
              className="flex-1 p-4 bg-white/70 border-2 border-transparent rounded-2xl focus:border-purple-400 focus:bg-white transition-all resize-none shadow-inner"
              placeholder="Ask your divine question... e.g. 'How can I find peace amidst chaos?'"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="self-end bg-gradient-to-r from-purple-500 to-amber-500 text-white p-4 rounded-2xl hover:from-purple-600 hover:to-amber-600 disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <GiLotusFlower className="text-xl" />
                </motion.div>
              ) : (
                <FiSend className="text-xl" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
