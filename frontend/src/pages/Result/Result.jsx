import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiShieldCheckFill,
  RiShieldFill,
  RiArrowLeftLine,
  RiUploadCloud2Fill,
  RiDownloadFill,
  RiCpuFill,
  RiSmartphoneFill,
  RiBrainFill,
  RiBarChart2Fill,
  RiAlertFill,
  RiFileWarningFill,
} from 'react-icons/ri';

const RiskBadge = ({ risk }) => {
  const map = {
    'Safe':          { bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.3)',   text: '#22C55E' },
    'Low Risk':      { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.3)',  text: '#3B82F6' },
    'Medium Risk':   { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)',  text: '#F59E0B' },
    'High Risk':     { bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',   text: '#EF4444' },
    'Critical Risk': { bg: 'rgba(185,28,28,0.1)',   border: 'rgba(185,28,28,0.3)',   text: '#B91C1C' },
  };
  const style = map[risk] || map['Medium Risk'];
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-bold tracking-wider"
      style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.text }}
    >
      {risk.toUpperCase()}
    </span>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
    <span className="text-muted text-sm">{label}</span>
    <span className="text-foreground text-sm font-semibold font-mono max-w-[55%] text-right truncate">{value || '—'}</span>
  </div>
);

const Card = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl p-6 ${className}`}
    style={{
      backgroundColor: 'var(--card-color)',
      border: '1px solid var(--border-color)',
      backdropFilter: 'blur(12px)',
    }}
  >
    {children}
  </div>
);

const Result = () => {
  const navigate = useNavigate();
  const raw = sessionStorage.getItem('scanResult');
  const data = raw ? JSON.parse(raw) : null;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-bg">
        <p className="text-muted">No scan result found.</p>
        <button
          onClick={() => navigate('/upload')}
          className="px-6 py-3 bg-[#2563EB] text-white rounded-xl text-sm font-semibold"
        >
          Go to Upload
        </button>
      </div>
    );
  }

  const { app_info = {}, ml_analysis = {}, anomaly_analysis = {}, signature_analysis = {}, dynamic_analysis = {}, final_analysis = {} } = data;

  const app_name     = app_info.app_name || 'Unknown';
  const package_name = app_info.package_name || 'Unknown';
  
  const verdict = final_analysis.verdict || 'Unknown';
  const overall_threat_score = final_analysis.overall_threat_score || 0;
  const risk_level = final_analysis.risk_level || 'Unknown';
  
  const isMalware = verdict === 'Malicious';
  const accentColor = isMalware ? '#EF4444' : '#22C55E';

  return (
    <div className="min-h-screen pb-16 bg-bg">
      <div className="relative overflow-hidden bg-card-alt border-b border-border">
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <button
                onClick={() => navigate('/upload')}
                className="flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-3 transition-colors"
              >
                <RiArrowLeftLine size={16} />
                New Scan
              </button>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Analysis Report
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {app_name} · {package_name}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] transition-all glow-blue"
              >
                <RiDownloadFill size={15} />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* FINAL SECURITY VERDICT */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="h-full flex flex-col justify-center text-center">
              <h3 className="font-heading font-bold text-white text-sm mb-6 flex items-center justify-center gap-2 uppercase tracking-widest">
                FINAL SECURITY VERDICT
              </h3>
              <div
                className="w-24 h-24 mx-auto mb-5 rounded-2xl flex items-center justify-center"
                style={{
                  background: isMalware ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
                  boxShadow:  isMalware ? '0 0 32px rgba(239,68,68,0.25)' : '0 0 32px rgba(34,197,94,0.25)',
                }}
              >
                {isMalware
                  ? <RiShieldFill size={48} className="text-[#EF4444]" />
                  : <RiShieldCheckFill size={48} className="text-[#22C55E]" />
                }
              </div>
              <p className="font-heading font-black text-3xl mb-2" style={{ color: accentColor }}>
                {verdict.toUpperCase()}
              </p>
              <div className="mb-4">
                <RiskBadge risk={risk_level} />
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Overall Threat Score: <strong className="text-white">{overall_threat_score} / 100</strong>
              </p>
            </Card>
          </motion.div>

          {/* HYBRID DETECTION ENGINE */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card className="h-full">
              <h3 className="font-heading font-bold text-white text-sm mb-4 flex items-center gap-2 uppercase tracking-widest">
                <RiBarChart2Fill className="text-[#06B6D4]" size={16} />
                Hybrid Detection Engine
              </h3>
              <div className="space-y-2 mt-4">
                <InfoRow label="ML Threat Score (45% Weight)" value={`${ml_analysis.ml_threat_score || 0} / 100`} />
                <InfoRow label="Anomaly Score (15% Weight)" value={`${anomaly_analysis.anomaly_score || 0} / 100`} />
                <InfoRow label="Signature Score (10% Weight)" value={`${signature_analysis.signature_score || 0} / 100`} />
                <InfoRow label="Dynamic Score (30% Weight)" value={`${dynamic_analysis.dynamic_score || 0} / 100`} />
                <div className="pt-2 mt-2 border-t border-border">
                  <InfoRow label="Overall Threat Score" value={`${overall_threat_score} / 100`} />
                  <InfoRow label="Final Risk Level" value={risk_level.toUpperCase()} />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* MACHINE LEARNING DETECTION */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card>
              <h3 className="font-heading font-bold text-white text-sm mb-4 flex items-center gap-2 uppercase tracking-widest">
                <RiBrainFill className="text-[#2563EB]" size={16} />
                Machine Learning Detection
              </h3>
              <InfoRow label="Model" value={ml_analysis.model_name} />
              <InfoRow label="Prediction" value={ml_analysis.prediction} />
              <InfoRow label="Classification Confidence" value={`${ml_analysis.classification_confidence}%`} />
              <InfoRow label="Malware Probability" value={`${((ml_analysis.malware_probability || 0) * 100).toFixed(2)}%`} />
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted text-xs mb-1">Model Accuracy</p>
                  <p className="text-sm font-semibold">{ml_analysis.accuracy}</p>
                </div>
                <div>
                  <p className="text-muted text-xs mb-1">Model Precision</p>
                  <p className="text-sm font-semibold">{ml_analysis.precision}</p>
                </div>
                <div>
                  <p className="text-muted text-xs mb-1">Model Recall</p>
                  <p className="text-sm font-semibold">{ml_analysis.recall}</p>
                </div>
                <div>
                  <p className="text-muted text-xs mb-1">Model F1 Score</p>
                  <p className="text-sm font-semibold">{ml_analysis.f1}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                * <strong className="text-gray-400">Classification Confidence</strong> represents the model's confidence in its predicted class.<br/>
                * <strong className="text-gray-400">Malware Probability</strong> represents the actual probability of the malware class.
              </p>
            </Card>
          </motion.div>

          {/* ANOMALY & SIGNATURE DETECTION */}
          <div className="flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Card>
                <h3 className="font-heading font-bold text-white text-sm mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <RiAlertFill className="text-[#EF4444]" size={16} />
                  Anomaly Detection
                </h3>
                <InfoRow label="Anomaly Score" value={`${anomaly_analysis.anomaly_score || 0} / 100`} />
                <InfoRow label="Anomaly Risk" value={anomaly_analysis.risk || 'Safe'} />
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-muted text-xs mb-1">Status:</p>
                  <p className="text-sm text-gray-300">
                    {anomaly_analysis.suspicious_features?.length > 0
                      ? `Detected ${anomaly_analysis.suspicious_features.length} suspicious features.`
                      : 'No significant abnormal patterns detected.'}
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Card>
                <h3 className="font-heading font-bold text-white text-sm mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <RiFileWarningFill className="text-[#F59E0B]" size={16} />
                  Signature Analysis
                </h3>
                <InfoRow label="Signature Score" value={`${signature_analysis.signature_score || 0} / 100`} />
                <InfoRow label="Known Malware Matches" value={signature_analysis.matches || 0} />
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-muted text-xs mb-1">Status:</p>
                  <p className="text-sm text-gray-300">
                    {signature_analysis.status || 'No known malicious signatures detected.'}
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
              <Card>
                <h3 className="font-heading font-bold text-white text-sm mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <RiSmartphoneFill className="text-[#06B6D4]" size={16} />
                  Dynamic Analysis
                </h3>
                <InfoRow label="Dynamic Score" value={`${dynamic_analysis.dynamic_score || 0} / 100`} />
                <InfoRow label="Runtime Duration" value={dynamic_analysis.runtime_duration || '—'} />
                
                {dynamic_analysis.network_summary && (
                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-muted text-xs mb-1">Network Activity:</p>
                    <p className="text-sm text-gray-300">
                      {dynamic_analysis.network_summary.total_connections} total connections ({dynamic_analysis.network_summary.suspicious_connections} suspicious).
                    </p>
                  </div>
                )}
                
                {dynamic_analysis.suspicious_indicators?.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-muted text-xs mb-2">Suspicious Runtime Indicators:</p>
                    <ul className="space-y-1">
                      {dynamic_analysis.suspicious_indicators.map((ind, i) => (
                        <li key={i} className="text-sm text-[#EF4444] flex items-start gap-2">
                          <span className="mt-1">•</span> {ind}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Result;
