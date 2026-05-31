import { motion } from "framer-motion";
import { CardProps } from "../../types/carbonTypes";

export default function Card({ title, value }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="p-4 sm:p-5 rounded-2xl bg-black backdrop-blur-md border border-green-200 text-center shadow-md hover:shadow-green-200 transition-all duration-300">
      <p className="text-green-400 text-xs sm:text-sm">{title}</p>
      <h3 className="text-green-600 text-sm sm:text-base md:text-lg font-semibold mt-1 break-words">{value}</h3>
    </motion.div>
  );
}