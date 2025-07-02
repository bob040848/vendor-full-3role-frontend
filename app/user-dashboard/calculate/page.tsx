"use client";

import { motion } from "framer-motion";

export default function CalculatePage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-2xl font-bold mb-4 bg-[#1c1c1c] h-screen w-screen">
        Тооцооны хуудас
      </div>
    </motion.div>
  );
}
