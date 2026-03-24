import React from 'react';
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans flex flex-col">
      {/* Simple Nav */}
      <nav className="fixed w-full z-50 top-0 left-0">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 mt-3 sm:mt-4">
          <div className="bg-[rgba(45,42,65,0.4)] backdrop-blur-md rounded-[18px] sm:rounded-[23px] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border border-white/5">
            <Link to="/" className="flex items-center gap-3">
              <span className="font-bold text-xl tracking-tight">ClipsOS</span>
              <div className="flex flex-col">
                <span className="text-[8px] text-white/70 uppercase tracking-widest leading-none">Powered by</span>
                <span className="text-sm font-semibold italic">TheClipsAgency</span>
              </div>
            </Link>
            <div className="flex items-center gap-3 md:gap-4">
              <a href="https://app.theclips.agency" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex text-white/80 border border-white/20 px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-sm md:text-base font-semibold hover:bg-white/10 hover:text-white transition-colors">Client Login</a>
              <Link to="/submit-form" className="cta-shine-light px-5 md:px-6 py-2 md:py-2.5 rounded-lg text-sm md:text-base font-bold">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 pt-24">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <p className="text-[120px] sm:text-[180px] font-black leading-none text-white/5 select-none mb-0 -mb-6">
            404
          </p>

          {/* Eyebrow */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="text-sm text-white/70">Page Not Found</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">
            This page doesn't<br />
            <span className="text-[#fbe9ff]">exist.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-md mx-auto mb-12 leading-relaxed">
            Looks like you wandered off. Let's get you back to building your authority engine.
          </p>

          <Link
            to="/"
            className="inline-block bg-[#fbe9ff] text-[#080617] px-8 py-4 rounded-full font-bold text-[15px] hover:bg-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
