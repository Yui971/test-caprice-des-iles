'use client';

import { motion } from 'framer-motion';
import MenuBadge from './MenuBadge';
import { useLang } from '@/context/LanguageContext';

interface Plat {
  id: string;
  nom: { fr: string; en: string };
  description?: { fr: string; en: string };
  prix: number | null;
  prix_note?: { fr: string; en: string };
  disponible: boolean;
  tags: string[];
}

interface Props { plat: Plat; index?: number; }

export default function MenuCard({ plat, index = 0 }: Props) {
  const { lang, t } = useLang();
  const unavailable = !plat.disponible || plat.tags.includes('rupture');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative glass rounded-xl p-4 sm:p-5 border transition-all duration-300 ${
        unavailable
          ? 'opacity-50 border-white/5'
          : 'border-white/6 hover:border-gold-500/20 hover:shadow-card hover:bg-white/[0.06]'
      }`}
    >
      {/* Subtle top shine on hover */}
      {!unavailable && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl" />
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Tags */}
          {plat.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {plat.tags.map((tag) => (
                <MenuBadge key={tag} tag={tag} lang={lang} />
              ))}
            </div>
          )}

          {/* Name */}
          <h3 className={`font-serif text-base md:text-lg leading-snug ${unavailable ? 'text-white/30 line-through' : 'text-white/90'}`}>
            {t(plat.nom)}
          </h3>

          {/* Description */}
          {plat.description && (
            <p className="text-white/40 text-xs mt-1 leading-relaxed">{t(plat.description)}</p>
          )}
        </div>

        {/* Price */}
        <div className="flex-shrink-0 text-right">
          {plat.prix !== null ? (
            <>
              <span className={`font-semibold text-base md:text-lg font-serif ${unavailable ? 'text-white/25' : 'gold-text'}`}>
                {plat.prix.toFixed(2)}<span className="text-xs ml-0.5">€</span>
              </span>
              {plat.prix_note && (
                <p className="text-white/30 text-[10px] mt-0.5 leading-tight max-w-[100px]">{t(plat.prix_note)}</p>
              )}
            </>
          ) : (
            <span className="text-white/25 text-xs italic">{lang === 'fr' ? 'inclus' : 'included'}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
