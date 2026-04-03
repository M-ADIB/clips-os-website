import React from 'react';
import { Link } from 'react-router';
import { Menu, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Marquee } from "../components/ui/marquee";
import { HyperText } from "../components/ui/hyper-text";
import { PulsatingButton } from "../components/ui/pulsating-button";

const NHGDP = '"Neue Haas Grotesk Display Pro", sans-serif';
// Placeholder for figma:asset images — replace with real image paths/URLs:
const imgRectangle1259 = '';
const imgImage956 = '';
const imgComp62Optimized1 = '';
const imgComp13Optimized1 = '';
const imgComp42Optimized1 = '';
const imgComp52Optimized1 = '';
const imgRectangle1256 = '';
const imgRectangle1255 = '';
const imgRectangle1261 = '';
const imgRectangle1265 = '';
const imgRectangle1269 = '';
const imgRectangle1273 = '';
const imgRectangle1280 = '';
const imgRectangle1281 = '';
const imgRectangle1282 = '';
const imgRectangle1283 = '';
const imgRectangle1284 = '';
const imgRectangle1285 = '';

// ─── Reusable Animation Wrappers ─────────────────────────────────────────────

function FadeInOnScroll({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: string; suffix?: string; prefix?: string }) {
  const match = value.match(/^([^0-9]*)([\d.]+)(.*)$/);
  const detectedPrefix = match ? match[1] : '';
  const numericPart = match ? match[2] : '0';
  const numericValue = parseFloat(numericPart);
  const textSuffix = match ? match[3] : '';
  const [displayValue, setDisplayValue] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(eased * numericValue));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}{detectedPrefix}{displayValue}{textSuffix}{suffix}
    </span>
  );
}

// ─── Testimonial Card ────────────────────────────────────────────────────────

function TestimonialCard({ name, role, videoId, isActive }: { name: string; role: string; videoId: string; isActive?: boolean }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  // Stop video when card is no longer active
  React.useEffect(() => {
    if (!isActive && isPlaying) {
      setIsPlaying(false);
    }
  }, [isActive]);
  
  return (
    <div 
       className="w-full aspect-[9/16] rounded-[24px] bg-black shrink-0 relative overflow-hidden border border-white/10 cursor-pointer shadow-lg group"
       onClick={() => { if (!isPlaying) setIsPlaying(true); }}
    >
       {/* Video embed — always visible */}
       <div className="absolute inset-0" style={{ zIndex: 1 }}>
         <iframe 
           ref={iframeRef}
           src={`https://player.vimeo.com/video/${videoId}?autoplay=${isPlaying ? 1 : 0}&muted=${isPlaying ? 0 : 1}&loop=1&background=${isPlaying ? 0 : 1}&controls=${isPlaying ? 1 : 0}&title=0&byline=0&portrait=0`}
           className="w-full h-[120%] -mt-[10%] scale-[1.05]" 
           frameBorder="0" 
           allow="autoplay; fullscreen" 
           allowFullScreen
           style={{ pointerEvents: isPlaying ? 'auto' : 'none' }}
         />
       </div>

       {/* Play button overlay — hidden when playing */}
       {!isPlaying && (
         <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
           <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
             <Play size={24} fill="white" className="text-white ml-1" />
           </div>
         </div>
       )}

       {/* Name badge overlay at bottom — ALWAYS visible */}
       <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent" style={{ zIndex: 2, pointerEvents: 'none' }}>
         <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-[#fbe9ff] rounded-full flex items-center justify-center shrink-0 shadow-md">
             <span className="font-bold text-[#080617] text-sm">{name.charAt(0)}</span>
           </div>
           <div>
             <h4 className="font-bold text-white text-sm leading-tight drop-shadow-md">{name}</h4>
             <p className="text-xs font-medium text-white/80 drop-shadow-md">{role}</p>
           </div>
         </div>
       </div>
    </div>
  )
}

// ─── Case Study Card (Expandable) ────────────────────────────────────────────

interface CaseStudyProps {
  name: React.ReactNode;
  title: string;
  beforeText: string;
  stats: { value: string; label: string; sublabel?: string }[];
  whatWeDid: string[];
  impact: string | string[];
  thumbnails: string[];
  defaultExpanded?: boolean;
}

function CaseStudyCard({ name, title, beforeText, stats, whatWeDid, impact, thumbnails, defaultExpanded = false }: CaseStudyProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <motion.div
      className="bg-white text-black rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 relative overflow-hidden cursor-pointer group shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-black/5"
      whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(251, 233, 255, 0.15)' }}
      transition={{ duration: 0.3 }}
      layout
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header (Always Visible) */}
      <div className="flex flex-col lg:flex-row justify-between w-full">
        {/* Left: Name & Title */}
        <div className="flex-1 mb-6 lg:mb-0">
          <h3 className="text-4xl sm:text-[50px] font-black uppercase tracking-tight leading-[0.9] mb-2" style={{ wordSpacing: '-0.1em' }}>
            {name}
          </h3>
          <p className="font-bold text-sm sm:text-base uppercase tracking-wider text-black">
            {title}
          </p>
        </div>

        {/* Right: Stats */}
        <div className="flex gap-8 sm:gap-12 items-start shrink-0">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <p className="text-4xl sm:text-[44px] font-black tracking-tight mb-1 leading-[1]">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="font-bold text-black text-xs sm:text-sm">{stat.label}</p>
              {stat.sublabel && (
                <p className="text-[11px] font-medium text-black/70 max-w-[160px] mt-1 leading-snug">{stat.sublabel}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Section */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: "24px" }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pt-8 border-t border-black/10">
              <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                {/* Left Column */}
                <div className="flex-[1.2] flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-base mb-2">Before</h4>
                    <p className="text-sm font-medium text-black/80 max-w-[280px] mb-8">{beforeText}</p>
                  </div>
                  {thumbnails.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-auto">
                      {thumbnails.slice(0, 3).filter(Boolean).map((img, i) => (
                        <div key={i} className="aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 bg-black/5 relative shadow-sm">
                          <img src={img} alt={`Before ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-[2px] bg-black/10 mx-[-16px]"></div>

                {/* Right Column */}
                <div className="flex-[1.2] flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-base mb-3">What we did</h4>
                    <ul className="space-y-3 mb-8">
                      {whatWeDid.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-4 h-4 mt-0.5 rounded-full bg-[#fbe9ff] flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" width="10" height="10" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                          </div>
                          <span className="text-sm font-medium leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-black text-base mb-2">Impact</h4>
                    {Array.isArray(impact) ? (
                      <ul className="space-y-3 mb-8">
                        {impact.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded-full bg-[#fbe9ff] flex items-center justify-center shrink-0">
                              <svg viewBox="0 0 24 24" width="10" height="10" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                            <span className="text-sm font-medium leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm font-medium text-black/80 mb-8 max-w-md leading-relaxed">{impact}</p>
                    )}
                  </div>
                  {thumbnails.length > 3 && (
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-auto">
                      {thumbnails.slice(3, 6).filter(Boolean).map((img, i) => (
                        <div key={i} className="aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 bg-black/5 relative shadow-sm">
                          <img src={img} alt={`After ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}



export default function CaseStudiesPage() {
  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans selection:bg-[#fbe9ff] selection:text-[#080617] overflow-x-hidden">
      <main className="pt-28 sm:pt-36 pb-12 sm:pb-20 max-w-7xl mx-auto">

      </main>
    </div>
  );
}
