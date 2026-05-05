import type { Lang } from '@/context/LanguageContext';

const tagMeta: Record<string, { fr: string; en: string; cls: string }> = {
  signature:      { fr: 'Signature',     en: 'Signature',       cls: 'badge-signature'    },
  local:          { fr: 'Antillais',     en: 'Caribbean',       cls: 'badge-local'        },
  'plat-du-jour': { fr: 'Plat du jour',  en: 'Dish of the day', cls: 'badge-plat-du-jour' },
  rupture:        { fr: 'Indisponible',  en: 'Unavailable',     cls: 'badge-rupture'      },
  sauce:          { fr: 'Sauce au choix',en: 'Choice of sauce', cls: 'badge-sauce'        },
};

interface Props { tag: string; lang: Lang; }

export default function MenuBadge({ tag, lang }: Props) {
  const meta = tagMeta[tag];
  if (!meta) return null;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase ${meta.cls}`}>
      {meta[lang]}
    </span>
  );
}
