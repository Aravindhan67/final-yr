import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiShieldFlashFill, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTheme } from '../../../context/ThemeContext';

const navLinks = [
  { label: 'Home',      path: '/' },
  { label: 'Upload',    path: '/upload' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'About',     path: '/about' },
  { label: 'Contact',   path: '/contact' },
  { label: 'FAQ',       path: '/faq' },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location]);

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <RiShieldFlashFill className="text-[#2563EB] text-2xl group-hover:text-[#06B6D4] transition-colors duration-300" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#06B6D4] rounded-full animate-pulse" />
              </div>
              <span className="font-heading font-bold text-lg">
                <span className="text-foreground">CyberShield</span>
                <span className="gradient-text"> AI</span>
              </span>
            </NavLink>

            {/* ── Desktop Links ── */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'text-foreground font-bold'
                          : 'text-muted hover:text-foreground hover:bg-card-alt'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {label}
                        {isActive && (
                          <span
                            className="absolute inset-0 bg-[#2563EB]/10 border border-[#2563EB]/30 rounded-lg -z-10"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* ── Actions ── */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-border hover:bg-card-alt text-muted hover:text-foreground transition-all duration-200"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <RiMoonLine size={16} /> : <RiSunLine size={16} />}
              </button>
              <NavLink
                to="/upload"
                className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-semibold rounded-lg transition-all duration-200 glow-blue hover:scale-105"
              >
                <RiShieldFlashFill size={15} />
                Scan APK
              </NavLink>
            </div>

            {/* ── Mobile Toolbar ── */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border bg-card-alt text-muted hover:text-foreground transition-all duration-200"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <RiMoonLine size={16} /> : <RiSunLine size={16} />}
              </button>
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="p-2 rounded-lg transition-colors text-muted hover:text-foreground hover:bg-card-alt"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <div
            className="fixed top-16 inset-x-0 z-40 glass border-b border-border shadow-2xl md:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#2563EB]/15 text-primary border border-[#2563EB]/30'
                        : 'text-muted hover:bg-card-alt hover:text-foreground'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <NavLink
                to="/upload"
                className="mt-2 px-4 py-3 bg-[#2563EB] text-white text-sm font-semibold rounded-lg text-center"
              >
                Scan APK →
              </NavLink>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
