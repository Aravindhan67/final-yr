import React from 'react';
import { motion } from 'framer-motion';
import {
  RiShieldCheckFill,
  RiBrainFill,
  RiSpeedFill,
  RiCodeBoxFill,
  RiFilePaperFill,
  RiLockPasswordFill,
} from 'react-icons/ri';
import SectionHeader from '../common/SectionHeader';

// ── Feature data ──────────────────────────────────────────────
const featuresData = [
  {
    icon: RiShieldCheckFill,
    title: 'Automated Manifest Verification',
    desc: 'Extracts critical configuration blocks—including security permissions, manifest components, broadcast receivers, and intent definitions—from Android assets.',
    color: '#2563EB',
    gradient: 'rgba(37,99,235,0.1)',
  },
  {
    icon: RiBrainFill,
    title: 'Gradient Boosting Classifiers',
    desc: 'Utilizes optimized decision tree ensembles with Bayesian boundary selection to perform statistical risk modeling and threat probability mapping.',
    color: '#06B6D4',
    gradient: 'rgba(6,182,212,0.1)',
  },
  {
    icon: RiSpeedFill,
    title: 'High-Throughput Profiling',
    desc: 'Performs byte-stream inspection and static extraction in seconds, completely avoiding the overhead and startup latency of emulator sandboxes.',
    color: '#22C55E',
    gradient: 'rgba(34,197,94,0.1)',
  },
  {
    icon: RiCodeBoxFill,
    title: 'Dalvik Bytecode Analysis',
    desc: 'Analyzes compiled Dalvik Executable (DEX) bytecode to isolate unsafe system calls, API class hierarchies, and embedded hardcoded namespaces.',
    color: '#F59E0B',
    gradient: 'rgba(245,158,11,0.1)',
  },
  {
    icon: RiFilePaperFill,
    title: 'Comprehensive Risk Metrics',
    desc: 'Compiles a detailed threat profile summarizing parsed package metadata, target SDK versions, model classification tags, and classifier confidence.',
    color: '#A855F7',
    gradient: 'rgba(168,85,247,0.1)',
  },
  {
    icon: RiLockPasswordFill,
    title: 'Secure Ephemeral Processing',
    desc: 'Decompresses and parses upload streams entirely in volatile memory, ensuring zero persistent disk trace of analyzed client applications.',
    color: '#EF4444',
    gradient: 'rgba(239,68,68,0.1)',
  },
];

// ── Single Feature Card ───────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, desc, color, gradient, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5, delay: index * 0.07 }}
    whileHover={{ y: -6, scale: 1.01 }}
    className="group relative rounded-2xl p-6 cursor-default overflow-hidden"
    style={{
      background: 'var(--card-color)',
      border: '1px solid var(--border-color)',
      backdropFilter: 'blur(12px)',
    }}
  >
    {/* Hover gradient overlay */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
      style={{ background: `radial-gradient(ellipse at 30% 30%, ${gradient} 0%, transparent 70%)` }}
    />

    {/* Top accent line */}
    <div
      className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
    />

    <div className="relative z-10">
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ background: gradient, color }}
      >
        <Icon size={22} />
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-foreground text-base mb-2 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted text-sm leading-relaxed transition-colors">
        {desc}
      </p>
    </div>
  </motion.div>
);

// ── Features Section ──────────────────────────────────────────
const Features = () => (
  <section className="section-padding">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        tag="Implementation"
        title={<>System <span className="gradient-text">Features &amp; Modules</span></>}
        subtitle="Technical design specifications of the static analysis pipeline and optimization module."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuresData.map((feature, i) => (
          <FeatureCard key={feature.title} {...feature} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Features;
