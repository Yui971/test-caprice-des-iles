'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

const COPY = {
  fr: {
    tagline: 'Saveurs des Antilles',
    findUs:  'Nous trouver',
    follow:  'Suivez-nous',
    credits: 'Conçu & développé par',
    legal:   'Mentions légales',
    legalTitle: 'Mentions légales',
    sections: [
      { h: 'Éditeur du site',          b: 'Restaurant <strong>Caprice des Îles</strong><br>Av. du Père Labat, Baillif 97123, Guadeloupe<br>Téléphone : +590 590 81 74 97' },
      { h: 'Conception & développement', b: 'Site conçu et développé par <strong>Chrisnaël Berdier</strong>, étudiant en BUT MMI — Création Numérique à l\'IUT de Guadeloupe.' },
      { h: 'Hébergement',               b: 'Hébergé par <strong>GitHub Pages</strong> — GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis.' },
      { h: 'Propriété intellectuelle',  b: 'Tous les contenus (textes, photos, logo) sont la propriété du restaurant Caprice des Îles. Toute reproduction sans autorisation est interdite.' },
      { h: 'Données personnelles',      b: 'Ce site ne collecte aucune donnée personnelle et n\'utilise aucun cookie de suivi.' },
    ],
  },
  en: {
    tagline: 'Caribbean flavors',
    findUs:  'Find us',
    follow:  'Follow us',
    credits: 'Designed & developed by',
    legal:   'Legal notice',
    legalTitle: 'Legal Notice',
    sections: [
      { h: 'Publisher',               b: '<strong>Caprice des Îles</strong> Restaurant<br>Av. du Père Labat, Baillif 97123, Guadeloupe<br>Phone: +590 590 81 74 97' },
      { h: 'Design & Development',    b: 'Website designed and developed by <strong>Chrisnaël Berdier</strong>, Multimedia & Internet student at IUT de Guadeloupe.' },
      { h: 'Hosting',                 b: 'Hosted by <strong>GitHub Pages</strong> — GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.' },
      { h: 'Intellectual property',   b: 'All content (text, photos, logo) is the property of Caprice des Îles restaurant. Reproduction without authorization is prohibited.' },
      { h: 'Personal data',           b: 'This site does not collect any personal data and does not use tracking cookies.' },
    ],
  },
};

export default function Footer() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [legalOpen, setLegalOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#1C1408] text-white/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#B8820A]/20 p-1 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="img/logo.png" alt="" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="font-serif font-semibold text-white text-base">Caprice des Îles</p>
                  <p className="text-white/30 text-xs">{c.tagline}</p>
                </div>
              </div>
              <p className="text-white/25 text-xs leading-relaxed max-w-xs">
                Restaurant créole au cœur de Baillif, Guadeloupe. Une cuisine authentique qui célèbre les saveurs des Antilles.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-4">{c.findUs}</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://maps.google.com/?q=Av.+du+Pere+Labat,+Baillif+97123,+Guadeloupe" target="_blank" rel="noopener"
                    className="flex items-start gap-2.5 text-white/45 hover:text-white/70 text-sm transition-colors">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#B8820A]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Av. du Père Labat<br />Baillif 97123, Guadeloupe</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+590590817497" className="flex items-center gap-2.5 text-white/45 hover:text-white/70 text-sm transition-colors">
                    <svg className="w-4 h-4 flex-shrink-0 text-[#B8820A]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    +590 590 81 74 97
                  </a>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-4">{c.follow}</h3>
              <div className="flex items-center gap-3">
                {[
                  { href: 'https://www.facebook.com/capricedesilesguadeloupe/?locale=fr_FR', label: 'Facebook',
                    icon: <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />,
                    fill: true },
                  { href: 'https://www.instagram.com/le_caprice_des_iles', label: 'Instagram',
                    icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
                    fill: false },
                ].map(({ href, label, icon, fill }) => (
                  <a key={label} href={href} target="_blank" rel="noopener"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 text-white/40 hover:text-white/70 hover:border-white/15 transition-all text-sm"
                    aria-label={label}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke={fill ? undefined : 'currentColor'} strokeWidth={fill ? undefined : '2'} strokeLinecap="round" strokeLinejoin="round">
                      {icon}
                    </svg>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-white/6 mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/20 text-xs">
            <p>© {year} Caprice des Îles · Tous droits réservés</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setLegalOpen(true)} className="hover:text-white/45 transition-colors">{c.legal}</button>
              <span>·</span>
              <span>
                {c.credits}{' '}
                <a href="https://yui971.github.io/portfolio-berdier-chrisnael/" target="_blank" rel="noopener"
                  className="text-[#B8820A]/60 hover:text-[#D4A825] transition-colors font-medium">
                  Chrisnaël Berdier
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal modal */}
      <AnimatePresence>
        {legalOpen && (
          <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
          >
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setLegalOpen(false)}
              className="absolute inset-0 bg-[#1C1408]/50 backdrop-blur-sm"
            />
            <motion.div key="card"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 35 }}
              className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto bg-white rounded-2xl border border-[#E4D6B8] p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif font-semibold text-xl text-[#1C1408]">{c.legalTitle}</h2>
                <button onClick={() => setLegalOpen(false)}
                  className="text-[#9A836A] hover:text-[#1C1408] p-1.5 rounded-lg hover:bg-[#F8F3E6] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="space-y-5">
                {c.sections.map((s, i) => (
                  <div key={i}>
                    <h3 className="text-[#B8820A] text-[11px] font-semibold tracking-widest uppercase mb-1.5">{s.h}</h3>
                    <p className="text-[#5A4628] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: s.b }} />
                  </div>
                ))}
                <div className="pt-2 flex gap-4">
                  <a href="https://yui971.github.io/portfolio-berdier-chrisnael/" target="_blank" rel="noopener" className="text-[#B8820A] hover:text-[#8B6008] text-sm">Portfolio</a>
                  <a href="https://www.linkedin.com/in/chrisna%C3%ABl-berdier-b634a3389/" target="_blank" rel="noopener" className="text-[#B8820A] hover:text-[#8B6008] text-sm">LinkedIn</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
