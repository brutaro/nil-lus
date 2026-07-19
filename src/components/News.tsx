import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Calendar, BookOpen, X, ArrowRight } from "lucide-react";

interface NewsProps {
  t: any;
  lang: "pt" | "en";
}

export default function News({ t, lang }: NewsProps) {
  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  return (
    <section id="noticias" className="py-24 bg-ink-raised relative overflow-hidden">
      {/* Light blur details */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-wine/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 mr-2 animate-pulse" />
            {lang === "pt" ? "ACERVO DE IMPRENSA" : "PRESS COVERAGE"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight">
            {t.news.heading}
          </h2>
          <p className="text-sm sm:text-base text-mist max-w-lg mx-auto font-normal leading-relaxed">
            {t.news.subheading}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.news.items.map((item: any, idx: number) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={item.id}
              className="group flex flex-col justify-between bg-ink p-6 rounded-2xl border border-white/5 shadow-lg shadow-black/40 hover:border-gold/30 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300"
            >
              <div className="space-y-4 text-left">
                {/* Source Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full uppercase tracking-wider block">
                    {item.source}
                  </span>
                  <div className="flex items-center text-mist space-x-1 font-mono text-[10px] font-normal">
                    <Calendar className="w-3 h-3 text-gold-soft" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="font-serif font-bold text-lg sm:text-xl text-ivory group-hover:text-gold transition-colors duration-200 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-mist leading-relaxed font-normal line-clamp-4">
                  {item.summary}
                </p>
              </div>

              {/* Action Button - Leia Mais */}
              <button
                onClick={() => setActiveArticle(item)}
                className="inline-flex items-center text-xs font-bold text-gold hover:text-gold-soft uppercase tracking-widest mt-6 pt-4 border-t border-white/5 text-left w-fit self-start group/btn"
              >
                {lang === "pt" ? "Leia Mais" : "Read More"}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Immersive Article Lightbox Overlay Modal */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveArticle(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Content Panel Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative max-w-2xl w-full rounded-2xl glass-panel p-6 sm:p-8 shadow-2xl shadow-black/80 border border-white/10 z-10 text-left space-y-6 max-h-[85vh] flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5 shrink-0">
                  <div className="space-y-1">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-gold uppercase tracking-wider block">
                      {activeArticle.source}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory tracking-tight">
                      {activeArticle.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-1.5 rounded-full hover:bg-white/5 text-mist hover:text-gold transition-all ml-4"
                    aria-label="Close Article"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Article body with scrollable content */}
                <div className="flex-grow overflow-y-auto space-y-4 text-mist text-xs sm:text-sm font-normal leading-relaxed pr-2 scrollbar-hide editorial-text">
                  {activeArticle.content.map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Close trigger footer */}
                <div className="pt-4 border-t border-white/5 flex justify-end shrink-0">
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-ink bg-gold hover:bg-gold-soft transition-all duration-300 shadow-md shadow-gold/10"
                  >
                    {lang === "pt" ? "Fechar Artigo" : "Close Article"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
