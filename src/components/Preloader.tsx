import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return prev + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "hsl(var(--background))" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated rings */}
          <div className="relative flex items-center justify-center mb-8">
            {[80, 120, 160].map((size, i) => (
              <motion.div
                key={size}
                className="absolute rounded-full border border-primary/30"
                style={{ width: size, height: size }}
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{
                  rotate: { duration: 3 - i * 0.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, delay: i * 0.3 },
                }}
              />
            ))}
            {/* Center logo */}
            <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border border-primary/50"
              style={{ background: "hsl(var(--card))" }}>
              <span className="gradient-text font-display font-bold text-xl">M</span>
            </div>
          </div>

          {/* Name */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-display font-bold text-2xl gradient-text tracking-widest">
              mahirTheCoder
            </h1>
            <p className="text-muted-foreground text-sm font-mono mt-1">Initializing...</p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 h-1 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))",
                width: `${count}%`,
              }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="text-primary font-mono text-xs mt-2">{count}%</span>
        </motion.div>
      )}
    </AnimatePresence>

    
  );
}
