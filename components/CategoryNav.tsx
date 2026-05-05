'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

interface NavItem {
  id: string;
  label: { fr: string; en: string };
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'buffet-aperitif',      label: { fr: 'Apéritif',        en: 'Aperitif'     }, icon: '🥂' },
  { id: 'suggestions-boissons', label: { fr: 'Boissons',        en: 'Drinks'       }, icon: '🍹' },
  { id: 'cocktails',            label: { fr: 'Cocktails',       en: 'Cocktails'    }, icon: '🍸' },
  { id: 'menu-ti-moun',         label: { fr: 'Ti Moun',         en: 'Kids'         }, icon: '🧒' },
  { id: 'entrees',              label: { fr: 'Entrées',         en: 'Starters'     }, icon: '🦀' },
  { id: 'viandes',              label: { fr: 'Viandes',         en: 'Meat'         }, icon: '🥩' },
  { id: 'poissons',             label: { fr: 'Poissons',        en: 'Fish'         }, icon: '🐠' },
  { id: 'accompagnements',      label: { fr: 'Accompagnements', en: 'Sides'        }, icon: '🌿' },
  { id: 'desserts',             label: { fr: 'Desserts',        en: 'Desserts'     }, icon: '🍮' },
];

export default function CategoryNav() {
  const { t } = useLang();
  const [active, setActive] = useState('buffet-aperitif');
  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.id);
    const observer = new IntersectionObserver(
      (entries) => {
        let best: { id: string; ratio: number } | null = null;
        entries.forEach((e) => {
          if (e.isIntersecting && (!best || e.intersectionRatio > best.ratio)) {
            best = { id: e.target.id, ratio: e.intersectionRatio };
          }
        });
        if (best) setActive((best as { id: string }).id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.1, 0.5] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeBtn = navRef.current?.querySelector(`[data-id="${active}"]`) as HTMLElement;
    if (activeBtn && navRef.current) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sticky top-[64px] md:top-[80px] z-40 mb-10 md:mb-12"
    >
      <div className="glass-dark border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div
          ref={navRef}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-3"
          style={{ scrollbarWidth: 'none' }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                data-id={item.id}
                ref={isActive ? pillRef : null}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`relative flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-night-900'
                    : 'text-white/45 hover:text-white/75 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill-bg"
                    className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative text-sm" role="img" aria-hidden="true">{item.icon}</span>
                <span className="relative">{t(item.label)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
