import { motion } from "framer-motion";

const DivineBg = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Ethereal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/50 to-rose-50/60" />

      {/* Golden aurora glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-amber-300/10 to-orange-200/20 blur-3xl"
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating orbs of light */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-2xl"
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-gradient-to-r from-amber-400/30 to-orange-300/30 rounded-full blur-2xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle mandala pattern */}
      <div className="absolute inset-0 opacity-[0.04] text-yellow-900">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <pattern
              id="mandala"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.4" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.3" />
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={100 + 80 * Math.cos((i * Math.PI) / 6)}
                  y2={100 + 80 * Math.sin((i * Math.PI) / 6)}
                  stroke="currentColor"
                  strokeWidth="0.25"
                />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mandala)" />
        </svg>
      </div>
    </div>
  );
};

export default DivineBg;
