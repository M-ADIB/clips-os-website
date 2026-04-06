import React from 'react';
import { Link } from 'react-router';

export default function BookACallEuPage() {
  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans">

      <main className="pt-28 sm:pt-36 pb-12 sm:pb-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Book A Call — Europe
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Pick a time that works best for you. We'll walk you through everything.
          </p>
        </div>

        {/* Calendly booking embed */}
        <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white">
          <iframe
            src="https://calendly.com/j-hamdan/45min-discovery-call"
            width="100%"
            height="700"
            frameBorder="0"
            title="Schedule a call — Europe"
            className="w-full"
          />
        </div>

        <div className="mt-12 text-center pb-8 flex flex-col gap-4">
          <p className="text-[#fbe9ff] text-base font-medium">
            If you didn't find a good time, please contact us on WhatsApp to arrange a good time that works for you as soon as possible:<br/>
            <a href="https://wa.me/4917632566074" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 font-bold text-lg underline decoration-white/30 underline-offset-4 hover:text-white transition-colors">
              +49 176 325 66074
            </a>
          </p>
          <p className="text-white/60 text-sm mt-4">
            Facing any issues? <a href="mailto:mail@theclips.agency?subject=Issues%20with%20ClipsOS%20Application&body=Hello%20TCA%20Team%2C%0A%0AI%20am%20having%20issues%20with%20my%20application.%20Please%20help." className="underline decoration-white/30 underline-offset-4 hover:text-white transition-colors">Email us at mail@theclips.agency</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
