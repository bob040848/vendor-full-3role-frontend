"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OrderAdd } from "../orderadd";
import { Search, Plus } from "lucide-react";
import { Homedefault } from "./Homedefault";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Order = () => {
  const [showOrderAdd, setShowOrderAdd] = useState(false);

  const handleShowClick = () => {
    setShowOrderAdd(true);
  };

  return (
    <div className="flex  flex-col bg-[#1c1c1c] w-full px-5 py-8 gap-y-10">
      <div className="flex items-center gap-x-4">
        <div className="flex relative w-full max-w-3xl items-center">
          <Input
            placeholder="Захиалга хайх..."
            className="pl-10 bg-[#2c2c2c] text-white border-none"
          ></Input>
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        <Button
          onClick={handleShowClick}
          className="bg-blue-600  text-white flex items-center gap-1 w-full max-w-2xs"
        >
          <Plus size={16} />
          Захиалга Нэмэх
        </Button>
      </div>
      <Homedefault />
      <div className=" flex justify-center">
        {showOrderAdd && <OrderAdd onCancel={() => setShowOrderAdd(false)} />}
      </div>
    </div>
  );
};
