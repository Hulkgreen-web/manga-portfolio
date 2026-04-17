import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24 bg-dbz-light dark:bg-dbz-dark transition-colors duration-300 relative">
      <div className="absolute inset-0 halftone opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-4 uppercase italic transform -skew-x-6 drop-shadow-[4px_4px_0px_#F85B1A]">
            {t('sections.projects')}
          </h2>
          <p className="text-xl text-slate-800 dark:text-slate-200 max-w-2xl mx-auto font-bold">
            {t('portfolio.projects_subtitle', "Une sélection de mes travaux récents, où j'ai dépassé mes limites !")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="manga-card group overflow-hidden bg-white dark:bg-dbz-dark"
            >
              <div className="relative h-56 overflow-hidden border-b-4 border-black dark:border-white">
                <motion.img
                  src={project.image}
                  alt={t(`portfolio.projects.${project.translationKey}.title`)}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-dbz-orange/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="absolute top-4 left-4 px-3 py-1 bg-dbz-yellow border-2 border-black text-black font-black text-xs uppercase transform -rotate-12 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  PROJECT #{index + 1}
                </motion.div>
              </div>

              <div className="p-6">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.tags.map(tag => (
                    <motion.span 
                      key={tag} 
                      whileHover={{ scale: 1.1, backgroundColor: '#F85B1A', color: '#fff' }}
                      className="px-3 py-1 border-2 border-black dark:border-white bg-white dark:bg-slate-800 text-black dark:text-white text-xs font-black uppercase transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold text-black dark:text-white mb-2 uppercase tracking-tighter italic group-hover:text-dbz-orange transition-colors">
                  {t(`portfolio.projects.${project.translationKey}.title`)}
                </h3>
                <p className="text-slate-800 dark:text-slate-300 mb-6 font-medium leading-tight h-12 line-clamp-2">
                  {t(`portfolio.projects.${project.translationKey}.description`)}
                </p>
                
                <div className="flex items-center gap-6">
                  {project.githubUrl && (
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.githubUrl}
                      className="p-2 border-2 border-black dark:border-white bg-white dark:bg-slate-800 text-black dark:text-white hover:bg-dbz-orange hover:text-white transition-all shadow-manga"
                      aria-label={t('projects.github')}
                    >
                      <Github size={24} />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.liveUrl}
                      className="p-2 border-2 border-black dark:border-white bg-dbz-yellow text-black hover:bg-dbz-orange transition-all shadow-manga"
                      aria-label={t('projects.demo')}
                    >
                      <ExternalLink size={24} />
                    </motion.a>
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
