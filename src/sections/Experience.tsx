import { motion } from 'framer-motion';
import { Calendar, Briefcase, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-800 mb-3">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">&gt;</span>
            <span>{t('sections.experience_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-3">
            {t('sections.experience')}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-xl text-base sm:text-lg">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-stone-300 dark:border-stone-800 space-y-10 ml-2 sm:ml-4">
          {portfolioData.experiences.map((exp, index) => {
            const localizedTags = t(`portfolio.experiences.${exp.translationKey}.tags`, { returnObjects: true });
            const tags = Array.isArray(localizedTags) ? localizedTags : (exp.tags || []);

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="relative group"
              >
                {/* Timeline marker beacon */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#101216] border-2 border-emerald-500 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>

                {/* Experience Match Card */}
                <div className="console-card p-6 sm:p-7 rounded-2xl">
                  {/* Meta header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80">
                      <Calendar size={12} />
                      <span>{t(`portfolio.experiences.${exp.translationKey}.period`)}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-stone-600 dark:text-stone-400">
                      <Briefcase size={13} className="text-emerald-600 dark:text-emerald-400" />
                      <span>{exp.company}</span>
                    </span>
                  </div>

                  {/* Role Position */}
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-4">
                    {t(`portfolio.experiences.${exp.translationKey}.position`)}
                  </h3>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 font-sans" aria-label="Key responsibilities and achievements">
                    {(t(`portfolio.experiences.${exp.translationKey}.description`, { returnObjects: true }) as string[]).map((item, idx) => (
                      <li 
                        key={idx} 
                        className="text-stone-700 dark:text-stone-300 text-sm flex items-start gap-2.5 leading-relaxed"
                      >
                        <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  {tags.length > 0 && (
                    <div className="flex gap-1.5 mt-4 pt-4 border-t border-stone-200 dark:border-stone-800/80 flex-wrap" aria-label="Technologies used">
                      {tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
