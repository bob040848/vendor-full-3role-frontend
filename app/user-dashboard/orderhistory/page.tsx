"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const orders = [
  {
    id: 1,
    customer: "Бат",
    product: "Сүү",
    factory: "Apu",
    date: "2025-06-27",
  },
  {
    id: 2,
    customer: "Төгс",
    product: "Ус",
    factory: "MCS",
    date: "2025-06-25",
  },
  {
    id: 3,
    customer: "Бат",
    product: "Талх",
    factory: "Apu",
    date: "2025-06-22",
  },
];

const factoryLogos: Record<string, string> = {
  Apu: "/img/apu.png",
  MCS: "/img/mcs.webp",
  TavanBogd: "/img/images.png",
};

export default function OrderHistory() {
  const [factories, setFactories] = useState<string[]>([]);

  useEffect(() => {
    const unique = Array.from(new Set(orders.map((order) => order.factory)));
    setFactories(unique);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 bg-[#1c1c1c] text-white w-screen h-screen">
        <h2 className="text-xl font-bold mb-4">Захиалга өгсөн үйлдвэрүүд</h2>
        <div className="flex gap-6">
          {factories.map((factory) => (
            <div key={factory} className="flex flex-col items-center">
              <img
                src={factoryLogos[factory] || "/logos/default.png"}
                alt={factory}
                className="w-14 h-14 object-contain"
              />
              <span className="mt-2">{factory}</span>
            </div>
          ))}
        </div>

        <div className="">gdfger</div>
      </div>
    </motion.div>
  );
}
