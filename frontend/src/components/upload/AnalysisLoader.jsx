import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiUploadCloud2Fill,
  RiFileTextFill,
  RiCodeBoxFill,
  RiDatabase2Fill,
  RiRobot2Fill,
  RiBarChart2Fill,
  RiCheckFill,
} from 'react-icons/ri';

// Analysis pipeline steps shown during processing
const STEPS = [
  { icon: RiUploadCloud2Fill, label: 'Uploading APK',            duration: 1200 },
  { icon: RiFileTextFill,     label: 'Reading Android Manifest', duration: 2000 },
  { icon: RiCodeBoxFill,      label: 'Analyzing DEX Bytecode',   duration: 2500 },
  { icon: RiDatabase2Fill,    label: 'Extracting Features',      duration: 2000 },
  { icon: RiRobot2Fill,       label: 'Running AI Model',         duration: 1500 },
  { icon: RiBarChart2Fill,    label: 'Generating Report',        duration: 800  },
];

/**
 * AnalysisLoader — full-screen loading overlay shown during APK analysis.
 * Cycles through pipeline steps with animated progress.
 * Props: uploadProgress (0-100) from axios
 */
const AnalysisLoader = ({ uploadProgress = 0 }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [barProgress, setBarProgress] = useState(uploadProgress);

  // Advance through steps automatically
  useEffect(() => {
    let stepIndex = 0;

    const advance = () => {
      if (stepIndex >= STEPS.length) return;

      const delay = STEPS[stepIndex]?.duration || 1500;
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, stepIndex]);
        stepIndex++;
        setCurrentStep(stepIndex);
        // Update progress bar proportionally to steps
        setBarProgress(Math.min(95, Math.round(((stepIndex) / STEPS.length) * 95)));
        advance();
      }, delay);

      return timer;
    };

    advance();
  }, []);

  // Merge real upload progress into bar during step 0
  useEffect(() => {
    if (currentStep === 0) {
      setBarProgress(Math.min(15, uploadProgress * 0.15));
    }
  }, [uploadProgress, currentStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/97 backdrop-blur-md"
    >
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-6">

        {/* Spinning shield */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 rounded-full border-2 border-dashed border-[#2563EB]/30"
            />
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-3 rounded-full border border-[#06B6D4]/20"
            />
            {/* Shield icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <RiRobot2Fill className="text-[#2563EB] text-3xl" />
              </motion.div>
            </div>
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: '0 0 40px rgba(37,99,235,0.25)' }}
            />
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-heading font-bold text-foreground text-xl mb-1">
            Analyzing APK
          </h2>
          <p className="text-muted text-sm">
            AI-powered static analysis in progress…
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted mb-2">
            <span>Analysis Progress</span>
            <span>{barProgress}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden bg-border">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)' }}
              animate={{ width: `${barProgress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Step list */}
        <div className="flex flex-col gap-2.5">
          {STEPS.map(({ icon: Icon, label }, i) => {
            const isDone    = completedSteps.includes(i);
            const isActive  = currentStep === i;
            const isPending = !isDone && !isActive;

            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: isActive
                    ? 'rgba(37,99,235,0.1)'
                    : isDone
                      ? 'rgba(34,197,94,0.05)'
                      : 'transparent',
                  border: isActive
                    ? '1px solid rgba(37,99,235,0.25)'
                    : isDone
                      ? '1px solid rgba(34,197,94,0.1)'
                      : '1px solid transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Step icon */}
                <div
                  className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: isDone
                      ? 'rgba(34,197,94,0.15)'
                      : isActive
                        ? 'rgba(37,99,235,0.15)'
                        : 'var(--border-color)',
                  }}
                >
                  {isDone ? (
                    <RiCheckFill size={14} className="text-[#22C55E]" />
                  ) : isActive ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}>
                      <Icon size={14} className="text-[#2563EB]" />
                    </motion.div>
                  ) : (
                    <Icon size={14} className="text-muted" />
                  )}
                </div>

                {/* Label */}
                <span
                  className="text-sm font-medium"
                  style={{ color: isDone ? '#22C55E' : isActive ? 'var(--text-color)' : 'var(--text-muted)' }}
                >
                  {label}
                </span>

                {/* Active dots */}
                {isActive && (
                  <div className="ml-auto flex gap-1">
                    {[0, 1, 2].map(dot => (
                      <motion.span
                        key={dot}
                        className="w-1 h-1 rounded-full bg-[#2563EB]"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }}
                      />
                    ))}
                  </div>
                )}

                {/* Done checkmark badge */}
                {isDone && (
                  <span className="ml-auto text-[10px] text-[#22C55E] font-semibold">Done</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-center text-muted text-xs mt-8">
          This may take up to 30 seconds depending on APK size
        </p>
      </div>
    </motion.div>
  );
};

export default AnalysisLoader;
