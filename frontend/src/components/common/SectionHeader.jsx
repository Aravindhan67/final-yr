import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionHeader — reusable heading block used across all sections.
 * Props: tag (eyebrow), title (JSX or string), subtitle (string)
 */
const SectionHeader = ({ tag, title, subtitle, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={{
      hidden:  {},
      visible: { transition: { staggerChildren: 0.1 } },
    }}
    className={`text-center mb-14 ${className}`}
  >
    {tag && (
      <motion.p
        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3"
      >
        {tag}
      </motion.p>
    )}
    <motion.h2
      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
      className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        className="text-muted mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

export default SectionHeader;
