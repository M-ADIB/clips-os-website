import React from 'react';
import { Menu, X } from "lucide-react";

// NOTE: 'figma:asset/' imports are virtual modules specific to Figma Make.
// To run this project outside of Figma Make, replace them with actual image
// URLs or local image files (e.g., import img from './assets/image.png').
// You can download the original assets from your Figma file.

// Placeholder for figma:asset images — replace with real image paths/URLs:
const imgRectangle1259 = '';
const imgImage956 = '';
const imgComp62Optimized1 = '';
const imgComp13Optimized1 = '';
const imgComp42Optimized1 = '';
const imgComp52Optimized1 = '';
const imgRectangle1256 = '';
const imgRectangle1255 = '';
const imgRectangle1261 = '';
const imgRectangle1265 = '';
const imgRectangle1269 = '';
const imgRectangle1273 = '';
const imgRectangle1280 = '';
const imgRectangle1281 = '';
const imgRectangle1282 = '';
const imgRectangle1283 = '';
const imgRectangle1284 = '';
const imgRectangle1285 = '';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans selection:bg-[#fbe9ff] selection:text-[#080617] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 left-0">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 mt-3 sm:mt-4">
          <div className="bg-[rgba(45,42,65,0.4)] backdrop-blur-md rounded-[18px] sm:rounded-[23px] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-3">
              <span className="font-bold text-xl tracking-tight">ClipsOS</span>
              <div className="flex flex-col">
                <span className="text-[8px] text-white/70 uppercase tracking-widest leading-none">Powered by</span>
                <span className="text-sm font-semibold italic">TheClipsAgency</span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="font-medium hover:text-[#fbe9ff] transition-colors">Client Login</a>
              <a href="#" className="bg-[#fbe9ff] text-[#080617] px-6 py-2.5 rounded-lg font-bold hover:bg-white transition-colors">
                Book a call
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 mt-2">
            <div className="bg-[#1e1c2b] rounded-xl p-4 flex flex-col gap-4 border border-white/10 shadow-xl">
              <a href="#" className="font-medium text-center py-2 hover:bg-white/5 rounded-lg">Client Login</a>
              <a href="#" className="bg-[#fbe9ff] text-[#080617] px-6 py-3 rounded-lg font-bold text-center">
                Book a call
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-24 sm:pt-32 pb-12 sm:pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 sm:pt-16 md:pt-24 pb-16 sm:pb-24 md:pb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-[#fbe9ff]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.1] md:leading-[0.9] mb-6 sm:mb-8 relative z-10">
            Turn One Filming Session Into Months Of Authority Content
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed relative z-10">
            ClipsOS captures your expertise and transforms it into strategic content designed to generate visibility, trust, and inbound demand.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a href="#" className="w-full sm:w-auto bg-[#fbe9ff] text-[#080617] px-8 py-3.5 rounded-xl font-bold hover:bg-white transition-colors">
              Apply for ClipsOS™
            </a>
            <a href="#" className="w-full sm:w-auto border border-white/30 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors">
              See client results
            </a>
          </div>

          <div className="mt-12 sm:mt-16 inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm relative z-10">
            <span className="text-sm font-medium text-white/90">Trusted by 150+ experts</span>
          </div>
        </section>

        {/* Built For Experts Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <span className="text-sm">The Standard We Hold</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight">Built For Experts Who Refuse To Settle.</h2>
            <p className="text-xl text-white/70">We take your expertise and make it undeniable.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
            {/* Branded Presence */}
            <div className="lg:col-span-5 bg-[#fbe9ff] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 flex flex-col justify-end min-h-[300px] sm:min-h-[380px] md:min-h-[460px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#d9d9d9] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                 <img src={imgImage956} alt="Branded Presence" className="w-full h-full object-cover mix-blend-overlay" />
              </div>
              <div className="relative z-10 text-[#080617]">
                <div className="w-12 h-12 bg-[#F1CDF9] rounded-full mb-6 flex items-center justify-center shadow-sm">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight leading-none">Branded<br/>presence</h3>
                <p className="text-sm font-medium opacity-80 max-w-xs leading-relaxed">
                  Elevate your positioning with a unique visual system and attract premium clients you actually want.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Content Sprints */}
              <div className="bg-[#fbe9ff] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 flex flex-col justify-end min-h-[240px] sm:min-h-[280px] relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-1/2 h-full">
                  <img src={imgRectangle1259} alt="Content Sprints" className="w-full h-full object-cover object-left opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fbe9ff] to-transparent"></div>
                </div>
                <div className="relative z-10 text-[#080617] max-w-sm">
                  <div className="w-10 h-10 bg-[#F1CDF9] rounded-full mb-4 flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">Content Sprints</h3>
                  <p className="text-sm font-medium opacity-80 leading-relaxed">
                    One productive session turns into months of high quality content helping you save time & energy.
                  </p>
                </div>
              </div>

              {/* Demand Generation */}
              <div className="bg-[#fbe9ff] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 flex flex-col justify-end min-h-[240px] sm:min-h-[280px] relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-[200px] h-[300px]">
                  <img src={imgRectangle1255} alt="" className="w-full h-full object-cover rounded-tl-3xl opacity-50" />
                </div>
                <div className="relative z-10 text-[#080617] max-w-sm">
                  <div className="w-10 h-10 bg-[#F1CDF9] rounded-full mb-4 flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">Demand generation</h3>
                  <p className="text-sm font-medium opacity-80 leading-relaxed">
                    Conversion-focused strategy designed to get you attention, leads, and conversations that close.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How The System Runs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#fbe9ff]/30 text-[#fbe9ff] mb-6">
              <span className="text-sm">The System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">How The System Runs</h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto">
              A repeatable system designed to capture expertise, produce content, and generate demand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Strategy",
                desc: "Positioning, content angles, and authority series designed to generate attention, trust, and inbound demand.",
              },
              {
                step: "02",
                title: "Capture",
                desc: "Structured filming sessions that transform expertise into 20-30 authority clips in a single session.",
              },
              {
                step: "03",
                title: "Placement",
                desc: "Dedicated editing and publishing workflows that structure, refine, and distribute content consistently.",
              },
              {
                step: "04",
                title: "System Oversight",
                desc: "Quality control, brand alignment, and performance insights that continuously improve the authority engine.",
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#1e1c2b] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors flex flex-col h-full">
                <div className="bg-[#2d2a41] h-[160px] p-4 relative">
                  <div className="bg-[#fbe9ff] w-8 h-8 rounded text-[#101010] font-bold flex items-center justify-center text-sm absolute top-4 left-4">
                    {item.step}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c2b] to-transparent opacity-50 pointer-events-none" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-medium mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Operating System */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <div className="text-center mb-12 sm:mb-20 md:mb-32">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <span className="text-sm text-white/70">The Operating System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight max-w-3xl mx-auto">
              Your Entire Content Operation In One Place
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              ClipsOS is the command layer behind everything we do. Strategy, production, distribution, and performance. All connected, all in one place, all working for you.
            </p>
          </div>

          <div className="flex flex-col gap-16 sm:gap-24 md:gap-40">
            <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-20">
              <div className="w-full md:w-3/5 rounded-[20px] sm:rounded-[32px] overflow-hidden bg-[#2d2a41] border border-white/10 aspect-[16/9] shadow-2xl relative group">
                 <img src={imgComp42Optimized1} alt="Collaborate With Ease" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="w-full md:w-2/5 flex flex-col gap-4">
                <span className="text-[#fbe9ff] font-medium text-lg mb-2">01</span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">Collaborate With Ease</h3>
                <p className="text-white/70 text-lg leading-relaxed mt-2">
                  Access all content, assets, and updates in one workspace — keeping your team, editor, and strategy perfectly aligned.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8 sm:gap-10 md:gap-20">
              <div className="w-full md:w-3/5 rounded-[20px] sm:rounded-[32px] overflow-hidden bg-[#2d2a41] border border-white/10 aspect-[16/9] shadow-2xl relative group">
                 <img src={imgComp13Optimized1} alt="Frame-Based Review" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="w-full md:w-2/5 flex flex-col gap-4 md:items-end md:text-right">
                <span className="text-[#fbe9ff] font-medium text-lg mb-2">02</span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">Frame-Based Review</h3>
                <p className="text-white/70 text-lg leading-relaxed mt-2">
                  Leave precise feedback directly on the timeline, making revisions faster, clearer, and friction-free.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-20">
              <div className="w-full md:w-3/5 rounded-[20px] sm:rounded-[32px] overflow-hidden bg-[#2d2a41] border border-white/10 aspect-[16/9] shadow-2xl relative group">
                 <img src={imgComp62Optimized1} alt="Analytics That Matter" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="w-full md:w-2/5 flex flex-col gap-4">
                <span className="text-[#fbe9ff] font-medium text-lg mb-2">03</span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">Analytics That Matter</h3>
                <p className="text-white/70 text-lg leading-relaxed mt-2">
                  Track the metrics that actually drive growth — views, retention, reach, and lead signals — so we know exactly what to double down on.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8 sm:gap-10 md:gap-20">
              <div className="w-full md:w-3/5 rounded-[20px] sm:rounded-[32px] overflow-hidden bg-[#2d2a41] border border-white/10 aspect-[16/9] shadow-2xl relative group">
                 <img src={imgComp52Optimized1} alt="Talent Network" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="w-full md:w-2/5 flex flex-col gap-4 md:items-end md:text-right">
                <span className="text-[#fbe9ff] font-medium text-lg mb-2">04</span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">Talent Network</h3>
                <p className="text-white/70 text-lg leading-relaxed mt-2">
                  Leave precise feedback directly on the timeline, making revisions faster, clearer, and friction-free.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 sm:mt-24 md:mt-32 flex justify-center">
            <a href="#" className="bg-[#f5d1ff] text-[#080617] px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-white transition-all shadow-[0_0_40px_rgba(245,209,255,0.2)] hover:shadow-[0_0_60px_rgba(245,209,255,0.4)]">
              Book a Walkthrough
            </a>
          </div>
        </section>

        {/* Case Studies */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <span className="text-sm text-white/70">Client Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">Case Studies</h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto">
              Multiple industries. One system. Proven results.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8 md:gap-12">
            {/* Case Study 1: Leena */}
            <div className="bg-[#fffff7] text-black rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12">
              <div className="flex-1">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">Leena Parwani</h3>
                <p className="font-medium text-base sm:text-lg text-black/60 mb-6 sm:mb-8">Rheumatologist & Internist</p>
                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-2">Before</h4>
                  <p className="text-black/80 max-w-sm">She worked with us before when she was selling life insurance then came back when she started real estate.</p>
                </div>
              </div>
              <div className="hidden md:block w-px bg-black/10 mx-4"></div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex gap-6 sm:gap-8 md:gap-16 mb-6 sm:mb-8">
                  <div>
                    <p className="text-4xl sm:text-5xl font-black tracking-tight mb-1">300k</p>
                    <p className="font-medium text-black/60">Views</p>
                  </div>
                  <div>
                    <p className="text-4xl sm:text-5xl font-black tracking-tight mb-1">$270k</p>
                    <p className="text-sm font-medium text-black/60 max-w-[200px]">Sold a AED 25,000,000 property and cashed in 1M in commissions in the first 2 months</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-3">What we did</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#F5D1FF] flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                        <span className="text-sm font-medium">Targeted her audience</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#F5D1FF] flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                        <span className="text-sm font-medium">Created engaging content</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3">Impact</h4>
                    <p className="text-sm font-medium text-black/80">Becoming a top agent in her niche and generating consistent inbound leads from organic content</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2: Khaled */}
            <div className="bg-[#fffff7] text-black rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12">
              <div className="flex-1">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">Khaled Zkandar</h3>
                <p className="font-medium text-base sm:text-lg text-black/60 mb-6 sm:mb-8">Architect & Ai Specialist</p>
                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-2">Before</h4>
                  <p className="text-black/80 max-w-sm">No proper positioning, No clear monetization, No Authority</p>
                </div>
              </div>
              <div className="hidden md:block w-px bg-black/10 mx-4"></div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex gap-4 sm:gap-6 md:gap-10 mb-6 sm:mb-8 overflow-x-auto pb-4 hide-scrollbar">
                  <div className="shrink-0">
                    <p className="text-4xl sm:text-5xl font-black tracking-tight mb-1">15k</p>
                    <p className="text-sm font-medium text-black/60 max-w-[120px]"><span className="font-bold text-black block mb-1">New Followers</span> After 1 studio session</p>
                  </div>
                  <div className="shrink-0">
                    <p className="text-4xl sm:text-5xl font-black tracking-tight mb-1">500k+</p>
                    <p className="font-medium text-black/60">Views</p>
                  </div>
                  <div className="shrink-0">
                    <p className="text-4xl sm:text-5xl font-black tracking-tight mb-1">$25K</p>
                    <p className="text-sm font-medium text-black/60 max-w-[100px]">in cash collected in 2 months</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-3">What we did</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#F5D1FF] flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                        <span className="text-sm font-medium">Created Niche tutorial videos</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#F5D1FF] flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                        <span className="text-sm font-medium">High converting ads + content</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3">Impact</h4>
                    <p className="text-sm font-medium text-black/80">Attracted the most established award-winning studios in the world to enquire his services.</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-8 overflow-x-auto pb-2 pt-2 hide-scrollbar">
                  {[imgRectangle1280, imgRectangle1281, imgRectangle1282, imgRectangle1283, imgRectangle1284, imgRectangle1285].map((img, i) => (
                    <div key={i} className="w-[80px] sm:w-[100px] md:w-[130px] aspect-[9/16] rounded-lg overflow-hidden shrink-0 shadow-sm border border-black/5">
                      <img src={img} alt={`Thumbnail ${i+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Study 3: Sara */}
            <div className="bg-[#fffff7] text-black rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12">
              <div className="flex-1">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">Dr. Sara Alhammdi</h3>
                <p className="font-medium text-base sm:text-lg text-black/60 mb-6 sm:mb-8">Cosmetic Dentist</p>
                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-2">Before</h4>
                  <p className="text-black/80 max-w-sm">Dr. Sara used to create generic content that nobody cared about and didn't show her personality at all.</p>
                </div>
              </div>
              <div className="hidden md:block w-px bg-black/10 mx-4"></div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex gap-4 sm:gap-6 md:gap-10 mb-6 sm:mb-8 overflow-x-auto pb-4 hide-scrollbar">
                  <div className="shrink-0">
                    <p className="text-4xl sm:text-5xl font-black tracking-tight mb-1">150k</p>
                    <p className="font-medium text-black/60">Followers</p>
                  </div>
                  <div className="shrink-0">
                    <p className="text-4xl sm:text-5xl font-black tracking-tight mb-1">2.5M+</p>
                    <p className="font-medium text-black/60">Views</p>
                  </div>
                  <div className="shrink-0">
                    <p className="text-4xl sm:text-5xl font-black tracking-tight mb-1">10+</p>
                    <p className="text-sm font-medium text-black/60 max-w-[100px]">New patients monthly from IG</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-3">What we did</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#F5D1FF] flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                        <span className="text-sm font-medium">Rebranded her presence</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#F5D1FF] flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                        <span className="text-sm font-medium">Educational & Entertaining</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3">Impact</h4>
                    <p className="text-sm font-medium text-black/80">Positioned her as an authority in Cosmetic Dentistry in Dubai and completely filled her schedule.</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-8 overflow-x-auto pb-2 pt-2 hide-scrollbar">
                  {[imgRectangle1256, imgRectangle1261, imgRectangle1265, imgRectangle1269, imgRectangle1273].map((img, i) => (
                    <div key={i} className="w-[80px] sm:w-[100px] md:w-[130px] aspect-[9/16] rounded-lg overflow-hidden shrink-0 shadow-sm border border-black/5">
                      <img src={img} alt={`Thumbnail ${i+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <div className="bg-[#fbe9ff] rounded-[24px] sm:rounded-[32px] p-8 sm:p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-white/40 blur-[80px] rounded-full pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#080617] mb-4 sm:mb-6 tracking-tight relative z-10">
              Your Content Should Be Closing Deals While You Sleep.
            </h2>
            <p className="text-[#080617]/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 relative z-10">
              Stop fighting the algorithm and start building an authority engine that works for you. Book a call to see how ClipsOS can transform your expertise into an undeniable market presence.
            </p>
            <a href="#" className="inline-block bg-[#080617] text-[#fbe9ff] px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-black transition-colors relative z-10 shadow-xl">
              Apply For ClipsOS™
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white text-black py-10 sm:py-16 mt-12 sm:mt-20 relative">
        <div className="absolute top-[-100px] left-0 w-full h-[100px] bg-gradient-to-t from-white to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <h2 className="text-3xl font-black italic tracking-tight mb-2 font-serif">TheClipsAgency</h2>
              <p className="text-black/60 max-w-xs mb-6">Designed to capture your expertise and transform it into strategic content.</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.359 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.757 6.162 6.162 6.162 3.405 0 6.162-2.757 6.162-6.162 0-3.402-2.757-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-20">
              <div>
                <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Services</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-black/70 hover:text-black transition-colors">Home</a></li>
                  <li><a href="#" className="text-black/70 hover:text-black transition-colors">Process & Pricing</a></li>
                  <li><a href="#" className="text-black/70 hover:text-black transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Resources</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-black/70 hover:text-black transition-colors">Platform</a></li>
                  <li><a href="#" className="text-black/70 hover:text-black transition-colors">Help Center</a></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-black/70 hover:text-black transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-black/70 hover:text-black transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
