import React, { useState } from 'react';
import { Briefcase, Check, ArrowRight, ShieldCheck, Download, Mail, X } from 'lucide-react';
import { submitBookingInquiry } from '../services/api';
import { toast } from 'sonner';

export default function PartnershipSection({ isModalOpen, setIsModalOpen }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    inquiry_type: 'sponsorship',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const tiers = [
    {
      name: "Episode Segment Partner",
      badge: "Targeted Audience",
      price: "Ideal for Wellness Brands",
      description: "Sponsor a dedicated mental health or neurodiversity session with high diaspora engagement.",
      features: [
        "In-episode verbal host acknowledgment & lower-third branding",
        "Social media co-promotion across YouTube & Facebook",
        "Banner feature on episode web page & discussion guide",
        "Post-broadcast analytics & audience reach report",
      ],
      recommended: false,
    },
    {
      name: "Title Presenting Sponsor",
      badge: "Maximum Visibility",
      price: "Full Season Brand Alignment",
      description: "Headline partnership across all Season 2 broadcasts (akin to Diaspora Insurance partner spotlight).",
      features: [
        "Exclusive 'Presented By' marquee branding on all episodes",
        "60-second broadcast intro segment & host endorsement",
        "Primary logo placement on all flyers & print assets",
        "VIP keynote access with Melody Magengezha",
        "Permanent inclusion in all global streaming archives",
      ],
      recommended: true,
    },
    {
      name: "Community & Institutional Ally",
      badge: "Non-Profit & Church",
      price: "Grassroots Empowerment",
      description: "Support youth neurodiversity workshops and subsidized therapy circles for migrant families.",
      features: [
        "Co-branded diaspora wellness educational leaflets",
        "Dedicated Q&A advice corner segment integration",
        "Access to quarterly community mental health summits",
        "Certificate of Diaspora Wellness Patronage",
      ],
      recommended: false,
    },
  ];

  const handleOpenModal = (tierName = 'sponsorship') => {
    setFormData((prev) => ({
      ...prev,
      inquiry_type: tierName === 'media_speaking' ? 'media_speaking' : 'sponsorship',
      message: `I am interested in exploring ${tierName} opportunities for The Mbuya VaRaphy Talk Show.`,
    }));
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitBookingInquiry(formData);
      toast.success("Thank you! Your partnership inquiry has been dispatched to Melody Magengezha's production office.");
      setIsModalOpen(false);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        organization: '',
        inquiry_type: 'sponsorship',
        message: '',
      });
    } catch (error) {
      toast.error("Could not send inquiry. Please try again or reach out via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="sponsorship" className="py-20 sm:py-28 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold/15 text-brand-gold-dark border border-brand-gold/30">
            <Briefcase className="w-3.5 h-3.5" />
            Strategic Brand Alignment
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-charcoal tracking-tight">
            Corporate Sponsorship & Media Kit
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Connect your organization with an affluent, conscientious African diaspora audience across Australia, the UK, Europe, and Southern Africa.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`flex flex-col rounded-3xl p-8 transition-all duration-300 relative ${
                tier.recommended
                  ? 'bg-brand-charcoal text-white shadow-luxury-dark ring-2 ring-brand-gold -translate-y-2'
                  : 'bg-white text-brand-charcoal border border-brand-border shadow-sm hover:shadow-luxury'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-gold text-brand-charcoal shadow-md">
                  Premier Partner Tier
                </div>
              )}

              <div className="space-y-2 mb-6">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  tier.recommended ? 'bg-white/10 text-brand-gold-light' : 'bg-brand-stone text-brand-sage'
                }`}>
                  {tier.badge}
                </span>
                <h3 className="font-serif text-2xl font-bold">{tier.name}</h3>
                <p className={`text-xs ${tier.recommended ? 'text-gray-300' : 'text-gray-500'}`}>
                  {tier.description}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 flex-1 mb-8">
                {tier.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      tier.recommended ? 'text-brand-gold' : 'text-brand-terracotta'
                    }`} />
                    <span className={tier.recommended ? 'text-gray-200' : 'text-gray-700'}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenModal(tier.name)}
                className={`w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  tier.recommended
                    ? 'bg-brand-terracotta hover:bg-brand-terracotta-dark text-white shadow-terracotta-glow'
                    : 'bg-brand-charcoal hover:bg-brand-terracotta text-white'
                }`}
              >
                <span>Request Media Kit & Rates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Media Kit & Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-border my-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-brand-charcoal hover:bg-brand-stone transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark">
                Official Production Inquiry
              </span>
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal">
                Partner with Mbuya Va Raphy
              </h3>
              <p className="text-xs text-gray-600">
                Receive our comprehensive 2026/2027 Broadcast Media Kit, viewership demographics, and partnership rate card.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                  Full Name <span className="text-brand-terracotta">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="e.g. Farai Musarurwa"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-brand-stone/30 border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                    Corporate Email <span className="text-brand-terracotta">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-brand-stone/30 border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Diaspora Insurance"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-brand-stone/30 border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                  Partnership Intent
                </label>
                <select
                  value={formData.inquiry_type}
                  onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-brand-stone/30 border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40"
                >
                  <option value="sponsorship">Corporate Sponsorship & Broadcast Advertising</option>
                  <option value="media_speaking">Keynote Speaking & Media Appearance</option>
                  <option value="therapy_coaching">Therapy & Wellness Coaching Consultation</option>
                  <option value="guest_appearance">Guest Panelist / Expert Pitch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1">
                  Message Details <span className="text-brand-terracotta">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your brand goals and target campaign timeline."
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-brand-stone/30 border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-brand-terracotta hover:bg-brand-terracotta-dark text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry & Request Media Kit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
