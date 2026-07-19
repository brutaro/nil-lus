import React from "react";
import { motion } from "motion/react";
import { Award, Music, Disc, Star } from "lucide-react";

interface StatsProps {
  t: any;
}

export default function Stats({ t }: StatsProps) {
  const icons = [
    <Disc className="w-5 h-5 text-gold" />,
    <Music className="w-5 h-5 text-gold" />,
    <Award className="w-5 h-5 text-gold" />,
    <Star className="w-5 h-5 text-gold" />,
  ];

  return (
    <section id="stats" className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 glass-panel rounded-2xl shadow-xl shadow-black/40 border-white/10">
        {t.stats.map((stat: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center p-4 border-r border-white/5 last:border-r-0 col-span-1"
          >
            {/* Elegant glass bubble for the icon */}
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/10 shadow-inner">
              {icons[index]}
            </div>
            
            <span
              id={`stat-value-${index}`}
              className="font-serif text-3xl sm:text-4xl font-bold text-ivory tracking-tight"
            >
              {stat.value}
            </span>
            
            <span
              id={`stat-label-${index}`}
              className="text-xs font-bold text-gold-soft uppercase tracking-wider mt-1"
            >
              {stat.label}
            </span>
            
            <span className="text-[10px] sm:text-xs text-mist mt-1 max-w-[140px] font-normal leading-normal">
              {stat.desc}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
