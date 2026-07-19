import React, { useState } from "react";
import { motion } from "motion/react";
import { Trophy, ChevronLeft, SkipForward, ArrowRight } from "lucide-react";

interface HandballProps {
  t: any;
  lang: "pt" | "en";
}

export default function Handball({ t, lang }: HandballProps) {
  const [activeSlide, setActiveIndex] = useState(0);

  const sportsPhotos = [
    { url: "https://static.wixstatic.com/media/e8911b_d43c78359fa041bb87fc8babedf813cd~mv2.jpg/v1/crop/x_0,y_16,w_960,h_611/fill/w_594,h_376,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/083ed4ba-5437-404c-bb37-efc1f61915cc.jpg", caption: lang === "pt" ? "Viagem em Equipe - Seleção Nacional" : "Team travel - National Selection" },
    { url: "https://static.wixstatic.com/media/e8911b_be5ad1a84dbe449bbe6b7cc7b51b8a71~mv2.jpg/v1/fill/w_464,h_600,al_c,lg_1,q_80,enc_avif,quality_auto/0f309845-ad2b-4d8d-b6f4-095bae5c0127.jpg", caption: "Hand Ginástico" },
    { url: "https://static.wixstatic.com/media/e8911b_bb200dbaad964a2cb566eb4fb646f7b5~mv2.jpg/v1/fill/w_584,h_432,al_c,lg_1,q_80,enc_avif,quality_auto/177fd6ce-65d5-4d6e-8943-853b8be77949.jpg", caption: "RPM Hand - Nilton Cruz" },
    { url: "https://static.wixstatic.com/media/e8911b_00dfad2657214d27a66b29c85e294aa9~mv2.jpg/v1/fill/w_720,h_504,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/17f7ef9e-1223-43e8-b252-e9a9faed53f5%20(1).jpg", caption: lang === "pt" ? "Treinamento no Centro Olímpico - EUA" : "Training at the Olympic Center - USA" },
    { url: "https://static.wixstatic.com/media/e8911b_c70d9b3b1ab745e1b874b5776741b0df~mv2.jpg/v1/crop/x_0,y_93,w_960,h_627/fill/w_600,h_392,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3258ca57-945d-42cd-a83a-f608382fa626.jpg", caption: "Handball Colégio Estadual" },
    { url: "https://static.wixstatic.com/media/e8911b_e4a73768d5a04e1ca9f3b3bd4094a0ad~mv2.jpg/v1/fill/w_572,h_394,al_c,lg_1,q_80,enc_avif,quality_auto/3743f1f8-1e44-4fe7-8cf4-678352e9d04c.jpg", caption: "Hand Ginástico II" },
    { url: "https://static.wixstatic.com/media/e8911b_28105c445cb540728e4b93a2169c7f70~mv2.jpg/v1/crop/x_0,y_22,w_480,h_338/fill/w_571,h_406,al_c,lg_1,q_80,enc_avif,quality_auto/45354b05-26e9-4f8c-82ae-e4bf3e7a1eb5.jpg", caption: lang === "pt" ? "Canadá X Brasil - Pan-americano de Handball" : "Canada X Brazil - Pan-American Handball" },
    { url: "https://static.wixstatic.com/media/e8911b_9e6de90411d54679b5c07e0d87e4ca27~mv2.jpg/v1/fill/w_624,h_408,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5a2234d0-69b5-40e3-be8a-c1ba1f8591d4.jpg", caption: "Hand Ginástico III" }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % sportsPhotos.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + sportsPhotos.length) % sportsPhotos.length);
  };

  return (
    <section id="handball" className="py-24 bg-ink-raised relative overflow-hidden">
      {/* Visual glowing bubbles */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-wine/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] flex items-center justify-center">
            <Trophy className="w-3.5 h-3.5 mr-2 animate-bounce" />
            {lang === "pt" ? "A FORÇA DAS QUADRAS" : "THE COURT'S STRENGTH"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight">
            {t.handball.heading}
          </h2>
          <p className="text-sm sm:text-base text-mist max-w-lg mx-auto font-normal leading-relaxed">
            {t.handball.subheading}
          </p>
        </div>

        {/* Narrative & Poem Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Sports Narrative Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-4 text-mist text-sm sm:text-base leading-relaxed font-normal editorial-text">
              <p>{t.handball.desc1}</p>
              <p>{t.handball.desc2}</p>
            </div>

            {/* Coach quote card */}
            <div className="p-5 rounded-xl border border-white/5 bg-white/5 space-y-2">
              <p className="font-serif italic text-gold-soft text-sm sm:text-base">
                {t.handball.dedication}
              </p>
            </div>
          </div>

          {/* Atleta Para Sempre Lyric Parchment Box */}
          <div className="lg:col-span-6 col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 shadow-2xl relative"
            >
              <div className="absolute top-2 right-4 font-serif italic text-white/5 text-5xl font-bold pointer-events-none">
                {lang === "pt" ? "Canção" : "Lyrics"}
              </div>
              <h3 className="font-serif font-bold text-xl text-gold pb-3 border-b border-white/5 mb-4 uppercase tracking-wider">
                {t.handball.poemTitle}
              </h3>

              <div className="font-serif italic text-mist text-sm sm:text-base leading-relaxed space-y-2 max-h-72 overflow-y-auto scrollbar-hide pr-2">
                {t.handball.poemLines.map((line: string, idx: number) => (
                  <p key={idx} className="pl-3 border-l border-wine/40">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

        {/* Sports Archival Photo Slide Drawer */}
        <div className="relative glass-panel rounded-2xl p-5 border border-white/10 max-w-4xl mx-auto shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Visual Frame */}
            <div className="md:col-span-8 aspect-video relative rounded-xl overflow-hidden bg-black/40 border border-white/10 shadow-lg">
              <motion.img
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={sportsPhotos[activeSlide].url}
                alt={sportsPhotos[activeSlide].caption}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-65" />
              
              {/* Photo Caption */}
              <div className="absolute bottom-4 left-4 z-20 text-left pr-12">
                <span className="text-[10px] text-gold uppercase tracking-widest font-bold">
                  {lang === "pt" ? "ARQUIVO HISTÓRICO" : "HISTORICAL ARCHIVE"}
                </span>
                <p className="font-serif font-bold text-base text-ivory mt-0.5 leading-snug">
                  {sportsPhotos[activeSlide].caption}
                </p>
              </div>
            </div>

            {/* Slider Controls Column */}
            <div className="md:col-span-4 space-y-4 text-center md:text-left px-4">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">
                {lang === "pt" ? "Fotos de Época" : "Vintage Captures"}
              </span>
              <h4 className="font-serif text-2xl font-bold text-ivory leading-tight">
                {lang === "pt" ? "Das Quadras ao Grammy" : "From Courts to the Grammy"}
              </h4>
              <p className="text-xs text-mist leading-relaxed font-normal">
                {lang === "pt"
                  ? "Flashes de jornais e viagens da equipe mineira e nacional durante a década de 1980."
                  : "Newspaper clips and team travels of the Brazilian National handball selection during the 1980s."}
              </p>

              {/* Slider Triggers */}
              <div className="flex items-center justify-center md:justify-start space-x-3 pt-4">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:border-gold hover:text-gold text-ivory flex items-center justify-center transition-all duration-300"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-mist font-normal">
                  {activeSlide + 1} / {sportsPhotos.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:border-gold hover:text-gold text-ivory flex items-center justify-center transition-all duration-300"
                  aria-label="Next Slide"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
