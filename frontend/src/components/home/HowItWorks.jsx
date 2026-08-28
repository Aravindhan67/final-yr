import React from 'react';
import { motion } from 'framer-motion';
import {
  RiUploadCloud2Fill,
  RiFileTextFill,
  RiCodeBoxFill,
  RiDatabase2Fill,
  RiRobot2Fill,
  RiBarChart2Fill,
} from 'react-icons/ri';
import SectionHeader from '../common/SectionHeader';

// ── Timeline step data ────────────────────────────────────────
const steps = [
  {
    icon: RiUploadCloud2Fill,
    num:  '01',
    title: 'Payload Ingestion',
    desc: 'Accepts the target application package into our volatile processing buffer, validating ZIP headers and file structure integrity.',
    color: '#2563EB',
  },
  {
    icon: RiFileTextFill,
    num:  '02',
    title: 'Resource Decoding',
    desc: 'Extracts and parses the binary-encoded manifest format, mapping requested API permissions and application components.',
    color: '#06B6D4',
  },
  {
    icon: RiCodeBoxFill,
    num:  '03',
    title: 'Bytecode Inspection',
    desc: 'Decompiles compiling units and DEX byte streams to map dynamic code paths, class definitions, and core system calls.',
    color: '#A855F7',
  },
  {
    icon: RiDatabase2Fill,
    num:  '04',
    title: 'Vector Projection',
    desc: 'Synthesizes extracted bytecode references and permissions into high-dimensional binary vectors conforming to standard threat models.',
    color: '#F59E0B',
  },
  {
    icon: RiRobot2Fill,
    num:  '05',
    title: 'Ensemble Scoring',
    desc: 'Evaluates the feature matrix using gradient-boosted decision trees to predict threat classification labels.',
    color: '#22C55E',
  },
  {
    icon: RiBarChart2Fill,
    num:  '06',
    title: 'Telemetry Output',
    desc: 'Compiles class confidence scores, threat status, and vulnerability vectors into detailed dashboard metrics.',
    color: '#EF4444',
  },
];

// ── Single Timeline Step ──────────────────────────────────────
const TimelineStep = ({ icon: Icon, num, title, desc, color, index, isLast }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex gap-0">

      {/* ── Mobile layout: left column only ── */}
      <div className="flex lg:hidden gap-5 w-full">
        {/* Left: connector + dot */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10"
            style={{
              background: `${color}20`,
              border: `2px solid ${color}40`,
              boxShadow: `0 0 16px ${color}30`,
            }}
          >
            <Icon size={18} style={{ color }} />
          </motion.div>
          {!isLast && (
            <div className="flex-1 w-px mt-2" style={{ background: `linear-gradient(to bottom, ${color}40, transparent)` }} />
          )}
        </div>

        {/* Right: content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="pb-10 flex-1"
        >
          <p className="text-xs font-mono mb-1" style={{ color }}>{num}</p>
          <h3 className="font-heading font-bold text-foreground text-base mb-1">{title}</h3>
          <p className="text-muted text-sm leading-relaxed">{desc}</p>
        </motion.div>
      </div>

      {/* ── Desktop layout: alternating sides ── */}
      <div className={`hidden lg:flex w-full items-start gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          className="w-5/12"
        >
          <div
            className={`rounded-2xl p-6 ${isLeft ? 'mr-6' : 'ml-6'} group cursor-default
                        hover:border-opacity-50 transition-all duration-300`}
            style={{
              background: 'var(--card-color)',
              border: `1px solid ${color}25`,
              backdropFilter: 'blur(12px)',
            }}
          >
            <p className="font-mono text-xs font-bold mb-2" style={{ color }}>{num}</p>
            <h3 className="font-heading font-bold text-foreground text-base mb-2">{title}</h3>
            <p className="text-muted text-sm leading-relaxed">{desc}</p>
          </div>
        </motion.div>

        {/* Center: icon + connector */}
        <div className="flex-shrink-0 w-2/12 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center z-10"
            style={{
              background: `${color}15`,
              border: `2px solid ${color}35`,
              boxShadow: `0 0 24px ${color}25`,
            }}
          >
            <Icon size={22} style={{ color }} />
          </motion.div>
          {!isLast && (
            <div
              className="w-px flex-1 mt-3 min-h-[60px]"
              style={{ background: `linear-gradient(to bottom, ${color}30, transparent)` }}
            />
          )}
        </div>

        {/* Spacer */}
        <div className="w-5/12" />
      </div>
    </div>
  );
};

// ── How It Works Section ──────────────────────────────────────
const HowItWorks = () => (
  <section className="section-padding" style={{ background: 'var(--card-alt-color)' }}>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        tag="Data Flow"
        title={<>Static Analysis <span className="gradient-text">Pipeline</span></>}
        subtitle="Step-by-step extraction and classification sequence performed by the detection engine."
      />

      <div>
        {steps.map((step, i) => (
          <TimelineStep
            key={step.num}
            {...step}
            index={i}
            isLast={i === steps.length - 1}
          />
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
