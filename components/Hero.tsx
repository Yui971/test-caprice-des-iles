'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/context/LanguageContext';

const PHRASES = {
  fr: {
    welcome: 'Bienvenue au',
    tagline: 'Saveurs authentiques des Antilles',
    cta: 'Découvrir la carte',
    reserve: 'Réserver une table',
    location: 'Av. du Père Labat, Baillif · Guadeloupe',
    phone: '+590 590 81 74 97',
  },
  en: {
    welcome: 'Welcome to',
    tagline: 'Authentic Caribbean flavors',
    cta: 'Explore the menu',
    reserve: 'Book a table',
    location: 'Av. du Père Labat, Baillif · Guadeloupe',
    phone: '+590 590 81 74 97',
  },
};

export default function Hero() {
  const { lang } = useLang();
  const p = PHRASES[lang];
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background gradient + blobs ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020D1C] via-[#07243A] to-[#0A1E14]" />

      {/* Animated ambient blobs */}
      <motion.div
        className="ambient-blob w-[500px] h-[500px] bg-ocean-600/10 top-[-10%] left-[-5%]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-blob w-[600px] h-[600px] bg-palm-600/8 bottom-[-20%] right-[-10%]"
        animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-blob w-[300px] h-[300px] bg-coral-500/6 top-1/3 right-1/4"
        animate={{ x: [0, 15, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-blob w-[400px] h-[400px] bg-gold-500/5 bottom-1/3 left-1/3"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Tropical leaf decorations */}
      <TropicalLeaf className="absolute top-16 left-6 md:left-16 w-24 md:w-36 text-palm-700/25 animate-leaf-sway" />
      <TropicalLeaf className="absolute bottom-24 right-6 md:right-20 w-28 md:w-40 text-palm-700/20 animate-leaf-sway [animation-delay:3s] rotate-180" />
      <TropicalLeaf className="absolute top-1/3 right-12 w-16 text-palm-800/15 animate-leaf-sway [animation-delay:1.5s]" />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-gold-400/40 top-1/4 left-1/4"
        animate={{ y: [-12, 12, -12], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-coral-400/50 top-2/3 right-1/3"
        animate={{ y: [10, -10, 10], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-ocean-300/60 top-1/2 left-1/2"
        animate={{ y: [-8, 8, -8], x: [-4, 4, -4] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8 md:mb-10"
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <div className="absolute inset-0 rounded-full bg-gold-500/10 blur-xl animate-pulse-glow" />
            <div className="relative w-full h-full glass rounded-full p-4 border border-gold-500/20 shadow-glow-gold">
              <Image src="/img/logo.png" alt="Caprice des Îles" fill className="object-contain p-2" />
            </div>
          </div>
        </motion.div>

        {/* Welcome text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gold-400/80 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-3"
        >
          {p.welcome}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-4"
        >
          Caprice{' '}
          <span className="shimmer-text italic">des Îles</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/60" />
          <svg className="w-3 h-3 text-gold-500/70" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/60" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="text-white/50 text-base md:text-lg font-light tracking-wide mb-10 md:mb-12"
        >
          {p.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16"
        >
          <a
            href="#menu"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-night-900 text-sm tracking-wide overflow-hidden shadow-glow-gold transition-shadow hover:shadow-[0_0_40px_rgba(212,168,37,0.5)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%] transition-[background-position] duration-500 group-hover:bg-right" />
            <span className="relative">{p.cta}</span>
            <svg className="relative w-4 h-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>

          <a
            href="tel:+590590817497"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-white/80 hover:text-white text-sm tracking-wide glass border border-white/10 hover:border-white/20 transition-all"
          >
            <svg className="w-4 h-4 text-gold-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/35 text-xs tracking-wide"
        >
          <a
            href="https://maps.google.com/?q=Av.+du+Pere+Labat,+Baillif+97123,+Guadeloupe"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 hover:text-white/60 transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-gold-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {p.location}
          </a>
          <span className="hidden sm:block w-px h-3 bg-white/15" />
          <div className="flex items-center gap-5">
            <a href="https://www.facebook.com/capricedesilesguadeloupe/?locale=fr_FR" target="_blank" rel="noopener" className="hover:text-white/60 transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/le_caprice_des_iles" target="_blank" rel="noopener" className="hover:text-white/60 transition-colors" aria-label="Instagram">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 30 C360 60 720 0 1080 30 C1260 45 1380 20 1440 30 L1440 60 L0 60 Z" fill="#020D1C" />
        </svg>
      </div>
    </section>
  );
}

function TropicalLeaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 190 C20 150 5 90 10 20 C10 20 30 60 60 80 C90 100 110 60 110 20 C115 90 100 150 60 190Z" fill="currentColor" />
      <path d="M60 190 L60 40" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M60 100 L30 70" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M60 120 L90 90" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M60 140 L35 120" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M60 155 L85 140" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}
