import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Globe, Gamepad2 } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  onOpenArcade: () => void;
}

export const Navbar = ({ onOpenArcade }: NavbarProps) => {
  const { isDark, toggle } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('navbar.home'), href: '#hero' },
    { name: t('navbar.projects'), href: '#projects' },
    { name: t('navbar.skills'), href: '#skills' },
    { name: t('navbar.experience'), href: '#experience' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled 
          ? 'header-blur shadow-sm py-3' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand mark */}
          <a 
            href="#hero" 
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-900 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 flex items-center justify-center font-mono font-bold text-xs text-emerald-500 dark:text-emerald-400 group-hover:border-emerald-500 transition-colors">
              AB
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-sm tracking-tight text-stone-900 dark:text-white flex items-center gap-1.5">
                <span>arnaud.dev</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-beacon" />
              </span>
              <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                Full-Stack Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-stone-100/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-mono font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-800 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Arcade Mode Launcher */}
            <button
              type="button"
              onClick={onOpenArcade}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500"
              title={t('navbar.arcade_tooltip')}
            >
              <Gamepad2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>{t('navbar.arcade_btn')}</span>
            </button>

            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500"
              title={i18n.language === 'fr' ? 'Switch to English' : 'Passer au Français'}
              aria-label={i18n.language === 'fr' ? 'Switch to English' : 'Passer au Français'}
            >
              <Globe size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span className="uppercase">{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggle}
              className="p-2 rounded-lg text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label={isDark ? t('navbar.switch_light') : t('navbar.switch_dark')}
            >
              {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-stone-700" />}
            </button>
          </div>

          {/* Mobile hamburger & arcade quick trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenArcade}
              className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 cursor-pointer"
              aria-label={t('navbar.arcade_btn')}
            >
              <Gamepad2 size={17} />
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800"
              aria-label="Toggle language"
            >
              <span className="uppercase">{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            <button
              type="button"
              onClick={toggle}
              className="p-2 rounded-lg text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
              aria-label={isDark ? t('navbar.switch_light') : t('navbar.switch_dark')}
            >
              {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
              aria-expanded={isOpen}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-[#f8f9fa] dark:bg-[#101216] px-4 py-4"
          >
            <nav className="flex flex-col gap-2 font-mono text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
