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

export default function MenuCard({ plat, index = 0 }: { plat: Plat; index?: number }) {
  const { lang, t } = useLang();
  const unavailable = !plat.disponible || plat.tags.includes('rupture');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-[#FEFAF2] rounded-xl px-4 sm:px-5 py-4 border transition-all duration-250 ${
        unavailable
          ? 'opacity-45 border-[#EDE5CF]'
          : 'border-[#E0D0A8] hover:border-[#B8820A]/35 hover:shadow-[0_4px_20px_rgba(184,130,10,0.10)] hover:bg-white'
      }`}
    >
      {/* Hover shine */}
      {!unavailable && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B8820A]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl" />
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {plat.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1.5">
              {plat.tags.map((tag) => (
                <MenuBadge key={tag} tag={tag} lang={lang} />
              ))}
            </div>
          )}
          <h3 className={`font-serif text-base md:text-[17px] leading-snug ${unavailable ? 'text-[#9A836A] line-through' : 'text-[#1C1408]'}`}>
            {t(plat.nom)}
          </h3>
          {plat.description && (
            <p className="text-[#9A836A] text-xs mt-1 leading-relaxed">{t(plat.description)}</p>
          )}
        </div>

        <div className="flex-shrink-0 text-right">
          {plat.prix !== null ? (
            <>
              <span className={`font-semibold text-base md:text-lg font-serif ${unavailable ? 'text-[#C4B090]' : 'gold-text'}`}>
                {plat.prix.toFixed(2)}<span className="text-xs ml-0.5">€</span>
              </span>
              {plat.prix_note && (
                <p className="text-[#9A836A] text-[10px] mt-0.5 leading-tight max-w-[100px]">{t(plat.prix_note)}</p>
              )}
            </>
          ) : (
            <span className="text-[#C4B090] text-xs italic">{lang === 'fr' ? 'inclus' : 'included'}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
