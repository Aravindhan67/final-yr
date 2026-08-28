import React from 'react';
import { motion } from 'framer-motion';
import {
  RiShieldFlashFill, RiBrainFill, RiCodeBoxFill,
  RiDatabase2Fill, RiFlashlightFill, RiSettings4Fill,
} from 'react-icons/ri';

// ── Fade-up animation ─────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true, amount: 0.2 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

// ── Section header ────────────────────────────────────────────
const Heading = ({ tag, title }) => (
  <div className="mb-8">
    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">{tag}</p>
    <h2 className="font-heading font-black text-2xl sm:text-3xl text-foreground">{title}</h2>
  </div>
);

// ── Info card ─────────────────────────────────────────────────
const InfoCard = ({ icon: Icon, title, body, color, delay }) => (
  <motion.div {...fadeUp(delay)}
    className="rounded-2xl p-6 group cursor-default"
    style={{ background: 'var(--card-color)', border: '1px solid var(--border-color)' }}
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}15`, color }}>
      <Icon size={20} />
    </div>
    <h3 className="font-heading font-bold text-foreground text-base mb-2">{title}</h3>
    <p className="text-muted text-sm leading-relaxed">{body}</p>
  </motion.div>
);

// ── Architecture diagram ──────────────────────────────────────
const ArchStep = ({ label, desc, color, isLast }) => (
  <div className="flex items-start gap-4">
    <div className="flex flex-col items-center">
      <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ background: color, boxShadow: `0 0 10px ${color}60` }} />
      {!isLast && <div className="w-px flex-1 my-1.5" style={{ background: `${color}30`, minHeight: 28 }} />}
    </div>
    <div className="pb-4">
      <p className="text-foreground font-semibold text-sm">{label}</p>
      <p className="text-muted text-xs mt-0.5 leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ── About page ─────────────────────────────────────────────────
const About = () => (
  <div className="min-h-screen pb-20" style={{ background: 'var(--bg-color)' }}>

    {/* Hero strip */}
    <div className="relative overflow-hidden border-b border-border" style={{ background: 'var(--card-alt-color)' }}>
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div {...fadeUp(0)}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#2563EB]/30 text-primary text-xs font-bold mb-6">
            <RiShieldFlashFill size={12} />
            Threat Analysis Framework
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-foreground mb-4">
            Technical <span className="gradient-text">Overview</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Automated bytecode inspection and static threat analysis platform designed to identify Dalvik payloads using optimized gradient-boosted ensembles.
          </p>
        </motion.div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">

      {/* Android Malware */}
      <section>
        <motion.div {...fadeUp(0)}>
          <Heading tag="Threat Analysis" title="Threat Horizon & Categorization" />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div {...fadeUp(0.05)}>
            <p className="text-muted leading-relaxed mb-4">
              Modern mobile threat actors utilize obfuscated DEX wrappers, class reflection, and dynamic class loaders to bypass traditional signature-based antiviruses.
            </p>
            <p className="text-muted leading-relaxed">
              This analytics framework relies on high-dimensional manifest feature mapping and call-graph inspections to evaluate threat signatures within unsigned package archives.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Trojans',    pct: 68, color: '#EF4444' },
              { label: 'Adware',     pct: 45, color: '#F59E0B' },
              { label: 'Ransomware', pct: 32, color: '#A855F7' },
              { label: 'Spyware',    pct: 28, color: '#06B6D4' },
            ].map(({ label, pct, color }) => (
              <motion.div
                key={label}
                {...fadeUp(0.1)}
                className="rounded-xl p-4"
                style={{ background: 'var(--card-color)', border: '1px solid var(--border-color)' }}
              >
                <p className="font-heading font-black text-2xl" style={{ color }}>{pct}%</p>
                <p className="text-muted text-xs mt-0.5">{label}</p>
                <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Static Analysis */}
      <section>
        <motion.div {...fadeUp(0)}><Heading tag="Pipeline" title="Automated Feature Engineering Pipeline" /></motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <InfoCard icon={RiCodeBoxFill}  color="#2563EB" delay={0}    title="Manifest Parsing"      body="Extracts declared permissions, activities, intent filters, and structural entry-points from the binary application XML format." />
          <InfoCard icon={RiDatabase2Fill} color="#06B6D4" delay={0.06} title="Bytecode Disassembly" body="Decompiles class indexes and filters API call namespaces, system calls, and static resources from compiled binaries." />
          <InfoCard icon={RiShieldFlashFill} color="#22C55E" delay={0.12} title="Signature Feature Extraction"  body="Converts parsed tokens into a high-dimensional binary feature matrix mapping API calls, permission declarations, and network indicators." />
        </div>
      </section>

      {/* ML Section */}
      <section>
        <motion.div {...fadeUp(0)}><Heading tag="Scoring Engine" title="Ensemble Modeling & Optimization Protocol" /></motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InfoCard icon={RiBrainFill}      color="#A855F7" delay={0}    title="Predictive Threat Ensembles" body="Evaluates static vectors using optimized decision tree ensembles, utilizing Stratified K-Fold partition sweeps to optimize generalization." />
          <InfoCard icon={RiFlashlightFill} color="#F59E0B" delay={0.06} title="Hyperparameter Calibration Protocol"    body="Our custom optimization framework performs extensive parameter search sweeps to minimize false positive metrics and maximize detection." />
          <InfoCard icon={RiSettings4Fill}  color="#06B6D4" delay={0.12} title="Threat Database Seeding"    body="Trained and validated on extensive malicious payload datasets to establish accurate threat categorization boundaries." />
          <InfoCard icon={RiDatabase2Fill}  color="#22C55E" delay={0.18} title="Telemetry & Validation Profiles"    body="Achieves 98.21% classification accuracy, 99.01% recall (TPR), and a 98.83% F1-score on holdout partitions." />
        </div>
      </section>

      {/* Architecture */}
      <section>
        <motion.div {...fadeUp(0)}><Heading tag="Architecture" title="Production System Components" /></motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Frontend flow */}
          <motion.div
            {...fadeUp(0.05)}
            className="rounded-2xl p-6"
            style={{ background: 'var(--card-color)', border: '1px solid var(--border-color)' }}
          >
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-5">Client Interface Layer</p>
            {[
              { label: 'Payload Submission',       desc: 'Validates target package file structure before sending a multipart form request.', color: '#2563EB' },
              { label: 'Analysis Observer',        desc: 'Watches API progress states during decompression and class parsing.', color: '#06B6D4' },
              { label: 'Report Rendering',         desc: 'Renders evaluation metrics, package metadata, and class features.', color: '#22C55E' },
            ].map((s, i) => (
              <ArchStep key={s.label} {...s} isLast={i === 2} />
            ))}
          </motion.div>

          {/* Backend flow */}
          <motion.div
            {...fadeUp(0.1)}
            className="rounded-2xl p-6"
            style={{ background: 'var(--card-color)', border: '1px solid var(--border-color)' }}
          >
            <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-5">Inference Gateway Service</p>
            {[
              { label: 'ZIP Parser',            desc: 'Extracts code streams and manifest configurations from the package archive.', color: '#A855F7' },
              { label: 'Bytecode Decoder',        desc: 'Iterates and decompiles binary blocks to extract class structures and resources.', color: '#F59E0B' },
              { label: 'Feature Extraction',      desc: 'Transforms parsed classes and permissions into flat feature vectors.', color: '#06B6D4' },
              { label: 'Threat Ensemble Prediction', desc: 'Predicts target probability label and outputs a security classification.', color: '#22C55E' },
            ].map((s, i) => (
              <ArchStep key={s.label} {...s} isLast={i === 3} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  </div>
);

export default About;
