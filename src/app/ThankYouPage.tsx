import React from 'react';
import { Link } from 'react-router';

export default function ThankYouPage() {
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
            <a href="https://app.theclips.agency" target="_blank" rel="noopener noreferrer" className="bg-[#fbe9ff] text-[#080617] px-6 py-2.5 rounded-lg font-bold hover:bg-white transition-colors">
              Client Login
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 pt-24">
        <div className="text-center max-w-2xl mx-auto">
          {/* Icon */}
          <div className="w-20 h-20 bg-[#fbe9ff] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(251,233,255,0.2)]">
            <svg className="w-10 h-10 text-[#080617]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="text-sm text-white/70">Application Received</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">
            You're one step<br />
            <span className="text-[#fbe9ff]">closer.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-lg mx-auto mb-12 leading-relaxed">
            We've received your application and will be in touch within 24 hours. In the meantime, check out what other experts have built with ClipsOS.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-[#fbe9ff] text-[#080617] px-8 py-4 rounded-full font-bold text-[15px] hover:bg-white transition-colors"
            >
              Back to Home
            </Link>
            <a
              href="https://app.theclips.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-white/5 transition-colors"
            >
              Client Login
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
