import React from 'react';
import { PhoneCall, ShieldAlert, Heart, LifeBuoy } from 'lucide-react';

export default function CrisisHotlineBanner() {
  const hotlines = [
    { country: "Zimbabwe", name: "The Friendship Bench", number: "+263 77 242 4242", tel: "+263772424242" },
    { country: "Australia", name: "Lifeline (24/7)", number: "13 11 14", tel: "131114" },
    { country: "United Kingdom", name: "Samaritans / NHS", number: "116 123", tel: "116123" },
    { country: "USA & Canada", name: "Suicide & Crisis Line", number: "988", tel: "988" },
    { country: "South Africa", name: "SADAG Crisis Line", number: "0800 567 567", tel: "0800567567" },
  ];

  return (
    <section id="crisis-support" className="bg-brand-sage text-white py-12 border-t border-brand-sage-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Disclaimer text */}
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/10 text-brand-gold-light border border-white/20">
              <LifeBuoy className="w-3.5 h-3.5" />
              Immediate Emotional Sanctuary
            </div>
            <h3 className="font-serif text-2xl font-bold tracking-tight">
              24/7 Emergency Mental Health Helplines
            </h3>
            <p className="text-xs sm:text-sm text-brand-stone/85 leading-relaxed">
              The Mbuya Va Raphy Talk Show provides educational guidance and cultural counseling. If you are experiencing acute psychological distress or suicidal ideation, free, confidential professional support is available right now:
            </p>
          </div>

          {/* Quick Contact Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full lg:w-auto">
            {hotlines.map((h, idx) => (
              <a
                key={idx}
                href={`tel:${h.tel}`}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-brand-gold hover:text-brand-charcoal border border-white/15 transition-all text-center group"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-light group-hover:text-brand-charcoal">
                  {h.country}
                </span>
                <span className="text-xs font-bold text-white group-hover:text-brand-charcoal truncate max-w-[120px]">
                  {h.name}
                </span>
                <span className="text-xs font-extrabold text-brand-stone group-hover:text-brand-charcoal mt-1 underline">
                  {h.number}
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
