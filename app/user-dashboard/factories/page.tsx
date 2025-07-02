"use client";

import { motion } from "framer-motion";

const Factories = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-2xl font-bold mb-4 w-screen h-screen bg-[#1c1c1c] ">
        Үйлдвэрүүд
      </div>
    </motion.div>
  );
};

export default Factories;
