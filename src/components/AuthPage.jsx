import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { GiLotusFlower, GiMeditation } from "react-icons/gi";
import DivineBg from "./DivineBg";

const AuthPage = ({ authMode, setAuthMode, authData, setAuthData, handleAuth, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <DivineBg />
      
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20"
      >
        {/* Divine Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full mb-4 shadow-lg"
          >
            <GiLotusFlower className="text-3xl text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-2"
          >
            Spiritual Guru
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 flex items-center justify-center gap-2"
          >
            <GiMeditation className="text-purple-500" />
            Connect with divine wisdom
          </motion.p>
        </div>

        {/* Auth Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex mb-8 bg-gray-100 rounded-2xl p-1"
        >
          <button
            onClick={() => setAuthMode("login")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              authMode === "login"
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode("signup")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              authMode === "signup"
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            Sign Up
          </button>
        </motion.div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="relative"
          >
            <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={authData.username}
              onChange={(e) => setAuthData({...authData, username: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300 hover:bg-white"
              required
            />
          </motion.div>
          
          {authMode === "signup" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative"
            >
              <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={authData.email}
                onChange={(e) => setAuthData({...authData, email: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300 hover:bg-white"
                required
              />
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="relative"
          >
            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={authData.password}
              onChange={(e) => setAuthData({...authData, password: e.target.value})}
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300 hover:bg-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-amber-500 text-white py-4 rounded-2xl font-medium hover:from-purple-600 hover:to-amber-600 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
          >
            {loading && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-600"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
            <span className="relative z-10">
              {loading ? "Connecting..." : authMode === "login" ? "Enter Sacred Space" : "Begin Journey"}
            </span>
          </motion.button>
        </form>

        {/* Divine Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 italic">
            "The mind is everything. What you think you become." - Buddha
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;