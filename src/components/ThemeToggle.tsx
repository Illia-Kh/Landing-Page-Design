import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { getSpamMessage, SupportedLanguage } from "../utils/language";

interface ThemeToggleProps {
  className?: string;
  language?: SupportedLanguage;
}

interface ClickData {
  timestamp: number;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = "",
  language
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [isBlocked, setIsBlocked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const blockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Constants
  const CLICK_LIMIT = 5;
  const TIME_WINDOW = 2000; // 2 seconds
  const BLOCK_DURATION = 10000; // 10 seconds
  const TOOLTIP_DURATION = 8000; // 8 seconds

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (blockTimeoutRef.current) clearTimeout(blockTimeoutRef.current);
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    };
  }, []);

  const checkForSpam = useCallback((newClicks: ClickData[]) => {
    const now = Date.now();
    const recentClicks = newClicks.filter(click => now - click.timestamp < TIME_WINDOW);
    
    if (recentClicks.length >= CLICK_LIMIT) {
      setIsBlocked(true);
      setShowTooltip(true);
      
      // Clear previous timeouts
      if (blockTimeoutRef.current) clearTimeout(blockTimeoutRef.current);
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
      
      // Set new timeouts
      blockTimeoutRef.current = setTimeout(() => {
        setIsBlocked(false);
        // Clear stored clicks when unblocked
        try {
          sessionStorage.removeItem('theme-toggle-clicks');
        } catch {
          // Ignore storage errors
        }
      }, BLOCK_DURATION);
      
      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, TOOLTIP_DURATION);
      
      return true;
    }
    
    return false;
  }, []);

  const handleClick = useCallback(() => {
    if (isBlocked) return;

    const now = Date.now();
    const newClick: ClickData = { timestamp: now };
    
    const getStoredClicks = (): ClickData[] => {
      try {
        const stored = sessionStorage.getItem('theme-toggle-clicks');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    };

    const storeClicks = (clickData: ClickData[]) => {
      try {
        sessionStorage.setItem('theme-toggle-clicks', JSON.stringify(clickData));
      } catch {
        // Ignore storage errors
      }
    };

    const prevClicks = getStoredClicks();
    // Remove clicks older than time window
    const validClicks = prevClicks.filter(click => now - click.timestamp < TIME_WINDOW);
    const updatedClicks = [...validClicks, newClick];
    
    storeClicks(updatedClicks);
    
    // Check for spam
    const isSpam = updatedClicks.filter(click => now - click.timestamp < TIME_WINDOW).length >= CLICK_LIMIT;
    
    if (isSpam) {
      checkForSpam(updatedClicks);
      return;
    }
    
    // If not spam, toggle theme with a short delay for perceived responsiveness
    setTimeout(() => {
      toggleTheme();
    }, 120);
  }, [isBlocked, toggleTheme, checkForSpam, TIME_WINDOW, CLICK_LIMIT]);

  return (
    <div className="relative">
      {/* Main Theme Toggle Button */}
      <motion.button
        onClick={handleClick}
        disabled={isBlocked}
        className={`relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-background overflow-hidden rounded-full disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        whileHover={!isBlocked ? { scale: 1.05 } : {}}
        whileTap={!isBlocked ? { scale: 0.95 } : {}}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        role="switch"
        aria-checked={isDark}
        aria-disabled={isBlocked}
        title={isBlocked 
          ? "Theme toggle temporarily blocked due to rapid clicking" 
          : (isDark ? "Switch to light theme" : "Switch to dark theme")
        }
      >
        {/* Button Base */}
        <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
          <circle 
            cx="43.1538" 
            cy="43.1538" 
            r="43.1538" 
            fill={isBlocked ? "#94a3b8" : "#F1F1F1"}
            className="transition-all duration-300"
          />
        </svg>
        
        {/* Sun Icon - shown in light theme */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: !isDark ? 1 : 0,
            scale: !isDark ? 1 : 0.5
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <svg width="60" height="60" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
            <path 
              d="M27.4341 47.0769C27.4341 57.9085 36.2453 66.7198 47.0769 66.7198C57.9086 66.7198 66.7198 57.9085 66.7198 47.0769C66.7198 36.2453 57.9086 27.4341 47.0769 27.4341C36.2453 27.4341 27.4341 36.2453 27.4341 47.0769ZM47.0769 35.2802C53.5814 35.2802 58.8736 40.5725 58.8736 47.0769C58.8736 53.5814 53.5814 58.8736 47.0769 58.8736C40.5725 58.8736 35.2802 53.5814 35.2802 47.0769C35.2802 40.5725 40.5725 35.2802 47.0769 35.2802ZM43.146 74.5385H50.9922V86.3077H43.146V74.5385ZM43.146 7.84615H50.9922V19.6154H43.146V7.84615ZM7.83832 43.1538H19.6075V51H7.83832V43.1538ZM74.5306 43.1538H86.2999V51H74.5306V43.1538ZM16.5515 72.0395L24.8684 63.7147L30.4195 69.2619L22.1026 77.5867L16.5515 72.0395ZM63.7108 24.888L72.0356 16.5632L77.5828 22.1105L69.258 30.4352L63.7108 24.888ZM24.8802 30.4392L16.5554 22.1144L22.1065 16.5672L30.4235 24.8919L24.8802 30.4392ZM77.5828 72.0434L72.0356 77.5906L63.7108 69.2659L69.258 63.7186L77.5828 72.0434Z" 
              fill={isBlocked ? "#64748b" : "#F39C12"}
              className="transition-colors duration-300"
            />
          </svg>
        </motion.div>
        
        {/* Moon Icon - shown in dark theme */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <svg width="60" height="60" viewBox="0 0 95 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
            <path 
              d="M82.2186 52.0996C79.5601 52.8057 76.821 53.1631 74.0704 53.1628C65.6946 53.1628 57.8288 49.9066 51.9207 43.9985C48.0409 40.0964 45.2517 35.2455 43.831 29.9295C42.4102 24.6135 42.4076 19.0179 43.8234 13.7005C44.0003 13.0357 43.9991 12.3361 43.8202 11.6718C43.6412 11.0075 43.2908 10.402 42.8039 9.91595C42.3171 9.4299 41.711 9.08041 41.0464 8.90255C40.3819 8.72469 39.6822 8.72471 39.0177 8.90261C32.3608 10.6766 26.2875 14.1698 21.407 19.032C6.11483 34.3242 6.11483 59.2161 21.407 74.5161C25.0418 78.1712 29.3655 81.0691 34.1277 83.0421C38.89 85.0152 43.9962 86.0242 49.151 86.0107C61.3044 89.0252 66.4094 88.017 71.1705 86.0446C68.9315 84.0721 73.2538 81.1747 76.8871 77.52C81.7529 69.6385 85.2478 63.562 87.0204 56.9015C87.1965 56.2369 87.1951 55.5378 87.0162 54.874C86.8374 54.2102 86.4874 53.6049 86.0013 53.1188C85.5151 52.6327 84.9099 52.2827 84.2461 52.1038C83.5823 51.925 82.8831 51.9235 82.2186 52.0996ZM71.3438 68.9728C68.4367 71.8958 64.9787 74.2133 61.17 75.7911C57.3613 77.3689 53.2775 78.1756 49.1549 78.1645C45.0309 78.1748 40.9458 77.3674 37.1359 75.789C33.3259 74.2106 29.8666 71.8925 26.9581 68.9688C14.726 56.7328 14.726 36.8192 26.9581 24.5831C29.3218 22.2221 32.0507 20.2576 35.0397 18.7652C34.6022 24.4108 35.3886 30.0842 37.3454 35.3978C39.3021 40.7115 42.3829 45.54 46.3774 49.5535C50.382 53.5605 55.2092 56.6498 60.525 58.6081C65.8409 60.5663 71.5186 61.3466 77.1657 60.8951C75.6652 63.8791 73.7001 66.6056 71.3438 68.9728Z" 
              fill={isBlocked ? "#64748b" : "#3B82F6"}
              className="transition-colors duration-300"
            />
          </svg>
        </motion.div>
        
        {/* Press Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileTap={!isBlocked ? { 
            opacity: 0.6, 
            scale: 1.2 
          } : {}}
          transition={{ duration: 0.2 }}
        />
      </motion.button>

      {/* Comic-style Tooltip for Spam Protection */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
            className="absolute -left-2 -top-20 z-50"
          >
            {/* Comic Speech Bubble */}
            <div className="relative bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-lg px-4 py-3 shadow-lg max-w-xs">
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-[var(--card-bg)] border-r-2 border-b-2 border-[var(--border-color)] transform rotate-45"></div>
              
              {/* Message content */}
              <div className="text-sm font-medium text-[var(--text)] leading-tight">
                {getSpamMessage(language)}
              </div>
              
              {/* Optional comic-style decoration */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--accent)] rounded-full opacity-80"></div>
              <div className="absolute -top-0.5 -right-2 w-2 h-2 bg-[var(--accent)]/70 rounded-full opacity-60"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
