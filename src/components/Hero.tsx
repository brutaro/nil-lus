import React from "react";
import { motion } from "motion/react";
import { Play, Calendar, Music } from "lucide-react";

interface HeroProps {
  t: any;
}

export default function Hero({ t }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink pt-20"
    >
      {/* Cinematic Ambient Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent z-10" />
        <img
          id="hero-bg-img"
          src={t.hero.image}
          alt="Nil Lus Portrait"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.05]"
        />
      </div>

      {/* Floating Light Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-wine/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content in Glassmorphism Card */}
          <div className="lg:col-span-7 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-gold/20 bg-gold/5 backdrop-blur-md"
            >
              <Music className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gold-soft">
                {t.hero.greeting}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-ivory tracking-tight leading-tight"
            >
              {t.hero.heading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-mist max-w-xl font-normal leading-relaxed"
            >
              {t.hero.subheading}
            </motion.p>

            {/* Premium, glassmorphic button row */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4"
            >
              {/* Primary Call To Action - Listen */}
              <a
                id="hero-cta-listen"
                href="#media"
                className="group flex items-center justify-center px-6 py-3.5 text-sm font-bold tracking-widest text-ink bg-gold hover:bg-gold-soft transition-all duration-300 rounded-full shadow-xl hover:shadow-gold/20 focus:ring-2 focus:ring-gold/50 focus:outline-none uppercase"
              >
                <Play className="w-4 h-4 mr-2 fill-ink group-hover:scale-110 transition-transform" />
                {t.hero.ctaListen}
              </a>

              {/* Secondary Call To Action - Contact */}
              <a
                id="hero-cta-booking"
                href="#contato"
                className="flex items-center justify-center px-6 py-3.5 text-sm font-bold tracking-widest text-ivory border border-white/20 hover:border-gold bg-white/5 hover:bg-gold/5 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 uppercase focus:ring-2 focus:ring-white/30"
              >
                <Calendar className="w-4 h-4 mr-2 text-gold" />
                {t.hero.ctaBooking}
              </a>
            </motion.div>
          </div>

          {/* Graphical Frame Side (Elegant artistic representation) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative p-6 glass-panel rounded-2xl max-w-sm mx-auto shadow-2xl border-white/10 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-wine/25 to-gold/5 opacity-40 mix-blend-overlay z-0" />
              <img
                id="hero-box-art"
                src="https://static.wixstatic.com/media/e8911b_dbb8fb4fef824bb68ac16795e0d6ce16~mv2.jpg/v1/fill/w_500,h_500,q_90,enc_avif,quality_auto/e8911b_dbb8fb4fef824bb68ac16795e0d6ce16~mv2.jpg"
                alt="Todos os Tons Album Art"
                className="relative rounded-lg w-full aspect-square object-cover z-10 filter grayscale group-hover:grayscale-0 transition-all duration-700 shadow-lg scale-100 group-hover:scale-[1.02]"
              />
              <div className="relative z-10 mt-4 text-center">
                <span className="font-serif italic text-gold text-lg block">
                  "Todos os Tons"
                </span>
                <span className="text-[10px] text-mist tracking-widest uppercase block mt-1">
                  {lang => "Grammy Latino Nominee"}
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Elegant animated scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-[9px] uppercase tracking-[0.3em] text-mist mb-2 animate-pulse">
          Scroll
        </span>
        <div className="w-[1.5px] h-10 bg-gradient-to-b from-gold to-transparent relative overflow-hidden rounded-full">
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-4 bg-ivory rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
