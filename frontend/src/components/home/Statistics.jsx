import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';

// ── Animated number counter hook ─────────────────────────────
const useCounter = (target, duration = 1800, active = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const isDecimal = String(target).includes('.');
    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, numericTarget);
      setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
};

// ── Single statistic card ─────────────────────────────────────
const StatCard = ({ value, label, sub, suffix, delay, active }) => {
  const num = useCounter(value, 1600, active);
  const displayNum = String(value).includes('.') ? num.toFixed(2) : Math.floor(num);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="relative text-center p-8 rounded-2xl overflow-hidden group cursor-default"
      style={{
        backgroundColor: 'var(--card-color)',
        border: '1px solid transparent',
        backgroundClip: 'padding-box',
      }}
    >
      {/* Gradient border via pseudo-element simulation */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.35), rgba(6,182,212,0.15))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
           style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)' }} />

      <p className="font-heading text-4xl sm:text-5xl font-black gradient-text">
        {displayNum}{suffix || ''}
      </p>
      <p className="text-foreground font-semibold text-sm mt-2">{label}</p>
      <p className="text-muted text-xs mt-1">{sub}</p>
    </motion.div>
  );
};

// ── Statistics Section ────────────────────────────────────────
const statsData = [
  { value: 98.21,  suffix: '%', label: 'Test Set Accuracy',   sub: 'Validation Test Split' },
  { value: 99.01,  suffix: '%', label: 'Sensitivity / Recall', sub: 'True Positive Rate' },
  { value: 98.83,  suffix: '%', label: 'F1-Score Metric',      sub: 'Harmonic Mean of P&R' },
  { value: 100,    suffix: '',  label: 'Optimization Cycles',  sub: 'Automated Hyperparameter Selection' },
];

const Statistics = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="section-padding" style={{ background: 'var(--card-alt-color)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Validation"
          title={<>Model <span className="gradient-text">Evaluation</span> Results</>}
          subtitle="Performance benchmarks evaluated against holdout test partitions using Stratified 5-Fold Cross-Validation."
        />
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {statsData.map(({ value, suffix, label, sub }, i) => (
            <StatCard
              key={label}
              value={value}
              suffix={suffix}
              label={label}
              sub={sub}
              delay={i * 0.08}
              active={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
