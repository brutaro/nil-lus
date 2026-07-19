import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Calendar, CheckCircle } from "lucide-react";

interface AwardsProps {
  t: any;
  lang: "pt" | "en";
}

export default function Awards({ t, lang }: AwardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedAward = t.awards.list[activeIndex];

  return (
    <section id="premios" className="py-24 bg-ink-raised relative overflow-hidden">
      {/* Light glow accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-wine/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] flex items-center justify-center">
            <Award className="w-3.5 h-3.5 mr-2 animate-bounce" />
            {lang === "pt" ? "LAUREAL & HONRARIAS" : "RECONGITIONS & HONORS"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight">
            {t.awards.heading}
          </h2>
          <p className="text-sm sm:text-base text-mist max-w-lg mx-auto font-normal leading-relaxed">
            {t.awards.subheading}
          </p>
        </div>

        {/* Timeline Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Accolade list */}
          <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
            {t.awards.list.map((award: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-full flex items-start space-x-4 p-4 rounded-xl border text-left transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-gold/10 border-gold/40 shadow-lg shadow-black/30 translate-x-1.5"
                    : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                }`}
              >
                {/* Year Badge */}
                <div className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider ${
                  activeIndex === idx
                    ? "bg-gold text-ink"
                    : "bg-white/10 text-ivory"
                }`}>
                  {award.year}
                </div>

                {/* Accolade Content */}
                <div className="space-y-1">
                  <h3 className={`font-serif font-bold text-base sm:text-lg ${activeIndex === idx ? "text-gold" : "text-ivory"}`}>
                    {award.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-mist font-normal leading-relaxed line-clamp-2">
                    {award.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Immersive Picture frame of Selected Award */}
          <div className="lg:col-span-5 col-span-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col justify-between space-y-4"
              >
                {/* Real-time document photo */}
                <div className="aspect-[4/5] sm:aspect-square relative rounded-xl overflow-hidden bg-black/40 border border-white/10 shadow-lg">
                  <img
                    id="selected-award-document-img"
                    src={selectedAward.image}
                    alt={selectedAward.title}
                    className="w-full h-full object-cover object-center filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50" />
                  
                  {/* Decorative Year Stamp */}
                  <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    <span className="font-mono text-xs font-bold text-gold">
                      {selectedAward.year}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-gold" />
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-gold uppercase tracking-wider">
                      {lang === "pt" ? "CERTIFICADO CONFIRMADO" : "VERIFIED CREDENTIAL"}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-ivory">
                    {selectedAward.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-mist leading-relaxed font-normal">
                    {selectedAward.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
