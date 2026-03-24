import React from 'react';
import { Link } from 'react-router';

const sections = [
  {
    title: '1. Introduction',
    content: 'The Clips Agency ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
  },
  {
    title: '2. Information We Collect',
    content: '',
    list: [
      'Personal Information: Name, email address, phone number, company name, and job title when you submit a form or create an account.',
      'Account Data: Login credentials and profile information for our client portal (ClipsOS).',
      'Usage Data: Information about how you interact with our website, including IP address, browser type, pages visited, and time spent.',
      'Cookies & Tracking: We use cookies and similar technologies to enhance your experience and gather analytics.',
      'Content Data: Videos, images, and other media you share with us for production purposes.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    content: 'We use the information we collect to:',
    list: [
      'Provide, operate, and maintain our services',
      'Communicate with you about projects, updates, and promotional offers',
      'Process and manage your account on our platform',
      'Improve our website and services based on usage patterns',
      'Comply with legal obligations',
    ],
  },
  {
    title: '4. Sharing Your Information',
    content: 'We do not sell your personal information. We may share your data with:',
    list: [
      'Service Providers: Third-party tools we use to operate our business (e.g., hosting, analytics, email).',
      'Business Partners: When necessary to deliver our services to you.',
      'Legal Requirements: When required by law or to protect our rights.',
    ],
  },
  {
    title: '5. Data Security',
    content: 'We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and access controls. However, no method of transmission over the Internet is 100% secure.',
  },
  {
    title: '6. Data Retention',
    content: 'We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.',
  },
  {
    title: '7. Your Rights',
    content: 'Depending on your location, you may have the right to:',
    list: [
      'Access, correct, or delete your personal data',
      'Withdraw consent for data processing',
      'Request a copy of your data in a portable format',
      'Object to or restrict certain processing activities',
    ],
  },
  {
    title: '8. Third-Party Links',
    content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies.",
  },
  {
    title: "9. Children's Privacy",
    content: 'Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.',
  },
  {
    title: '10. Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date.',
  },
  {
    title: '11. Contact Us',
    content: 'If you have questions about this Privacy Policy, please contact us at: mail@theclips.agency',
  },
];

export default function PrivacyPage() {
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
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">Privacy Policy</h1>
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
