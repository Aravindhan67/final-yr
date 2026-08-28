import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiSmartphoneFill, RiShieldCheckFill, RiErrorWarningFill,
  RiAlertFill, RiShieldFill, RiSearchLine, RiRefreshLine
} from 'react-icons/ri';
import axios from 'axios';

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
      className="px-3 py-1 rounded-full text-xs font-bold tracking-wider whitespace-nowrap"
      style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.text }}
    >
      {risk.toUpperCase()}
    </span>
  );
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div
    className="rounded-2xl p-6 relative overflow-hidden"
    style={{ backgroundColor: 'var(--card-color)', border: `1px solid ${color}30` }}
  >
    <div className="flex items-center gap-4 mb-2">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, color }}>
        <Icon size={20} />
      </div>
      <p className="text-foreground font-medium text-sm">{label}</p>
    </div>
    <p className="font-heading font-black text-3xl text-foreground">{value}</p>
  </div>
);

const DeviceMonitor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchDeviceData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/device/scan');
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeviceData();
  }, []);

  const filteredApps = data?.apps?.filter(app => 
    app.app_name.toLowerCase().includes(search.toLowerCase()) || 
    app.package_name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen pb-16 bg-bg">
      <div className="relative overflow-hidden bg-card-alt border-b border-border">
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <RiSmartphoneFill /> Device Monitor
              </p>
              <h1 className="font-heading font-black text-3xl sm:text-4xl text-foreground">Installed Applications</h1>
              <p className="text-muted mt-1 text-sm">
                Real-time security analysis of installed applications and permissions.
              </p>
            </div>
            <button
              onClick={fetchDeviceData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#06B6D4] hover:bg-[#0891b2] transition-all glow-blue"
            >
              <RiRefreshLine size={16} className={loading ? "animate-spin" : ""} />
              Scan Device
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#06B6D4]/30 border-t-[#06B6D4] rounded-full animate-spin" />
        </div>
      ) : data ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard icon={RiSmartphoneFill} label="Total Apps" value={data.total_apps_scanned} color="#2563EB" />
            <StatCard icon={RiShieldCheckFill} label="Safe" value={data.safe_apps} color="#22C55E" />
            <StatCard icon={RiAlertFill} label="Low / Med" value={data.low_risk_apps + data.medium_risk_apps} color="#F59E0B" />
            <StatCard icon={RiErrorWarningFill} label="High Risk" value={data.high_risk_apps} color="#EF4444" />
            <StatCard icon={RiShieldFill} label="Critical" value={data.critical_risk_apps} color="#B91C1C" />
          </div>

          {data.alerts?.length > 0 && (
            <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-2xl p-6">
              <h3 className="text-[#EF4444] font-bold mb-4 flex items-center gap-2">
                <RiAlertFill size={20} /> Active Security Alerts
              </h3>
              <div className="space-y-3">
                {data.alerts.map((alert, i) => (
                  <div key={i} className="bg-bg/50 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-foreground text-sm">{alert.app_name}</p>
                      <p className="text-muted text-xs">{alert.reason}</p>
                    </div>
                    <RiskBadge risk={alert.risk_level} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-card-alt border border-border rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
              <h3 className="font-heading font-bold text-foreground">App Inventory</h3>
              <div className="relative w-full sm:w-64">
                <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input 
                  type="text" 
                  placeholder="Search apps..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-bg border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-[#06B6D4]"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg text-muted text-xs uppercase tracking-wider text-left border-b border-border">
                    <th className="px-6 py-4">App Name</th>
                    <th className="px-6 py-4">Package</th>
                    <th className="px-6 py-4">Permissions</th>
                    <th className="px-6 py-4">Risk Score</th>
                    <th className="px-6 py-4">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app, i) => (
                    <tr 
                      key={i} 
                      onClick={() => setSelectedApp(app)}
                      className="border-b border-border/50 hover:bg-bg cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 font-bold">{app.app_name}</td>
                      <td className="px-6 py-4 text-xs text-muted">{app.package_name}</td>
                      <td className="px-6 py-4 text-xs">{app.permissions.length} total</td>
                      <td className="px-6 py-4 font-mono">{app.overall_risk_score}/100</td>
                      <td className="px-6 py-4"><RiskBadge risk={app.risk_level} /></td>
                    </tr>
                  ))}
                  {filteredApps.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-muted">No apps found matching "{search}"</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : null}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-2xl rounded-2xl border border-border p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black font-heading mb-1">{selectedApp.app_name}</h2>
                  <p className="text-muted text-sm font-mono">{selectedApp.package_name}</p>
                </div>
                <RiskBadge risk={selectedApp.risk_level} />
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-bg rounded-xl p-3 text-center border border-border">
                    <p className="text-xs text-muted mb-1">Overall</p>
                    <p className="font-bold text-lg">{selectedApp.overall_risk_score}</p>
                  </div>
                  <div className="bg-bg rounded-xl p-3 text-center border border-border">
                    <p className="text-xs text-muted mb-1">Static</p>
                    <p className="font-bold text-lg">{selectedApp.static_risk_score}</p>
                  </div>
                  <div className="bg-bg rounded-xl p-3 text-center border border-border">
                    <p className="text-xs text-muted mb-1">Anomaly</p>
                    <p className="font-bold text-lg">{selectedApp.anomaly_score}</p>
                  </div>
                  <div className="bg-bg rounded-xl p-3 text-center border border-border">
                    <p className="text-xs text-muted mb-1">Signature</p>
                    <p className="font-bold text-lg">{selectedApp.signature_score}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold mb-2">Security Verdict</h4>
                  <p className="text-sm text-muted bg-bg p-3 rounded-xl border border-border">
                    {selectedApp.verdict}
                  </p>
                </div>

                {selectedApp.suspicious_permission_combinations?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-[#F59E0B] mb-2 flex items-center gap-2">
                      <RiAlertFill /> Suspicious Configurations
                    </h4>
                    <ul className="text-sm bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl p-3 space-y-2">
                      {selectedApp.suspicious_permission_combinations.map((comb, idx) => (
                        <li key={idx} className="text-[#F59E0B] flex items-start gap-2">
                          <span className="mt-1">•</span> {comb}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-bold mb-2 text-foreground">Sensitive Permissions ({selectedApp.sensitive_permissions.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.sensitive_permissions.map((perm, idx) => (
                      <span key={idx} className="text-xs bg-bg border border-border px-2 py-1 rounded-md text-muted">
                        {perm}
                      </span>
                    ))}
                    {selectedApp.sensitive_permissions.length === 0 && <span className="text-xs text-muted">None</span>}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-bg hover:bg-card-alt border border-border transition-colors"
                >
                  Close Analysis
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeviceMonitor;
