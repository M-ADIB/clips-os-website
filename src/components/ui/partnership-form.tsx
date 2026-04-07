import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ChevronRight, ChevronLeft, Check, AlertCircle } from 'lucide-react';

type PartnershipFormData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  languages: string;
  role: string;
  targetAudience: string;
  experienceYears: string;
  portfolioLink: string;
  bestPieces: string;
  clientAccounts: string;
  hasPayingClients: string;
  hasSoldService: string;
  soldServiceExplanation: string;
};

const initialFormData: PartnershipFormData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  languages: '',
  role: '',
  targetAudience: '',
  experienceYears: '',
  portfolioLink: '',
  bestPieces: '',
  clientAccounts: '',
  hasPayingClients: '',
  hasSoldService: '',
  soldServiceExplanation: '',
};

const ROLES = [
  'Content Creator',
  'Strategist',
  'Agency Owner',
  'Consultant',
  'Other',
];

const TARGET_AUDIENCES = [
  'Doctors',
  'Clinics',
  'Founders',
  'Coaches',
  'Brands',
  'Other',
];

export function PartnershipForm() {
  const [step, setStep] = useState(1);
  const [regionDefaults, setRegionDefaults] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 000-0000',
    location: 'New York, USA',
  });

  React.useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Dubai') || tz.includes('Riyadh') || tz.includes('Qatar') || tz.includes('Kuwait') || tz.includes('Asia/Muscat') || tz.includes('Asia/Bahrain') || tz.includes('Asia/Amman') || tz.includes('Africa/Cairo')) {
        setRegionDefaults({ name: 'Ahmed Al-Mansoori', email: 'ahmed@example.com', phone: '+971 50 123 4567', location: 'Dubai, UAE' });
      } else if (tz.includes('Europe') || tz.includes('London') || tz.includes('Paris') || tz.includes('Berlin')) {
        setRegionDefaults({ name: 'Lucas Müller', email: 'lucas@example.com', phone: '+44 7911 123456', location: 'London, UK' });
      } else if (tz.includes('Australia') || tz.includes('Sydney')) {
        setRegionDefaults({ name: 'Jack Smith', email: 'jack@example.com', phone: '+61 400 000 000', location: 'Sydney, Australia' });
      } else if (tz.includes('America') || tz.includes('New_York') || tz.includes('Los_Angeles')) {
        setRegionDefaults({ name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 000-0000', location: 'New York, USA' });
      }
    } catch (e) {
      // Keep defaults
    }
  }, []);

  const [formData, setFormData] = useState<PartnershipFormData>(initialFormData);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    // Basic validation
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.languages) {
        setError('Please fill in all fields to continue.');
        return;
      }
    } else if (step === 2) {
      if (!formData.role || !formData.targetAudience || !formData.experienceYears) {
        setError('Please complete all fields to continue.');
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
    if (!formData.portfolioLink || !formData.bestPieces || !formData.hasPayingClients || !formData.hasSoldService) {
      setError('Please answer all required questions to complete your application.');
      return;
    }

    if (formData.hasSoldService === 'Yes' && !formData.soldServiceExplanation) {
      setError('Please provide a brief explanation of the service you sold or the client you closed.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        languages: formData.languages,
        role: formData.role,
        target_audience: formData.targetAudience,
        experience_years: formData.experienceYears,
        portfolio_link: formData.portfolioLink,
        best_pieces: formData.bestPieces,
        client_accounts: formData.clientAccounts,
        has_paying_clients: formData.hasPayingClients === 'Yes',
        has_sold_service: formData.hasSoldService === 'Yes',
        sold_service_explanation: formData.soldServiceExplanation,
      };

      // We'll use a new edge function endpoint name for partnerships
      const response = await fetch('https://izqogaohvqdlwcxokzvv.supabase.co/functions/v1/receive-partnership-webhook', {
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
      // Even if webhook fails, we'll navigate them for now or show error based on requirements.
      // Let's make it show the error so the backend can be updated first.
      setError('An error occurred submitting the form. (The backend edge function needs to be updated to receive these fields).');
      setIsSubmitting(false);
      return;
    }

    navigate('/application-received');
  };

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
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                  placeholder={regionDefaults.name}
                />
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
                <label className="text-sm font-medium text-white/70">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                  placeholder={regionDefaults.phone}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">City / Country *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                    placeholder={regionDefaults.location}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Languages *</label>
                  <input
                    type="text"
                    value={formData.languages}
                    onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                    placeholder="English, Arabic..."
                  />
                </div>
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
              <h2 className="text-2xl font-bold mb-6">Tell us about your expertise</h2>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">What describes you best? *</label>
                <div className="flex flex-wrap gap-3">
                  {ROLES.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: role })}
                      className={`px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 ${
                        formData.role === role 
                          ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Who do you primarily work with? *</label>
                <div className="flex flex-wrap gap-3">
                  {TARGET_AUDIENCES.map(audience => (
                    <button
                      key={audience}
                      type="button"
                      onClick={() => setFormData({ ...formData, targetAudience: audience })}
                      className={`px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 ${
                        formData.targetAudience === audience 
                          ? 'border-[#fbe9ff]/50 bg-[#fbe9ff]/10 text-white shadow-[0_0_20px_rgba(251,233,255,0.15)]'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {audience}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">How many years have you been working in content or media? *</label>
                <input
                  type="text"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                  placeholder="e.g. 5 years"
                />
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
              <h2 className="text-2xl font-bold mb-6">Your Work & Experience</h2>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Link to your portfolio / Instagram *</label>
                <input
                  type="url"
                  value={formData.portfolioLink}
                  onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                  placeholder="https://"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">2–3 best pieces of work (links) *</label>
                <textarea
                  value={formData.bestPieces}
                  onChange={(e) => setFormData({ ...formData, bestPieces: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all min-h-[100px] resize-none"
                  placeholder="Paste links here..."
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Any client accounts you’ve managed or contributed to</label>
                <textarea
                  value={formData.clientAccounts}
                  onChange={(e) => setFormData({ ...formData, clientAccounts: e.target.value })}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all min-h-[80px] resize-none"
                  placeholder="Share accounts or handles..."
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70 leading-snug block">
                  Do you currently work with paying clients? *
                </label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(opt => (
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

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70 leading-snug block">
                  Have you ever sold a service or closed a client? *
                </label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, hasSoldService: opt })}
                      className={`flex-1 py-4 rounded-xl border text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                        formData.hasSoldService === opt 
                          ? 'border-[#fbe9ff]/50 bg-[#fbe9ff]/10 text-white shadow-[0_0_20px_rgba(251,233,255,0.15)]'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {formData.hasSoldService === opt && <Check className="w-4 h-4" />}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {formData.hasSoldService === 'Yes' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3"
                >
                  <label className="text-sm font-medium text-white/70">Brief explanation *</label>
                  <textarea
                    value={formData.soldServiceExplanation}
                    onChange={(e) => setFormData({ ...formData, soldServiceExplanation: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all min-h-[80px] resize-none"
                    placeholder="Tell us about the service you sold or the client you closed..."
                  />
                </motion.div>
              )}

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
    </div>
  );
}
