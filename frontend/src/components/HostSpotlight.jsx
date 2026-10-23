import React from 'react';
import { Award, Heart, Globe, Users, Sparkles, BookOpen, ArrowUpRight } from 'lucide-react';

export default function HostSpotlight({ onRequestBooking }) {
  const stats = [
    { label: "Broadcast Episodes", value: "50+", icon: BookOpen },
    { label: "Global Continents Reached", value: "3+", icon: Globe },
    { label: "Diaspora Families Reached", value: "10,000+", icon: Users },
    { label: "Empathetic Guidance", value: "100%", icon: Heart },
  ];

  return (
    <section id="meet-mbuya" className="py-20 sm:py-28 bg-brand-charcoal text-white relative overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-brand-terracotta/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Regal Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Outer gold border aura */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-gold via-brand-terracotta to-brand-sage opacity-40 blur-lg"></div>

              {/* Main Portrait Frame */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-brand-gold/40 shadow-2xl bg-brand-charcoal-card">
                <img
                  src="/host_portrait.jpg"
                  alt="Melody Magengezha - Host of The Mbuya Va Raphy Talk Show"
                  className="w-full h-auto object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                    Host & Counselor
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Melody Magengezha
                  </h3>
                  <p className="text-xs text-brand-stone/80">
                    Aka Mbuya Va Raphy • Mental Health Specialist
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-brand-charcoal-card border border-brand-gold/40 shadow-luxury-dark backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Certified Specialist</p>
                  <p className="text-[11px] text-brand-stone/70">Mental Health & Wellness</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Biography & Vision */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold/15 text-brand-gold-light border border-brand-gold/30">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              The Voice of Empathetic Dignity
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Meet Melody Magengezha
            </h2>

            <p className="font-display italic text-lg sm:text-xl text-brand-gold-light">
              "Vulnerability is not weakness; in our African heritage, true strength is holding space for each other's healing."
            </p>

            <div className="space-y-4 text-sm sm:text-base text-brand-stone/85 leading-relaxed">
              <p>
                Affectionately known as <strong>Mbuya Va Raphy</strong>, Melody Magengezha is a celebrated Mental Health Specialist, author, and community advocate who has pioneered culturally grounded psychological support for African diaspora communities worldwide.
              </p>
              <p>
                Her broadcast creates an emotional sanctuary where taboos dissolve. From navigating pediatric neurodiversity assessments across Australian and UK healthcare systems to reconciling church faith with psychiatric medicine, Melody unites lived diaspora experience with deep clinical rigor.
              </p>
            </div>

            {/* Impact Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <IconComponent className="w-5 h-5 text-brand-gold mb-1" />
                    <p className="font-serif text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-brand-stone/70">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onRequestBooking}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-bold text-xs uppercase tracking-wider shadow-gold-glow transition-all"
              >
                <span>Book Speaking & Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="#episodes"
                className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all"
              >
                Explore Her Masterclasses
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
