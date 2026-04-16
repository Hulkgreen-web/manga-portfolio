import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 bg-white dark:bg-dbz-dark transition-colors duration-300 relative">
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

        <div className="max-w-4xl mx-auto">
          {portfolioData.experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-12 pb-16 border-l-8 border-dbz-blue dark:border-dbz-yellow last:pb-0"
            >
              <div className="absolute left-[-28px] top-0 w-12 h-12 bg-dbz-orange border-4 border-black rounded-full flex items-center justify-center shadow-manga z-20">
                <span className="text-white font-black">{index + 1}</span>
              </div>
              
              <div className="manga-card p-8">
                <span className="inline-block px-4 py-1 border-2 border-black dark:border-white bg-dbz-yellow text-black text-sm font-black uppercase italic mb-4 transform -skew-x-12">
                  SAGA : {exp.period.replace('common.present', t('common.present'))}
                </span>
                <h3 className="text-3xl font-black text-black dark:text-white uppercase italic tracking-tighter mb-1">
                  {t(`portfolio.experiences.${exp.translationKey}.position`)}
                </h3>
                <p className="text-dbz-blue dark:text-dbz-yellow font-black uppercase text-lg mb-6">{exp.company}</p>
                <ul className="space-y-3">
                  {(t(`portfolio.experiences.${exp.translationKey}.description`, { returnObjects: true }) as string[]).map((item, idx) => (
                    <li key={idx} className="text-slate-800 dark:text-slate-200 font-bold flex gap-3 italic">
                      <span className="text-dbz-orange text-xl">»</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
