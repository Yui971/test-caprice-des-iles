'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/context/LanguageContext';

const COPY = {
  fr: {
    tagline: 'Saveurs des Antilles',
    findUs: 'Nous trouver',
    credits: 'Conçu & développé par',
    legal: 'Mentions légales',
    legalTitle: 'Mentions légales',
    legalContent: [
      { heading: 'Éditeur du site', body: 'Restaurant <strong>Caprice des Îles</strong><br>Av. du Père Labat, Baillif 97123, Guadeloupe<br>Téléphone : +590 590 81 74 97' },
      { heading: 'Conception & développement', body: 'Ce site a été conçu et développé par <strong>Chrisnaël Berdier</strong>, étudiant en BUT MMI — Parcours Création Numérique à l\'IUT de Guadeloupe.' },
      { heading: 'Hébergement', body: 'Ce site est hébergé par <strong>GitHub Pages</strong> — GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis.' },
      { heading: 'Propriété intellectuelle', body: 'L\'ensemble des contenus (textes, photos, logo, mise en forme) présents sur ce site est la propriété du restaurant Caprice des Îles. Toute reproduction sans autorisation est interdite.' },
      { heading: 'Données personnelles', body: 'Ce site ne collecte aucune donnée personnelle et n\'utilise aucun cookie de suivi.' },
    ],
  },
  en: {
    tagline: 'Caribbean flavors',
    findUs: 'Find us',
    credits: 'Designed & developed by',
    legal: 'Legal notice',
    legalTitle: 'Legal Notice',
    legalContent: [
      { heading: 'Publisher', body: '<strong>Caprice des Îles</strong> Restaurant<br>Av. du Père Labat, Baillif 97123, Guadeloupe<br>Phone: +590 590 81 74 97' },
      { heading: 'Design & Development', body: 'This website was designed and developed by <strong>Chrisnaël Berdier</strong>, a Multimedia & Internet student at IUT de Guadeloupe.' },
      { heading: 'Hosting', body: 'This site is hosted by <strong>GitHub Pages</strong> — GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.' },
      { heading: 'Intellectual property', body: 'All content (text, photos, logo, layout) is the property of Caprice des Îles restaurant. Any reproduction without prior authorization is prohibited.' },
      { heading: 'Personal data', body: 'This site does not collect any personal data and does not use tracking cookies.' },
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
      <footer className="relative bg-night-950 border-t border-white/5">
        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 -translate-y-full">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 20 C360 40 720 0 1080 20 C1260 30 1380 10 1440 20 L1440 40 L0 40 Z" fill="#020810" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12">
                  <Image src="/img/logo.png" alt="" fill className="object-contain" />
                </div>
                <div>
                  <p className="font-serif font-semibold text-white text-lg">Caprice des Îles</p>
                  <p className="text-white/30 text-xs">{c.tagline}</p>
                </div>
              </div>
              <p className="text-white/25 text-xs leading-relaxed max-w-xs">
                Restaurant créole au cœur de Baillif, en Guadeloupe. Une cuisine authentique qui célèbre les saveurs des Antilles.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4">{c.findUs}</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://maps.google.com/?q=Av.+du+Pere+Labat,+Baillif+97123,+Guadeloupe"
                    target="_blank"
                    rel="noopener"
                    className="flex items-start gap-2.5 text-white/45 hover:text-white/75 text-sm transition-colors"
                  >
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Av. du Père Labat<br />Baillif 97123, Guadeloupe</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+590590817497"
                    className="flex items-center gap-2.5 text-white/45 hover:text-white/75 text-sm transition-colors"
                  >
                    <svg className="w-4 h-4 flex-shrink-0 text-gold-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    +590 590 81 74 97
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4">Suivez-nous</h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/capricedesilesguadeloupe/?locale=fr_FR"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/8 text-white/45 hover:text-white/80 hover:border-white/15 transition-all text-sm"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/le_caprice_des_iles"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/8 text-white/45 hover:text-white/80 hover:border-white/15 transition-all text-sm"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5 mb-6" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/20 text-xs">
            <p>© {year} Caprice des Îles · Tous droits réservés</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLegalOpen(true)}
                className="hover:text-white/50 transition-colors"
              >
                {c.legal}
              </button>
              <span>·</span>
              <span>
                {c.credits}{' '}
                <a
                  href="https://yui971.github.io/portfolio-berdier-chrisnael/"
                  target="_blank"
                  rel="noopener"
                  className="text-gold-500/50 hover:text-gold-400 transition-colors font-medium"
                >
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
          <motion.div
            key="legal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              key="legal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLegalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              key="legal-card"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 35 }}
              className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto glass-dark rounded-2xl border border-white/10 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif font-semibold text-xl text-white">{c.legalTitle}</h2>
                <button
                  onClick={() => setLegalOpen(false)}
                  className="text-white/40 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                  aria-label="Fermer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-5">
                {c.legalContent.map((section, i) => (
                  <div key={i}>
                    <h3 className="text-gold-400/80 text-xs font-semibold tracking-widest uppercase mb-2">{section.heading}</h3>
                    <p
                      className="text-white/50 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.body }}
                    />
                  </div>
                ))}
                <div className="pt-2 flex gap-4">
                  <a
                    href="https://yui971.github.io/portfolio-berdier-chrisnael/"
                    target="_blank"
                    rel="noopener"
                    className="text-gold-400/60 hover:text-gold-400 text-sm transition-colors"
                  >
                    Portfolio
                  </a>
                  <a
                    href="https://www.linkedin.com/in/chrisna%C3%ABl-berdier-b634a3389/"
                    target="_blank"
                    rel="noopener"
                    className="text-gold-400/60 hover:text-gold-400 text-sm transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
