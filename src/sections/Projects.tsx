import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-800 mb-3">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">&gt;</span>
            <span>{t('sections.projects_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-3">
            {t('sections.projects')}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-xl text-base sm:text-lg">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="console-card rounded-2xl overflow-hidden flex flex-col group"
            >
              {/* Project Visual Container */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-100 dark:bg-[#121419] border-b border-stone-200 dark:border-stone-800 flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={t(`portfolio.projects.${project.translationKey}.title`)}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 font-mono text-center">
                    <div className="w-12 h-12 rounded-xl bg-stone-200 dark:bg-stone-800 flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400">
                      <Code2 size={24} />
                    </div>
                    <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                      {t('projects.no_preview')}
                    </span>
                  </div>
                )}
                {/* Tactical project number badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-stone-900/90 text-white font-mono text-[11px] font-bold border border-stone-700 shadow-sm">
                  0{index + 1}
                </div>
              </div>

              {/* Project Meta & Description */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                {/* Tech stack tags */}
                <div className="flex gap-1.5 mb-4 flex-wrap" aria-label="Technologies used">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">
                  {t(`portfolio.projects.${project.translationKey}.title`)}
                </h3>

                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-6 flex-grow">
                  {t(`portfolio.projects.${project.translationKey}.description`)}
                </p>

                {/* Real Action Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800/80">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                    >
                      <span>{t('projects.demo')}</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                    >
                      <Github size={13} />
                      <span>{t('projects.github')}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
