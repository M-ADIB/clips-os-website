import React from 'react';
import { Link } from 'react-router';
import { Menu, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Marquee } from "../components/ui/marquee";
import { HyperText } from "../components/ui/hyper-text";
import { PulsatingButton } from "../components/ui/pulsating-button";

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
  const numericPart = value.replace(/[^0-9.]/g, '');
  const numericValue = parseFloat(numericPart);
  const textSuffix = value.replace(/[0-9.]/g, '');
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
      {prefix}{displayValue}{textSuffix}{suffix}
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
       className="w-full aspect-square rounded-[24px] bg-black shrink-0 relative overflow-hidden border border-white/10 cursor-pointer shadow-lg group"
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
  name: string;
  title: string;
  beforeText: string;
  stats: { value: string; label: string; sublabel?: string }[];
  whatWeDid: string[];
  impact: string;
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
                <div className="flex-1 flex flex-col justify-between">
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
                    <p className="text-sm font-medium text-black/80 mb-8 max-w-md leading-relaxed">{impact}</p>
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


// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const navBgOpacity = useTransform(scrollY, [0, 100], [0.4, 0.85]);
  const navBlur = useTransform(scrollY, [0, 100], [12, 20]);

  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans selection:bg-[#fbe9ff] selection:text-[#080617] overflow-x-hidden">
      {/* ── Navigation ── */}
      <nav className="fixed w-full z-50 top-0 left-0">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 mt-3 sm:mt-4">
          <motion.div
            className="rounded-[18px] sm:rounded-[23px] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border border-white/5"
            style={{
              backgroundColor: useTransform(navBgOpacity, (v) => `rgba(45, 42, 65, ${v})`),
              backdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
            }}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link to="/" className="flex items-center gap-3">
              <span className="font-black text-[26px] tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>ClipsOS</span>
              <div className="flex flex-col">
                <span className="text-[8px] text-white/70 uppercase tracking-widest leading-none">Powered by</span>
                <span className="text-sm font-semibold italic">TheClipsAgency</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              <a href="https://app.theclips.agency" target="_blank" rel="noopener noreferrer" className="text-white/60 px-5 py-2.5 rounded-lg font-medium text-sm hover:text-white transition-colors">Client Login</a>
              <Link to="/submit-form" className="cta-shine-light px-6 py-2.5 rounded-lg font-bold">
                Book a call
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Nav - smooth slide animation */}
        <div 
          className="md:hidden overflow-hidden transition-all duration-200 ease-out"
          style={{ 
            maxHeight: isMobileMenuOpen ? '200px' : '0px',
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
        >
          <div className="px-4 mt-2">
            <div className="bg-[#1e1c2b] rounded-xl p-4 flex flex-col gap-3 border border-white/10 shadow-xl">
              <a href="https://app.theclips.agency" target="_blank" rel="noopener noreferrer" className="text-white/60 py-3 rounded-lg font-medium text-sm text-center hover:text-white transition-colors">Client Login</a>
              <Link to="/submit-form" className="cta-shine-light px-6 py-3 rounded-lg font-bold text-center">
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 sm:pt-32 pb-12 sm:pb-20">
        {/* ── Hero Section ── */}
        <section className="max-w-[1400px] mx-auto overflow-hidden text-center pt-8 sm:pt-16 md:pt-24 pb-16 sm:pb-24 md:pb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#fbe9ff]/5 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/15 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[13px] font-medium text-white/80 tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>Trusted by 150+ experts</span>
          </motion.div>

          <motion.h1
            className="uppercase relative z-10 text-center mb-6 sm:mb-8 px-4"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 62px)',
              lineHeight: '87%',
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span style={{ filter: 'blur(0px)' }}>Turn One Filming</span><br />
            <span style={{ filter: 'blur(0.3px)' }}>Session Into Months Of</span><br />
            <span style={{ filter: 'blur(0.6px)' }}>Authority Content</span>
          </motion.h1>

          <motion.p
            className="max-w-2xl mx-auto mb-10 relative z-10 px-4 text-center"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '112%',
              color: 'rgba(255,255,247,0.8)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            ClipsOS captures your expertise and transforms it into strategic content designed to generate visibility, trust, and inbound demand.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link to="/submit-form" className="w-full sm:w-auto relative group">
              <span className="absolute inset-0 rounded-xl bg-[#fbe9ff] blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              <span className="relative block cta-shine-light px-8 py-3.5 rounded-xl font-bold">
                Apply for ClipsOS™
              </span>
            </Link>
            <a href="#case-studies" className="w-full sm:w-auto border border-white/30 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors">
              See client results
            </a>
          </motion.div>

          {/* Ticker Carousel */}
          <motion.div 
            className="mt-16 sm:mt-24 w-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}
          >
            <Marquee className="[--duration:50s] [--gap:0.5rem]" pauseOnHover>
              {[
                '11_3_optimized', 'Amazon_Riddles_optimized', 'Dr Medhat.01 ', 'Good 4', 
                'Image Showcase 1', 'Ninad_HG_240p', 'OM_HG_240p', 'Pointers 1', 
                'Pointers 2', 'Tina_HG_240p', 'hager 1', 'intense warm', 
                'softwarm', 'v1_optimized'
              ].map((name, i) => (
                <div key={i} className="w-[120px] sm:w-[160px] md:w-[200px] aspect-[9/16] rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-white/5 mx-1" style={{ willChange: 'transform', transform: 'translateZ(0)', contain: 'layout paint' }}>
                  <video src={`/assets/ticker-vids/${name}.mp4`} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                </div>
              ))}
            </Marquee>
          </motion.div>
        </section>

        {/* ── Built For Experts Section ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <FadeInOnScroll className="text-center mb-12 sm:mb-16 md:mb-24">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <span className="text-sm">The Standard We Hold</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight">Built For Experts Who Refuse To Settle.</h2>
            <p className="text-xl text-white/70">We take your expertise and make it undeniable.</p>
          </FadeInOnScroll>

          <div className="flex flex-col gap-6 md:gap-4 max-w-5xl mx-auto">
            {/* Row 1 */}
            <StaggerItem>
              <div className="flex flex-col md:flex-row gap-4 items-stretch h-auto md:h-[450px]">
                <div className="w-full md:w-1/2 h-[350px] md:h-full rounded-[24px] overflow-hidden relative">
                  <img src="/assets/branded-presence.png" alt="Branded Presence" className="w-full h-full object-cover bg-black/10" />
                </div>
                <div className="w-full md:w-1/2 bg-[#fbe9ff] rounded-[24px] p-8 sm:p-12 flex flex-col justify-end relative text-[#080617] overflow-hidden min-h-[300px] md:min-h-0 md:h-full">
                   <div className="absolute top-8 left-8 w-12 h-12 bg-[#F1CDF9] rounded-full flex items-center justify-center shadow-sm">
                     <div className="w-4 h-4 bg-white rounded-full" />
                   </div>
                   <h3 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight mt-12 md:mt-0">Branded Presence</h3>
                   <p className="text-base sm:text-lg font-medium opacity-80 leading-relaxed max-w-sm">
                     Elevate your positioning with a unique visual system and attract premium clients you actually want.
                   </p>
                </div>
              </div>
            </StaggerItem>

            {/* Row 2 */}
            <StaggerItem>
              <div className="w-full bg-[#fbe9ff] rounded-[24px] p-8 sm:p-12 flex flex-col md:flex-row items-stretch gap-8 relative text-[#080617] overflow-hidden h-auto md:h-[350px]">
                <div className="w-full md:w-1/2 flex flex-col justify-between h-full min-h-[250px] md:min-h-0">
                   <div className="w-12 h-12 bg-[#F1CDF9] rounded-full flex items-center justify-center shadow-sm">
                     <div className="w-4 h-4 bg-white rounded-full" />
                   </div>
                   <div className="mt-8 md:mt-auto">
                     <h3 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight">Content Sprints</h3>
                     <p className="text-base sm:text-lg font-medium opacity-80 leading-relaxed max-w-sm">
                       One productive session turns into months of high quality content helping you save time & energy.
                     </p>
                   </div>
                </div>
                {/* 16:9 Placeholder container where user can put a GIF eventually */}
                <div className="w-full md:w-1/2 aspect-[16/9] md:aspect-auto md:h-full bg-[#E7C1EF] rounded-[20px] overflow-hidden">
                </div>
              </div>
            </StaggerItem>

            {/* Row 3 - Demand Generation */}
            <StaggerItem>
              <div className="flex flex-col md:flex-row gap-4 items-stretch w-full h-auto md:h-[450px]">
                <div className="w-full md:w-[31.7%] h-[400px] md:h-full rounded-[24px] overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <img src="/assets/image-of-theperson.png" alt="Demand Generation" className="w-full h-full object-cover bg-black/10" />
                  {/* Subtle inner shadow for premium feel */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[24px] pointer-events-none" />
                </div>
                <div className="w-full md:w-[68.3%] bg-[#fbe9ff] rounded-[24px] p-8 sm:p-12 md:p-12 lg:p-16 flex flex-col justify-end relative text-[#080617] overflow-hidden mt-0 min-h-[300px] md:min-h-0 md:h-full">
                   <div className="absolute top-8 left-8 md:top-12 md:left-12 w-12 h-12 bg-[#F1CDF9] rounded-full flex items-center justify-center shadow-sm">
                     <div className="w-4 h-4 bg-white rounded-full" />
                   </div>
                   <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight mt-16 sm:mt-0">Demand Generation</h3>
                   <p className="text-base sm:text-lg md:text-xl font-medium opacity-80 leading-relaxed max-w-md">
                     Conversion-focused strategy designed to get you attention, leads, and conversations that close.
                   </p>
                </div>
              </div>
            </StaggerItem>
          </div>

          <FadeInOnScroll className="mt-16 sm:mt-24 flex justify-center relative z-20">
            <Link to="/submit-form" className="w-full sm:w-auto relative group">
              <span className="absolute inset-0 rounded-xl bg-[#fbe9ff] blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              <span className="relative block cta-shine-light px-10 py-4 rounded-xl font-bold text-lg text-center">
                Build your Authority Engine
              </span>
            </Link>
          </FadeInOnScroll>
        </section>

        {/* ── How The System Runs ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <FadeInOnScroll className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#fbe9ff]/30 text-[#fbe9ff] mb-6">
              <span className="text-sm">The System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">How The System Runs</h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto">
              A repeatable system designed to capture expertise, produce content, and generate demand.
            </p>
          </FadeInOnScroll>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Strategy", desc: "Positioning, content angles, and authority series designed to generate attention, trust, and inbound demand." },
              { step: "02", title: "Capture", desc: "Structured filming sessions that transform expertise into 20-30 authority clips in a single session." },
              { step: "03", title: "Placement", desc: "Dedicated editing and publishing workflows that structure, refine, and distribute content consistently." },
              { step: "04", title: "System Oversight", desc: "Quality control, brand alignment, and performance insights that continuously improve the authority engine." }
            ].map((item, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  className="bg-[#1e1c2b] rounded-2xl overflow-hidden border border-white/5 hover:border-[#fbe9ff]/20 transition-colors flex flex-col h-full"
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(251, 233, 255, 0.08)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-[#2d2a41] h-[160px] p-4 relative">
                    <motion.div
                      className="bg-[#fbe9ff] w-8 h-8 rounded text-[#101010] font-bold flex items-center justify-center text-sm absolute top-4 left-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {item.step}
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c2b] to-transparent opacity-50 pointer-events-none" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-medium mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── The Operating System ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <FadeInOnScroll className="text-center mb-12 sm:mb-20 md:mb-32">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <span className="text-sm text-white/70">The Operating System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight max-w-3xl mx-auto">
              Your Entire Content Operation In One Place
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              ClipsOS is the command layer behind everything we do. Strategy, production, distribution, and performance. All connected, all in one place, all working for you.
            </p>
          </FadeInOnScroll>

          <div className="flex flex-col gap-16 sm:gap-24 md:gap-40">
            {[
              { num: "01", title: "Collaborate With Ease", desc: "Access all content, assets, and updates in one workspace — keeping your team, editor, and strategy perfectly aligned.", img: "/assets/Collaborate with Ease.gif", reverse: false },
              { num: "02", title: "Frame-Based Review", desc: "Leave precise feedback directly on the timeline, making revisions faster, clearer, and friction-free.", img: "/assets/Dashboard from The Clips Agency.gif", reverse: true },
              { num: "03", title: "Analytics That Matter", desc: "Track the metrics that actually drive growth — views, retention, reach, and lead signals — so we know exactly what to double down on.", img: "/assets/IG Analytics from The Clips Agency.gif", reverse: false },
              { num: "04", title: "Talent Network", desc: "Leave precise feedback directly on the timeline, making revisions faster, clearer, and friction-free.", img: "/assets/Talent Network.gif", reverse: true },
            ].map((item, idx) => (
              <FadeInOnScroll key={idx}>
                <div className={`flex flex-col ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 sm:gap-10 md:gap-20`}>
                  <motion.div
                    className="w-full md:w-3/5 rounded-[20px] sm:rounded-[32px] overflow-hidden bg-[#2d2a41] border border-white/10 aspect-[16/9] shadow-2xl relative group"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </motion.div>
                  <div className={`w-full md:w-2/5 flex flex-col gap-4 ${item.reverse ? 'md:items-end md:text-right' : ''}`}>
                    <span className="text-[#fbe9ff] font-medium text-lg mb-2">{item.num}</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">{item.title}</h3>
                    <p className="text-white/70 text-lg leading-relaxed mt-2">{item.desc}</p>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>

          <FadeInOnScroll className="mt-16 sm:mt-24 md:mt-32 flex justify-center relative z-20">
            <Link to="/submit-form" className="w-full sm:w-auto relative group">
              <span className="absolute inset-0 rounded-xl bg-[#fbe9ff] blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              <span className="relative block cta-shine-light px-10 py-4 rounded-xl font-bold text-lg text-center">
                Book a Walkthrough
              </span>
            </Link>
          </FadeInOnScroll>
        </section>

        {/* ── Case Studies ── */}
        <section id="case-studies" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <FadeInOnScroll className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <span className="text-sm text-white/70">Client Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">Case Studies</h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto">
              Multiple industries. One system. Proven results.
            </p>
          </FadeInOnScroll>

          <StaggerContainer className="flex flex-col gap-6 sm:gap-8 md:gap-12">
            <StaggerItem>
              <CaseStudyCard
                name="Leena Parwani"
                title="Rheumatologist & Internist"
                beforeText="She worked with us before when she was selling life insurance then came back when she started real estate."
                stats={[
                  { value: "300k", label: "Views" },
                  { value: "$270k", label: "", sublabel: "Sold a AED 25,000,000 property and cashed in 1M in commissions in the first 2 months" },
                ]}
                whatWeDid={["Targeted her audience", "Created engaging content"]}
                impact="Becoming a top agent in her niche and generating consistent inbound leads from organic content"
                thumbnails={[]}
              />
            </StaggerItem>

            <StaggerItem>
              <CaseStudyCard
                name="Khaled Zkandar"
                title="Architect & Ai Specialist"
                beforeText="No proper positioning, No clear monetization, No Authority"
                stats={[
                  { value: "15k", label: "New Followers", sublabel: "After 1 studio session" },
                  { value: "500k+", label: "Views" },
                  { value: "$25K", label: "", sublabel: "in cash collected in 2 months" },
                ]}
                whatWeDid={["Created Niche tutorial videos", "High converting ads + content"]}
                impact="Attracted the most established award-winning studios in the world to enquire his services."
                thumbnails={[
                  "/assets/kz-before-1.png", "/assets/kz-before-2.png", "/assets/kz-before-3.png",
                  "/assets/kz-after-1.png", "/assets/kz-after-2.png", "/assets/kz-after-3.png"
                ]}
                defaultExpanded={true}
              />
            </StaggerItem>

            <StaggerItem>
              <CaseStudyCard
                name="Dr. Sara Alhammdi"
                title="Cosmetic Dentist"
                beforeText="Dr. Sara used to create generic content that nobody cared about and didn't show her personality at all."
                stats={[
                  { value: "150k", label: "Followers" },
                  { value: "2.5M+", label: "Views" },
                  { value: "10+", label: "", sublabel: "New patients monthly from IG" },
                ]}
                whatWeDid={["Rebranded her presence", "Educational & Entertaining"]}
                impact="Positioned her as an authority in Cosmetic Dentistry in Dubai and completely filled her schedule."
                thumbnails={[]}
              />
            </StaggerItem>
          </StaggerContainer>

          <FadeInOnScroll className="mt-16 sm:mt-24 flex justify-center relative z-20">
            <Link to="/submit-form" className="w-full sm:w-auto relative group">
              <span className="absolute inset-0 rounded-xl bg-[#fbe9ff] blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              <span className="relative block cta-shine-light px-10 py-4 rounded-xl font-bold text-lg text-center">
                Apply to become our next Case Study
              </span>
            </Link>
          </FadeInOnScroll>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-12 sm:py-20 md:py-32 w-full overflow-hidden border-y border-white/5 relative bg-[#080617]">
          <FadeInOnScroll className="text-center mb-12 sm:mb-16 md:mb-20 max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <span className="text-sm text-white/70">Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">Hear From Our Clients</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Don't just take our word for it. Hear directly from the experts who've transformed their market positioning with us.
            </p>
          </FadeInOnScroll>

          {/* Arrow-navigated Carousel */}
          {(() => {
            const testimonials = [
              { name: "Medhat", role: "Entrepreneur", videoId: "1144122013" },
              { name: "Diana", role: "Founder", videoId: "1144121636" },
              { name: "Mira Daher", role: "CEO", videoId: "1144121766" },
              { name: "Hager", role: "Creator", videoId: "1144121241" },
              { name: "Jihad", role: "Expert", videoId: "1144121096" },
              { name: "Vennre", role: "Founder", videoId: "1144121387" },
              { name: "Leo", role: "Consultant", videoId: "1144122134" },
              { name: "Reem", role: "Coach", videoId: "1144121444" },
              { name: "Suzan", role: "Creator", videoId: "1144122103" },
              { name: "Steve", role: "Founder", videoId: "1144122058" },
              { name: "Pavel", role: "Consultant", videoId: "1144121872" },
              { name: "Hala", role: "Chef", videoId: "1144121290" },
              { name: "Sara", role: "Dentist", videoId: "1144121493" },
              { name: "Ahmed", role: "Creator", videoId: "1144120878" }
            ];

            const [currentIndex, setCurrentIndex] = React.useState(0);
            const [visibleCount, setVisibleCount] = React.useState(1);
            const GAP = 16; // gap between cards in px

            React.useEffect(() => {
              const update = () => {
                const w = window.innerWidth;
                setVisibleCount(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
              };
              update();
              window.addEventListener('resize', update);
              return () => window.removeEventListener('resize', update);
            }, []);

            const maxIndex = Math.max(0, testimonials.length - visibleCount);
            // Clamp currentIndex if screen resizes
            const safeIndex = Math.min(currentIndex, maxIndex);
            
            // Each card width as a percentage, accounting for gaps
            const cardWidthPercent = 100 / visibleCount;
            // Translate includes the gaps
            const translateX = safeIndex * (cardWidthPercent);

            return (
              <div className="relative max-w-5xl mx-auto px-12 sm:px-16">
                {/* Left arrow */}
                <button 
                  onClick={() => setCurrentIndex(Math.max(0, safeIndex - 1))}
                  disabled={safeIndex === 0}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed border border-white/20"
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
                
                {/* Right arrow */}
                <button 
                  onClick={() => setCurrentIndex(Math.min(maxIndex, safeIndex + 1))}
                  disabled={safeIndex >= maxIndex}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed border border-white/20"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>

                {/* Cards viewport */}
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{ 
                      gap: `${GAP}px`,
                      transform: `translateX(calc(-${translateX}% - ${safeIndex * GAP}px))` 
                    }}
                  >
                    {testimonials.map((testimonial, i) => (
                      <div 
                        key={i} 
                        className="shrink-0"
                        style={{ width: `calc(${cardWidthPercent}% - ${((visibleCount - 1) * GAP) / visibleCount}px)` }}
                      >
                        <TestimonialCard 
                          {...testimonial}
                          isActive={i >= safeIndex && i < safeIndex + visibleCount}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-1.5 mt-8">
                  {Array.from({ length: maxIndex + 1 }, (_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${i === safeIndex ? 'bg-[#fbe9ff] w-6' : 'bg-white/30 hover:bg-white/50 w-2'}`}
                    />
                  ))}
                </div>
              </div>
            );
          })()}
        </section>

        {/* ── Final CTA ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <FadeInOnScroll>
            <div className="bg-[#fbe9ff] rounded-[24px] sm:rounded-[40px] p-10 sm:p-16 md:p-24 text-center relative overflow-hidden group shadow-[0_0_80px_rgba(251,233,255,0.05)] border border-[#fbe9ff]/20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-[#080617] mb-4 sm:mb-6 tracking-tight relative z-10 leading-[1] md:leading-[1.1]">
                Your Content Should Be <br /> Closing Deals While You Sleep.
              </h2>
              
              <p className="text-[#080617]/80 text-sm sm:text-base max-w-[600px] mx-auto mb-10 relative z-10 font-medium tracking-tight">
                You've built real expertise. You just need a system that shows it to the <br className="hidden sm:block" /> right people, and turns their attention into revenue.
              </p>
              
              <div className="flex justify-center relative z-20">
                <Link
                  to="/submit-form"
                  className="cta-shine text-white px-10 py-4 rounded-full font-bold text-[15px] inline-block relative group"
                >
                  {/* Top highlight sheen */}
                  <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    <span className="absolute top-0 left-[10%] right-[10%] h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-full" />
                  </span>
                  Apply For Clips OS™
                </Link>
              </div>
            </div>
          </FadeInOnScroll>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-white text-[#080617] py-12 sm:py-20 mt-12 sm:mt-20 relative border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-20">
            <div className="flex-1">
               <div className="mb-4 inline-block">
                 <h2 className="text-3xl font-black tracking-tight italic">TheClipsAgency</h2>
               </div>
              <p className="text-[#080617]/70 max-w-sm mb-8 leading-relaxed font-medium">Designed to capture your expertise and transform it into strategic content that scales.</p>
              <div className="flex gap-4">
                {/* Instagram */}
                <a href="https://www.instagram.com/theclips.agency/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black/5 border border-black/10 flex items-center justify-center hover:bg-black/10 hover:scale-110 transition-all cursor-pointer">
                  <svg className="w-5 h-5 text-[#080617]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.359 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.757 6.162 6.162 6.162 3.405 0 6.162-2.757 6.162-6.162 0-3.402-2.757-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/the-clips-agency" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black/5 border border-black/10 flex items-center justify-center hover:bg-black/10 hover:scale-110 transition-all cursor-pointer">
                  <svg className="w-5 h-5 text-[#080617]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="flex-[1.5] grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
              <div>
                <h4 className="font-bold mb-6 text-[#080617] uppercase text-sm tracking-wider">Services</h4>
                <ul className="space-y-4">
                  <li><Link to="/" className="text-[#080617]/70 hover:text-[#080617] transition-colors text-sm font-medium">Home</Link></li>
                  <li><Link to="/submit-form" className="text-[#080617]/70 hover:text-[#080617] transition-colors text-sm font-medium">Process &amp; Pricing</Link></li>
                  <li><a href="https://app.theclips.agency/careers" target="_blank" rel="noopener noreferrer" className="text-[#080617]/70 hover:text-[#080617] transition-colors text-sm font-medium">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-[#080617] uppercase text-sm tracking-wider">Resources</h4>
                <ul className="space-y-4">
                  <li><a href="https://app.theclips.agency" target="_blank" rel="noopener noreferrer" className="text-[#080617]/70 hover:text-[#080617] transition-colors text-sm font-medium">Platform</a></li>
                  <li><a href="#" className="text-[#080617]/70 hover:text-[#080617] transition-colors text-sm font-medium">Help Center</a></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-bold mb-6 text-[#080617] uppercase text-sm tracking-wider">Legal</h4>
                <ul className="space-y-4">
                  <li><Link to="/privacy" className="text-[#080617]/70 hover:text-[#080617] transition-colors text-sm font-medium">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-[#080617]/70 hover:text-[#080617] transition-colors text-sm font-medium">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 sm:mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-[#080617]/50 text-sm font-medium">© {new Date().getFullYear()} TheClipsAgency. All rights reserved.</p>
            <div className="flex items-center gap-2 text-[#080617]/50 text-sm font-medium">
              Made with <span className="text-[#fbe9ff]">❤</span> in Dubai
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
