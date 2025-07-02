"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

export const ClientTransitionWrapper = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={pathname}>{children}</div>
    </AnimatePresence>
  );
};
