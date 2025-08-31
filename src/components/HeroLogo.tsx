import { motion } from "motion/react";

interface HeroLogoProps {
  language: string;
}

const taglines = {
  ru: "Цифровые решения для бизнеса",
  en: "Digital Solutions for Business", 
  de: "Digitale Lösungen für Unternehmen",
  cs: "Digitální řešení pro byznys"
};

export function HeroLogo({ language }: HeroLogoProps) {
  const tagline = taglines[language as keyof typeof taglines] || taglines.ru;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center text-center mb-8"
    >
      {/* Large logo icon */}
      <div className="relative w-20 h-20 mb-6">
        {/* Background */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary/80 rounded-2xl shadow-2xl"
        />
        
        {/* Glow effect */}
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-xl"
        />

        {/* Icon content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            className="w-10 h-10 text-background"
          >
            {/* Flow pattern */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              d="M4 16h4m0 0l4-4m-4 4l4 4m8-8h4m0 0l4-4m-4 4l4 4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Central hub */}
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              cx="16"
              cy="16"
              r="3"
              fill="currentColor"
            />
            
            {/* Data nodes */}
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 1.4 }}
              cx="8"
              cy="12"
              r="1.5"
              fill="currentColor"
              opacity="0.7"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 1.5 }}
              cx="24"
              cy="20"
              r="1.5"
              fill="currentColor"
              opacity="0.7"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 1.6 }}
              cx="24"
              cy="12"
              r="1.5"
              fill="currentColor"
              opacity="0.7"
            />
          </svg>
        </motion.div>
        
        {/* Floating particles */}
        <motion.div
          animate={{
            y: [-5, 5, -5],
            x: [0, 2, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-2 -right-2 w-3 h-3 bg-accent rounded-full opacity-60"
        />
        <motion.div
          animate={{
            y: [5, -5, 5],
            x: [0, -2, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-2 -left-2 w-2 h-2 bg-primary rounded-full opacity-50"
        />
      </div>

      {/* Company name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
      >
        IKH-TechSystems
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg text-muted-foreground"
      >
        {tagline}
      </motion.p>

      {/* Decorative line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 1, delay: 1 }}
        className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-4"
      />
    </motion.div>
  );
}