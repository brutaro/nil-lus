import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Video, Music, Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

interface MediaProps {
  t: any;
  lang: "pt" | "en";
}

export default function Media({ t, lang }: MediaProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(35); // Initial percentage
  const [currentTime, setCurrentTime] = useState("01:25");

  // Simulate progress when playing
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setTrackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const nextProg = prev + 1;
          // Recalculate mock timer string
          const totalSeconds = Math.floor((3 * 60 + 48) * (nextProg / 100));
          const mins = Math.floor(totalSeconds / 60);
          const secs = totalSeconds % 60;
          setCurrentTime(`0${mins}:${secs < 10 ? "0" : ""}${secs}`);
          return nextProg;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeTrack = t.media.tracks[currentTrackIndex];

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % t.media.tracks.length);
    setTrackProgress(0);
    setCurrentTime("00:00");
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + t.media.tracks.length) % t.media.tracks.length);
    setTrackProgress(0);
    setCurrentTime("00:00");
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setTrackProgress(0);
    setCurrentTime("00:00");
    setIsPlaying(true);
  };

  return (
    <section id="media" className="py-24 bg-ink relative overflow-hidden">
      {/* Light blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-wine/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] flex items-center justify-center">
            <Video className="w-3.5 h-3.5 mr-2 animate-pulse" />
            {lang === "pt" ? "FALAS & SONS" : "SOUNDS & VISUALS"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight">
            {t.media.heading}
          </h2>
          <p className="text-sm sm:text-base text-mist max-w-lg mx-auto font-normal leading-relaxed">
            {t.media.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Video Player Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-panel p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col justify-between h-full space-y-4"
            >
              <div>
                <h3 className="font-serif font-bold text-xl text-ivory">
                  {t.media.clipeTitle}
                </h3>
                <p className="text-xs sm:text-sm text-mist leading-relaxed mt-2">
                  {t.media.clipeDesc}
                </p>
              </div>

              {/* Responsive Iframe container */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/60">
                <iframe
                  id="clipe-iframe"
                  src="https://www.youtube.com/embed/avoRudzhLBo"
                  title="Nil Lus - A Coroa Sem Rei"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
          </div>

          {/* Premium Audio Player Column */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-xl text-ivory flex items-center">
                    <Music className="w-5 h-5 text-gold mr-2 animate-pulse" />
                    {t.media.playerTitle}
                  </h3>

                  {/* Equalizer animation when playing */}
                  <div className="flex items-end space-x-0.5 h-4">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <motion.div
                        key={bar}
                        animate={isPlaying ? { height: ["20%", "100%", "20%"] } : { height: "20%" }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5 + bar * 0.15,
                          ease: "easeInOut",
                        }}
                        className="w-1 bg-gold rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Track List */}
                <div className="space-y-2 mt-6 max-h-52 overflow-y-auto pr-1 scrollbar-hide">
                  {t.media.tracks.map((track: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => selectTrack(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-300 ${
                        currentTrackIndex === idx
                          ? "bg-gold/10 border-gold/40 shadow-inner"
                          : "bg-white/5 border-transparent hover:border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-mono font-bold text-gold">
                          0{idx + 1}
                        </span>
                        <div>
                          <span className={`text-xs sm:text-sm font-semibold block ${currentTrackIndex === idx ? "text-gold" : "text-ivory"}`}>
                            {track.title}
                          </span>
                          <span className="text-[10px] text-mist tracking-wide font-normal">
                            {track.album}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-normal text-mist">
                        {track.duration}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Player deck controls */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                
                {/* Active song stats */}
                <div className="text-center sm:text-left">
                  <span className="text-[10px] sm:text-xs font-bold text-gold uppercase tracking-widest block animate-pulse">
                    {isPlaying ? (lang === "pt" ? "REPRODUZINDO" : "NOW PLAYING") : (lang === "pt" ? "PAUSADO" : "PAUSED")}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-ivory mt-0.5">
                    {activeTrack.title}
                  </h4>
                  <span className="text-xs text-mist font-normal">
                    {activeTrack.album}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="relative w-full h-1 bg-white/10 rounded-full cursor-pointer overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gold transition-all duration-300"
                      style={{ width: `${trackProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-mist font-normal">
                    <span>{currentTime}</span>
                    <span>{activeTrack.duration}</span>
                  </div>
                </div>

                {/* Deck control triggers */}
                <div className="flex items-center justify-center space-x-6">
                  <button
                    onClick={handlePrev}
                    className="p-2 text-mist hover:text-gold transition-colors"
                    aria-label="Previous Song"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-gold hover:bg-gold-soft text-ink flex items-center justify-center shadow-lg shadow-gold/25 focus:ring-2 focus:ring-gold/50 transition-all duration-300"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-ink" /> : <Play className="w-5 h-5 fill-ink ml-0.5" />}
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-2 text-mist hover:text-gold transition-colors"
                    aria-label="Next Song"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
