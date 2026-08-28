/**
 * scanHistory.js
 * Utility to persist and retrieve APK scan results in localStorage.
 * Used by Upload.jsx (write) and Dashboard.jsx (read).
 */

const STORAGE_KEY = 'cybershield_scan_history';

/**
 * Save a new scan result to localStorage history.
 * Keeps the 50 most recent scans.
 * @param {Object} result - The JSON response from the Flask API
 */
export const saveScan = (result) => {
  const history = getHistory();

  const entry = {
    id:          Date.now(),
    timestamp:   new Date().toISOString(),
    app_name:    result.app_info?.app_name     || 'Unknown',
    package:     result.app_info?.package_name || 'Unknown',
    version:     result.app_info?.version_name || '—',
    target_sdk:  result.app_info?.target_sdk   || '—',
    prediction:  result.final_analysis?.verdict || result.prediction,
    confidence:  result.ml_analysis?.classification_confidence || result.confidence,
    risk:        result.final_analysis?.risk_level || result.risk,
    model:       result.ml_analysis?.model_name || 'Optuna-Optimized XGBoost',
    accuracy:    result.ml_analysis?.accuracy || '98.21%',
  };

  // Newest first, keep max 50
  const updated = [entry, ...history].slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

/**
 * Get all scan history from localStorage.
 * @returns {Array} Array of scan entries, newest first.
 */
export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

/**
 * Clear all scan history.
 */
export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Get computed statistics from history.
 * @returns {Object} { total, malware, benign, avgConfidence }
 */
export const getStats = (history) => {
  const total   = history.length;
  const malware = history.filter(s => s.prediction === 'Malware' || s.prediction === 'Malicious').length;
  const benign  = total - malware;
  const avgConf = total > 0
    ? parseFloat((history.reduce((a, s) => a + s.confidence, 0) / total).toFixed(1))
    : 0;

  return { total, malware, benign, avgConfidence: avgConf };
};

/**
 * Build 7-day bar chart data from history.
 * @param {Array} history
 * @returns {Array} Recharts-compatible data
 */
export const getWeeklyData = (history) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const now  = new Date();

  // Build array for the last 7 days (oldest → newest)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (6 - i));
    const dayLabel = days[d.getDay()];
    const dateStr  = d.toDateString();

    const dayScans = history.filter(s => new Date(s.timestamp).toDateString() === dateStr);
    return {
      day:     dayLabel,
      Benign:  dayScans.filter(s => s.prediction === 'Benign').length,
      Malware: dayScans.filter(s => s.prediction === 'Malware' || s.prediction === 'Malicious').length,
    };
  });
};

/**
 * Format a timestamp into a human-readable "time ago" string.
 * @param {string} iso - ISO date string
 */
export const timeAgo = (iso) => {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60)        return 'Just now';
  if (diff < 3600)      return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400)     return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`;
};
