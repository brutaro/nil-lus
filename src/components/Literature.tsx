import React from "react";
import { motion } from "motion/react";
import { BookOpen, Sparkles, Film, AlignLeft } from "lucide-react";

interface LiteratureProps {
  t: any;
  lang: "pt" | "en";
}

export default function Literature({ t, lang }: LiteratureProps) {
  return (
    <section id="literatura" className="py-24 bg-ink relative overflow-hidden">
      {/* Visual gradients */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-wine/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5 mr-2 animate-pulse" />
            {lang === "pt" ? "LETRAS & PÁGINAS" : "LETTERS & PAGES"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight">
            {t.literature.heading}
          </h2>
          <p className="text-sm sm:text-base text-mist max-w-lg mx-auto font-normal leading-relaxed">
            {t.literature.subheading}
          </p>
        </div>

        {/* Books Asymmetric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          {/* Card 1: A Viagem para o Outro Lado */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif font-bold text-xl text-ivory">
                {t.literature.romanceTitle}
              </h3>
              <p className="text-xs sm:text-sm text-mist leading-relaxed font-normal">
                {t.literature.romanceDesc}
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-wider font-mono text-gold-soft pt-4 border-t border-white/5">
              {lang === "pt" ? "Novela com Trilha Sonora" : "Novel with Soundtrack"}
            </div>
          </motion.div>

          {/* Card 2: Dadivante */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif font-bold text-xl text-ivory">
                {t.literature.dadivanteTitle}
              </h3>
              <p className="text-xs sm:text-sm text-mist leading-relaxed font-normal">
                {t.literature.dadivanteDesc}
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-wider font-mono text-gold-soft pt-4 border-t border-white/5">
              {lang === "pt" ? "Aforismos & Fotos" : "Aphorisms & Photos"}
            </div>
          </motion.div>

          {/* Card 3: Poetosfera */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center">
                <AlignLeft className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif font-bold text-xl text-ivory">
                {t.literature.poetosferaTitle}
              </h3>
              <p className="text-xs sm:text-sm text-mist leading-relaxed font-normal">
                {t.literature.poetosferaDesc}
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-wider font-mono text-gold-soft pt-4 border-t border-white/5">
              {lang === "pt" ? "Antologia de Poemas" : "Poem Anthology"}
            </div>
          </motion.div>

        </div>

        {/* Lygia Homenagem & Poem Parchment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Poem context details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] block">
              {lang === "pt" ? "LAÇOS LITERÁRIOS" : "LITERARY BONDS"}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
              {t.literature.homageHeading}
            </h3>
            <p className="text-xs sm:text-sm text-mist leading-relaxed font-normal editorial-text">
              {t.literature.homageDesc}
            </p>
            <div className="w-16 h-[1.5px] bg-wine rounded-full" />
          </div>

          {/* Poem Lines Scroll Container */}
          <div className="lg:col-span-7 col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 shadow-2xl relative"
            >
              <div className="absolute top-2 left-4 font-script text-white/5 text-7xl select-none pointer-events-none">
                {lang === "pt" ? "Poesia" : "Poem"}
              </div>
              <div className="font-serif italic text-gold-soft text-sm sm:text-base leading-relaxed space-y-3 relative z-10 scrollbar-hide max-h-80 overflow-y-auto pr-2">
                {t.literature.poemLines.map((line: string, idx: number) => (
                  <p key={idx} className={idx === 0 ? "text-ivory font-bold text-xs uppercase tracking-widest block not-italic font-sans mb-3 pb-3 border-b border-white/5" : "pl-3 border-l border-gold/10"}>
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

        {/* Theater & Cinema Soundtrack Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Theater Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-6 rounded-2xl glass-panel border border-white/5 shadow-2xl space-y-6 text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-wine/10 border border-wine/25 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-gold animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-ivory">
                  {lang === "pt" ? "TRILHAS SONORAS - TEATRO" : "THEATER SOUNDTRACKS"}
                </h3>
                <span className="text-[10px] text-gold-soft uppercase tracking-widest font-mono block">
                  {lang === "pt" ? "Peças Clássicas & Dramas" : "Classical Plays & Dramas"}
                </span>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5 font-sans text-xs sm:text-sm text-mist">
              {t.literature.teatroTracks.map((item: string, idx: number) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Cinema Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-6 rounded-2xl glass-panel border border-white/5 shadow-2xl space-y-6 text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center">
                <Film className="w-5 h-5 text-gold animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-ivory">
                  {lang === "pt" ? "TRILHAS SONORAS - CINEMA" : "CINEMA SOUNDTRACKS"}
                </h3>
                <span className="text-[10px] text-gold-soft uppercase tracking-widest font-mono block">
                  {lang === "pt" ? "Filmes e Documentários" : "Feature Films & Docs"}
                </span>
              </div>
            </div>

            <ul className="space-y-3 pt-4 border-t border-white/5 font-sans text-xs sm:text-sm text-mist">
              {t.literature.cinemaTracks.map((item: string, idx: number) => (
                <li key={idx} className="flex items-center space-x-3 bg-white/5 p-2.5 rounded-xl border border-white/5 hover:border-gold/20 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-wine shrink-0 animate-ping" />
                  <span className="font-medium text-ivory leading-normal">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
