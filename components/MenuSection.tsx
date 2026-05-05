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

export default function MenuSection({ category }: { category: Category }) {
  const { t } = useLang();

  return (
    <section id={category.id} className="mb-14 md:mb-20 scroll-mt-36">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-5 md:mb-7"
      >
        <div className="flex items-baseline gap-3 mb-1">
          <h2 className="font-serif font-semibold text-2xl md:text-3xl text-[#1C1408]">
            {t(category.nom)}
          </h2>
          {category.sous_titre && (
            <span className="text-[#9A836A] text-xs">— {t(category.sous_titre)}</span>
          )}
        </div>
        {/* Gold underline accent */}
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-10 rounded-full bg-gradient-to-r from-[#B8820A] to-[#F5CC40]" />
          <span className="h-px w-6 rounded-full bg-[#E4D6B8]" />
        </div>

        {category.note_globale && (
          <div className="flex items-start gap-2 text-[#9A836A] text-xs mt-3 ml-0.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#B8820A]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{t(category.note_globale)}</span>
          </div>
        )}
      </motion.div>

      {/* Formule */}
      {category.type === 'formule' && category.inclus && (
        <FormuleCard category={category} />
      )}

      {/* Standard */}
      {category.type === 'standard' && category.plats && (
        <div className="grid gap-2.5">
          {category.plats.map((plat, i) => (
            <MenuCard key={plat.id} plat={plat} index={i} />
          ))}
        </div>
      )}

      {/* Groupe */}
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
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-[#D4A825]/30 bg-gradient-to-br from-[#FFF8E8] to-[#FFFCF4]"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#B8820A]/40 to-transparent" />
      <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="flex-1">
          <p className="text-[#B8820A]/70 text-xs font-semibold tracking-widest uppercase mb-3">
            {lang === 'fr' ? 'Formule' : 'Set menu'}
          </p>
          <ul className="space-y-2">
            {category.inclus!.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 text-[#5A4628] text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8820A]/50 flex-shrink-0" />
                {t(item)}
              </motion.li>
            ))}
          </ul>
        </div>
        {category.prix && (
          <div className="flex-shrink-0 text-right">
            <span className="font-serif font-bold text-4xl shimmer-text leading-none">
              {category.prix.toFixed(2)}
            </span>
            <p className="text-[#9A836A] text-xs mt-1">€ / personne</p>
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
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-[#9A836A] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 flex items-center gap-2"
      >
        <span className="h-px w-5 bg-[#E4D6B8]" />
        {t(sub.nom)}
        <span className="h-px flex-1 bg-[#EDE5CF]" />
      </motion.h3>

      {sub.type_affichage === 'parfums' && sub.parfums ? (
        <IceCreamGrid sub={sub} />
      ) : sub.plats ? (
        <div className="grid gap-2.5">
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-[#FEFAF2] rounded-2xl border border-[#E0D0A8] p-5 sm:p-6"
    >
      {sub.prix_info && (
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-[#B8820A]/60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <span className="gold-text text-sm font-semibold">{t(sub.prix_info)}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {sub.parfums!.map((parfum, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.025 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#5A4628] bg-[#FBF7EE] border border-[#E4D6B8] hover:border-[#B8820A]/30 hover:text-[#1C1408] transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#B8820A] to-[#D4A825] flex-shrink-0" />
            {parfum[lang]}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
