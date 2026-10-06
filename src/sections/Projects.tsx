import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, Terminal as TerminalIcon } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-medium uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/60 px-3.5 py-1 rounded-full mb-3 inline-block"
          >
            &gt; ./projects --show-all
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4 tracking-tight"
          >
            {t('sections.projects')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto text-base sm:text-lg"
          >
            {t('projects.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 flex flex-col group border border-stone-200/90 dark:border-stone-800"
            >
              {/* Terminal Window Header for Card */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-stone-100/90 dark:bg-stone-900/90 border-b border-stone-200/80 dark:border-stone-800/80 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                  <TerminalIcon size={11} className="text-orange-500" />
                  <span>app_{project.translationKey}.tsx</span>
                </div>
                <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold">#0{index + 1}</span>
              </div>

              {/* Project Preview */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100 dark:bg-stone-900/50 border-b border-stone-200/80 dark:border-stone-800/80">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={t(`portfolio.projects.${project.translationKey}.title`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-500/10 via-stone-100 to-amber-500/10 dark:from-orange-950/40 dark:via-stone-900/40 dark:to-amber-950/40 p-6 font-mono">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-stone-800 shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Code2 size={24} className="text-orange-500" />
                    </div>
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      // {t('projects.no_preview')}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Details */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Tech tags */}
                <div className="flex gap-1.5 mb-4 flex-wrap">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-stone-100 dark:bg-stone-800/90 text-stone-700 dark:text-stone-300 border border-stone-200/70 dark:border-stone-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {t(`portfolio.projects.${project.translationKey}.title`)}
                </h3>

                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6 flex-grow">
                  {t(`portfolio.projects.${project.translationKey}.description`)}
                </p>
                
                {/* Actions */}
                <div className="flex items-center gap-3 pt-2 border-t border-stone-100 dark:border-stone-800/60 font-mono">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors"
                    >
                      <Github size={14} />
                      <span>$ code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-sm shadow-orange-500/20 transition-all"
                    >
                      <ExternalLink size={14} />
                      <span>$ demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


