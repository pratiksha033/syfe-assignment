import { motion } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full bg-primary rounded-full"
      />
    </div>
  );
}
