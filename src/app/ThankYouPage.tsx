import React from 'react';
import { Link } from 'react-router';

export default function ThankYouPage() {
  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans flex flex-col">

      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-20">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          {/* Icon */}
          <div className="w-20 h-20 bg-[#fbe9ff] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(251,233,255,0.2)]">
            <svg className="w-10 h-10 text-[#080617]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="text-sm text-white/70">Your Call Is Confirmed</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">
            We'll see you<br />
            <span className="text-[#fbe9ff]">on the call.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-md mx-auto leading-relaxed">
            Your spot is locked in. Check your email for the calendar invite with all the details.
          </p>
        </div>

        {/* What To Expect Steps */}
        <div className="w-full max-w-4xl mx-auto px-4">
          <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-12 font-medium">What happens next</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {[
              {
                num: '1',
                title: 'Check Your Email',
                desc: "You'll receive a calendar invite with the call link and all the details. Add it to your calendar now.",
              },
              {
                num: '2',
                title: 'Show Up Sharp',
                desc: 'Be on time — our team will be ready for you. If anything changes, please let us know in advance so we can adjust.',
              },
              {
                num: '3',
                title: 'Join the Call',
                desc: "We'll map out your content strategy, show you exactly how ClipsOS works, and outline next steps.",
              },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#2d2a41] border border-[#fbe9ff]/20 flex items-center justify-center text-[#fbe9ff] font-black text-lg mb-5 shadow-[0_0_20px_rgba(251,233,255,0.08)]">
                  {step.num}
                </div>
                <h3 className="text-xl font-black mb-3 tracking-tight">{step.title}</h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-[260px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency reminder */}
        <div className="mt-20 bg-[#1e1c2b] border border-white/5 rounded-2xl px-8 py-7 max-w-xl w-full mx-auto text-center">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-medium">A quick note</p>
          <p className="text-white/80 text-base leading-relaxed font-medium">
            If you need to reschedule, please <strong className="text-white">notify us at least 24 hours in advance</strong>. Last-minute no-shows make it harder for us to serve everyone at the highest level.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
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
