import React from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NHGDP = "'Neue Haas Grotesk Display Pro', 'NHaasGroteskDSPro-95Blk', 'Helvetica Neue', sans-serif";

export default function GlobalNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const navBgOpacity = useTransform(scrollY, [0, 100], [0.05, 0.5]);
  const navBlur = useTransform(scrollY, [0, 100], [16, 24]);

  return (
    <nav className="fixed w-full z-50 top-0 left-0">
      <div className="mx-auto max-w-[1304px] px-3 sm:px-4 mt-9">
        <motion.div
          className="h-[85px] rounded-[23px] px-5 sm:px-6 flex items-center justify-between border border-white/10"
          style={{
            backgroundColor: useTransform(navBgOpacity, (v) => `rgba(45, 42, 65, ${v})`),
            backdropFilter: useTransform(navBlur, (v) => `blur(${v}px) saturate(180%)`)  ,
          }}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-white">
            <span
              style={{
                fontFamily: NHGDP,
                fontWeight: 700,
                fontSize: '34.6px',
                lineHeight: '100%',
                letterSpacing: '-0.03em',
                color: '#FFFFF7',
              }}
            >
              ClipsOS
            </span>
            <div className="flex flex-col leading-none gap-[3px]">
              <span
                style={{
                  fontFamily: NHGDP,
                  fontWeight: 450,
                  fontSize: '7px',
                  lineHeight: '93%',
                  color: '#FFFFFF',
                }}
              >
                Powered by
              </span>
              <span
                style={{
                  fontFamily: "'PolySans Trial', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: '14.94px',
                  lineHeight: '15px',
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                }}
              >
                TheClipsAgency
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://app.theclips.agency"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: NHGDP,
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
              }}
              className="hover:opacity-70 transition-opacity"
            >
              Client Login
            </a>
            <Link
              to="/submit-form"
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{
                background: '#FBE9FF',
                borderRadius: '8.89px',
                padding: '11px 17px 10px',
                height: '48px',
                minWidth: '116px',
                fontFamily: NHGDP,
                fontWeight: 600,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '-0.02em',
                color: '#080617',
                whiteSpace: 'nowrap',
              }}
            >
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
            <a
              href="https://app.theclips.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white py-3 rounded-lg text-center hover:opacity-70 transition-opacity"
              style={{ fontFamily: NHGDP, fontWeight: 400, fontSize: '16px', letterSpacing: '-0.02em' }}
            >
              Client Login
            </a>
            <Link
              to="/submit-form"
              className="flex items-center justify-center py-3 rounded-[8.89px] text-center hover:opacity-80 transition-opacity"
              style={{
                background: '#FBE9FF',
                fontFamily: NHGDP,
                fontWeight: 600,
                fontSize: '16px',
                letterSpacing: '-0.02em',
                color: '#080617',
              }}
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
