import React from 'react';
import { Link } from 'react-router';

export default function BookACallPage() {
  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans">
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
            <Link to="/apply" className="bg-[#fbe9ff] text-[#080617] px-6 py-2.5 rounded-lg font-bold hover:bg-white transition-colors">
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 sm:pt-36 pb-12 sm:pb-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Book A Call
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Pick a time that works best for you. We'll walk you through everything.
          </p>
        </div>

        {/* Calendly embed */}
        <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white">
          <iframe
            src="https://calendly.com/the-clipsagency/30min?embed_domain=localhost&embed_type=Inline"
            width="100%"
            height="700"
            frameBorder="0"
            title="Schedule a call with TheClipsAgency"
            className="w-full"
          />
        </div>
      </main>
    </div>
  );
}
