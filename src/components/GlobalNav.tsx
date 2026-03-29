import React from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NHGDP = "NHaasGroteskDSPro-95Blk, 'Helvetica Neue', sans-serif";

export default function GlobalNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const navBgOpacity = useTransform(scrollY, [0, 100], [0.4, 0.85]);
  const navBlur = useTransform(scrollY, [0, 100], [12, 20]);

  return (
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
          <Link to="/" className="flex items-center gap-3 text-white">
            <span className="font-black text-[26px] tracking-tight" style={{ fontFamily: NHGDP }}>ClipsOS</span>
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

      {/* Mobile Nav */}
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
  );
}
