import { motion } from "framer-motion";
import { CardProps } from "../../types/carbonTypes";

export default function Card({ title, value }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="p-5 rounded-2xl bg-black backdrop-blur-md border border-green-200 
      text-center shadow-md hover:shadow-green-200 transition-all duration-300"
    >
      <p className="text-green-400 text-sm">{title}</p>
      <h3 className="text-green-600 text-lg font-semibold mt-1">{value}</h3>
    </motion.div>
  );
}