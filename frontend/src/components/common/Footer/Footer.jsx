import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiShieldFlashFill, RiGithubFill, RiLinkedinBoxFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';

const footerLinks = {
  Product: [
    { label: 'Upload APK',  path: '/upload' },
    { label: 'Dashboard',   path: '/dashboard' },
    { label: 'About',       path: '/about' },
  ],
  Support: [
    { label: 'FAQ',         path: '/faq' },
    { label: 'Contact',     path: '/contact' },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <NavLink to="/" className="flex items-center gap-2.5 mb-4">
              <RiShieldFlashFill className="text-[#2563EB] text-2xl" />
              <span className="font-heading font-bold text-lg">
                <span className="text-foreground">CyberShield</span>
                <span className="gradient-text"> AI</span>
              </span>
            </NavLink>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Automated threat intelligence and static bytecode analysis for Android devices.
              Deploying predictive decision ensembles to secure mobile endpoints.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-card border border-border hover:bg-[#2563EB]/20 hover:text-[#2563EB] text-muted transition-all duration-200"
              >
                <RiGithubFill size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-card border border-border hover:bg-[#2563EB]/20 hover:text-[#2563EB] text-muted transition-all duration-200"
              >
                <RiLinkedinBoxFill size={18} />
              </a>
              <a
                href="mailto:contact@cybershield.ai"
                aria-label="Email"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-card border border-border hover:bg-[#2563EB]/20 hover:text-[#2563EB] text-muted transition-all duration-200"
              >
                <MdEmail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-foreground font-semibold text-sm mb-4">{section}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="text-muted hover:text-primary text-sm transition-colors duration-200"
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} CyberShield AI. Final Year Engineering Project.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span>Model Accuracy: 98.21%</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
