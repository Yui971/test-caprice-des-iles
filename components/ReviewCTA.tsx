'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

const COPY = {
  fr: {
    badge: 'Votre avis compte',
    title: 'Vous avez aimé ?',
    text:  "Partagez votre expérience et aidez d'autres gourmets à découvrir le Caprice des Îles.",
    write: 'Laisser un avis sur Google',
    see:   'Voir tous les avis',
  },
  en: {
    badge: 'Your opinion matters',
    title: 'Did you enjoy?',
    text:  'Share your experience and help other food lovers discover Caprice des Îles.',
    write: 'Leave a review on Google',
    see:   'See all reviews',
  },
};

const PLACE_ID = 'ChIJyxcXVitgE4wRYMKE8FP8uS4';

export default function ReviewCTA() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <section id="avis" className="relative py-20 md:py-28 bg-[#F8F3E6] overflow-hidden">
      {/* Decorative blobs */}
      <motion.div
        className="ambient-blob w-[450px] h-[450px] bg-amber-200/30 top-0 left-1/2 -translate-x-1/2"
        animate={{ scale: [1, 1.12, 1] }}
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
              transition={{ delay: 0.3 + i * 0.09, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-7 h-7 text-[#B8820A] drop-shadow-[0_2px_6px_rgba(184,130,10,0.4)]"
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
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#D4A825]/30 text-[#B8820A] text-xs font-semibold tracking-widest uppercase mb-5"
        >
          {c.badge}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-serif font-bold text-3xl md:text-4xl text-[#1C1408] mb-4"
        >
          {c.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="text-[#9A836A] text-base leading-relaxed mb-10"
        >
          {c.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`https://search.google.com/local/writereview?placeid=${PLACE_ID}`}
            target="_blank" rel="noopener"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-white text-sm tracking-wide overflow-hidden shadow-[0_4px_18px_rgba(184,130,10,0.3)] hover:shadow-[0_6px_28px_rgba(184,130,10,0.45)] transition-shadow"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#B8820A] via-[#D4A825] to-[#B8820A] bg-[length:200%] transition-[background-position] duration-500 group-hover:bg-right" />
            <svg className="relative w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span className="relative">{c.write}</span>
          </a>

          <a
            href={`https://search.google.com/local/reviews?placeid=${PLACE_ID}`}
            target="_blank" rel="noopener"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-[#5A4628] hover:text-[#1C1408] text-sm bg-white border border-[#E4D6B8] hover:border-[#B8820A]/30 transition-all shadow-sm"
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
