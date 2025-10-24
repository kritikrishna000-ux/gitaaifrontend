import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-purple-400 to-amber-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <span className="text-sm text-purple-600 font-medium">Divine wisdom flowing...</span>
    </div>
  );
};

export default LoadingSpinner;