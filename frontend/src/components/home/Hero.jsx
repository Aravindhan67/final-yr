import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiShieldFlashFill, RiBrainFill, RiBarChart2Fill } from 'react-icons/ri';
import { HiArrowRight, HiChevronDown } from 'react-icons/hi';
import ParticleCanvas from '../common/ParticleCanvas';

// ── Floating shield illustration on the right side of the hero ─
const ShieldIllustration = () => (
  <div className="relative flex items-center justify-center w-full h-full min-h-[420px]">

    {/* Outer rotating ring */}
    <div
      className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#2563EB]/15 animate-spin-slow"
      style={{ animationDuration: '25s' }}
    />
    {/* Middle dashed ring */}
    <div
      className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-dashed border-[#06B6D4]/10 animate-spin-slow"
      style={{ animationDirection: 'reverse', animationDuration: '18s' }}
    />

    {/* Center shield */}
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative z-10 w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center rounded-3xl
                 border border-[#2563EB]/30"
      style={{
        background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(6,182,212,0.08) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 60px rgba(37,99,235,0.3), 0 0 120px rgba(37,99,235,0.1)',
      }}
    >
      <RiShieldFlashFill className="text-[#2563EB] text-7xl sm:text-8xl" />
      {/* Scan line */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-[#06B6D4]/60 to-transparent"
        />
      </div>
    </motion.div>

    {/* Floating glass cards */}
    {/* Card 1 — top left */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
      className="absolute top-6 left-4 sm:left-10 flex items-center gap-2 px-3 py-2 rounded-xl
                 border border-[#22C55E]/25 text-xs font-semibold text-foreground"
      style={{ background: 'rgba(34,197,94,0.08)', backdropFilter: 'blur(12px)' }}
    >
      <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
      AI Detection Active
    </motion.div>

    {/* Card 2 — bottom left */}
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      className="absolute bottom-10 left-2 sm:left-6 flex items-center gap-2 px-3 py-2 rounded-xl
                 border border-[#2563EB]/25 text-xs font-semibold text-foreground"
      style={{ background: 'rgba(37,99,235,0.08)', backdropFilter: 'blur(12px)' }}
    >
      <RiBrainFill className="text-[#2563EB]" size={14} />
      Static Analysis
    </motion.div>

    {/* Card 3 — right */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      className="absolute top-1/2 right-0 sm:right-4 -translate-y-1/2
                 flex items-center gap-2 px-3 py-2 rounded-xl
                 border border-[#06B6D4]/25 text-xs font-semibold text-foreground"
      style={{ background: 'rgba(6,182,212,0.08)', backdropFilter: 'blur(12px)' }}
    >
      <RiBarChart2Fill className="text-[#06B6D4]" size={14} />
      98.21% Accuracy
    </motion.div>
  </div>
);

// ── Hero animations ───────────────────────────────────────────
const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ── Hero Component ────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Layered backgrounds */}
    <div className="absolute inset-0 cyber-grid" />
    <div className="absolute inset-0 radial-glow" />
    <ParticleCanvas />

    {/* Decorative rings — centered */}
    <div
      aria-hidden="true"
      className="absolute top-1/2 right-0 lg:right-[10%] -translate-y-1/2
                 w-[500px] h-[500px] rounded-full border border-[#2563EB]/5 pointer-events-none"
    />

    {/* Content */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── Left: Copy ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Eyebrow badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 mb-8
            rounded-full glass border border-[#2563EB]/30 text-accent text-xs font-bold"
          >
            <span className="w-2 h-2 bg-[#22C55E] rounded-full" />
            Automated Malware Analysis & Threat Classification
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
          >
            <span className="text-foreground">Android Threat</span>
            <br />
            <span
              className="gradient-text"
              style={{ textShadow: 'none', filter: 'drop-shadow(0 0 30px rgba(37,99,235,0.5))' }}
            >
              Intelligence &
            </span>
            <br />
            <span className="text-foreground">Classification</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-6 text-muted text-lg sm:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            Deploy automated static malware inspection. Parse Dalvik bytecode and Android manifest resources using our proprietary threat intelligence engines to isolate malicious behaviors.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
          >
            <Link
              to="/upload"
              className="group w-full sm:w-auto flex items-center justify-center gap-2
                         px-8 py-4 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold
                         rounded-xl text-sm glow-blue transition-all duration-200 hover:scale-105"
            >
              <RiShieldFlashFill size={18} />
              Analyze APK
              <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto flex items-center justify-center gap-2
                         px-8 py-4 glass border border-border hover:border-[#2563EB]/40
                         text-foreground font-semibold rounded-xl text-sm
                         transition-all duration-200 hover:bg-[#2563EB]/5"
            >
              Methodology
            </Link>
          </motion.div>

          {/* Inline mini-stats */}
          <motion.div
            variants={item}
            className="mt-12 flex items-center justify-center lg:justify-start gap-8"
          >
            {[
              { val: '98.21%', label: 'Model Accuracy' },
              { val: '215',    label: 'Static Features' },
              { val: '<12s',   label: 'Analysis Time' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="font-heading font-black text-2xl gradient-text">{val}</p>
                <p className="text-muted text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Shield Illustration ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="hidden lg:block"
        >
          <ShieldIllustration />
        </motion.div>
      </div>
    </div>

  </section>
);

export default Hero;
