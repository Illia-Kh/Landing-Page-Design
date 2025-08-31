import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CodeLogoProps {
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CodeLogo({ animated = true, size = "md", className = "" }: CodeLogoProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasFinishedFirstAnimation, setHasFinishedFirstAnimation] = useState(false);

  const fullText = "<IKH-TechSystems>";

  const sizeConfig = {
    sm: {
      container: "text-sm p-3",
      height: "h-16",
      width: "w-48",
      fontSize: "text-sm"
    },
    md: {
      container: "text-lg p-4", 
      height: "h-20",
      width: "w-64",
      fontSize: "text-lg"
    },
    lg: {
      container: "text-xl p-6",
      height: "h-24", 
      width: "w-80",
      fontSize: "text-xl"
    }
  };

  const config = sizeConfig[size];

  // Typing animation effect
  useEffect(() => {
    if (!animated) {
      setDisplayedText(fullText);
      setHasFinishedFirstAnimation(true);
      return;
    }

    const typeText = () => {
      setIsTyping(true);
      setDisplayedText("");
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;

        if (currentIndex >= fullText.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
          setHasFinishedFirstAnimation(true);
        }
      }, 100); // Speed of typing

      return typingInterval;
    };

    // Initial typing
    const initialTimeout = setTimeout(typeText, 500);

    // Only repeat if we haven't finished the first animation
    let repeatInterval: NodeJS.Timeout;
    if (!hasFinishedFirstAnimation) {
      repeatInterval = setInterval(() => {
        if (!hasFinishedFirstAnimation) {
          typeText();
        }
      }, 4000);
    }

    return () => {
      clearTimeout(initialTimeout);
      if (repeatInterval) clearInterval(repeatInterval);
    };
  }, [animated, fullText, hasFinishedFirstAnimation]);

  return (
    <div className={`${config.width} ${config.height} ${className}`}>
      {/* Main logo block - always visible */}
      <div className="bg-muted border border-border rounded-lg shadow-sm flex items-center justify-center h-full">
        <motion.div 
          className={`font-mono ${config.fontSize} text-muted-foreground flex items-center relative`}
          animate={animated && displayedText.length > 0 ? {
            translateX: displayedText.length < fullText.length / 2 
              ? `${(fullText.length - displayedText.length) * 0.3}rem`
              : 0
          } : {}}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Displayed text */}
          <span className="text-foreground">
            {displayedText}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// Compact version for header
export function CodeLogoCompact({ animated = false, className = "" }: { animated?: boolean; className?: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasFinishedFirstAnimation, setHasFinishedFirstAnimation] = useState(false);

  const fullText = "<IKH-TechSystems>";

  // Typing animation for compact version
  useEffect(() => {
    if (!animated) {
      setDisplayedText(fullText);
      setHasFinishedFirstAnimation(true);
      return;
    }

    const typeText = () => {
      setIsTyping(true);
      setDisplayedText("");
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;

        if (currentIndex >= fullText.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
          setHasFinishedFirstAnimation(true);
        }
      }, 80);

      return typingInterval;
    };

    const initialTimeout = setTimeout(typeText, 300);
    
    // Only repeat if we haven't finished the first animation
    let repeatInterval: NodeJS.Timeout;
    if (!hasFinishedFirstAnimation) {
      repeatInterval = setInterval(() => {
        if (!hasFinishedFirstAnimation) {
          typeText();
        }
      }, 5000);
    }

    return () => {
      clearTimeout(initialTimeout);
      if (repeatInterval) clearInterval(repeatInterval);
    };
  }, [animated, fullText, hasFinishedFirstAnimation]);

  return (
    <div className={`flex items-center h-8 ${className}`}>
      {/* Compact logo block - always visible */}
      <div className="bg-muted border border-border rounded px-3 py-1 flex items-center min-w-[8rem] justify-center">
        <motion.div 
          className="flex items-center relative"
          animate={animated && displayedText.length > 0 ? {
            translateX: displayedText.length < fullText.length / 2 
              ? `${(fullText.length - displayedText.length) * 0.15}rem`
              : 0
          } : {}}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <span className="font-mono text-sm text-foreground">
            {displayedText}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
