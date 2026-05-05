'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/context/LanguageContext';

const navItems = {
  fr: [
    { label: 'Entrées',         href: '#entrees' },
    { label: 'Viandes',         href: '#viandes' },
    { label: 'Poissons',        href: '#poissons' },
    { label: 'Cocktails',       href: '#cocktails' },
    { label: 'Desserts',        href: '#desserts' },
  ],
  en: [
    { label: 'Starters',        href: '#entrees' },
    { label: 'Meat',            href: '#viandes' },
    { label: 'Fish',            href: '#poissons' },
    { label: 'Cocktails',       href: '#cocktails' },
    { label: 'Desserts',        href: '#desserts' },
  ],
};

export default function Header() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const items = navItems[lang];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-dark border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Brand */}
            <a href="#top" className="flex items-center gap-3 group" aria-label="Caprice des Îles">
              <div className="relative w-9 h-9 md:w-11 md:h-11 flex-shrink-0">
                <Image
                  src="/img/logo.png"
                  alt=""
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="font-serif font-semibold text-base md:text-lg text-white/90 leading-tight hidden sm:block">
                Caprice des Îles
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Navigation principale">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-pill text-sm font-medium text-white/60 hover:text-white/95 tracking-wide"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right: lang + mobile toggle */}
            <div className="flex items-center gap-3">
              {/* Lang toggle */}
              <div className="flex items-center glass rounded-full px-1 py-1 gap-0.5">
                {(['fr', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                      lang === l
                        ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-night-900'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                    aria-pressed={lang === l}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden glass p-2 rounded-xl text-white/70 hover:text-white transition-colors"
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={menuOpen}
              >
                <motion.div
                  animate={menuOpen ? 'open' : 'closed'}
                  className="w-5 h-5 flex flex-col justify-between"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      variants={{
                        closed: { rotate: 0, y: 0, opacity: 1 },
                        open: {
                          rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                          y:      i === 0 ? 7  : i === 2 ? -7  : 0,
                          opacity: i === 1 ? 0 : 1,
                        },
                      }}
                      transition={{ duration: 0.25 }}
                      className="block w-full h-0.5 bg-current rounded-full origin-center"
                    />
                  ))}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 glass-dark flex flex-col pt-20 pb-8 px-6 lg:hidden"
              aria-label="Navigation mobile"
            >
              <div className="flex flex-col gap-1 mt-4">
                {items.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                    className="text-lg font-serif font-medium text-white/80 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-all flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 opacity-60" />
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                <a
                  href="tel:+590590817497"
                  className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+590 590 81 74 97</span>
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
