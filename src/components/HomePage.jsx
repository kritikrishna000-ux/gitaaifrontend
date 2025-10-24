import { motion } from "framer-motion";
import DivineBg from "./DivineBg";

const HomePage = ({ onStartChat }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-sky-100 via-rose-50 to-amber-50">
      <DivineBg />

      {/* Login/Register buttons */}
      <header className="absolute top-6 right-8 flex gap-4 z-20">
        <button className="px-5 py-2 rounded-full bg-white/70 text-gray-800 font-medium shadow-md hover:bg-white hover:shadow-lg transition-all duration-300">
          Login
        </button>
        <button className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-medium shadow-md hover:from-amber-500 hover:to-yellow-600 transition-all duration-300">
          Register
        </button>
      </header>

      {/* Om symbol */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-7xl text-amber-500 mb-6"
      >
        ॐ
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-6xl font-bold text-amber-600 mb-3"
      >
        Gita Guidance
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl text-amber-500 font-medium mb-6"
      >
        with Premanand Maharaj Ji
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-700 text-lg mb-10 max-w-xl mx-auto"
      >
        Ask your question, receive divine wisdom from the Gita
      </motion.p>

      {/* Begin Journey button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={() => onStartChat("")}
        className="px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-300"
      >
        ✨ Begin Your Journey
      </motion.button>

      {/* Quote at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 text-gray-700 italic text-base max-w-xl px-6 leading-relaxed"
      >
        "Whenever dharma declines and the purpose of life is forgotten, I manifest myself on earth."
        <p className="text-amber-600 font-medium mt-2">– Srimad Bhagavad Gita 4:7</p>
      </motion.div>
    </div>
  );
};

export default HomePage;
