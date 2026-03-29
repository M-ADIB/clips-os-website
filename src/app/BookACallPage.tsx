import React from 'react';
import { Link } from 'react-router';

export default function BookACallPage() {
  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans">
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

        <div className="mt-12 text-center pb-8">
          <p className="text-white/60 text-sm">
            Facing any issues? <a href="mailto:mail@theclips.agency?subject=Issues%20with%20ClipsOS%20Application&body=Hello%20TCA%20Team%2C%0A%0AI%20am%20having%20issues%20with%20my%20application.%20Please%20help." className="underline decoration-white/30 underline-offset-4 hover:text-white transition-colors">Email us at mail@theclips.agency</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
