"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleClick = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 600);
  };

  return (
    <motion.span
      className={`relative inline-block cursor-pointer ${className}`}
      onClick={handleClick}
      animate={isGlitching ? { x: [0, -2, 2, -2, 2, 0] } : {}}
      transition={{ duration: 0.1, repeat: isGlitching ? 5 : 0 }}
    >
      {children}
      {isGlitching && (
        <motion.span
          className="absolute inset-0 text-accent opacity-75"
          style={{
            clipPath: "inset(0 0 0 0)",
            filter: "blur(1px)",
          }}
          animate={{
            x: [0, 2, -2, 2, -2, 0],
          }}
          transition={{ duration: 0.1, repeat: 5 }}
        >
          {children}
        </motion.span>
      )}
    </motion.span>
  );
}

