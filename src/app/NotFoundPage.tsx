import React from 'react';
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans flex flex-col">

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
