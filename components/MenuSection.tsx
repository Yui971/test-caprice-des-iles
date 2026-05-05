'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import MenuCard from './MenuCard';

interface Category {
  id: string;
  type: string;
  nom: { fr: string; en: string };
  sous_titre?: { fr: string; en: string };
  prix?: number;
  inclus?: { fr: string; en: string }[];
  note_globale?: { fr: string; en: string };
  plats?: Plat[];
  sous_categories?: SubCategory[];
  tags_definitions?: Record<string, { fr: string; en: string }>;
}

interface SubCategory {
  id: string;
  nom: { fr: string; en: string };
  plats?: Plat[];
  type_affichage?: string;
  prix_info?: { fr: string; en: string };
  parfums?: { fr: string; en: string }[];
}

interface Plat {
  id: string;
  nom: { fr: string; en: string };
  description?: { fr: string; en: string };
  prix: number | null;
  prix_note?: { fr: string; en: string };
  disponible: boolean;
  tags: string[];
}

const CATEGORY_ICONS: Record<string, string> = {
  'buffet-aperitif':    '🥂',
  'suggestions-boissons': '🍹',
  'cocktails':          '🍸',
  'menu-ti-moun':       '🧒',
  'entrees':            '🦀',
  'viandes':            '🥩',
  'poissons':           '🐠',
  'accompagnements':    '🌿',
  'desserts':           '🍮',
};

const CATEGORY_ACCENT: Record<string, string> = {
  'buffet-aperitif':    'from-ocean-600/20 to-ocean-800/5',
  'suggestions-boissons': 'from-ocean-500/20 to-transparent',
  'cocktails':          'from-coral-600/15 to-transparent',
  'menu-ti-moun':       'from-palm-600/15 to-transparent',
  'entrees':            'from-coral-700/20 to-transparent',
  'viandes':            'from-coral-600/20 to-transparent',
  'poissons':           'from-ocean-600/20 to-transparent',
  'accompagnements':    'from-palm-700/15 to-transparent',
  'desserts':           'from-gold-600/15 to-transparent',
};

export default function MenuSection({ category }: { category: Category }) {
  const { t } = useLang();
  const accent = CATEGORY_ACCENT[category.id] ?? 'from-white/5 to-transparent';
  const icon = CATEGORY_ICONS[category.id] ?? '🍽️';

  return (
    <section
      id={category.id}
      className="mb-16 md:mb-20 scroll-mt-24"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 md:mb-8"
      >
        <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r ${accent} border border-white/8 mb-4`}>
          <span className="text-2xl" role="img" aria-hidden="true">{icon}</span>
          <div>
            <h2 className="font-serif font-semibold text-xl md:text-2xl text-white">{t(category.nom)}</h2>
            {category.sous_titre && (
              <p className="text-white/40 text-xs mt-0.5">{t(category.sous_titre)}</p>
            )}
          </div>
        </div>

        {category.note_globale && (
          <div className="flex items-start gap-2 text-white/40 text-xs ml-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gold-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{t(category.note_globale)}</span>
          </div>
        )}
      </motion.div>

      {/* Formule card */}
      {category.type === 'formule' && category.inclus && (
        <FormuleCard category={category} />
      )}

      {/* Standard plats */}
      {category.type === 'standard' && category.plats && (
        <div className="grid gap-2.5 sm:gap-3">
          {category.plats.map((plat, i) => (
            <MenuCard key={plat.id} plat={plat} index={i} />
          ))}
        </div>
      )}

      {/* Groupe (sous-catégories) */}
      {category.type === 'groupe' && category.sous_categories && (
        <div className="space-y-8">
          {category.sous_categories.map((sub) => (
            <SubCategoryBlock key={sub.id} sub={sub} />
          ))}
        </div>
      )}
    </section>
  );
}

function FormuleCard({ category }: { category: Category }) {
  const { lang, t } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-gold-500/20 bg-gradient-to-br from-gold-900/20 to-night-900/40"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="flex-1">
          <p className="text-gold-400/60 text-xs font-semibold tracking-widest uppercase mb-3">
            {lang === 'fr' ? 'Formule' : 'Set menu'}
          </p>
          <ul className="space-y-2">
            {category.inclus!.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-center gap-3 text-white/75 text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500/60 flex-shrink-0" />
                {t(item)}
              </motion.li>
            ))}
          </ul>
        </div>
        {category.prix && (
          <div className="flex-shrink-0 text-right">
            <div className="inline-flex flex-col items-end">
              <span className="font-serif font-bold text-4xl shimmer-text leading-none">
                {category.prix.toFixed(2)}
              </span>
              <span className="text-gold-400/60 text-sm mt-1">€ / personne</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SubCategoryBlock({ sub }: { sub: SubCategory }) {
  const { t } = useLang();

  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center gap-2"
      >
        <span className="h-px flex-1 max-w-[2rem] bg-white/15" />
        {t(sub.nom)}
        <span className="h-px flex-1 bg-white/10" />
      </motion.h3>

      {/* Parfums display (ice cream) */}
      {sub.type_affichage === 'parfums' && sub.parfums ? (
        <IceCreamGrid sub={sub} />
      ) : sub.plats ? (
        <div className="grid gap-2.5 sm:gap-3">
          {sub.plats.map((plat, i) => (
            <MenuCard key={plat.id} plat={plat} index={i} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function IceCreamGrid({ sub }: { sub: SubCategory }) {
  const { lang, t } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl border border-white/6 p-5 sm:p-6"
    >
      {sub.prix_info && (
        <div className="flex items-center gap-2 mb-5">
          <svg className="w-4 h-4 text-gold-400/60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <span className="gold-text text-sm font-semibold">{t(sub.prix_info)}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {sub.parfums!.map((parfum, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/70 glass border border-white/8 hover:border-gold-500/20 hover:text-white/90 transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-gold-400 to-coral-400 flex-shrink-0" />
            {parfum[lang]}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
