"use client";

import { motion, useMotionValue, useSpring, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, FormEvent } from "react";
import { Send, X, MessageSquare, Loader2 } from "lucide-react";

export default function AssistantRobot() {
  const [isClient, setIsClient] = useState(false);
  const robotRef = useRef<HTMLDivElement>(null);
  
  const [isAFK, setIsAFK] = useState(false);
  const [idleAction, setIdleAction] = useState(0); 

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hi! I'm Rahima's AI assistant. How can I help you learn more about her work?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for position quadrant
  const { scrollYProgress } = useScroll();
  const [quadrant, setQuadrant] = useState("br"); // br, tr, bl

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) setQuadrant("br");
      else if (latest < 0.75) setQuadrant("tr");
      else setQuadrant("bl");
    });
  }, [scrollYProgress]);

  // Raw mouse pos
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  
  // Head tracking springs
  const headX = useSpring(0, springConfig);
  const headY = useSpring(0, springConfig);
  
  // Visor 3D tracking springs
  const visorRotateX = useSpring(0, { damping: 25, stiffness: 200 });
  const visorRotateY = useSpring(0, { damping: 25, stiffness: 200 });
  
  // Hand tracking (left hand points)
  const leftHandRotation = useSpring(180, springConfig);
  const leftHandX = useSpring(0, springConfig);
  const leftHandY = useSpring(0, springConfig);

  // Eye tracking springs
  const eyeX = useSpring(0, { damping: 15, stiffness: 150 });
  const eyeY = useSpring(0, { damping: 15, stiffness: 150 });

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    setIsClient(true);
    let afkTimer: NodeJS.Timeout;
    let idleInterval: NodeJS.Timeout;

    const resetAFK = (e?: MouseEvent | KeyboardEvent | Event) => {
      setIsAFK(false);
      setIdleAction(0);
      clearTimeout(afkTimer);
      clearInterval(idleInterval);
      
      if (e && e.type === "mousemove") {
        const mouseEvent = e as MouseEvent;
        rawMouseX.set(mouseEvent.clientX);
        rawMouseY.set(mouseEvent.clientY);
      }

      afkTimer = setTimeout(() => {
        setIsAFK(true);
        idleInterval = setInterval(() => {
          setIdleAction(Math.floor(Math.random() * 3) + 1);
        }, 5000);
      }, 5000); 
    };

    window.addEventListener("mousemove", resetAFK);
    window.addEventListener("keydown", resetAFK);
    window.addEventListener("scroll", resetAFK);
    
    resetAFK();

    return () => {
      window.removeEventListener("mousemove", resetAFK);
      window.removeEventListener("keydown", resetAFK);
      window.removeEventListener("scroll", resetAFK);
      clearTimeout(afkTimer);
      clearInterval(idleInterval);
    };
  }, [rawMouseX, rawMouseY]);

  // Handle tracking when Active
  useEffect(() => {
    if (!isClient) return;

    const updateTracking = () => {
      if (isAFK || !robotRef.current) return;
      
      const rect = robotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = rawMouseX.get() - centerX;
      const deltaY = rawMouseY.get() - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      let angleDeg = angle * (180 / Math.PI);

      // Clamp left hand rotation to prevent pointing backwards into body
      if (angleDeg > -90 && angleDeg <= 0) angleDeg = -90;
      if (angleDeg > 0 && angleDeg < 90) angleDeg = 90;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Head look
      headX.set(Math.cos(angle) * Math.min(distance / 20, 10));
      headY.set(Math.sin(angle) * Math.min(distance / 20, 10));

      // Visor 3D tilt
      visorRotateX.set((deltaY / (window.innerHeight || 1000)) * -30);
      visorRotateY.set((deltaX / (window.innerWidth || 1000)) * 30);

      // Inner eye tracking
      const eyeDist = Math.min(distance / 15, 6);
      eyeX.set(Math.cos(angle) * eyeDist);
      eyeY.set(Math.sin(angle) * eyeDist);

      // Left hand pointing
      const handDist = Math.min(distance / 5, 30); 
      leftHandX.set(Math.cos(angle) * handDist);
      leftHandY.set(Math.sin(angle) * handDist);
      leftHandRotation.set(angleDeg);
    };

    const unsubscribeX = rawMouseX.on("change", updateTracking);
    const unsubscribeY = rawMouseY.on("change", updateTracking);
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [isAFK, isClient, headX, headY, rawMouseX, rawMouseY, leftHandRotation, leftHandX, leftHandY, visorRotateX, visorRotateY, eyeX, eyeY]);

  // When AFK, reset head and hands gracefully
  useEffect(() => {
    if (isAFK) {
      headX.set(0);
      headY.set(0);
      visorRotateX.set(0);
      visorRotateY.set(0);
      eyeX.set(0);
      eyeY.set(0);
      leftHandRotation.set(180); // Point left idle
      leftHandX.set(0); 
      leftHandY.set(0);
    }
  }, [isAFK, headX, headY, visorRotateX, visorRotateY, leftHandRotation, leftHandX, leftHandY, eyeX, eyeY]);

  const handleSendMessage = async (e?: FormEvent, presetMessage?: string) => {
    if (e) e.preventDefault();
    
    const messageText = presetMessage || inputValue;
    if (!messageText.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user' as const, content: messageText }];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      const data = await response.json();
      
      if (data.text) {
        setMessages([...newMessages, { role: 'assistant', content: data.text }]);
      } else {
        throw new Error('No response text');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  // Variants for robot states
  const robotVariants = {
    active: { rotate: 0, y: [-5, 5, -5], transition: { y: { repeat: Infinity, duration: 4, ease: "easeInOut" } } },
    idle1: { y: [-5, 5, -5], transition: { y: { repeat: Infinity, duration: 4, ease: "easeInOut" } } },
    idle2: { rotate: 360, transition: { duration: 1 } },
    idle3: { y: 10, transition: { duration: 1 } }
  };

  const leftHandVariants = {
    active: { y: [0, -8, 0], transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } },
    idle1: { y: [-20, 0, -20], transition: { repeat: Infinity, duration: 0.5, delay: 0.2 } },
    idle2: { y: 0 },
    idle3: { y: 20 }
  };

  const rightHandVariants = {
    active: { y: [0, 8, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
    idle1: { y: [-20, 0, -20], transition: { repeat: Infinity, duration: 0.5 } },
    idle2: { y: 0 },
    idle3: { y: 20 }
  };

  let currentState = "active";
  if (isAFK) {
    if (idleAction === 1) currentState = "idle1";
    else if (idleAction === 2) currentState = "idle2";
    else if (idleAction === 3) currentState = "idle3";
    else currentState = "idle1";
  }

  const placementClass = 
    quadrant === "br" ? "bottom-8 right-8" :
    quadrant === "tr" ? "top-24 right-8" :
    "bottom-8 left-8";

  const chatPlacementClass = 
    quadrant === "br" ? "bottom-36 right-0 origin-bottom-right" :
    quadrant === "tr" ? "top-36 right-0 origin-top-right" :
    "bottom-36 left-0 origin-bottom-left";

  const tooltipPlacementClass = 
    quadrant.endsWith("r") ? "right-0" : "left-0";

  const starterPrompts = [
    "What are her research areas?",
    "List her publications",
    "What is her background?"
  ];

  return (
    <div className={`fixed ${placementClass} z-[100] pointer-events-none flex flex-col items-end`}>
      
      {/* Chat Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: quadrant.startsWith("t") ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: quadrant.startsWith("t") ? -20 : 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`absolute ${chatPlacementClass} mb-4 bg-zinc-950/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.15)] overflow-hidden pointer-events-auto flex flex-col w-[calc(100vw-2rem)] sm:w-96 max-w-sm`}
            style={{ maxHeight: '60vh', minHeight: '400px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-zinc-900 to-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <span className="text-sm font-medium text-white tracking-wide">AI Assistant</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsChatOpen(false); }}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm break-words whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500/20 border border-cyan-500/30 text-white rounded-br-none' 
                      : 'bg-zinc-800/50 border border-white/5 text-zinc-300 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800/50 border border-white/5 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1">
                    <motion.div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Starter Prompts */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {starterPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(undefined, prompt)}
                    className="text-xs text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-full px-3 py-1.5 transition-colors text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/20">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Rahima..."
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-full pl-4 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-1.5 p-1.5 bg-cyan-500 text-white rounded-full hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-cyan-500 transition-colors"
                >
                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Wrapper */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        className="relative w-32 h-32"
      >
        <motion.div
          ref={robotRef}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="relative w-full h-full flex items-center justify-center pointer-events-auto cursor-pointer group"
          variants={robotVariants}
          animate={currentState}
        >
          {/* Tooltip hint when closed */}
          {!isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute -top-12 ${tooltipPlacementClass} bg-black/80 backdrop-blur-md text-cyan-300 text-xs px-3 py-1.5 rounded-full border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-[0_0_10px_rgba(34,211,238,0.2)]`}
              style={{ maxWidth: 'calc(100vw - 32px)', wordBreak: 'break-word' }}
            >
              <MessageSquare size={12} className="flex-shrink-0" />
              <span className="truncate">Chat with me</span>
            </motion.div>
          )}

          {/* Left Hand (Pointer) */}
          <motion.div
            className="absolute top-1/2 left-0 z-20 flex items-center origin-left"
            style={{ 
              rotate: leftHandRotation, 
              x: leftHandX,
              y: leftHandY 
            }}
          >
              <motion.div
                className="w-5 h-4 bg-[#18181b] border-2 border-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] flex items-center justify-end pr-0.5"
                variants={leftHandVariants}
                animate={currentState}
              >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_5px_#22d3ee]" />
              </motion.div>
          </motion.div>

          {/* Right Hand (Static/Floating) */}
          <div className="absolute top-1/2 right-0 z-20 flex items-center justify-center origin-left" style={{ transform: "translateX(12px)" }}>
            <motion.div
              className="w-4 h-6 bg-[#18181b] border-2 border-cyan-400 rounded-lg shadow-[0_0_10px_rgba(34,211,238,0.5)]"
              variants={rightHandVariants}
              animate={currentState}
            />
          </div>

          {/* Head/Body */}
          <motion.div
            className={`relative z-10 w-24 h-24 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-zinc-500/30 via-zinc-900/90 to-black rounded-[2rem] border transition-colors duration-300 ${isChatOpen ? 'border-cyan-400/50 shadow-[0_15px_35px_rgba(34,211,238,0.4)]' : 'border-white/10 shadow-[0_15px_35px_rgba(34,211,238,0.25)]'} flex flex-col items-center overflow-hidden`}
            style={{ x: headX, y: headY }}
          >
            {/* Top glass reflection highlight arc */}
            <div className="absolute top-0 left-[10%] right-[10%] h-[30%] bg-gradient-to-b from-white/20 to-transparent rounded-t-[2rem] pointer-events-none" />

            {/* Antenna */}
            <div className="absolute -top-1 w-2 h-4 bg-[#3f3f46] rounded-t-sm" />
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] ${isChatOpen ? 'animate-none' : 'animate-pulse'}`} />

            {/* Screen Face with 3D Depth */}
            <motion.div 
              className="mt-5 w-16 h-12 bg-black rounded-xl border border-[#27272a] flex items-center justify-center relative overflow-hidden shadow-inner"
              style={{ rotateX: visorRotateX, rotateY: visorRotateY, transformStyle: "preserve-3d" }}
            >
              {/* Gloss reflection inside visor */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
              
              {/* Eyes */}
              {isAFK && idleAction === 3 && !isChatOpen ? (
                 // Sleeping eyes
                 <div className="flex gap-3 translate-z-4" style={{ transform: "translateZ(8px)" }}>
                   <div className="w-4 h-1 bg-cyan-400/50 rounded-full" />
                   <div className="w-4 h-1 bg-cyan-400/50 rounded-full" />
                   <div className="absolute -top-1 right-2 text-cyan-400 text-xs font-mono animate-bounce">z</div>
                 </div>
              ) : (
                // Active eyes
                <motion.div className="flex gap-2" style={{ transform: "translateZ(12px)", x: eyeX, y: eyeY }}>
                  <motion.div 
                    className={`w-3 h-5 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] ${isChatOpen ? 'h-6' : ''}`}
                    animate={{ scaleY: isChatOpen ? 1 : [1, 0.1, 1] }}
                    transition={{ repeat: isChatOpen ? 0 : Infinity, duration: 4, times: [0, 0.95, 1], ease: "linear" }}
                  />
                  <motion.div 
                    className={`w-3 h-5 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] ${isChatOpen ? 'h-6' : ''}`}
                    animate={{ scaleY: isChatOpen ? 1 : [1, 0.1, 1] }}
                    transition={{ repeat: isChatOpen ? 0 : Infinity, duration: 4, times: [0, 0.95, 1], ease: "linear", delay: 0.1 }}
                  />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

