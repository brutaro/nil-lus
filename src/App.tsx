import React, { useState, useEffect } from "react";
import { data } from "./data";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Discography from "./components/Discography";
import Media from "./components/Media";
import Awards from "./components/Awards";
import Literature from "./components/Literature";
import Handball from "./components/Handball";
import Gallery from "./components/Gallery";
import News from "./components/News";
import Contact from "./components/Contact";
import { ArrowUp, Youtube, Facebook, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const t = data[lang];

  return (
    <div className="relative min-h-screen bg-ink text-ivory antialiased selection:bg-gold selection:text-ink">
      
      {/* Floating Light Accent Orb */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Glassmorphic Top Nav Header */}
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* Main Container */}
      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <Hero t={t} />

        {/* Floating Achievements Bubble Bar */}
        <Stats t={t} />

        {/* Biography Section */}
        <About t={t} lang={lang} />

        {/* Selected Albums Grid & Lighbox */}
        <Discography t={t} lang={lang} />

        {/* Audio Player & Clips */}
        <Media t={t} lang={lang} />

        {/* Prize Timelines */}
        <Awards t={t} lang={lang} />

        {/* Books & Soundtracks */}
        <Literature t={t} lang={lang} />

        {/* Canhão Handball Legacy */}
        <Handball t={t} lang={lang} />

        {/* Stages Photo Album Grid */}
        <Gallery t={t} lang={lang} />

        {/* Editorial Press Reports */}
        <News t={t} lang={lang} />

        {/* Booking Form & Management Profiles */}
        <Contact t={t} lang={lang} />
      </main>

      {/* Fine-Art Footer */}
      <footer id="main-footer" className="bg-ink border-t border-white/5 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left: Brand stamp */}
            <div className="text-center md:text-left">
              <img
                src="./assets/logo-nil-lus.png"
                alt="Nil Lus"
                className="h-12 w-auto object-contain mx-auto md:mx-0"
              />
              <span className="text-[10px] text-mist tracking-widest uppercase block mt-1">
                {t.meta.subtitle}
              </span>
            </div>

            {/* Middle: Social Profiles with glass styling */}
            <div className="flex items-center space-x-4">
              <a
                id="social-youtube"
                href="https://www.youtube.com/channel/UCUqyv0K5bz3rEK5EPdZmsHg"
                target="_blank"
                rel="referrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold text-ivory hover:text-gold flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                id="social-facebook"
                href="https://www.facebook.com/nil.lus.5"
                target="_blank"
                rel="referrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold text-ivory hover:text-gold flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="Facebook Page"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                id="social-instagram"
                href="https://www.instagram.com/nillusoficial/"
                target="_blank"
                rel="referrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold text-ivory hover:text-gold flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Right: Copyright disclaimer */}
            <div className="text-center md:text-right space-y-1">
              <p className="text-xs text-mist font-normal">
                {t.footer.copyright}
              </p>
              <p className="text-[10px] text-mist/60 font-mono">
                {t.footer.disclaimer}
              </p>
            </div>

          </div>
        </div>
      </footer>

      {/* Floating Glassmorphic Back-To-Top Trigger */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-gold/90 hover:bg-gold text-ink flex items-center justify-center shadow-lg shadow-gold/20 backdrop-blur-md z-45 transition-colors focus:ring-2 focus:ring-gold/50 focus:outline-none cursor-pointer"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
