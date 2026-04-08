import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ChevronRight, ChevronLeft, Check, AlertCircle, ChevronDown } from 'lucide-react';
import Select from 'react-select';
import { getNames } from 'country-list';

// ─── Types ────────────────────────────────────────────────────────────────────

type PartnershipFormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  languages: string[];
  languageOther: string;
  role: string;
  roleOther: string;
  targetAudience: string[];
  audienceOther: string;
  experienceYears: string;
  portfolioLink: string;
  bestPieces: string;
  clientAccounts: string;
  hasPayingClients: string;
  hasHighTicketExperience: string;
  highTicketExplanation: string;
};

const initialFormData: PartnershipFormData = {
  name: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  languages: [],
  languageOther: '',
  role: '',
  roleOther: '',
  targetAudience: [],
  audienceOther: '',
  experienceYears: '',
  portfolioLink: '',
  bestPieces: '',
  clientAccounts: '',
  hasPayingClients: '',
  hasHighTicketExperience: '',
  highTicketExplanation: '',
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const ALL_COUNTRIES = getNames()
  .map((name) => ({ value: name, label: name }))
  .sort((a, b) => a.label.localeCompare(b.label));

const LANGUAGES = [
  'English',
  'Arabic',
  'French',
  'Spanish',
  'German',
  'Portuguese',
  'Turkish',
  'Hindi',
  'Urdu',
  'Mandarin',
  'Other',
];

const ROLES = ['Content Creator', 'Strategist', 'Agency Owner', 'Consultant', 'Other'];

const TARGET_AUDIENCES = ['Doctors', 'Clinics', 'Founders', 'Coaches', 'Brands', 'Other'];

const EXPERIENCE_OPTIONS = [
  { value: '1-3', label: '1 to 3 years' },
  { value: '3-5', label: '3 to 5 years' },
  { value: '5-10', label: '5 to 10 years' },
  { value: '10+', label: 'More than 10 years' },
];

// ─── react-select dark styles ─────────────────────────────────────────────────

const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: 'rgba(0, 0, 0, 0.2)',
    borderColor: state.isFocused ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
    borderRadius: '0.75rem',
    minHeight: '48px',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': { borderColor: 'rgba(255, 255, 255, 0.3)' },
  }),
  menu: (base: any) => ({
    ...base,
    background: '#1a1829',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    zIndex: 100,
  }),
  option: (base: any, state: any) => ({
    ...base,
    background: state.isSelected
      ? 'rgba(168, 85, 247, 0.2)'
      : state.isFocused
      ? 'rgba(255, 255, 255, 0.1)'
      : 'transparent',
    color: state.isSelected ? '#fbe9ff' : 'white',
    cursor: 'pointer',
    padding: '12px 16px',
    '&:active': { background: 'rgba(168, 85, 247, 0.3)' },
  }),
  singleValue: (base: any) => ({ ...base, color: 'white' }),
  input: (base: any) => ({ ...base, color: 'white' }),
  placeholder: (base: any) => ({ ...base, color: 'rgba(255, 255, 255, 0.4)' }),
  menuList: (base: any) => ({ ...base, padding: '4px' }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PartnershipForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PartnershipFormData>(initialFormData);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const navigate = useNavigate();

  // Dynamic regional defaults
  const [regionDefaults, setRegionDefaults] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 000-0000',
  });

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (
        tz.includes('Dubai') || tz.includes('Riyadh') || tz.includes('Qatar') ||
        tz.includes('Kuwait') || tz.includes('Asia/Muscat') || tz.includes('Asia/Bahrain') ||
        tz.includes('Asia/Amman') || tz.includes('Africa/Cairo')
      ) {
        setRegionDefaults({ name: 'Ahmed Al-Mansoori', email: 'ahmed@example.com', phone: '+971 50 123 4567' });
      } else if (
        tz.includes('Europe') || tz.includes('London') || tz.includes('Paris') || tz.includes('Berlin')
      ) {
        setRegionDefaults({ name: 'Lucas Müller', email: 'lucas@example.com', phone: '+44 7911 123456' });
      } else if (tz.includes('Australia') || tz.includes('Sydney')) {
        setRegionDefaults({ name: 'Jack Smith', email: 'jack@example.com', phone: '+61 400 000 000' });
      }
    } catch (_) {
      // keep defaults
    }
  }, []);

  // ─── Validation ─────────────────────────────────────────────────────────────

  const handleNext = () => {
    setError('');

    if (step === 1) {
      if (!formData.name.trim()) { setError('Please enter your full name.'); return; }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Please enter a valid email address.'); return;
      }
      if (!formData.phone.trim()) { setError('Please enter your WhatsApp / phone number.'); return; }
      if (!formData.country) { setError('Please select your country.'); return; }
      if (formData.languages.length === 0) { setError('Please select at least one language.'); return; }
      if (formData.languages.includes('Other') && !formData.languageOther.trim()) {
        setError('Please describe the other language you work in.'); return;
      }
    }

    if (step === 2) {
      if (!formData.role) { setError('Please select what describes you best.'); return; }
      if (formData.role === 'Other' && !formData.roleOther.trim()) {
        setError('Please tell us what your role is.'); return;
      }
      if (formData.targetAudience.length === 0) {
        setError('Please select at least one audience type.'); return;
      }
      if (formData.targetAudience.includes('Other') && !formData.audienceOther.trim()) {
        setError('Please describe the other audience type you work with.'); return;
      }
      if (!formData.experienceYears) { setError('Please select your years of experience.'); return; }
    }

    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setError('');
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setError('');

    if (!formData.portfolioLink.trim()) { setError('Please provide a link to your portfolio or Instagram.'); return; }
    if (!formData.bestPieces.trim()) { setError('Please share 2–3 links to your best work.'); return; }
    if (!formData.hasPayingClients) { setError('Please answer whether you currently work with paying clients.'); return; }
    if (!formData.hasHighTicketExperience) {
      setError('Please answer whether you have high-ticket deal closing experience.'); return;
    }
    if (formData.hasHighTicketExperience === 'Yes' && !formData.highTicketExplanation.trim()) {
      setError('Please provide a brief explanation of your high-ticket experience.'); return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.city ? `${formData.city}, ${formData.country}` : formData.country,
      languages: formData.languages
        .map((l) => (l === 'Other' ? formData.languageOther : l))
        .join(', '),
      role: formData.role === 'Other' ? formData.roleOther : formData.role,
      target_audience: formData.targetAudience
        .map((a) => (a === 'Other' ? formData.audienceOther : a))
        .join(', '),
      experience_years: formData.experienceYears,
      portfolio_link: formData.portfolioLink,
      best_pieces: formData.bestPieces,
      client_accounts: formData.clientAccounts,
      has_paying_clients: formData.hasPayingClients === 'Yes',
      has_sold_service: formData.hasHighTicketExperience === 'Yes',
      sold_service_explanation: formData.highTicketExplanation,
    };

    try {
      const response = await fetch(
        'https://izqogaohvqdlwcxokzvv.supabase.co/functions/v1/receive-partnership-webhook',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-webhook-secret': '920ce2bc0e4aed1271fe5708580bdb89b1230990167660a83fc08bc5355b8664',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error('Submission failed');
      navigate('/application-received');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again or contact us directly.');
      setIsSubmitting(false);
    }
  };

  // ─── Pill Button ─────────────────────────────────────────────────────────────

  const PillButton = ({
    label,
    selected,
    onClick,
    accent = 'purple',
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
    accent?: 'purple' | 'pink';
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 flex items-center gap-2 ${
        selected
          ? accent === 'purple'
            ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]'
            : 'border-[#fbe9ff]/50 bg-[#fbe9ff]/10 text-white shadow-[0_0_20px_rgba(251,233,255,0.15)]'
          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
      }`}
    >
      {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
      {label}
    </button>
  );

  // ─── Input className ─────────────────────────────────────────────────────────

  const inputCls =
    'w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/30';

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-white/50 mb-3 px-1">
          <span className={step >= 1 ? 'text-white' : ''}>About You</span>
          <span className={step >= 2 ? 'text-white' : ''}>Your Expertise</span>
          <span className={step >= 3 ? 'text-white' : ''}>Your Work</span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-[#fbe9ff]"
            initial={{ width: '33.33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* ─── STEP 1: About You ────────────────────────────────────────────── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">Let's get to know you</h2>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputCls}
                  placeholder={regionDefaults.name}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputCls}
                  placeholder={regionDefaults.email}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputCls}
                  placeholder={regionDefaults.phone}
                />
              </div>

              {/* Country + City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Country *</label>
                  <Select
                    options={ALL_COUNTRIES}
                    value={ALL_COUNTRIES.find((c) => c.value === formData.country) || null}
                    onChange={(opt) => setFormData({ ...formData, country: opt?.value || '' })}
                    placeholder="Search countries..."
                    styles={customSelectStyles}
                    className="text-sm text-left font-sans"
                    classNamePrefix="react-select"
                    isSearchable
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">City <span className="text-white/30">(optional)</span></label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={inputCls}
                    placeholder="e.g. Dubai"
                  />
                </div>
              </div>

              {/* Languages multi-select */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">
                  Languages you work in *
                  <span className="ml-2 text-white/30 font-normal text-xs">Select all that apply</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <PillButton
                      key={lang}
                      label={lang}
                      selected={formData.languages.includes(lang)}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          languages: toggleItem(formData.languages, lang),
                          ...(lang === 'Other' &&
                            formData.languages.includes('Other') && { languageOther: '' }),
                        })
                      }
                      accent="purple"
                    />
                  ))}
                </div>
                <AnimatePresence>
                  {formData.languages.includes('Other') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-2"
                    >
                      <input
                        type="text"
                        value={formData.languageOther}
                        onChange={(e) => setFormData({ ...formData, languageOther: e.target.value })}
                        className={inputCls}
                        placeholder="Please describe the other language…"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 2: Expertise ────────────────────────────────────────────── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold mb-6">Tell us about your expertise</h2>

              {/* Role single-select */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">What describes you best? *</label>
                <div className="flex flex-wrap gap-3">
                  {ROLES.map((role) => (
                    <PillButton
                      key={role}
                      label={role}
                      selected={formData.role === role}
                      onClick={() => setFormData({ ...formData, role, roleOther: '' })}
                      accent="purple"
                    />
                  ))}
                </div>
                <AnimatePresence>
                  {formData.role === 'Other' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-2"
                    >
                      <input
                        type="text"
                        value={formData.roleOther}
                        onChange={(e) => setFormData({ ...formData, roleOther: e.target.value })}
                        className={inputCls}
                        placeholder="Please describe your role…"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Target Audience multi-select */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">
                  Who do you primarily work with? *
                  <span className="ml-2 text-white/30 font-normal text-xs">Select all that apply</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {TARGET_AUDIENCES.map((audience) => (
                    <PillButton
                      key={audience}
                      label={audience}
                      selected={formData.targetAudience.includes(audience)}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          targetAudience: toggleItem(formData.targetAudience, audience),
                          ...(audience === 'Other' &&
                            formData.targetAudience.includes('Other') && { audienceOther: '' }),
                        })
                      }
                      accent="pink"
                    />
                  ))}
                </div>
                <AnimatePresence>
                  {formData.targetAudience.includes('Other') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-2"
                    >
                      <input
                        type="text"
                        value={formData.audienceOther}
                        onChange={(e) => setFormData({ ...formData, audienceOther: e.target.value })}
                        className={inputCls}
                        placeholder="Describe the audience you work with…"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Experience Years dropdown */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">
                  How many years have you been working in content or media? *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setExpOpen((o) => !o)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${
                      formData.experienceYears
                        ? 'border-white/20 bg-black/30 text-white'
                        : 'border-white/10 bg-black/20 text-white/40'
                    }`}
                  >
                    <span>
                      {EXPERIENCE_OPTIONS.find((o) => o.value === formData.experienceYears)?.label ||
                        'Select experience range…'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${expOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-1 left-0 right-0 z-50 bg-[#1a1829] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                      >
                        {EXPERIENCE_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, experienceYears: opt.value });
                              setExpOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                              formData.experienceYears === opt.value
                                ? 'bg-purple-500/20 text-[#fbe9ff]'
                                : 'text-white/80 hover:bg-white/10'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {formData.experienceYears === opt.value && (
                                <Check className="w-3.5 h-3.5 text-purple-400" />
                              )}
                              {opt.label}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 3: Work & Experience ───────────────────────────────────── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold mb-6">Your Work &amp; Experience</h2>

              {/* Portfolio */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Link to your portfolio / Instagram *</label>
                <input
                  type="url"
                  value={formData.portfolioLink}
                  onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                  className={inputCls}
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>

              {/* Best pieces */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">2–3 best pieces of work (links) *</label>
                <textarea
                  value={formData.bestPieces}
                  onChange={(e) => setFormData({ ...formData, bestPieces: e.target.value })}
                  className={`${inputCls} min-h-[100px] resize-none`}
                  placeholder="Paste one link per line…"
                />
              </div>

              {/* Client accounts */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Client accounts you've managed or contributed to
                  <span className="ml-1 text-white/30 font-normal">(optional)</span>
                </label>
                <textarea
                  value={formData.clientAccounts}
                  onChange={(e) => setFormData({ ...formData, clientAccounts: e.target.value })}
                  className={`${inputCls} min-h-[80px] resize-none`}
                  placeholder="Share account names or handles…"
                />
              </div>

              {/* Has paying clients */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70 block">
                  Do you currently work with paying clients? *
                </label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, hasPayingClients: opt })}
                      className={`flex-1 py-4 rounded-xl border text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                        formData.hasPayingClients === opt
                          ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {formData.hasPayingClients === opt && <Check className="w-4 h-4" />}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* High-ticket experience */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70 leading-snug block">
                  Do you have experience closing high-ticket deals ($10k+)? *
                </label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          hasHighTicketExperience: opt,
                          ...(opt === 'No' && { highTicketExplanation: '' }),
                        })
                      }
                      className={`flex-1 py-4 rounded-xl border text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                        formData.hasHighTicketExperience === opt
                          ? 'border-[#fbe9ff]/50 bg-[#fbe9ff]/10 text-white shadow-[0_0_20px_rgba(251,233,255,0.15)]'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {formData.hasHighTicketExperience === opt && <Check className="w-4 h-4" />}
                      {opt}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {formData.hasHighTicketExperience === 'Yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-2 space-y-2"
                    >
                      <label className="text-sm font-medium text-white/60">Tell us more *</label>
                      <textarea
                        value={formData.highTicketExplanation}
                        onChange={(e) =>
                          setFormData({ ...formData, highTicketExplanation: e.target.value })
                        }
                        className={`${inputCls} min-h-[80px] resize-none`}
                        placeholder="Describe the deal — context, size, and your role in closing it…"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors px-4 py-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-[#fbe9ff] transition-colors"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-white text-black px-8 py-2.5 rounded-full font-bold hover:bg-[#fbe9ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cta-shine-light"
            >
              {isSubmitting ? 'Submitting…' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
