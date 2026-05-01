import { motion } from "framer-motion";

export function PostSkeleton() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 relative overflow-hidden group"
    >
      {/* Shimmer Effect */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800/20 to-transparent skew-x-12 pointer-events-none"
      />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="h-6 w-3/4 bg-neutral-800 rounded-md animate-pulse" />
        <div className="h-4 w-16 bg-neutral-800 rounded-md animate-pulse" />
      </div>
      
      <div className="space-y-2 mb-4 relative z-10">
        <div className="h-4 w-full bg-neutral-800/50 rounded-md animate-pulse" />
        <div className="h-4 w-2/3 bg-neutral-800/50 rounded-md animate-pulse" />
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="h-5 w-20 bg-neutral-800/80 rounded-full animate-pulse" />
        <div className="h-4 w-12 bg-neutral-800/50 rounded-md animate-pulse" />
      </div>
    </motion.div>
  );
}