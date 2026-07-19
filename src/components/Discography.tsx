import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Disc, Info, ExternalLink } from "lucide-react";

interface DiscographyProps {
  t: any;
  lang: "pt" | "en";
}

export default function Discography({ t, lang }: DiscographyProps) {
  const [filter, setFilter] = useState<"all" | "album" | "score">("all");
  const [selectedAlbum, setSelectedAlbum] = useState<any | null>(null);

  const categories = [
    { id: "all", label: lang === "pt" ? "Todos" : "All" },
    { id: "album", label: lang === "pt" ? "Álbuns" : "Albums" },
    { id: "score", label: lang === "pt" ? "Trilhas Sonoras" : "Soundtracks" },
  ];

  const filteredAlbums = t.discography.albums.filter((album: any) => {
    if (filter === "all") return true;
    if (filter === "album") {
      return !album.title.toLowerCase().includes("score") && !album.title.toLowerCase().includes("soundtrack") && !album.title.toLowerCase().includes("amal");
    }
    if (filter === "score") {
      return album.title.toLowerCase().includes("score") || album.title.toLowerCase().includes("amal") || album.title.toLowerCase().includes("cinema");
    }
    return true;
  });

  return (
    <section id="discografia" className="py-24 bg-ink-raised relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/12 w-80 h-80 bg-black/40 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] flex items-center justify-center">
            <Disc className="w-3.5 h-3.5 mr-2 animate-spin-slow" />
            {lang === "pt" ? "ACERVO MUSICAL" : "MUSICAL ARCHIVE"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight">
            {t.discography.heading}
          </h2>
          <p className="text-sm sm:text-base text-mist max-w-lg mx-auto font-normal leading-relaxed">
            {t.discography.subheading}
          </p>

          {/* Filter Category Tabs */}
          <div className="flex items-center justify-center space-x-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  filter === cat.id
                    ? "bg-gold border-gold text-ink shadow-lg shadow-gold/20"
                    : "border-white/10 hover:border-gold text-mist hover:text-gold bg-white/5 backdrop-blur-sm"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Albums Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredAlbums.map((album: any, index: number) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                key={album.title}
                className="group relative flex flex-col bg-ink rounded-xl border border-white/5 overflow-hidden shadow-lg shadow-black/40 hover:border-gold/30 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300"
              >
                {/* Album Cover Wrapper */}
                <div className="aspect-square relative overflow-hidden bg-black/40">
                  <img
                    id={`album-cover-${index}`}
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 z-10" />

                  {/* Glass quick-view detail bubble */}
                  <button
                    onClick={() => setSelectedAlbum(album)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-ivory hover:text-gold hover:bg-gold/15 backdrop-blur-md opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 z-20"
                    aria-label="Album Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Album Title Block */}
                <div className="p-4 flex flex-col justify-between flex-grow relative z-10 bg-gradient-to-b from-transparent to-ink/90">
                  <div>
                    <span className="text-[9px] font-bold text-gold uppercase tracking-widest block">
                      {album.year}
                    </span>
                    <h3
                      id={`album-title-${index}`}
                      className="font-serif font-bold text-base text-ivory group-hover:text-gold transition-colors truncate mt-0.5"
                    >
                      {album.title}
                    </h3>
                  </div>

                  {/* Show descriptive subtitle on small screens if selected */}
                  <p className="text-[11px] text-mist line-clamp-2 mt-2 leading-relaxed h-8">
                    {album.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Selected Album Lightbox Drawer Modal */}
        <AnimatePresence>
          {selectedAlbum && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedAlbum(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative max-w-lg w-full rounded-2xl glass-panel p-6 sm:p-8 shadow-2xl shadow-black/80 border border-white/10 z-10 text-left space-y-6"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  {/* Aspect Cover Image */}
                  <div className="w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10 relative">
                    <img
                      src={selectedAlbum.image}
                      alt={selectedAlbum.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Text details */}
                  <div className="flex-grow space-y-3 text-center sm:text-left">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider block">
                      {selectedAlbum.year}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-ivory">
                      {selectedAlbum.title}
                    </h3>
                    <p className="text-sm text-mist leading-relaxed font-normal">
                      {selectedAlbum.description}
                    </p>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                  <a
                    href="#media"
                    onClick={() => setSelectedAlbum(null)}
                    className="flex-1 text-center py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-ink bg-gold hover:bg-gold-soft transition-all duration-300 shadow-md hover:shadow-gold/15"
                  >
                    {lang === "pt" ? "Escutar Faixas" : "Listen Tracks"}
                  </a>
                  <button
                    onClick={() => setSelectedAlbum(null)}
                    className="flex-1 text-center py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-ivory border border-white/10 hover:bg-white/5 transition-all duration-300"
                  >
                    {lang === "pt" ? "Fechar" : "Close"}
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
