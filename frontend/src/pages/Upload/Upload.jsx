import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiShieldFlashFill, RiInformationFill, RiCheckboxCircleFill } from 'react-icons/ri';
import DropZone        from '../../components/upload/DropZone';
import AnalysisLoader  from '../../components/upload/AnalysisLoader';
import { uploadApk }   from '../../services/apkService';
import { saveScan }    from '../../utils/scanHistory';

// ── Upload tips ───────────────────────────────────────────────
const tips = [
  'Only Android APK files are supported (.apk extension).',
  'Maximum file size is 200 MB.',
  'Analysis typically completes in under 30 seconds.',
  'APK files are discarded immediately after analysis.',
];

// ── Upload Page ───────────────────────────────────────────────
const Upload = () => {
  const navigate = useNavigate();

  const [selectedFile,    setSelectedFile]    = useState(null);
  const [isAnalyzing,     setIsAnalyzing]     = useState(false);
  const [uploadProgress,  setUploadProgress]  = useState(0);
  const [error,           setError]           = useState('');

  // Called when user clicks "Analyze"
  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setError('');
    setIsAnalyzing(true);
    setUploadProgress(0);

    try {
      const result = await uploadApk(selectedFile, setUploadProgress);

      // Persist scan to localStorage (Dashboard reads this)
      saveScan(result);

      // Store current result in sessionStorage for the Result page
      sessionStorage.setItem('scanResult', JSON.stringify(result));
      navigate('/result');

    } catch (err) {
      setIsAnalyzing(false);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        'Failed to connect to the analysis server. Make sure the Flask backend is running.';
      setError(msg);
    }
  };

  const isMockLoading = window.location.search.includes('mock_loading=true');

  return (
    <>
      {/* Loading overlay */}
      <AnimatePresence>
        {(isAnalyzing || isMockLoading) && <AnalysisLoader uploadProgress={uploadProgress} />}
      </AnimatePresence>

      <div className="min-h-screen bg-bg">
        {/* Hero strip */}
        <div className="relative overflow-hidden bg-card-alt border-b border-border">
          <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 50% -10%, rgba(37,99,235,0.1) 0%, transparent 70%)' }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass
                         border border-[#2563EB]/30 text-primary text-xs font-bold mb-6"
            >
              <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
              AI Model Ready — 98.21% Accuracy
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="font-heading text-4xl sm:text-5xl font-black text-foreground mb-4"
            >
              Scan Your{' '}
              <span className="gradient-text">Android APK</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted text-lg max-w-xl mx-auto"
            >
              Upload an APK file and our AI will instantly classify it as{' '}
              <span className="text-[#22C55E] font-semibold">Benign</span> or{' '}
              <span className="text-[#EF4444] font-semibold">Malware</span>.
            </motion.p>
          </div>
        </div>

        {/* Main card area */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Upload Card (left 2/3) ── */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: 'var(--card-color)',
                  border: '1px solid var(--border-color)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="px-6 pt-6 pb-2">
                  <div className="flex items-center gap-2.5 mb-1">
                    <RiShieldFlashFill className="text-[#2563EB]" size={20} />
                    <h2 className="font-heading font-bold text-foreground text-base">APK Analysis</h2>
                  </div>
                  <p className="text-muted text-sm">Upload your Android application package for AI-powered threat analysis.</p>
                </div>

                <div className="p-6">
                  {/* Drop zone */}
                  <DropZone onFileSelected={setSelectedFile} disabled={isAnalyzing} />

                  {/* Server error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 px-4 py-3 rounded-xl text-sm text-[#EF4444] flex gap-2 items-start"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                      >
                        <RiInformationFill size={16} className="flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Analyze button */}
                  <motion.button
                    onClick={handleAnalyze}
                    disabled={!selectedFile || isAnalyzing}
                    whileHover={selectedFile ? { scale: 1.02 } : {}}
                    whileTap={selectedFile ? { scale: 0.98 } : {}}
                    className="mt-5 w-full py-4 rounded-xl font-bold text-sm
                               transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      background: selectedFile
                        ? 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)'
                        : 'var(--card-alt-color)',
                      color:  selectedFile ? '#fff' : 'var(--text-muted)',
                      cursor: selectedFile ? 'pointer' : 'not-allowed',
                      boxShadow: selectedFile ? '0 0 24px rgba(37,99,235,0.35)' : 'none',
                    }}
                  >
                    <RiShieldFlashFill size={18} />
                    {isAnalyzing ? 'Analyzing…' : 'Analyze APK'}
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* ── Info sidebar (right 1/3) ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col gap-5"
            >
              {/* Tips */}
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: 'var(--card-color)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <h3 className="font-heading font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                  <RiInformationFill className="text-accent" size={16} />
                  What to Know
                </h3>
                <ul className="flex flex-col gap-3">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-muted leading-relaxed">
                      <RiCheckboxCircleFill className="text-[#2563EB] flex-shrink-0 mt-0.5" size={14} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Model info */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(37,99,235,0.06)',
                  border: '1px solid rgba(37,99,235,0.15)',
                }}
              >
                <h3 className="font-heading font-bold text-foreground text-sm mb-4">
                  Inspection Engine Specs
                </h3>
                {[
                  { label: 'Engine Core',          value: 'Threat Classification Core' },
                  { label: 'Engine Version',       value: 'v2.4.1' },
                  { label: 'Confidence Threshold', value: '95.00%' },
                  { label: 'Scan Mode',            value: 'Static Bytecode Scan' },
                  { label: 'Threat Signatures',    value: 'Active Database' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-muted text-xs">{label}</span>
                    <span className="text-foreground text-xs font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
