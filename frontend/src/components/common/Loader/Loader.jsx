import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable premium loader with a nested concentric circle layout,
 * customized to fit the cybersecurity aesthetic.
 */
const Loader = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative w-16 h-16">
        {/* Outer tracking ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#2563EB]/10" />

        {/* Outer animated spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#2563EB] border-r-[#2563EB]/30"
        />

        {/* Inner animated reverse spinner */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border border-transparent border-t-[#06B6D4] border-l-[#06B6D4]/30"
        />

        {/* Core pulsing status dot */}
        <div className="absolute inset-5 bg-[#2563EB]/25 rounded-full flex items-center justify-center">
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
