import React, { useState } from 'react';
import { ShieldCheck, Lock, HeartHandshake, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { submitViewerQuestion } from '../services/api';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export default function AskMbuyaCorner() {
  const [formData, setFormData] = useState({
    name: '',
    is_anonymous: true,
    email: '',
    country_location: '',
    topic_category: 'mental_health',
    question_body: '',
    consent_to_broadcast: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: 'mental_health', label: 'Mental Health & Anxiety' },
    { value: 'marriage', label: 'Marriage & In-laws' },
    { value: 'parenting', label: 'Parenting & Neurodiversity' },
    { value: 'diaspora', label: 'Diaspora Isolation & Grief' },
    { value: 'faith_culture', label: 'Faith, Culture & Stigma' },
    { value: 'general', label: 'General Life Dilemma' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.country_location.trim()) {
      toast.error("Please provide your city, country, or diaspora region.");
      return;
    }

    if (formData.question_body.trim().length < 15) {
      toast.error("Please share at least 15 characters so Mbuya Va Raphy can understand your context.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitViewerQuestion(formData);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#C85A32', '#D4AF37', '#2C3E35']
      });
      toast.success("Your letter has been received into Mbuya Va Raphy's care.");
    } catch (error) {
      toast.error("Unable to submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      is_anonymous: true,
      email: '',
      country_location: '',
      topic_category: 'mental_health',
      question_body: '',
      consent_to_broadcast: true,
    });
    setIsSubmitted(false);
  };

  return (
    <section id="advice-corner" className="py-20 sm:py-28 bg-brand-cream relative overflow-hidden">
      {/* Subtle background decorative motifs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-terracotta/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-sage/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-terracotta/10 text-brand-terracotta border border-brand-terracotta/20">
            <Lock className="w-3.5 h-3.5" />
            Confidential Advice Corner
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-charcoal tracking-tight">
            Ask Mbuya Va Raphy
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-display italic">
            "A safe harbor for the conversations you cannot have at the family table."
          </p>
        </div>

        {/* Sanctuary Trust Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-luxury border border-brand-border">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-sage/15 text-brand-sage flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal">
                Received in Sacred Confidence
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you for your trust. Melody Magengezha and our clinical production team review every submission. If selected for broadcast, all identifying markers will remain 100% altered.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-terracotta text-white hover:bg-brand-terracotta-dark transition-all"
              >
                Submit Another Dilemma
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Privacy Shield Banner */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-stone/60 border border-brand-border text-xs text-brand-charcoal/80">
                <ShieldCheck className="w-5 h-5 text-brand-sage flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Clinical Sanctuary Guarantee:</strong> You may submit completely anonymously. If selected for counseling on our broadcast, we alter all names and employers to protect your dignity.
                </p>
              </div>

              {/* Anonymity Switch */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-border hover:border-brand-gold/60 transition-colors">
                <div className="space-y-0.5">
                  <label htmlFor="anon-toggle" className="text-sm font-bold text-brand-charcoal cursor-pointer">
                    Keep me completely anonymous
                  </label>
                  <p className="text-xs text-gray-500">
                    We will only mention your general region (e.g., "A sister in Melbourne")
                  </p>
                </div>
                <button
                  type="button"
                  id="anon-toggle"
                  onClick={() => setFormData({ ...formData, is_anonymous: !formData.is_anonymous, name: !formData.is_anonymous ? '' : formData.name })}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    formData.is_anonymous ? 'bg-brand-terracotta' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={formData.is_anonymous}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      formData.is_anonymous ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Name & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
                    Your Name {formData.is_anonymous && <span className="text-gray-400 font-normal">(Hidden)</span>}
                  </label>
                  <input
                    type="text"
                    disabled={formData.is_anonymous}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={formData.is_anonymous ? "Anonymous Viewer" : "e.g. Tendai M."}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-brand-stone/30 border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
                    Your City & Country / Diaspora Location <span className="text-brand-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country_location}
                    onChange={(e) => setFormData({ ...formData, country_location: e.target.value })}
                    placeholder="e.g. Melbourne (AUS), Harare (ZW), London (UK)"
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-brand-stone/30 border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40"
                  />
                </div>
              </div>

              {/* Email & Topic Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
                    Confidential Email <span className="text-gray-400 font-normal">(Optional for follow-up resources)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-brand-stone/30 border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
                    Dilemma Category <span className="text-brand-terracotta">*</span>
                  </label>
                  <select
                    value={formData.topic_category}
                    onChange={(e) => setFormData({ ...formData, topic_category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-brand-stone/30 border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question Body */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
                  Share Your Story or Dilemma <span className="text-brand-terracotta">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.question_body}
                  onChange={(e) => setFormData({ ...formData, question_body: e.target.value })}
                  placeholder="Share openly what you are walking through. What is the hardest part? What guidance are you seeking from Mbuya Va Raphy?"
                  className="w-full px-4 py-3 rounded-2xl text-sm bg-brand-stone/30 border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40 leading-relaxed"
                ></textarea>
                <p className="text-[11px] text-gray-500 mt-1">
                  Minimum 15 characters. Your story is held in clinical confidence.
                </p>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent_to_broadcast}
                  onChange={(e) => setFormData({ ...formData, consent_to_broadcast: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-brand-border text-brand-terracotta focus:ring-brand-terracotta"
                />
                <label htmlFor="consent" className="text-xs text-gray-600 leading-snug cursor-pointer">
                  I give permission for Mbuya Va Raphy and her guest clinicians to read and counsel my situation on air, understanding all identifying markers will remain confidential.
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-brand-terracotta hover:bg-brand-terracotta-dark text-white font-bold text-sm uppercase tracking-wider shadow-terracotta-glow hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting to Sanctuary...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Letter to Mbuya Va Raphy</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
