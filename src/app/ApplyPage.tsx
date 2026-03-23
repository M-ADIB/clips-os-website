import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';

export default function ApplyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject the Jotform script
    const script = document.createElement('script');
    script.src = 'https://form.jotform.com/jsform/232130561902041';
    script.type = 'text/javascript';
    script.async = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

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
            <Link to="/book-a-call" className="bg-[#fbe9ff] text-[#080617] px-6 py-2.5 rounded-lg font-bold hover:bg-white transition-colors">
              Book a Call
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 sm:pt-36 pb-12 sm:pb-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Apply For ClipsOS™
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Fill in the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Jotform embed container */}
        <div
          ref={containerRef}
          className="w-full min-h-[600px] rounded-2xl overflow-hidden"
        />
      </main>
    </div>
  );
}
