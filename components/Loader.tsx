'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MIN_DISPLAY = 2400; // ms

export default function Loader() {
  const [phase,   setPhase]   = useState<'enter' | 'hold' | 'exit' | 'done'>('enter');

  useEffect(() => {
    // After minimum display, start exit
    const t = setTimeout(() => setPhase('exit'), MIN_DISPLAY);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === 'exit') {
      const t = setTimeout(() => setPhase('done'), 700);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'exit' ? 0 : 1 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #F9EDCC 0%, #FDF6E8 50%, #E8F5EF 100%)' }}
      >
        {/* ── Ambient blobs ── */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-amber-300/30 top-[-15%] right-[-10%]"
          style={{ filter: 'blur(90px)' }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-teal-200/25 bottom-[-15%] left-[-8%]"
          style={{ filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* ── Logo block ── */}
        <motion.div
          initial={{ scale: 0.55, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mb-10 flex items-center justify-center"
        >
          {/* Outer pulse ring 1 */}
          <motion.div
            className="absolute rounded-full border border-[#B8820A]/20"
            style={{ width: 260, height: 260 }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Outer pulse ring 2 */}
          <motion.div
            className="absolute rounded-full border border-[#C41030]/12"
            style={{ width: 300, height: 300 }}
            animate={{ scale: [1, 1.14, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />

          {/* Inner glow */}
          <div className="absolute w-48 h-48 rounded-full bg-amber-200/40" style={{ filter: 'blur(30px)' }} />

          {/* Logo circle */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/85 flex items-center justify-center border-2 border-[#B8820A]/25 shadow-[0_10px_60px_rgba(184,130,10,0.22),0_0_0_6px_rgba(255,255,255,0.5)]">
            {/* Spinning arc */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
              style={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="100" cy="100" r="97"
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth="1.5"
                strokeDasharray="120 490"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C41030" stopOpacity="0" />
                  <stop offset="50%" stopColor="#C41030" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D4A825" stopOpacity="0" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Logo image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="img/logo.png"
              alt="Caprice des Îles"
              className="w-32 h-32 md:w-36 md:h-36 object-contain"
            />
          </div>
        </motion.div>

        {/* ── Text block ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="text-center"
        >
          <p className="text-[#B8820A]/70 text-xs font-semibold tracking-[0.35em] uppercase mb-2">
            Restaurant
          </p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-[#C41030] leading-tight">
            Caprice des Îles
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-3 my-3"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#B8820A]/40" />
            <svg className="w-2.5 h-2.5 text-[#B8820A]/50" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#B8820A]/40" />
          </motion.div>
          <p className="text-[#9A836A] text-sm tracking-[0.18em] uppercase">
            Saveurs des Antilles · Baillif, Guadeloupe
          </p>
        </motion.div>

        {/* ── Loading dots ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-2 mt-10"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -7, 0], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.17, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full bg-[#B8820A]/55"
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
