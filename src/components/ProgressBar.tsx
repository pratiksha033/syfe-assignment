import { motion } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          h-full rounded-full
          bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600
          shadow-[0_0_10px_rgba(16,185,129,0.6)]
        "
      />
    </div>
  );
}
