import { motion } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight, GitCommit } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Experience = () => {
  const { t } = useTranslation();
  const commitHashes = ["e8f21a4", "9c4d8b1", "3b1e7f0"];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-medium uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/60 px-3.5 py-1 rounded-full mb-3 inline-block"
          >
            &gt; git log --experience --graph
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4 tracking-tight"
          >
            {t('sections.experience')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto text-base sm:text-lg"
          >
            {t('experience.subtitle')}
          </motion.p>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-stone-300 dark:border-stone-800 ml-4 sm:ml-8 space-y-12">
          {portfolioData.experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group"
            >
              {/* Timeline Git Commit Node */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1 w-5 h-5 rounded-full bg-white dark:bg-stone-950 border-2 border-orange-600 dark:border-orange-400 shadow-sm flex items-center justify-center group-hover:scale-125 transition-all duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 dark:bg-orange-400 group-hover:bg-amber-400 transition-colors" />
              </div>

              {/* Experience Card */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-500/30 transition-all duration-300 border border-stone-200/90 dark:border-stone-800">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800/60">
                      <Calendar size={12} />
                      {exp.period.replace('common.present', t('common.present'))}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/70">
                      <GitCommit size={11} className="text-orange-500" />
                      <span>{commitHashes[index] || "1a2b3c4"}</span>
                    </span>
                  </div>
                  
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-stone-500 dark:text-stone-400">
                    <Briefcase size={12} className="text-orange-500" />
                    {exp.company}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {t(`portfolio.experiences.${exp.translationKey}.position`)}
                </h3>

                <ul className="space-y-2.5 font-sans">
                  {(t(`portfolio.experiences.${exp.translationKey}.description`, { returnObjects: true }) as string[]).map((item, idx) => (
                    <li 
                      key={idx} 
                      className="text-stone-600 dark:text-stone-300 text-sm flex items-start gap-2.5 leading-relaxed"
                    >
                      <ChevronRight size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
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


