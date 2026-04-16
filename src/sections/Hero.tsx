import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 bg-white dark:bg-dbz-dark transition-colors duration-300 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 halftone opacity-30"></div>
      <div className="absolute inset-0 speed-lines opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <h2 className="text-dbz-orange dark:text-dbz-yellow font-bold tracking-widest uppercase text-2xl mb-4 italic transform -skew-x-6">
            {t('hero.subtitle')}
          </h2>
          <h1 className="text-6xl md:text-9xl font-bold text-black dark:text-white mb-6 uppercase tracking-tighter drop-shadow-[4px_4px_0px_#F85B1A]">
            {t('hero.greeting')} <span className="text-dbz-blue dark:text-dbz-yellow">{portfolioData.name}</span>
          </h1>
          <p className="text-2xl text-slate-800 dark:text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-bold bg-white/80 dark:bg-dbz-dark/80 p-4 border-4 border-black dark:border-white shadow-manga">
            {t('portfolio.bio')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#projects"
              className="px-10 py-4 border-4 border-black dark:border-white bg-dbz-orange text-white font-black text-xl hover:bg-dbz-blue transition-all shadow-manga hover:shadow-manga-lg flex items-center gap-2 group transform -skew-x-6 active:translate-y-1 active:shadow-manga"
            >
              {t('hero.cta')}
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </a>
            <div className="flex items-center gap-6">
              {portfolioData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="p-4 border-4 border-black dark:border-white bg-dbz-yellow text-black shadow-manga hover:shadow-manga-lg hover:-translate-y-1 transition-all"
                  aria-label={social.name}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Dragon Ball elements (simplified as circles for now) */}
      <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full border-4 border-black bg-dbz-orange flex items-center justify-center shadow-manga rotate-12">
        <span className="text-dbz-yellow text-3xl font-bold">★</span>
      </div>
      <div className="absolute top-20 right-10 w-16 h-16 rounded-full border-4 border-black bg-dbz-orange flex items-center justify-center shadow-manga -rotate-12 hidden md:flex">
        <span className="text-dbz-yellow text-2xl font-bold">★★</span>
      </div>
    </section>
  );
};
