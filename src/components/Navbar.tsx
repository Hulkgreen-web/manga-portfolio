import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
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

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('navbar.home'), href: '#hero' },
    { name: t('navbar.projects'), href: '#projects' },
    { name: t('navbar.experience'), href: '#experience' },
    { name: t('navbar.skills'), href: '#skills' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-nav shadow-sm py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a 
            href="#hero" 
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-mono font-bold text-xs shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              &gt;_
            </div>
            <span className="font-mono font-bold text-base tracking-tight text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              ~/arnaud<span className="text-orange-600 dark:text-orange-400">.dev</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 dark:bg-stone-900/80 backdrop-blur-md p-1.5 rounded-full border border-stone-200/80 dark:border-stone-800/80">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium font-mono text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-800 rounded-full transition-all duration-200 group"
              >
                <span className="text-orange-600 dark:text-orange-400 font-semibold mr-1">0{idx + 1}.</span>
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 transition-all cursor-pointer"
              title={i18n.language === 'fr' ? 'Switch to English' : 'Passer au Français'}
              aria-label="Switch Language"
            >
              <Globe size={14} className="text-orange-500" />
              <span className="uppercase">{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            <button
              onClick={toggle}
              className="p-2 rounded-full text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 transition-all cursor-pointer"
              aria-label="Toggle dark mode"
            >
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-stone-700" />}
              </motion.div>
            </button>
          </div>

          {/* Mobile menu triggers */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700"
            >
              {i18n.language === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              onClick={toggle}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-card mx-4 mt-2 p-4 rounded-2xl shadow-xl space-y-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-stone-800/80 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

