import React from 'react';
import { Link } from 'react-router';

const sections = [
  {
    title: '1. Agreement to Terms',
    content: 'By accessing or using the services provided by The Clips Agency ("we," "us," or "our"), including our website and client platform (ClipsOS), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.',
  },
  {
    title: '2. Services',
    content: 'The Clips Agency provides premium short-form video content creation, social media management, and related digital marketing services. The specific scope of services will be outlined in individual client agreements.',
  },
  {
    title: '3. Client Accounts',
    content: 'To access our client portal, you may be required to create an account. You are responsible for:',
    list: [
      'Maintaining the confidentiality of your account credentials',
      'All activities that occur under your account',
      'Notifying us immediately of any unauthorized access',
    ],
  },
  {
    title: '4. Intellectual Property',
    content: '',
    list: [
      'Our Content: All content on our website, including text, graphics, logos, and software, is the property of The Clips Agency and is protected by intellectual property laws.',
      'Client Content: You retain ownership of any content you provide to us. By submitting content, you grant us a license to use it solely for the purpose of delivering our services to you.',
      'Deliverables: Ownership of final deliverables will be governed by the terms of your individual client agreement.',
    ],
  },
  {
    title: '5. Acceptable Use',
    content: 'You agree not to:',
    list: [
      'Use our services for any unlawful purpose',
      'Attempt to gain unauthorized access to our systems',
      'Interfere with or disrupt the operation of our platform',
      'Share your account credentials with unauthorized third parties',
      'Upload content that is harmful, offensive, or infringes on others\' rights',
    ],
  },
  {
    title: '6. Payment Terms',
    content: 'Payment terms, pricing, and billing schedules are outlined in your individual client agreement. Late payments may result in suspension of services. All fees are non-refundable unless otherwise specified in your agreement.',
  },
  {
    title: '7. Confidentiality',
    content: 'Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the engagement. This includes but is not limited to business strategies, content plans, and platform credentials.',
  },
  {
    title: '8. Limitation of Liability',
    content: 'To the maximum extent permitted by law, The Clips Agency shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities arising from the use of our services.',
  },
  {
    title: '9. Termination',
    content: 'Either party may terminate the service relationship as outlined in the individual client agreement. Upon termination:',
    list: [
      'Access to the client portal may be revoked',
      'Outstanding payments remain due',
      'Confidentiality obligations survive termination',
    ],
  },
  {
    title: '10. Governing Law',
    content: 'These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates (UAE). Any disputes shall be resolved in the courts of Dubai, UAE.',
  },
  {
    title: '11. Changes to Terms',
    content: 'We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use of our services constitutes acceptance of the revised terms.',
  },
  {
    title: '12. Contact Us',
    content: 'If you have questions about these Terms of Service, please contact us at: mail@theclips.agency',
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans">
      {/* Nav */}
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
              <Link to="/apply" className="bg-[#fbe9ff] text-[#080617] px-5 md:px-6 py-2 md:py-2.5 rounded-lg text-sm md:text-base font-bold hover:bg-white transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="text-sm text-white/70">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">Terms of Service</h1>
          <p className="text-white/40 text-sm">Last updated: February 15, 2026</p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title} className="border-t border-white/5 pt-8">
              <h2 className="text-lg font-black mb-3 tracking-tight">{s.title}</h2>
              {s.content && <p className="text-white/70 leading-relaxed mb-3">{s.content}</p>}
              {s.list && (
                <ul className="space-y-2 mt-3">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-white/70 leading-relaxed">
                      <span className="text-[#fbe9ff] mt-1 shrink-0">–</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <Link to="/" className="text-[#fbe9ff] font-bold hover:text-white transition-colors text-sm">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
