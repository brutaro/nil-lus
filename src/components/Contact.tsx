import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MapPin, Mail, Phone, Heart } from "lucide-react";

interface ContactProps {
  t: any;
  lang: "pt" | "en";
}

export default function Contact({ t, lang }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsSubmittedError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setIsSubmittedError(true);
      setTimeout(() => setIsSubmittedError(false), 4000);
      return;
    }

    setIsSubmitted(true);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section id="contato" className="py-24 bg-ink relative overflow-hidden">
      {/* Visual glowing bubble backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-wine/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] flex items-center justify-center">
            <Send className="w-3.5 h-3.5 mr-2" />
            {lang === "pt" ? "DIREÇÃO E CONTATOS" : "BOOKING & INQUIRIES"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="text-sm sm:text-base text-mist max-w-lg mx-auto font-normal leading-relaxed">
            {t.contact.subheading}
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Management Agencies info */}
          <div className="lg:col-span-6 space-y-8 text-left">
            {t.contact.agencies.map((agency: any, idx: number) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4 shadow-lg shadow-black/20 hover:border-gold/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 pb-3 border-b border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-ivory">
                    {agency.title}
                  </h3>
                </div>

                <div className="space-y-3 font-sans text-xs sm:text-sm text-mist leading-relaxed font-normal">
                  {agency.manager && (
                    <p className="font-semibold text-ivory/90">
                      {agency.manager} {agency.reg && <span className="text-[10px] text-gold font-mono ml-1 font-bold">{agency.reg}</span>}
                    </p>
                  )}

                  {agency.address && (
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        {agency.address.map((line: string, aIdx: number) => (
                          <span key={aIdx} className="block">{line}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {agency.phones && (
                    <div className="flex items-start space-x-2">
                      <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        {agency.phones.map((phone: string, pIdx: number) => (
                          <span key={pIdx} className="block">{phone}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {agency.emails && (
                    <div className="flex items-start space-x-2">
                      <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        {agency.emails.map((email: string, eIdx: number) => (
                          <a href={`mailto:${email}`} key={eIdx} className="block hover:text-gold transition-colors truncate">
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {agency.extra && (
                    <div className="text-[10px] uppercase font-mono tracking-wider text-gold-soft pt-2 border-t border-white/5">
                      {agency.extra.join(" | ")}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Contact form box with glassmorphism */}
          <div className="lg:col-span-6 col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <h3 className="font-serif font-bold text-xl text-ivory mb-2 pb-3 border-b border-white/5 text-left">
                      {t.contact.formTitle}
                    </h3>

                    {/* Notification on Missing Fields */}
                    {isError && (
                      <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-300 font-semibold text-left">
                        {t.contact.errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="flex flex-col text-left space-y-1.5">
                        <label className="text-[10px] font-bold text-gold-soft uppercase tracking-wider">
                          {t.contact.formName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-ivory hover:border-white/20 focus:border-gold focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col text-left space-y-1.5">
                        <label className="text-[10px] font-bold text-gold-soft uppercase tracking-wider">
                          {t.contact.formEmail} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-ivory hover:border-white/20 focus:border-gold focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone input */}
                      <div className="flex flex-col text-left space-y-1.5">
                        <label className="text-[10px] font-bold text-gold-soft uppercase tracking-wider">
                          {t.contact.formPhone}
                        </label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-ivory hover:border-white/20 focus:border-gold focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Subject input */}
                      <div className="flex flex-col text-left space-y-1.5">
                        <label className="text-[10px] font-bold text-gold-soft uppercase tracking-wider">
                          {t.contact.formSubject}
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-ivory hover:border-white/20 focus:border-gold focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message body input */}
                    <div className="flex flex-col text-left space-y-1.5">
                      <label className="text-[10px] font-bold text-gold-soft uppercase tracking-wider">
                        {t.contact.formMessage} *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-ivory hover:border-white/20 focus:border-gold focus:outline-none transition-colors resize-none scrollbar-hide"
                      />
                    </div>

                    {/* Submit action */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-ink bg-gold hover:bg-gold-soft transition-all duration-300 shadow-lg hover:shadow-gold/25 cursor-pointer uppercase focus:ring-2 focus:ring-gold/50 focus:outline-none"
                    >
                      <Send className="w-3.5 h-3.5 mr-2" />
                      {t.contact.formSend}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-gold mx-auto shadow-lg shadow-gold/10">
                      <Heart className="w-7 h-7 fill-gold" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-ivory">
                      {lang === "pt" ? "Obrigado pelo envio!" : "Thank You!"}
                    </h3>
                    <p className="text-sm text-mist max-w-sm mx-auto leading-relaxed font-normal">
                      {t.contact.successMsg}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center text-xs font-bold text-gold hover:text-gold-soft uppercase tracking-widest pt-4 block mx-auto"
                    >
                      {lang === "pt" ? "Enviar outra mensagem" : "Send another message"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
