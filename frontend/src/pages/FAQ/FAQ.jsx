import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { RiShieldFlashFill } from 'react-icons/ri';

// ── FAQ data ──────────────────────────────────────────────────
const faqs = [
  {
    q: 'What does the classification engine analyze?',
    a: 'The engine analyzes Dalvik Executables (DEX) and package manifests (APKs) to identify unauthorized behaviors, including credential exfiltration (spyware), API hijacking (banking trojans), and device lockouts (ransomware) prior to installation.',
  },
  {
    q: 'What are the model evaluation benchmarks?',
    a: 'The predictive decision ensemble achieves a 98.21% accuracy rate, 99.01% true positive rate (recall), and a 98.83% F1-score, validated against our internal holdout partitions.',
  },
  {
    q: 'What are the data retention policies?',
    a: 'Payload archives are processed ephemerally in volatile memory (RAM) and immediately garbage-collected upon classification output. No client code is serialized or persisted to disk.',
  },
  {
    q: 'Which static telemetry features are extracted?',
    a: 'The pipeline decodes application package assets to map permission declarations, API namespace usage, intent filters, registered services, and system calls into a high-dimensional binary array.',
  },
  {
    q: 'What makes the classification engine so fast?',
    a: 'By utilizing optimized tree structures to process binary feature vectors, the engine avoids the heavy resource overhead of dynamic code execution, ensuring sub-second inference latencies.',
  },
  {
    q: 'How is the classifier optimized?',
    a: 'Classifier boundaries and hyperparameter weights—including tree depth and regularization penalties—are tuned using extensive search procedures across multiple validation folds.',
  },
  {
    q: 'How are false positive alerts managed?',
    a: 'Empirical evaluations indicate a 1.79% margin of error. For enterprise-grade decisions, it is recommended to complement static results with dynamic sandboxing or multi-engine correlation.',
  },
];

// ── Single accordion item ──────────────────────────────────────
const FaqItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: open ? 'rgba(37,99,235,0.06)' : 'var(--card-color)',
        border: open ? '1px solid rgba(37,99,235,0.25)' : '1px solid var(--border-color)',
        transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-heading font-semibold text-foreground text-sm sm:text-base pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <HiChevronDown
            size={20}
            className={open ? 'text-[#2563EB]' : 'text-gray-600'}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <div className="w-full h-px bg-border mb-4" />
              <p className="text-muted text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── FAQ Page ───────────────────────────────────────────────────
const FAQ = () => (
  <div className="min-h-screen pb-20 bg-bg">

    {/* Header */}
    <div className="relative overflow-hidden bg-card-alt border-b border-border">
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#2563EB]/30 text-primary text-xs font-bold mb-6">
            <RiShieldFlashFill size={12} />
            Help Center
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-foreground mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Everything you need to know about static analysis, classification metrics, and parameter optimization.
          </p>
        </motion.div>
      </div>
    </div>

    {/* Accordion */}
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex flex-col gap-3">
        {faqs.map((item, i) => (
          <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
        ))}
      </div>
    </div>
  </div>
);

export default FAQ;
