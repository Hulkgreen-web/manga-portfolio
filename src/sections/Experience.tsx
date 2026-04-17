import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 bg-dbz-light dark:bg-dbz-dark transition-colors duration-300 relative">
      <div className="absolute inset-0 speed-lines opacity-5 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-4 uppercase italic transform -skew-x-6 drop-shadow-[4px_4px_0px_#F85B1A]">
            {t('sections.experience')}
          </h2>
          <p className="text-xl text-slate-800 dark:text-slate-200 max-w-2xl mx-auto font-bold uppercase">
            {t('portfolio.experience_subtitle', "Chaque étape m'a rendu plus fort !")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line Animation */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-2 bg-dbz-blue dark:bg-dbz-yellow origin-top z-0"
          />

          {portfolioData.experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 80 }}
              className="relative pl-12 pb-16 last:pb-0"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                className="absolute left-[-20px] top-0 w-12 h-12 bg-dbz-orange border-4 border-black rounded-full flex items-center justify-center shadow-manga z-20"
              >
                <span className="text-white font-black">{index + 1}</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 10 }}
                className="manga-card p-8 bg-white dark:bg-dbz-dark"
              >
                <span className="inline-block px-4 py-1 border-2 border-black dark:border-white bg-dbz-yellow text-black text-sm font-black uppercase italic mb-4 transform -skew-x-12 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  SAGA : {exp.period.replace('common.present', t('common.present'))}
                </span>
                <h3 className="text-3xl font-black text-black dark:text-white uppercase italic tracking-tighter mb-1">
                  {t(`portfolio.experiences.${exp.translationKey}.position`)}
                </h3>
                <p className="text-dbz-blue dark:text-dbz-yellow font-black uppercase text-lg mb-6">{exp.company}</p>
                <motion.ul 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.5
                      }
                    }
                  }}
                  className="space-y-3"
                >
                  {(t(`portfolio.experiences.${exp.translationKey}.description`, { returnObjects: true }) as string[]).map((item, idx) => (
                    <motion.li 
                      key={idx} 
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="text-slate-800 dark:text-slate-200 font-bold flex gap-3 italic group"
                    >
                      <motion.span 
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.2 }}
                        className="text-dbz-orange text-xl"
                      >
                        »
                      </motion.span>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
