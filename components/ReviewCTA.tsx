'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

const COPY = {
  fr: {
    title: 'Vous avez aimé ?',
    text: 'Partagez votre expérience et aidez d\'autres gourmets à découvrir le Caprice des Îles.',
    write: 'Laisser un avis sur Google',
    see: 'Voir tous les avis',
    badge: 'Votre avis compte',
  },
  en: {
    title: 'Did you enjoy?',
    text: 'Share your experience and help other food lovers discover Caprice des Îles.',
    write: 'Leave a review on Google',
    see: 'See all reviews',
    badge: 'Your opinion matters',
  },
};

const PLACE_ID = 'ChIJyxcXVitgE4wRYMKE8FP8uS4';

export default function ReviewCTA() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <section id="avis" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-950/40 to-transparent pointer-events-none" />
      <motion.div
        className="ambient-blob w-[500px] h-[500px] bg-gold-500/5 top-0 left-1/2 -translate-x-1/2"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 text-center">
        {/* Stars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-1.5 mb-6"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.svg
              key={i}
              initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-7 h-7 text-gold-400 drop-shadow-[0_0_8px_rgba(212,168,37,0.6)]"
              viewBox="0 0 24 24" fill="currentColor"
            >
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </motion.svg>
          ))}
        </motion.div>

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold-500/20 text-gold-400/70 text-xs font-semibold tracking-widest uppercase mb-5"
        >
          {c.badge}
        </motion.span>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-serif font-bold text-3xl md:text-4xl text-white mb-4"
        >
          {c.title}
        </motion.h2>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white/45 text-base leading-relaxed mb-10"
        >
          {c.text}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`https://search.google.com/local/writereview?placeid=${PLACE_ID}`}
            target="_blank"
            rel="noopener"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-night-900 text-sm tracking-wide overflow-hidden shadow-glow-gold hover:shadow-[0_0_40px_rgba(212,168,37,0.5)] transition-shadow"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%] transition-[background-position] duration-500 group-hover:bg-right" />
            <svg className="relative w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span className="relative">{c.write}</span>
          </a>

          <a
            href={`https://search.google.com/local/reviews?placeid=${PLACE_ID}`}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-white/65 hover:text-white text-sm tracking-wide glass border border-white/10 hover:border-white/20 transition-all"
          >
            <span>{c.see}</span>
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
