import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ChevronRight, ChevronLeft, Check, AlertCircle, X } from 'lucide-react';
import Select from 'react-select';
import { getNames } from 'country-list';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  country: string;
  contentLanguage: string;
  businessType: string;
  incomeRange: string;
  goal: string;
  obstacle: string;
  willShowUp: string;
};

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  username: '',
  country: '',
  contentLanguage: '',
  businessType: '',
  incomeRange: '',
  goal: '',
  obstacle: '',
  willShowUp: '',
};

const ALL_COUNTRIES = getNames()
  .map(name => ({ value: name, label: name }))
  .sort((a, b) => a.label.localeCompare(b.label));

const EUROPEAN_COUNTRIES = [
  'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 
  'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Czech Republic', 'Denmark', 'Estonia', 
  'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 
  'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 
  'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 
  'Portugal', 'Romania', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 
  'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom', 'Vatican City'
];

const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: 'rgba(0, 0, 0, 0.2)',
    borderColor: state.isFocused ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
    borderRadius: '0.75rem',
    minHeight: '48px',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    }
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
    background: state.isSelected ? 'rgba(168, 85, 247, 0.2)' : state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    color: state.isSelected ? '#fbe9ff' : 'white',
    cursor: 'pointer',
    padding: '12px 16px',
    '&:active': {
      background: 'rgba(168, 85, 247, 0.3)',
    }
  }),
  singleValue: (base: any) => ({
    ...base,
    color: 'white',
  }),
  input: (base: any) => ({
    ...base,
    color: 'white',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: 'rgba(255, 255, 255, 0.4)',
  }),
  menuList: (base: any) => ({
    ...base,
    padding: '4px',
  })
};

const CONTENT_LANGUAGES = [
  'English',
  'Arabic',
  'Dutch',
  'German',
  'French',
  'Spanish',
  'Other',
];

const BUSINESS_TYPES = [
  'Service Provider',
  'Entrepreneur',
  'Content Creator',
  'Consultant',
  'Online Coach',
  'Personal Trainer',
  'Doctor',
  'Other',
];

const INCOME_RANGES = [
  'Less than $5k /mo',
  'Between $5k & $10k /mo',
  'More than $10k /mo',
];

export function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [regionDefaults, setRegionDefaults] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 (555) 000-0000',
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Dubai') || tz.includes('Riyadh') || tz.includes('Qatar') || tz.includes('Kuwait') || tz.includes('Asia/Muscat') || tz.includes('Asia/Bahrain') || tz.includes('Asia/Amman') || tz.includes('Africa/Cairo')) {
        setRegionDefaults({ firstName: 'Ahmed', lastName: 'Al-Mansoori', email: 'ahmed@example.com', phone: '+971 50 123 4567' });
      } else if (tz.includes('Europe') || tz.includes('London') || tz.includes('Paris') || tz.includes('Berlin')) {
        setRegionDefaults({ firstName: 'Lucas', lastName: 'Müller', email: 'lucas@example.com', phone: '+44 7911 123456' });
      } else if (tz.includes('Australia') || tz.includes('Sydney')) {
        setRegionDefaults({ firstName: 'Jack', lastName: 'Smith', email: 'jack@example.com', phone: '+61 400 000 000' });
      }
    } catch (e) {
      // Keep defaults
    }
  }, []);

  const isEuropean = EUROPEAN_COUNTRIES.includes(formData.country);
  const needsLanguageCheck = isEuropean && formData.contentLanguage && formData.contentLanguage !== 'English' && formData.contentLanguage !== 'Arabic';

  const handleNext = () => {
    // Basic validation
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.username) {
        setError('Please fill in all fields to continue.');
        return;
      }
    } else if (step === 2) {
      if (!formData.country || !formData.businessType || !formData.incomeRange) {
        setError('Please select all options to continue.');
        return;
      }
      if (isEuropean && !formData.contentLanguage) {
        setError('Please select what language your content will be in.');
        return;
      }
      if (needsLanguageCheck) {
        setShowLanguageModal(true);
        return;
      }
    }
    setError('');
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setError('');
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.goal || !formData.obstacle || !formData.willShowUp) {
      setError('Please answer all questions to complete your application.');
      return;
    }

    if (formData.willShowUp === 'No') {
      setError('This program is for serious operators only. Please only proceed if you intend to show up and communicate.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        social: formData.username,
        country: formData.country,
        content_language: formData.contentLanguage || null,
        business_type: formData.businessType,
        monthly_revenue: formData.incomeRange,
        goal: formData.goal,
        obstacle: formData.obstacle,
        call_confirmed: formData.willShowUp === 'Yes',
        is_qualified: formData.incomeRange !== 'Less than $5k /mo',
      };

      const response = await fetch('https://izqogaohvqdlwcxokzvv.supabase.co/functions/v1/receive-lead-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-secret': '920ce2bc0e4aed1271fe5708580bdb89b1230990167660a83fc08bc5355b8664',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred while submitting your application. Please check your connection and try again.');
      setIsSubmitting(false);
      return;
    }

    // Routing Logic based on location
    const { country } = formData;
    const euCountries = ['United Kingdom', 'Germany', 'Netherlands', 'France', 'Europe (Other)'];
    const isQualified = formData.incomeRange !== 'Less than $5k /mo';
    
    if (!isQualified) {
      navigate('/application-received');
    } else if (country === 'Australia') {
      navigate('/book-a-call-aus');
    } else if (euCountries.includes(country)) {
      navigate('/book-a-call-eu');
    } else {
      navigate('/book-a-call');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-white/50 mb-3 px-1">
          <span className={step >= 1 ? 'text-white' : ''}>About You</span>
          <span className={step >= 2 ? 'text-white' : ''}>Your Business</span>
          <span className={step >= 3 ? 'text-white' : ''}>Your Goals</span>
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

      {/* Form Card */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 text-sm"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                    placeholder={regionDefaults.firstName}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                    placeholder={regionDefaults.lastName}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                  placeholder={regionDefaults.email}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                  placeholder={regionDefaults.phone}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">IG / TikTok Username *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                  placeholder="@username"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold mb-6">Tell us about your business</h2>

              <div className="space-y-3" style={{ zIndex: 100 }}>
                <label className="text-sm font-medium text-white/70">Where are you based? *</label>
                <Select
                  options={ALL_COUNTRIES}
                  value={ALL_COUNTRIES.find(c => c.value === formData.country) || null}
                  onChange={(option) => setFormData({ ...formData, country: option?.value || '', contentLanguage: '' })}
                  placeholder="Search countries..."
                  styles={customSelectStyles}
                  className="text-sm text-left font-sans"
                  classNamePrefix="react-select"
                  isSearchable={true}
                  name="country"
                />
              </div>

              {/* Dynamic Content Language Field for European Countries */}
              <AnimatePresence>
                {isEuropean && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <label className="text-sm font-medium text-white/70">What language will your content be in? *</label>
                    <select
                      value={formData.contentLanguage}
                      onChange={(e) => setFormData({ ...formData, contentLanguage: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-black">Select a language...</option>
                      {CONTENT_LANGUAGES.map(lang => (
                        <option key={lang} value={lang} className="text-black">{lang}</option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">What is your business? *</label>
                <div className="flex flex-wrap gap-3">
                  {BUSINESS_TYPES.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, businessType: type })}
                      className={`px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 ${
                        formData.businessType === type 
                          ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Current monthly income range? *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {INCOME_RANGES.map(range => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setFormData({ ...formData, incomeRange: range })}
                      className={`px-4 py-4 rounded-xl border text-sm text-center transition-all duration-200 ${
                        formData.incomeRange === range 
                          ? 'border-[#fbe9ff]/50 bg-[#fbe9ff]/10 text-white shadow-[0_0_20px_rgba(251,233,255,0.15)]'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold mb-6">Let's align on your goals</h2>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">What do you want to achieve, & how may we help you get there? *</label>
                <textarea
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all min-h-[120px] resize-none"
                  placeholder="Share your goals with us..."
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">What's the biggest obstacle holding you back right now? *</label>
                <textarea
                  value={formData.obstacle}
                  onChange={(e) => setFormData({ ...formData, obstacle: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all min-h-[120px] resize-none"
                  placeholder="Describe your current challenges..."
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70 leading-snug block">
                  Will you let us know in case you can't show up to the call, or if you have to reschedule? *
                </label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, willShowUp: opt })}
                      className={`flex-1 py-4 rounded-xl border text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                        formData.willShowUp === opt 
                          ? 'border-[#fbe9ff]/50 bg-[#fbe9ff]/10 text-white shadow-[0_0_20px_rgba(251,233,255,0.15)]'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {formData.willShowUp === opt && <Check className="w-4 h-4" />}
                      {opt}
                    </button>
                  ))}
                </div>
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
          ) : <div></div>}

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
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>

      {/* Language Not Supported Modal */}
      <AnimatePresence>
        {showLanguageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowLanguageModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-[#1a1829] border border-white/10 rounded-2xl p-8 sm:p-10 max-w-md w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLanguageModal(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#fbe9ff]/10 border border-[#fbe9ff]/20 flex items-center justify-center mx-auto mb-5">
                  <AlertCircle className="w-7 h-7 text-[#fbe9ff]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Language Not Supported</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  To deliver the highest quality content and strategy, we currently only support <span className="text-white font-semibold">English</span> and <span className="text-white font-semibold">Arabic</span> content production. If you're open to creating your content in either of these languages, we'd love to work with you.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, contentLanguage: '' });
                      setShowLanguageModal(false);
                    }}
                    className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-[#fbe9ff] transition-colors text-sm"
                  >
                    I understand, I will change my selection
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
