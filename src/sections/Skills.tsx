import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Skills = () => {
  const { t } = useTranslation();
  const categories = Array.from(new Set(portfolioData.skills.map(s => s.category)));

  return (
    <section id="skills" className="py-24 bg-dbz-blue dark:bg-dbz-dark transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 speed-lines opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 uppercase italic transform -skew-x-6 drop-shadow-[4px_4px_0px_#F85B1A]">
            {t('sections.skills')}
          </h2>
          <p className="text-xl text-dbz-yellow max-w-2xl mx-auto font-black italic uppercase tracking-widest">
            {t('portfolio.skills_subtitle', "IT'S OVER 9000!!!")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, type: "spring" }}
              className="manga-card p-8 border-dbz-yellow bg-white dark:bg-dbz-dark"
            >
              <h3 className="text-2xl font-black text-dbz-orange dark:text-dbz-yellow mb-6 uppercase italic border-b-4 border-black dark:border-white pb-2">
                {t(`portfolio.skills.${category}`)}
              </h3>
              <div className="space-y-6">
                {portfolioData.skills
                  .filter(skill => skill.category === category)
                  .map((skill, sIdx) => (
                    <div key={skill.name} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            whileHover={{ rotate: 360 }}
                            className="p-2 border-2 border-black dark:border-white bg-dbz-yellow text-black"
                          >
                            <skill.icon size={18} />
                          </motion.div>
                          <span className="text-black dark:text-white font-black uppercase italic text-sm tracking-tighter">{skill.name}</span>
                        </div>
                        <span className="text-xs font-black text-dbz-orange italic">LVL. {80 + sIdx * 5}</span>
                      </div>
                      {/* Power Level Bar */}
                      <div className="h-4 border-2 border-black dark:border-white bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${75 + (sIdx % 3) * 10}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-dbz-orange to-dbz-yellow relative"
                        >
                          <div className="absolute inset-0 speed-lines opacity-30"></div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
