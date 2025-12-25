"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";

export function LayoutTextFlip({
  text,
  words,
  duration = 3000,
  className,
  textClassName,
  wordClassName,
}: {
  text?: string;
  words: string[];
  duration?: number;
  className?: string;
  textClassName?: string;
  wordClassName?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  // During SSR and initial hydration, render static text
  if (!hasMounted) {
    return (
      <span className={cn("inline-flex items-baseline", className)}>
        {text && <span className={cn("inline-block", textClassName)}>{text}</span>}
        <span className={cn("inline-block", wordClassName)}>{words[0]}</span>
      </span>
    );
  }

  return (
    <LayoutGroup>
      <motion.span
        className={cn("inline-flex items-baseline", className)}
        layout
      >
        {text && (
          <motion.span className={cn("inline-block", textClassName)} layout>
            {text}
          </motion.span>
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[currentIndex]}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className={cn("inline-block", wordClassName)}
            layout
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </LayoutGroup>
  );
}
