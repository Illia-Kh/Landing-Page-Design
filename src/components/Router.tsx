import { ReactNode, Children, cloneElement, isValidElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Page } from "../types";

// Re-export Page for backward compatibility
export type { Page } from "../types";

interface RouterProps {
  currentPage: Page;
  children: ReactNode;
}

export function Router({ currentPage, children }: RouterProps) {
  // Find the active route
  let activeRoute = null;
  
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.props.page === currentPage) {
      activeRoute = child;
    }
  });

  return (
    <AnimatePresence mode="wait" initial={false}>
      {activeRoute && cloneElement(activeRoute, { key: currentPage })}
    </AnimatePresence>
  );
}

interface RouteProps {
  page: Page;
  children: ReactNode;
}

export function Route({ page, children }: RouteProps) {
  // This component now only renders when selected by Router
  return (
    <motion.div
      key={page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
