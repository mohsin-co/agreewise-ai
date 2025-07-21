"use client";

import { motion } from 'framer-motion';

// This is a reusable component that wraps its children with a fade-in-up animation
export default function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start invisible and 20px down
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
      viewport={{ once: true }} // Only animate once when it enters the viewport
      transition={{ duration: 0.5, ease: "easeOut" }} // Set the animation speed and easing
    >
      {children}
    </motion.div>
  );
}