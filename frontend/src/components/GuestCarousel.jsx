import React, { useState } from 'react';
import { Users, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';

export default function GuestCarousel({ guests = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, guests.length - 1) : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= guests.length - 1 ? 0 : prev + 1));
  };

  if (!guests || guests.length === 0) return null;

  return (
    <section id="guest-experts" className="py-20 sm:py-28 bg-brand-stone/30 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-sage/10 text-brand-sage border border-brand-sage/20">
              <Users className="w-3.5 h-3.5" />
              Distinguished Guest Faculty
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight">
              Leading Clinicians & Cultural Voices
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Melody is joined by forensic psychologists, psychiatrists, marriage therapists, and community leaders who bring clinical rigor to diaspora lived experience.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-brand-border text-brand-charcoal hover:bg-brand-stone hover:text-brand-terracotta shadow-sm transition-all"
              aria-label="Previous Guest"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-brand-border text-brand-charcoal hover:bg-brand-stone hover:text-brand-terracotta shadow-sm transition-all"
              aria-label="Next Guest"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Guest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {guests.map((guest, idx) => (
            <div
              key={guest.id || idx}
              className="flex flex-col rounded-3xl bg-white border border-brand-border p-6 sm:p-8 shadow-sm hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 space-y-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={guest.avatar_url || guest.avatar || '/host_portrait.jpg'}
                  alt={guest.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold shadow-sm flex-shrink-0"
                />
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-charcoal leading-snug">
                    {guest.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-terracotta mt-0.5">
                    {guest.title_profession}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">
                {guest.bio}
              </p>

              {/* Badges / Contributions */}
              <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-sage font-semibold">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                  Featured Contributor
                </span>
                <span className="text-gray-400 font-normal">
                  Mbuya Va Raphy Guest
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
