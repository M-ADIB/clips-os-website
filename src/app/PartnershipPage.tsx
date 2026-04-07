import React from 'react';
import { PartnershipForm } from '../components/ui/partnership-form';

export default function PartnershipPage() {
  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans">
      <main className="pt-28 sm:pt-36 pb-12 sm:pb-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Apply For Partnership
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Fill in the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <PartnershipForm />

        <div className="mt-12 text-center pb-8">
          <p className="text-white/60 text-sm">
            Facing any issues? <a href="mailto:mail@theclips.agency?subject=Issues%20with%20Partnership%20Application&body=Hello%20TCA%20Team%2C%0A%0AI%20am%20having%20issues%20with%20my%20application.%20Please%20help." className="underline decoration-white/30 underline-offset-4 hover:text-white transition-colors">Email us at mail@theclips.agency</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
