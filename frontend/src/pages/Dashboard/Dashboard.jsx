import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiShieldFill, RiShieldCheckFill, RiBarChart2Fill,
  RiScanLine, RiDeleteBin6Line, RiRefreshLine,
  RiUploadCloud2Fill,
} from 'react-icons/ri';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';
import {
  getHistory,
  clearHistory,
  getStats,
  getWeeklyData,
  timeAgo,
} from '../../utils/scanHistory';

const PIE_COLORS = { Benign: '#22C55E', Malware: '#EF4444' };

// ── Animated counter ──────────────────────────────────────────
const useCounter = (target, duration = 1000) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    setVal(0);
    if (!target) return;
    let step = 0;
    const steps = 40;
    const inc = target / steps;
    const t = setInterval(() => {
      step++;
      setVal(v => {
        const next = v + inc;
        if (step >= steps || next >= target) { clearInterval(t); return target; }
        return next;
      });
    }, duration / steps);
    return () => clearInterval(t);
  }, [target, duration]);
  return Math.floor(val);
};

// ── Stat card ─────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, color, raw, delay }) => {
  const count = useCounter(typeof raw === 'number' ? raw : 0);
  const display = typeof raw === 'number' ? count : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl p-6 relative overflow-hidden group cursor-default"
      style={{ backgroundColor: 'var(--card-color)', border: `1px solid ${color}25` }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${color}0C 0%, transparent 70%)` }}
      />
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, color }}>
          <Icon size={20} />
        </div>
      </div>
      <p className="font-heading font-black text-3xl text-foreground mb-0.5">
        {display}
      </p>
      <p className="text-foreground font-medium text-sm">{label}</p>
      {sub && <p className="text-muted text-xs mt-0.5">{sub}</p>}
    </motion.div>
  );
};

// ── Empty state ───────────────────────────────────────────────
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <div
      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
      style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)' }}
    >
      <RiScanLine size={36} className="text-gray-600" />
    </div>
    <h3 className="font-heading font-bold text-foreground text-xl mb-2">No Scans Yet</h3>
    <p className="text-muted text-sm max-w-xs mb-8 leading-relaxed">
      Your scan history is empty. Upload an APK to get started and see your results here.
    </p>
    <Link
      to="/upload"
      className="flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white font-semibold rounded-xl text-sm glow-blue hover:scale-105 transition-all duration-200"
    >
      <RiUploadCloud2Fill size={16} />
      Upload APK
    </Link>
  </motion.div>
);

// ── Dashboard ─────────────────────────────────────────────────
const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load history from localStorage
  const load = useCallback(() => {
    setHistory(getHistory());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();

    // Refresh when the tab gets focus (user scans and comes back)
    window.addEventListener('focus', load);
    return () => window.removeEventListener('focus', load);
  }, [load]);

  const stats   = getStats(history);
  const pieData = [
    { name: 'Benign',  value: stats.benign  },
    { name: 'Malware', value: stats.malware },
  ];
  const barData = getWeeklyData(history);

  const handleClear = () => {
    if (window.confirm('Clear all scan history? This cannot be undone.')) {
      clearHistory();
      setHistory([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-[#2563EB]/30 border-t-[#2563EB] rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 bg-bg">

      {/* Header */}
      <div className="relative overflow-hidden bg-card-alt border-b border-border">
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-between gap-4 flex-wrap"
          >
            <div>
              <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Hub</p>
              <h1 className="font-heading font-black text-3xl sm:text-4xl text-foreground">CyberShield AI</h1>
              <p className="text-muted mt-1 text-sm">
                Hybrid Android Security Platform
              </p>
            </div>
            <div className="flex gap-3 mt-2">
              <button
                onClick={load}
                title="Refresh"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-muted
                           hover:text-foreground border border-border hover:bg-card transition-all"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <RiRefreshLine size={15} />
                Refresh
              </button>
              {history.length > 0 && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#EF4444]
                             border border-[#EF4444]/20 hover:border-[#EF4444]/40 transition-all"
                  style={{ background: 'rgba(239,68,68,0.05)' }}
                >
                  <RiDeleteBin6Line size={15} />
                  Clear History
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/upload"
            className="group rounded-2xl p-8 flex flex-col items-center text-center justify-center transition-all duration-300 hover:scale-[1.02]"
            style={{ backgroundColor: 'var(--card-color)', border: '1px solid rgba(37,99,235,0.3)', boxShadow: '0 4px 30px rgba(37,99,235,0.1)' }}
          >
            <div className="w-16 h-16 rounded-full bg-[#2563EB]/10 flex items-center justify-center mb-4 group-hover:bg-[#2563EB]/20 transition-colors">
              <RiShieldFill size={32} className="text-[#2563EB]" />
            </div>
            <h2 className="font-heading font-black text-2xl text-foreground mb-2">[ APK SCANNER ]</h2>
            <p className="text-muted text-sm">Upload and analyze an APK file using our Hybrid Detection Engine</p>
          </Link>

          <Link
            to="/device-monitor"
            className="group rounded-2xl p-8 flex flex-col items-center text-center justify-center transition-all duration-300 hover:scale-[1.02]"
            style={{ backgroundColor: 'var(--card-color)', border: '1px solid rgba(6,182,212,0.3)', boxShadow: '0 4px 30px rgba(6,182,212,0.1)' }}
          >
            <div className="w-16 h-16 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mb-4 group-hover:bg-[#06B6D4]/20 transition-colors">
              <RiScanLine size={32} className="text-[#06B6D4]" />
            </div>
            <h2 className="font-heading font-black text-2xl text-foreground mb-2">[ DEVICE MONITOR ]</h2>
            <p className="text-muted text-sm">Scan installed applications and available security indicators</p>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {history.length === 0 ? <EmptyState /> : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard icon={RiScanLine}        label="Total Scans"     raw={stats.total}        sub="All time"          color="#2563EB" delay={0}    value={stats.total} />
              <StatCard icon={RiShieldFill}      label="Malware Found"   raw={stats.malware}      sub="Threats detected"  color="#EF4444" delay={0.06} value={stats.malware} />
              <StatCard icon={RiShieldCheckFill} label="Benign"          raw={stats.benign}       sub="Clean APKs"        color="#22C55E" delay={0.12} value={stats.benign} />
              <StatCard
                icon={RiBarChart2Fill}
                label="Avg Confidence"
                value={`${stats.avgConfidence}%`}
                sub="AI model confidence"
                color="#06B6D4"
                delay={0.18}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Pie chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="rounded-2xl p-6"
                style={{ backgroundColor: 'var(--card-color)', border: '1px solid var(--border-color)' }}
              >
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">Detection Breakdown</h3>
                <p className="text-muted text-xs mb-6">{stats.total} total scan{stats.total !== 1 ? 's' : ''}</p>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={4} dataKey="value">
                      {pieData.map(entry => <Cell key={entry.name} fill={PIE_COLORS[entry.name]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'var(--card-color)', border: '1px solid var(--border-color)', borderRadius: 10, color: 'var(--text-color)', fontSize: 12 }} />
                    <Legend formatter={(v) => <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Bar chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25 }}
                className="rounded-2xl p-6"
                style={{ backgroundColor: 'var(--card-color)', border: '1px solid var(--border-color)' }}
              >
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">Weekly Scan Activity</h3>
                <p className="text-muted text-xs mb-6">Last 7 days</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barData} barSize={10}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: '#4B5563', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#4B5563', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: 'var(--card-color)', border: '1px solid var(--border-color)', borderRadius: 10, color: 'var(--text-color)', fontSize: 12 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    <Legend formatter={(v) => <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{v}</span>} />
                    <Bar dataKey="Benign"  fill="#22C55E" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Malware" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* History table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--card-color)', border: '1px solid var(--border-color)' }}
            >
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-foreground text-sm">Recent Scans</h3>
                  <p className="text-muted text-xs mt-0.5">Live data from your scan history</p>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                  style={{ background: 'rgba(37,99,235,0.1)', color: '#2563EB' }}
                >
                  {history.length} scan{history.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted text-xs uppercase tracking-wider">
                      <th className="text-left px-6 py-3 font-medium">APK File</th>
                      <th className="text-left px-6 py-3 font-medium hidden md:table-cell">Package</th>
                      <th className="text-left px-6 py-3 font-medium">Result</th>
                      <th className="text-left px-6 py-3 font-medium hidden sm:table-cell">Confidence</th>
                      <th className="text-left px-6 py-3 font-medium hidden lg:table-cell">Version</th>
                      <th className="text-left px-6 py-3 font-medium hidden lg:table-cell">Scanned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((scan, i) => (
                      <motion.tr
                        key={scan.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.32 + i * 0.04 }}
                        className="border-t border-border hover:bg-card-alt transition-colors"
                      >
                        <td className="px-6 py-4 text-foreground font-mono text-xs">{scan.app_name}</td>
                        <td className="px-6 py-4 text-muted text-xs hidden md:table-cell truncate max-w-[180px]">{scan.package}</td>
                        <td className="px-6 py-4">
                          <span
                            className="px-2.5 py-1 rounded-lg text-xs font-bold"
                            style={{
                              background: scan.prediction === 'Benign' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                              color:      scan.prediction === 'Benign' ? '#22C55E' : '#EF4444',
                            }}
                          >
                            {scan.prediction}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted text-xs hidden sm:table-cell">{scan.confidence}%</td>
                        <td className="px-6 py-4 text-muted text-xs hidden lg:table-cell">{scan.version || '—'}</td>
                        <td className="px-6 py-4 text-muted text-xs hidden lg:table-cell">{timeAgo(scan.timestamp)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
