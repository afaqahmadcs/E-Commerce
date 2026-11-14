"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { imageRevealVariants } from "./motionPresets";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ImageReveal({
  children,
  className = "",
  delay = 0,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={imageRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

