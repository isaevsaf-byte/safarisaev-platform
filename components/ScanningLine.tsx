"use client";

import { motion } from "framer-motion";

export function ScanningLine() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute left-0 right-0 h-px bg-accent/20"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow: "0 0 10px rgba(0,255,148,0.5)",
        }}
      />
    </motion.div>
  );
}

