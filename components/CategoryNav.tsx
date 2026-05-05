'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

const NAV_ITEMS = [
  { id: 'buffet-aperitif',      label: { fr: 'Apéritif',    en: 'Aperitif'   } },
  { id: 'suggestions-boissons', label: { fr: 'Boissons',    en: 'Drinks'     } },
  { id: 'cocktails',            label: { fr: 'Cocktails',   en: 'Cocktails'  } },
  { id: 'menu-ti-moun',         label: { fr: 'Ti Moun',     en: 'Kids'       } },
  { id: 'entrees',              label: { fr: 'Entrées',     en: 'Starters'   } },
  { id: 'viandes',              label: { fr: 'Viandes',     en: 'Meat'       } },
  { id: 'poissons',             label: { fr: 'Poissons',    en: 'Fish'       } },
  { id: 'accompagnements',      label: { fr: 'Côtés',       en: 'Sides'      } },
  { id: 'desserts',             label: { fr: 'Desserts',    en: 'Desserts'   } },
];

const HOLD_MS   = 160;
const NAV_OFFSET = 132; // header ~80px + sticky nav ~52px

export default function CategoryNav() {
  const { t } = useLang();

  const [activeIdx, setActiveIdx] = useState(0);
  const [dragMode,  setDragMode]  = useState(false);
  const [dragIdx,   setDragIdx]   = useState(0);

  const navRef  = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Mutable interaction state */
  const holdTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHolding    = useRef(false);
  const pressedIdx   = useRef(-1);
  const curDragIdx   = useRef(0);
  const startX       = useRef(0);
  const startY       = useRef(0);
  const didScroll    = useRef(false);   // user moved vertically → cancel hold

  /* ── Scroll section into view with exact offset ── */
  const scrollTo = (idx: number) => {
    const el = document.getElementById(NAV_ITEMS[idx]?.id ?? '');
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  /* ── Find nav-item index under a clientX coordinate ── */
  const idxFromX = (clientX: number): number => {
    const btns = btnRefs.current;
    for (let i = 0; i < btns.length; i++) {
      const r = btns[i]?.getBoundingClientRect();
      if (r && clientX >= r.left - 6 && clientX <= r.right + 6) return i;
    }
    const first = btns[0]?.getBoundingClientRect();
    if (first && clientX < first.left) return 0;
    const last  = btns[btns.length - 1]?.getBoundingClientRect();
    if (last  && clientX > last.right)  return btns.length - 1;
    return curDragIdx.current;
  };

  const cancelHold = () => {
    if (holdTimer.current) { clearTimeout(holdTimer.current); holdTimer.current = null; }
    isHolding.current = false;
    pressedIdx.current = -1;
    didScroll.current = false;
    setDragMode(false);
  };

  /* ── Pointer events (mouse + stylus) ── */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // handled by touch events below
      const btn = (e.target as HTMLElement).closest('button');
      if (!btn) return;
      const idx = btnRefs.current.indexOf(btn as HTMLButtonElement);
      if (idx < 0) return;

      pressedIdx.current = idx;
      isHolding.current  = false;
      didScroll.current  = false;
      startX.current     = e.clientX;
      startY.current     = e.clientY;
      nav.setPointerCapture(e.pointerId);

      holdTimer.current = setTimeout(() => {
        isHolding.current  = true;
        curDragIdx.current = idx;
        setDragMode(true);
        setDragIdx(idx);
      }, HOLD_MS);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (!isHolding.current) return;
      e.preventDefault();
      const idx = idxFromX(e.clientX);
      if (idx !== curDragIdx.current) { curDragIdx.current = idx; setDragIdx(idx); }
    };

    const onUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (holdTimer.current) { clearTimeout(holdTimer.current); holdTimer.current = null; }
      if (isHolding.current) {
        const final = idxFromX(e.clientX);
        isHolding.current = false;
        setDragMode(false);
        setActiveIdx(final >= 0 ? final : curDragIdx.current);
        scrollTo(final >= 0 ? final : curDragIdx.current);
      } else if (pressedIdx.current >= 0) {
        const idx = pressedIdx.current;
        setActiveIdx(idx);
        scrollTo(idx);
      }
      pressedIdx.current = -1;
    };

    nav.addEventListener('pointerdown',   onDown);
    nav.addEventListener('pointermove',   onMove, { passive: false });
    nav.addEventListener('pointerup',     onUp);
    nav.addEventListener('pointercancel', cancelHold);
    return () => {
      nav.removeEventListener('pointerdown',   onDown);
      nav.removeEventListener('pointermove',   onMove);
      nav.removeEventListener('pointerup',     onUp);
      nav.removeEventListener('pointercancel', cancelHold);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Touch events (mobile) — separate to allow native scroll ── */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const btn = (e.target as HTMLElement).closest('button');
      if (!btn) return;
      const idx = btnRefs.current.indexOf(btn as HTMLButtonElement);
      if (idx < 0) return;

      pressedIdx.current = idx;
      isHolding.current  = false;
      didScroll.current  = false;
      startX.current     = touch.clientX;
      startY.current     = touch.clientY;

      holdTimer.current = setTimeout(() => {
        if (!didScroll.current) {
          isHolding.current  = true;
          curDragIdx.current = idx;
          setDragMode(true);
          setDragIdx(idx);
        }
      }, HOLD_MS);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - startX.current);
      const dy = Math.abs(touch.clientY - startY.current);

      /* Vertical scroll intent — cancel hold, let browser scroll normally */
      if (!isHolding.current) {
        if (dy > 8 && dy > dx) {
          didScroll.current = true;
          cancelHold();
        }
        return;
      }

      /* We're in drag mode — block scroll, update drag index */
      e.preventDefault();
      const idx = idxFromX(touch.clientX);
      if (idx !== curDragIdx.current) { curDragIdx.current = idx; setDragIdx(idx); }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (holdTimer.current) { clearTimeout(holdTimer.current); holdTimer.current = null; }

      if (isHolding.current) {
        const final = idxFromX(touch.clientX);
        isHolding.current = false;
        setDragMode(false);
        const picked = final >= 0 ? final : curDragIdx.current;
        setActiveIdx(picked);
        scrollTo(picked);
      } else if (pressedIdx.current >= 0 && !didScroll.current) {
        const idx = pressedIdx.current;
        setActiveIdx(idx);
        scrollTo(idx);
      }

      pressedIdx.current = -1;
      didScroll.current  = false;
    };

    nav.addEventListener('touchstart', onTouchStart, { passive: true });
    nav.addEventListener('touchmove',  onTouchMove,  { passive: false });
    nav.addEventListener('touchend',   onTouchEnd,   { passive: true });
    nav.addEventListener('touchcancel', cancelHold,  { passive: true });
    return () => {
      nav.removeEventListener('touchstart', onTouchStart);
      nav.removeEventListener('touchmove',  onTouchMove);
      nav.removeEventListener('touchend',   onTouchEnd);
      nav.removeEventListener('touchcancel', cancelHold);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── IntersectionObserver — passive scroll tracking ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isHolding.current) return;
        let best: { idx: number; ratio: number } | null = null;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = NAV_ITEMS.findIndex((i) => i.id === e.target.id);
          if (idx >= 0 && (!best || e.intersectionRatio > best.ratio))
            best = { idx, ratio: e.intersectionRatio };
        });
        if (best) setActiveIdx((best as { idx: number }).idx);
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: [0.1, 0.5] },
    );
    NAV_ITEMS.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  /* ── Scroll active button into view inside the nav track ── */
  useEffect(() => {
    btnRefs.current[activeIdx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeIdx]);

  const displayIdx = dragMode ? dragIdx : activeIdx;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="sticky top-[64px] md:top-[80px] z-40 mb-10 md:mb-12"
    >
      <div className="glass-nav border-b border-[rgba(180,155,100,0.13)] shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
        <div
          ref={navRef}
          className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center gap-0.5 overflow-x-auto py-2.5"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', userSelect: 'none',
            cursor: dragMode ? 'grabbing' : 'default' }}
        >
          {NAV_ITEMS.map((item, i) => {
            const isDisplay = displayIdx === i;
            const isBubble  = dragMode && dragIdx === i;
            const isActive  = !dragMode && activeIdx === i;

            return (
              <button
                key={item.id}
                ref={(el) => { btnRefs.current[i] = el; }}
                style={{ userSelect: 'none' }}
                className={`relative flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 ${
                  isDisplay ? 'text-white' : 'text-[#9A836A] hover:text-[#5A4628]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B8820A] to-[#D4A825] shadow-[0_2px_10px_rgba(184,130,10,0.35)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {isBubble && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="bubble-glass absolute rounded-full"
                    style={{ inset: '-5px -5px' }}
                    initial={{ scale: 0.88 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  />
                )}
                <span className="relative z-10">{t(item.label)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
