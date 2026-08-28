import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiGithubFill, RiLinkedinBoxFill, RiMailFill,
  RiShieldFlashFill, RiCheckFill, RiErrorWarningFill,
} from 'react-icons/ri';

// ── Social links ──────────────────────────────────────────────
const socials = [
  {
    icon: RiGithubFill,
    label: 'GitHub',
    handle: '@your-github',
    href: 'https://github.com',
    color: '#fff',
    bg: 'rgba(255,255,255,0.06)',
    hoverBg: 'rgba(255,255,255,0.1)',
  },
  {
    icon: RiLinkedinBoxFill,
    label: 'LinkedIn',
    handle: 'your-linkedin',
    href: 'https://linkedin.com',
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.08)',
    hoverBg: 'rgba(10,102,194,0.15)',
  },
  {
    icon: RiMailFill,
    label: 'Email',
    handle: 'your@email.com',
    href: 'mailto:your@email.com',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.08)',
    hoverBg: 'rgba(6,182,212,0.15)',
  },
];

// ── Input field ───────────────────────────────────────────────
const Field = ({ label, id, type = 'text', placeholder, value, onChange, required, rows }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">
      {label} {required && <span className="text-[#EF4444]">*</span>}
    </label>
    {rows ? (
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder-gray-500
                   focus:outline-none focus:ring-1 focus:ring-[#2563EB] transition-all resize-none"
        style={{ backgroundColor: 'var(--card-alt-color)', border: '1px solid var(--border-color)' }}
      />
    ) : (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder-gray-500
                   focus:outline-none focus:ring-1 focus:ring-[#2563EB] transition-all"
        style={{ backgroundColor: 'var(--card-alt-color)', border: '1px solid var(--border-color)' }}
      />
    )}
  </div>
);

// ── Contact Page ──────────────────────────────────────────────
const Contact = () => {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' });
  const [status,  setStatus]  = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission (replace with real API or EmailJS later)
    await new Promise(res => setTimeout(res, 1500));

    if (form.name && form.email && form.message) {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-bg">

      {/* Header */}
      <div className="relative overflow-hidden bg-card-alt border-b border-border">
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#2563EB]/30 text-primary text-xs font-bold mb-6">
              <RiShieldFlashFill size={12} />
              Get In Touch
            </div>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-foreground mb-4">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Have questions about the project, model performance, or collaboration? Reach out.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Sidebar: social links ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-5"
          >
            <div>
              <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Connect</p>
              <h2 className="font-heading font-bold text-foreground text-xl mb-4">Find Me Online</h2>
              <p className="text-muted text-sm leading-relaxed">
                Open to feedback, collaboration, and questions about this project.
                Feel free to reach out through any channel.
              </p>
            </div>

            {socials.map(({ icon: Icon, label, handle, href, color, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-4 py-4 rounded-2xl group transition-all duration-300"
                style={{ background: bg, border: '1px solid var(--border-color)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                              group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${color}15`, color }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{label}</p>
                  <p className="text-muted text-xs">{handle}</p>
                </div>
              </a>
            ))}

            {/* Project info */}
            <div
              className="mt-2 rounded-2xl p-5"
              style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)' }}
            >
              <p className="text-foreground font-semibold text-sm mb-3">Deployment Specs</p>
              {[
                { label: 'Platform',        value: 'CyberShield AI' },
                { label: 'Classification',   value: 'Static Bytecode Ensemble' },
                { label: 'Update Interval',  value: 'Real-time Telemetry' },
                { label: 'Service Level',    value: 'Enterprise SLA' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-1.5 border-b border-border last:border-0">
                  <span className="text-muted text-xs">{label}</span>
                  <span className="text-foreground text-xs font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Contact form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: 'var(--card-color)', border: '1px solid var(--border-color)' }}
            >
              <h2 className="font-heading font-bold text-foreground text-lg mb-6">Send a Message</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    id="name"
                    label="Full Name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange('name')}
                    required
                  />
                  <Field
                    id="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    required
                  />
                </div>
                <Field
                  id="subject"
                  label="Subject"
                  placeholder="What is this about?"
                  value={form.subject}
                  onChange={handleChange('subject')}
                />
                <Field
                  id="message"
                  label="Message"
                  placeholder="Write your message here…"
                  value={form.message}
                  onChange={handleChange('message')}
                  rows={5}
                  required
                />

                {/* Status messages */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm text-[#22C55E]"
                      style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
                    >
                      <RiCheckFill size={16} />
                      Message sent successfully! We'll get back to you soon.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm text-[#EF4444]"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      <RiErrorWarningFill size={16} />
                      Please fill in all required fields.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white
                             transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    background: status === 'sending'
                      ? 'rgba(37,99,235,0.5)'
                      : 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)',
                    boxShadow: '0 0 24px rgba(37,99,235,0.35)',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <RiMailFill size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
