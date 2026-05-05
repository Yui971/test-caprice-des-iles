'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

const PHRASES = {
  fr: {
    welcome:  'Bienvenue au',
    tagline:  'Saveurs authentiques des Antilles',
    cta:      'Découvrir la carte',
    reserve:  'Réserver une table',
    location: 'Av. du Père Labat, Baillif · Guadeloupe',
  },
  en: {
    welcome:  'Welcome to',
    tagline:  'Authentic Caribbean flavors',
    cta:      'Explore the menu',
    reserve:  'Book a table',
    location: 'Av. du Père Labat, Baillif · Guadeloupe',
  },
};

export default function Hero() {
  const { lang } = useLang();
  const p = PHRASES[lang];
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Warm tropical background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9EDCC] via-[#FDF6E8] to-[#E8F5EF]" />

      {/* Ambient blobs — warmer, more saturated */}
      <motion.div
        className="ambient-blob w-[600px] h-[600px] bg-amber-300/45 top-[-10%] right-[-8%]"
        animate={{ x: [0, 25, 0], y: [0, 18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-blob w-[500px] h-[500px] bg-teal-300/30 bottom-[-15%] left-[-8%]"
        animate={{ x: [0, -18, 0], y: [0, -22, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-blob w-[350px] h-[350px] bg-orange-200/35 top-1/3 left-1/4"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Decorative tropical leaves — neutral/monochrome */}
      <TropicalLeaf className="absolute top-16 left-4 md:left-14 w-20 md:w-32 text-[#1C1408]/7 animate-[leafSway_9s_ease-in-out_infinite]" />
      <TropicalLeaf className="absolute bottom-20 right-4 md:right-16 w-24 md:w-36 text-[#1C1408]/5 animate-[leafSway_9s_ease-in-out_3s_infinite] rotate-180" />
      <TropicalLeaf className="absolute top-2/5 right-10 w-14 text-[#1C1408]/5 animate-[leafSway_11s_ease-in-out_1.5s_infinite]" />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-amber-400/40 top-1/4 left-1/3"
        animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-teal-400/50 top-2/3 right-1/3"
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto"
      >
        {/* Logo — agrandi */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8 md:mb-10"
        >
          <div className="relative w-36 h-36 md:w-44 md:h-44">
            <div className="absolute inset-0 rounded-full bg-amber-300/30 blur-2xl" />
            <div className="relative w-full h-full glass rounded-full p-5 border border-amber-400/35 shadow-[0_6px_40px_rgba(184,130,10,0.2)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="img/logo.png"
                alt="Caprice des Îles"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Welcome */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[#B8820A] text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-3"
        >
          {p.welcome}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] leading-tight mb-4"
        >
          <span className="text-[#C41030]">Caprice</span>{' '}
          <span className="shimmer-text italic">des Îles</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B8820A]/50" />
          <svg className="w-3 h-3 text-[#B8820A]/60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B8820A]/50" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="text-[#9A836A] text-lg md:text-xl font-light tracking-wide mb-10 md:mb-12"
        >
          {p.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#menu"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-white text-sm tracking-wide overflow-hidden shadow-[0_4px_20px_rgba(184,130,10,0.3)] hover:shadow-[0_6px_30px_rgba(184,130,10,0.45)] transition-shadow"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#B8820A] via-[#D4A825] to-[#B8820A] bg-[length:200%] transition-[background-position] duration-500 group-hover:bg-right" />
            <span className="relative">{p.cta}</span>
            <svg className="relative w-4 h-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>

          <a
            href="tel:+590590817497"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-[#5A4628] hover:text-[#1C1408] text-sm tracking-wide glass border border-[#E4D6B8] hover:border-[#B8820A]/30 transition-all shadow-sm"
          >
            <svg className="w-4 h-4 text-[#B8820A]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {p.reserve}
          </a>
        </motion.div>

        {/* Info row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[#9A836A] text-xs tracking-wide"
        >
          <a
            href="https://maps.google.com/?q=Av.+du+Pere+Labat,+Baillif+97123,+Guadeloupe"
            target="_blank" rel="noopener"
            className="flex items-center gap-2 hover:text-[#5A4628] transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-[#B8820A]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {p.location}
          </a>
          <span className="hidden sm:block w-px h-3 bg-[#E4D6B8]" />
          <div className="flex items-center gap-5">
            <a href="https://www.facebook.com/capricedesilesguadeloupe/?locale=fr_FR" target="_blank" rel="noopener" className="hover:text-[#5A4628] transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/le_caprice_des_iles" target="_blank" rel="noopener" className="hover:text-[#5A4628] transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#C4A870]/50"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-px h-8 bg-gradient-to-b from-[#B8820A]/40 to-transparent" />
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 25 C360 50 720 0 1080 25 C1260 37 1380 12 1440 25 L1440 50 L0 50 Z" fill="#FEFCF4" />
        </svg>
      </div>
    </section>
  );
}

function TropicalLeaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 190 C20 150 5 90 10 20 C10 20 30 60 60 80 C90 100 110 60 110 20 C115 90 100 150 60 190Z" fill="currentColor" />
      <path d="M60 190 L60 40" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M60 100 L30 70" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M60 120 L90 90" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M60 140 L35 120" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M60 155 L85 140" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}
