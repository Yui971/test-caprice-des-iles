'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

const NAV_ITEMS = [
  { id: 'buffet-aperitif',      label: { fr: 'Apéritif',    en: 'Aperitif'  } },
  { id: 'suggestions-boissons', label: { fr: 'Boissons',    en: 'Drinks'    } },
  { id: 'cocktails',            label: { fr: 'Cocktails',   en: 'Cocktails' } },
  { id: 'menu-ti-moun',         label: { fr: 'Ti Moun',     en: 'Kids'      } },
  { id: 'entrees',              label: { fr: 'Entrées',     en: 'Starters'  } },
  { id: 'viandes',              label: { fr: 'Viandes',     en: 'Meat'      } },
  { id: 'poissons',             label: { fr: 'Poissons',    en: 'Fish'      } },
  { id: 'accompagnements',      label: { fr: 'Côtés',       en: 'Sides'     } },
  { id: 'desserts',             label: { fr: 'Desserts',    en: 'Desserts'  } },
];

const HOLD_MS = 200;

export default function CategoryNav() {
  const { t } = useLang();

  const [activeIdx, setActiveIdx] = useState(0);
  const [dragMode,  setDragMode]  = useState(false);
  const [dragIdx,   setDragIdx]   = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const btnRefs  = useRef<(HTMLButtonElement | null)[]>([]);

  // Mutable interaction state — avoids stale closure issues with listeners
  const isHolding  = useRef(false);
  const holdTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressedIdx = useRef(-1);
  const curDragIdx = useRef(0);
  const touchMoved = useRef(false);
  const touchTime  = useRef(0);
  const startX     = useRef(0);
  const startY     = useRef(0);

  /* ── Dynamic offset: bottom of sticky nav + small gap ── */
  const getOffset = () => {
    const track = trackRef.current;
    return track ? track.getBoundingClientRect().bottom + 8 : 140;
  };

  /* ── Scroll to section ── */
  const scrollToIdx = useCallback((idx: number) => {
    const el = document.getElementById(NAV_ITEMS[idx]?.id ?? '');
    if (!el) return;
    const track = trackRef.current;
    const offset = track ? track.getBoundingClientRect().bottom + 8 : 140;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }, []);

  /* ── Hit-test: nav-button index under a clientX ── */
  const idxFromX = (clientX: number): number => {
    const btns = btnRefs.current;
    for (let i = 0; i < btns.length; i++) {
      const r = btns[i]?.getBoundingClientRect();
      if (r && clientX >= r.left - 4 && clientX <= r.right + 4) return i;
    }
    if (clientX < (btns[0]?.getBoundingClientRect()?.left ?? 0)) return 0;
    return btns.length - 1;
  };

  const cancelHold = useCallback(() => {
    if (holdTimer.current) { clearTimeout(holdTimer.current); holdTimer.current = null; }
    isHolding.current  = false;
    pressedIdx.current = -1;
    setDragMode(false);
  }, []);

  /* ── Desktop: pointer events (mouse + stylus, NOT touch) ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const btn = (e.target as HTMLElement).closest('button');
      const idx = btn ? btnRefs.current.indexOf(btn as HTMLButtonElement) : -1;
      if (idx < 0) return;

      pressedIdx.current = idx;
      isHolding.current  = false;
      startX.current     = e.clientX;
      startY.current     = e.clientY;
      track.setPointerCapture(e.pointerId);

      holdTimer.current = setTimeout(() => {
        isHolding.current  = true;
        curDragIdx.current = idx;
        setDragMode(true);
        setDragIdx(idx);
      }, HOLD_MS);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !isHolding.current) return;
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
        setActiveIdx(final);
        scrollToIdx(final);
      } else if (pressedIdx.current >= 0) {
        const idx = pressedIdx.current;
        setActiveIdx(idx);
        scrollToIdx(idx);
      }
      pressedIdx.current = -1;
    };

    track.addEventListener('pointerdown',   onDown);
    track.addEventListener('pointermove',   onMove);
    track.addEventListener('pointerup',     onUp);
    track.addEventListener('pointercancel', cancelHold);
    return () => {
      track.removeEventListener('pointerdown',   onDown);
      track.removeEventListener('pointermove',   onMove);
      track.removeEventListener('pointerup',     onUp);
      track.removeEventListener('pointercancel', cancelHold);
    };
  }, [cancelHold, scrollToIdx]);

  /* ── Mobile: ALL listeners passive — never blocks native scroll ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const btn   = (e.target as HTMLElement).closest('button');
      const idx   = btn ? btnRefs.current.indexOf(btn as HTMLButtonElement) : -1;
      if (idx < 0) return;
      pressedIdx.current = idx;
      startX.current     = touch.clientX;
      startY.current     = touch.clientY;
      touchMoved.current = false;
      touchTime.current  = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (
        Math.abs(touch.clientX - startX.current) > 8 ||
        Math.abs(touch.clientY - startY.current) > 8
      ) {
        touchMoved.current = true;
      }
    };

    const onTouchEnd = () => {
      if (pressedIdx.current >= 0 && !touchMoved.current && Date.now() - touchTime.current < 350) {
        const idx = pressedIdx.current;
        setActiveIdx(idx);
        scrollToIdx(idx);
      }
      pressedIdx.current = -1;
      touchMoved.current = false;
    };

    const onTouchCancel = () => {
      pressedIdx.current = -1;
      touchMoved.current = false;
    };

    track.addEventListener('touchstart',  onTouchStart, { passive: true });
    track.addEventListener('touchmove',   onTouchMove,  { passive: true });
    track.addEventListener('touchend',    onTouchEnd,   { passive: true });
    track.addEventListener('touchcancel', onTouchCancel, { passive: true });
    return () => {
      track.removeEventListener('touchstart',  onTouchStart);
      track.removeEventListener('touchmove',   onTouchMove);
      track.removeEventListener('touchend',    onTouchEnd);
      track.removeEventListener('touchcancel', onTouchCancel);
    };
  }, [scrollToIdx]);

  /* ── Passive scroll tracking: find which section just passed the nav line ── */
  useEffect(() => {
    const onScroll = () => {
      if (isHolding.current) return;
      const track  = trackRef.current;
      const offset = track ? track.getBoundingClientRect().bottom + 8 : 140;
      let bestIdx  = 0;
      let bestTop  = -Infinity;

      NAV_ITEMS.forEach(({ id }, i) => {
        const el  = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        // Section whose top has passed the nav line and is most recently passed
        if (top <= offset && top > bestTop) { bestTop = top; bestIdx = i; }
      });

      setActiveIdx(bestIdx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Center active button inside the horizontal nav track ── */
  useEffect(() => {
    const btn   = btnRefs.current[activeIdx];
    const track = trackRef.current;
    if (!btn || !track) return;
    const center = btn.offsetLeft + btn.offsetWidth / 2;
    track.scrollTo({ left: center - track.offsetWidth / 2, behavior: 'smooth' });
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
          ref={trackRef}
          className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center gap-0.5 overflow-x-auto py-2.5 select-none"
          style={{
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            cursor: dragMode ? 'grabbing' : 'default',
          }}
        >
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              ref={(el) => { btnRefs.current[i] = el; }}
              className={`relative flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 ${
                displayIdx === i ? 'text-white' : 'text-[#9A836A] hover:text-[#5A4628]'
              }`}
            >
              {!dragMode && activeIdx === i && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B8820A] to-[#D4A825] shadow-[0_2px_10px_rgba(184,130,10,0.35)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              {dragMode && dragIdx === i && (
                <span
                  className="bubble-glass absolute rounded-full"
                  style={{ inset: '-5px -5px' }}
                />
              )}
              <span className="relative z-10">{t(item.label)}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
