import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface CodeHeroLogoProps {
  language: string;
}

const taglines = {
  ru: "Цифровые решения для бизнеса",
  en: "Digital Solutions for Business", 
  de: "Digitale Lösungen für Unternehmen",
  cs: "Digitální řešení pro byznys"
};

const codeExamples = {
  ru: [
    { type: "comment", content: "// Создаем инновационные решения" },
    { type: "import", content: "import { Success } from '@ikhtech/solutions';" },
    { type: "declaration", content: "class IKHTechSystems {" },
    { type: "constructor", content: "  constructor(client) {" },
    { type: "property", content: "    this.expertise = ['AI', 'Web', 'Mobile'];" },
    { type: "property", content: "    this.mission = 'Digital Excellence';" },
    { type: "property", content: "    this.client = client;" },
    { type: "constructor", content: "  }" },
    { type: "method", content: "  async transform() {" },
    { type: "method", content: "    return await this.innovate();" },
    { type: "method", content: "  }" },
    { type: "declaration", content: "}" }
  ],
  en: [
    { type: "comment", content: "// Building innovative solutions" },
    { type: "import", content: "import { Innovation } from '@ikhtech/digital';" },
    { type: "declaration", content: "class IKHTechSystems {" },
    { type: "constructor", content: "  constructor(business) {" },
    { type: "property", content: "    this.stack = ['React', 'AI', 'Cloud'];" },
    { type: "property", content: "    this.vision = 'Future Ready';" },
    { type: "property", content: "    this.business = business;" },
    { type: "constructor", content: "  }" },
    { type: "method", content: "  async scale() {" },
    { type: "method", content: "    return await this.optimize();" },
    { type: "method", content: "  }" },
    { type: "declaration", content: "}" }
  ],
  de: [
    { type: "comment", content: "// Innovative Lösungen entwickeln" },
    { type: "import", content: "import { Technologie } from '@ikhtech/digital';" },
    { type: "declaration", content: "class IKHTechSystems {" },
    { type: "constructor", content: "  constructor(unternehmen) {" },
    { type: "property", content: "    this.expertise = ['KI', 'Web', 'Mobile'];" },
    { type: "property", content: "    this.ziel = 'Digitale Exzellenz';" },
    { type: "property", content: "    this.unternehmen = unternehmen;" },
    { type: "constructor", content: "  }" },
    { type: "method", content: "  async transformieren() {" },
    { type: "method", content: "    return await this.innovieren();" },
    { type: "method", content: "  }" },
    { type: "declaration", content: "}" }
  ],
  cs: [
    { type: "comment", content: "// Vytváříme inovativní řešení" },
    { type: "import", content: "import { Inovace } from '@ikhtech/digitalni';" },
    { type: "declaration", content: "class IKHTechSystems {" },
    { type: "constructor", content: "  constructor(firma) {" },
    { type: "property", content: "    this.technologie = ['AI', 'Web', 'Mobile'];" },
    { type: "property", content: "    this.mise = 'Digitální Excellence';" },
    { type: "property", content: "    this.firma = firma;" },
    { type: "constructor", content: "  }" },
    { type: "method", content: "  async transformovat() {" },
    { type: "method", content: "    return await this.inovovat();" },
    { type: "method", content: "  }" },
    { type: "declaration", content: "}" }
  ]
};

export function CodeHeroLogo({ language }: CodeHeroLogoProps) {
  const [typingLine, setTypingLine] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const tagline = taglines[language as keyof typeof taglines] || taglines.ru;
  const codeLines = codeExamples[language as keyof typeof codeExamples] || codeExamples.ru;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleLines < codeLines.length) {
        setVisibleLines(prev => prev + 1);
        setTypingLine(visibleLines);
      } else if (!isComplete) {
        setIsComplete(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [visibleLines, codeLines.length, isComplete]);

  const getLineColor = (type: string) => {
    switch (type) {
      case "comment": return "text-green-400";
      case "import": return "text-purple-400"; 
      case "declaration": return "text-blue-400";
      case "constructor": return "text-cyan-400";
      case "property": return "text-yellow-400";
      case "method": return "text-pink-400";
      default: return "text-gray-300";
    }
  };

  return (
    <div className="flex flex-col items-center text-center mb-8 space-y-8">
      {/* Code Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 ml-4">IKH-TechSystems.js</span>
            </div>
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-3 h-3 bg-blue-400 rounded-full"
              />
              <span className="text-gray-400 text-sm">Building Innovation</span>
            </div>
          </div>

          {/* Code Content */}
          <div className="bg-gray-900 p-6 font-mono text-sm leading-relaxed">
            <div className="flex">
              {/* Line numbers */}
              <div className="text-gray-600 select-none mr-6 text-right" style={{ minWidth: "3rem" }}>
                {codeLines.slice(0, visibleLines).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="leading-relaxed"
                  >
                    {index + 1}
                  </motion.div>
                ))}
              </div>

              {/* Code lines */}
              <div className="flex-1">
                {codeLines.slice(0, visibleLines).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: typingLine === index ? "rgba(59, 130, 246, 0.1)" : "transparent"
                    }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      backgroundColor: { duration: 0.2 }
                    }}
                    className={`leading-relaxed px-3 py-1 rounded relative ${getLineColor(line.type)}`}
                  >
                    {line.content}
                    {/* Blinking cursor */}
                    {typingLine === index && !isComplete && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-white ml-1"
                      >
                        |
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Terminal output */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 pt-4 border-t border-gray-700"
              >
                <div className="text-green-400 mb-2">
                  ✅ Build successful! Ready to innovate.
                </div>
                <div className="flex items-center">
                  <span className="text-green-400">❯</span>
                  <span className="text-blue-400 ml-2">./IKH-TechSystems</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-white ml-2"
                  >
                    --start-innovation
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-white ml-1"
                  >
                    |
                  </motion.span>
                </div>
              </motion.div>
            )}
          </div>

          {/* VS Code style status bar */}
          <div className="bg-blue-600 px-6 py-2 text-sm text-white flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span>TypeScript React</span>
              <span>•</span>
              <span>UTF-8</span>
              <span>•</span>
              <span>Ln {visibleLines}, Col 1</span>
            </div>
            <div className="flex items-center space-x-3">
              {!isComplete ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Compiling...</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Ready</span>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Company branding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="text-center"
      >
        <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-mono">
          IKH-TechSystems
        </h1>
        <p className="text-xl text-muted-foreground mb-6 font-mono">
          {tagline}
        </p>
        
        {/* Decorative code elements */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "300px" }}
          transition={{ duration: 1.5, delay: 2 }}
          className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"
        />
      </motion.div>

      {/* Floating code symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, Math.random() * 360, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className="absolute text-2xl font-mono text-blue-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {["{ }", "< />", "( )", "[ ]", "=>", "&&", "||", "//"][i]}
          </motion.div>
        ))}
      </div>
    </div>
  );
}