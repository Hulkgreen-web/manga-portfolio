import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Languages } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const { isDark, toggle } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('navbar.home'), href: '#hero' },
    { name: t('navbar.projects'), href: '#projects' },
    { name: t('navbar.experience'), href: '#experience' },
    { name: t('navbar.skills'), href: '#skills' },
    { name: t('navbar.contact'), href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-dbz-light dark:bg-dbz-dark border-b-4 border-black dark:border-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="flex-shrink-0 font-bold text-3xl text-dbz-orange manga-font italic transform -skew-x-12 cursor-default"
          >
            {t('navbar.logo')}
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-black dark:text-white hover:text-dbz-orange dark:hover:text-dbz-yellow transition-colors font-bold uppercase tracking-tighter group"
              >
                {link.name}
                <motion.span 
                  className="absolute bottom-[-4px] left-0 w-0 h-1 bg-dbz-orange transition-all group-hover:w-full"
                  whileHover={{ width: '100%' }}
                />
              </a>
            ))}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className="p-2 border-2 border-black dark:border-white shadow-manga dark:shadow-manga-white bg-dbz-blue text-white hover:bg-dbz-orange transition-all font-bold"
                title={i18n.language === 'fr' ? 'Switch to English' : 'Passer au Français'}
              >
                <div className="flex items-center gap-1">
                  <Languages size={18} />
                  <span className="text-xs uppercase">{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggle}
                className="p-2 border-2 border-black dark:border-white shadow-manga dark:shadow-manga-white bg-dbz-yellow text-black hover:bg-dbz-orange transition-all"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 border-2 border-black dark:border-white bg-dbz-blue text-white"
            >
              <span className="text-xs font-bold uppercase">{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
            </button>
            <button
              onClick={toggle}
              className="p-2 border-2 border-black dark:border-white bg-dbz-yellow text-black"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border-2 border-black dark:border-white bg-white dark:bg-dbz-dark text-black dark:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dbz-dark border-b-4 border-black dark:border-white overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-black dark:text-white font-black uppercase italic hover:bg-dbz-orange hover:text-white transition-all border-l-4 border-transparent hover:border-black dark:hover:border-white"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
