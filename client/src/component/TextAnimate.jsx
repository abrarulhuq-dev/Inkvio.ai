import { motion } from "framer-motion";

const LOGO_DONE = 1.2 * 4 + 0.6;

export function AnimatedText() {
  return (
    <div className="relative overflow-hidden">
      {/* MASK */}
      <motion.div
        className="absolute inset-0 bg-white z-10"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{
          delay: LOGO_DONE,
          duration: 0.9,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "left" }}
      />

      {/* TEXT */}
      <motion.h1
        className="relative z-0 text-7xl font-bold tracking-wide text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: LOGO_DONE + 0.05,
          duration: 0.01,
        }}
      >
        Inkvio.ai
      </motion.h1>
    </div>
  );
}
