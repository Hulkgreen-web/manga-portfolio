import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 bg-dbz-light dark:bg-dbz-dark transition-colors duration-300 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 halftone opacity-30"></div>
      <div className="absolute inset-0 speed-lines opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20, skewX: -10 },
              visible: { opacity: 1, y: 0, skewX: -6 }
            }}
            className="text-dbz-orange dark:text-dbz-yellow font-bold tracking-widest uppercase text-2xl mb-4 italic transform transform-gpu"
          >
            {t('hero.subtitle')}
          </motion.h2>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-6xl md:text-9xl font-bold text-black dark:text-white mb-6 uppercase tracking-tighter drop-shadow-[4px_4px_0px_#F85B1A]"
          >
            {t('hero.greeting')} <span className="text-dbz-blue dark:text-dbz-yellow inline-block hover:scale-110 transition-transform cursor-default">{portfolioData.name}</span>
          </motion.h1>

          <motion.p 
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            className="text-2xl text-slate-800 dark:text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-bold bg-white/80 dark:bg-dbz-dark/80 p-4 border-4 border-black dark:border-white shadow-manga"
          >
            {t('portfolio.bio')}
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.a
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-10 py-4 border-4 border-black dark:border-white bg-dbz-orange text-white font-black text-xl hover:bg-dbz-blue transition-colors shadow-manga hover:shadow-manga-lg flex items-center gap-2 group transform -skew-x-6 active:translate-y-1"
            >
              {t('hero.cta')}
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </motion.a>
            
            <div className="flex items-center gap-6">
              {portfolioData.socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -8, rotate: 12, backgroundColor: '#F85B1A', color: '#fff' }}
                  href={social.url}
                  className="p-4 border-4 border-black dark:border-white bg-dbz-yellow text-black shadow-manga hover:shadow-manga-lg transition-all"
                  aria-label={social.name}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Dragon Ball elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [12, 15, 12],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute bottom-10 left-10 w-20 h-20 rounded-full border-4 border-black bg-dbz-orange flex items-center justify-center shadow-manga"
      >
        <span className="text-dbz-yellow text-3xl font-bold">★</span>
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [-12, -15, -12],
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute top-20 right-10 w-16 h-16 rounded-full border-4 border-black bg-dbz-orange flex items-center justify-center shadow-manga hidden md:flex"
      >
        <span className="text-dbz-yellow text-2xl font-bold">★★</span>
      </motion.div>

      <motion.div 
        animate={{ 
          x: [0, 15, 0],
          y: [0, 10, 0],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/4 left-1/4 w-10 h-10 rounded-full border-4 border-black bg-dbz-orange flex items-center justify-center shadow-manga opacity-50 hidden lg:flex"
      >
        <span className="text-dbz-yellow text-sm font-bold">★★★</span>
      </motion.div>
    </section>
  );
};
