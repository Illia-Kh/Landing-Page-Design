import { motion } from "motion/react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export function Logo({ size = "md", animated = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10", 
    lg: "h-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const iconSizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  const LogoIcon = () => (
    <div className={`relative ${iconSizeClasses[size]} mr-2`}>
      {/* Background circle */}
      <motion.div
        initial={animated ? { scale: 0, rotate: -180 } : {}}
        animate={animated ? { scale: 1, rotate: 0 } : {}}
        transition={animated ? { duration: 0.8, ease: "easeOut" } : {}}
        className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg"
      />
      
      {/* Flow lines */}
      <motion.div
        initial={animated ? { opacity: 0, x: -10 } : {}}
        animate={animated ? { opacity: 1, x: 0 } : {}}
        transition={animated ? { duration: 0.6, delay: 0.3 } : {}}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 text-background"
        >
          {/* Tech flow pattern */}
          <motion.path
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={animated ? { duration: 1, delay: 0.5 } : {}}
            d="M3 12h3m0 0l3-3m-3 3l3 3m6-6h3m0 0l3-3m-3 3l3 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.circle
            initial={animated ? { scale: 0 } : {}}
            animate={animated ? { scale: 1 } : {}}
            transition={animated ? { duration: 0.4, delay: 0.8 } : {}}
            cx="12"
            cy="12"
            r="2"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* Animated glow effect */}
      {animated && (
        <motion.div
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-sm"
        />
      )}
    </div>
  );

  return (
    <motion.div
      initial={animated ? { opacity: 0, y: -10 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={animated ? { duration: 0.6 } : {}}
      className={`flex items-center ${sizeClasses[size]} ${className}`}
    >
      <LogoIcon />
      <motion.div
        initial={animated ? { opacity: 0, x: -20 } : {}}
        animate={animated ? { opacity: 1, x: 0 } : {}}
        transition={animated ? { duration: 0.6, delay: 0.2 } : {}}
        className="flex flex-col"
      >
        <span className={`font-bold leading-none ${textSizeClasses[size]} bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent`}>
          IKH-TechSystems
        </span>
        {size === "lg" && (
          <motion.span
            initial={animated ? { opacity: 0 } : {}}
            animate={animated ? { opacity: 1 } : {}}
            transition={animated ? { duration: 0.6, delay: 0.8 } : {}}
            className="text-xs text-muted-foreground -mt-1"
          >
            Digital Solutions
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

// Alternative compact version for header
export function LogoCompact({ animated = false, className = "" }: { animated?: boolean; className?: string }) {
  return (
    <div className={`flex items-center h-8 ${className}`}>
      <div className="relative w-7 h-7 mr-2">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-md" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4 text-background"
          >
            <path
              d="M2 8h2m0 0l2-2m-2 2l2 2m4-4h2m0 0l2-2m-2 2l2 2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="8" cy="8" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>
      <span className="font-bold text-lg bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
        IKH-TechSystems
      </span>
    </div>
  );
}