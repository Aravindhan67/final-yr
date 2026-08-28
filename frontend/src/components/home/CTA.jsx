import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiShieldFlashFill } from 'react-icons/ri';
import { HiArrowRight } from 'react-icons/hi';

/**
 * CTA — Full-width glass call-to-action card.
 * Large text, glow effects, scan button.
 */
const CTA = () => (
  <section className="section-padding">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl text-center px-8 py-20"
        style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(6,182,212,0.07) 100%)',
          border: '1px solid rgba(37,99,235,0.2)',
        }}
      >
        {/* Background blobs */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(37,99,235,0.08)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(6,182,212,0.08)' }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#06B6D4] text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            Inference Interface
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight"
          >
            Analyze Target{' '}
            <span className="gradient-text">APK File</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Submit an Android package archive to disassemble bytecode and map manifest features against learned boundaries.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/upload"
              className="group inline-flex items-center gap-2.5 px-10 py-4 bg-[#2563EB] hover:bg-[#1d4ed8]
                         text-white font-bold rounded-xl text-sm glow-blue
                         transition-all duration-200 hover:scale-105"
            >
              <RiShieldFlashFill size={18} />
              Analyze APK
              <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTA;
