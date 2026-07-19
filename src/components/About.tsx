import React from "react";
import { motion } from "motion/react";
import { Quote, BookOpen } from "lucide-react";

interface AboutProps {
  t: any;
  lang: "pt" | "en";
}

export default function About({ t, lang }: AboutProps) {
  return (
    <section id="sobre" className="py-24 bg-ink relative overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-wine/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Retro frame accent */}
              <div className="absolute -inset-2 rounded-2xl border border-gold/20 scale-95 group-hover:scale-100 transition-all duration-500 pointer-events-none" />
              
              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 aspect-[3/4]">
                <img
                  id="about-bio-img"
                  src={t.about.image}
                  alt="Nil Lus Portrait"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                {/* Float caption inside image */}
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="text-[10px] text-ivory/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-widest font-mono">
                    {t.about.photoCredit}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Editorial Biography Column */}
          <div className="lg:col-span-7 col-span-1 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] flex items-center">
                <BookOpen className="w-3.5 h-3.5 mr-2" />
                {lang === "pt" ? "BIOGRAFIA ARTÍSTICA" : "ARTISTIC BIOGRAPHY"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory leading-tight tracking-tight">
                {t.about.heading}
              </h2>
              <div className="w-16 h-[2px] bg-gold mt-4 rounded-full" />
            </div>

            <div className="space-y-4 text-mist text-sm sm:text-base font-normal leading-relaxed editorial-text">
              <p>{t.about.text1}</p>
              <p>{t.about.text2}</p>
              <p>{t.about.text3}</p>
            </div>

            {/* Quote banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-5 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden"
            >
              <Quote className="absolute top-2 right-4 w-12 h-12 text-white/5 rotate-180" />
              <p className="font-serif italic text-gold-soft text-base relative z-10 leading-relaxed">
                {lang === "pt"
                  ? "«Um canhão de criatividade e inteligência pura... Um brilhante poeta que toca.»"
                  : "«A cannon of creativity and pure intelligence... A brilliant poet who plays.»"}
              </p>
              <span className="text-xs uppercase tracking-widest text-mist block mt-2.5 font-semibold font-mono">
                — Toninho Horta
              </span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
