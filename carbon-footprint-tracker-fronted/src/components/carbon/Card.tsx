import { motion } from "framer-motion"
import { CardProps } from "../../types/carbonTypes"

export default function Card({title,value}:CardProps){
return(
   <motion.div whileHover={{scale:1.05}} className="bg-gradient-to-br from-[#0f172a]/80 to-[#022c22]/80  backdrop-blur-xl border border-green-500/30 rounded-xl p-5 text-center shadow-lg shadow-green-500/10">
     <p className="text-gray-400 text-sm">{title}</p>
     <h3 className="text-green-400 text-lg font-semibold">{value}</h3>
   </motion.div>
  )
}