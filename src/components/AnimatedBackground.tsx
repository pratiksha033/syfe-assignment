"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Blob 1 */}
      <motion.div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full 
        bg-gradient-to-tr from-blue-400/30 to-indigo-400/30 blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full 
        bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3 */}
      <motion.div
        className="absolute bottom-[-200px] left-1/3 h-[500px] w-[500px] rounded-full 
        bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
