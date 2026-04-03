import React from 'react';
import { Link } from 'react-router';

export default function ApplicationReceivedPage() {
  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans flex flex-col">

      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-20">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
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
            Thank you for<br />
            <span className="text-[#fbe9ff]">applying.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-md mx-auto leading-relaxed">
            We will review your application soon. If there is a fit, our team will reach out to you with next steps.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-block bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-white/10 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
