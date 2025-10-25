import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Menu,
  Plus,
  Trash2,
  User,
  LogOut,
  MessageSquare,
  X
} from "lucide-react";
import { GiLotusFlower } from "react-icons/gi";
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
    <div className="h-screen relative flex overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <DivineBg />

      {/* Minimal Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-72 bg-white shadow-xl flex flex-col relative z-20"
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Chats
                </h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={createNewChat}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <User className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {user?.username}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {chats.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No conversations yet</p>
                </div>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      currentChatId === chat.id
                        ? "bg-amber-50 border-l-4 border-l-amber-500"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => loadChat(chat.id)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {chat.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {new Date(chat.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Bar */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-3">
            {!showSidebar && (
              <button
                onClick={() => setShowSidebar(true)}
                className="text-gray-500 hover:text-gray-700 p-2 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <GiLotusFlower className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-900">
                Gita Guidance
              </h1>
              <p className="text-xs text-gray-500">
                Divine wisdom from Bhagavad Gita
              </p>
            </div>
          </div>

          {currentChatId && (
            <button
              onClick={createNewChat}
              className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
            >
              New Chat
            </button>
          )}
        </div>

        {/* Messages - WhatsApp Style */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f0f2f5]">
          {messages.length === 0 ? (
            <div className="text-center mt-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-4">
                <GiLotusFlower className="text-4xl text-amber-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Welcome to Gita Guidance
              </h2>
              <p className="text-gray-600 text-sm">
                Ask your questions and receive divine wisdom
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "user" ? (
                  // User Message Bubble
                  <div className="max-w-[75%] bg-[#dcf8c6] rounded-lg rounded-br-none px-4 py-2 shadow-sm">
                    <p className="text-gray-900 text-sm leading-relaxed">{msg.text}</p>
                  </div>
                ) : (
                  // Bot Message Bubble with Shloka
                  <div className="max-w-[80%] bg-white rounded-lg rounded-bl-none px-4 py-3 shadow-sm">
                    {msg.shloka ? (
                      <div className="space-y-3">
                        {/* Shloka in golden/divine color */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-3 rounded">
                          <p className="text-[#D4AF37] font-semibold text-sm leading-relaxed italic">
                            "{msg.shloka}"
                          </p>
                        </div>
                        {/* Meaning */}
                        <p className="text-gray-800 text-sm leading-[1.7]">
                          {msg.meaning}
                        </p>
                        {/* Guidance */}
                        {msg.guidance && (
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-gray-700 text-sm leading-[1.7]">
                              {msg.guidance}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-900 text-sm leading-relaxed">{msg.text}</p>
                    )}
                  </div>
                )}
              </motion.div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-bl-none px-4 py-3 shadow-sm">
                <LoadingSpinner />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-3 max-w-5xl mx-auto">
            <textarea
              className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:border-amber-400 focus:bg-white transition-all resize-none text-sm"
              placeholder="Ask your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows="1"
              style={{ maxHeight: '100px', overflow: 'auto' }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="self-end w-12 h-12 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <GiLotusFlower className="text-lg" />
                </motion.div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
