import { motion } from "framer-motion";

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
    >
      {message}
    </motion.div>
  );
}
