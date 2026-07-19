import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryProps {
  t: any;
  lang: "pt" | "en";
}

export default function Gallery({ t, lang }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = t.gallery.images;

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const handleNext = () => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  };

  return (
    <section id="galeria" className="py-24 bg-ink relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] flex items-center justify-center">
            <Image className="w-3.5 h-3.5 mr-2" />
            {lang === "pt" ? "ALBUM VISUAL" : "VISUAL ALBUM"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight">
            {t.gallery.heading}
          </h2>
          <p className="text-sm sm:text-base text-mist max-w-lg mx-auto font-normal leading-relaxed">
            {t.gallery.subheading}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img: any, idx: number) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="group relative overflow-hidden rounded-xl border border-white/5 cursor-pointer bg-black aspect-square shadow-lg shadow-black/20 hover:border-gold/30 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300"
            >
              <img
                id={`gallery-thumb-${idx}`}
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                referrerPolicy="no-referrer"
              />
              {/* Glassmorphic hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 z-10">
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold scale-75 group-hover:scale-100 transition-transform duration-300 backdrop-blur-sm">
                  <ZoomIn className="w-5 h-5" />
                </div>
                <span className="font-serif italic text-ivory text-sm mt-3.5 block font-semibold">
                  {img.title}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gold-soft mt-1 block">
                  {lang === "pt" ? "Expandir Foto" : "Zoom Capture"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Backdrop blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxIndex(null)}
                className="absolute inset-0 bg-black/95 backdrop-blur-md"
              />

              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-ivory hover:text-gold hover:bg-gold/10 backdrop-blur-md z-50 transition-all"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Navigation Toggle */}
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-ivory hover:text-gold hover:bg-gold/10 backdrop-blur-md z-50 transition-all hidden md:flex items-center justify-center"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right Navigation Toggle */}
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-ivory hover:text-gold hover:bg-gold/10 backdrop-blur-md z-50 transition-all hidden md:flex items-center justify-center"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Central Active Large Image Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl max-h-[80vh] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-40 bg-black flex items-center justify-center"
              >
                <img
                  src={images[lightboxIndex].url}
                  alt={images[lightboxIndex].title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {/* Active Caption overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-center">
                  <h3 className="font-serif font-bold text-lg text-ivory leading-none">
                    {images[lightboxIndex].title}
                  </h3>
                  <span className="text-[10px] text-gold-soft uppercase tracking-widest block mt-2">
                    {lang === "pt" ? `FOTO COM ARTISTA — ${lightboxIndex + 1} DE ${images.length}` : `CAPTURE WITH ARTIST — ${lightboxIndex + 1} OF ${images.length}`}
                  </span>
                </div>
              </motion.div>

              {/* Swiper mobile indicator actions */}
              <div className="absolute bottom-6 flex items-center space-x-6 md:hidden z-40">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-ivory flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-mono text-xs text-mist">
                  {lightboxIndex + 1} / {images.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-ivory flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
