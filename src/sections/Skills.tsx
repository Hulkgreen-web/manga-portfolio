import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';
import { Code2, Server, Wrench, Smartphone } from 'lucide-react';

export const Skills = () => {
  const { t } = useTranslation();
  const categories = Array.from(new Set(portfolioData.skills.map(s => s.category)));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Code2 size={18} className="text-orange-500" />;
      case 'Backend':
        return <Server size={18} className="text-amber-500" />;
      case 'Outils':
        return <Wrench size={18} className="text-orange-600" />;
      case 'Mobile':
        return <Smartphone size={18} className="text-amber-600" />;
      default:
        return <Code2 size={18} className="text-orange-500" />;
    }
  };

  const getCategoryFileName = (category: string) => {
    switch (category) {
      case 'Frontend': return 'frontend.tsx';
      case 'Backend': return 'backend.java';
      case 'Outils': return 'devops.yml';
      case 'Mobile': return 'mobile.dart';
      default: return 'skills.ts';
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-medium uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/60 px-3.5 py-1 rounded-full mb-3 inline-block"
          >
            &gt; cat stack.config.json
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4 tracking-tight"
          >
            {t('sections.skills')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto text-base sm:text-lg"
          >
            {t('skills.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => {
            const categorySkills = portfolioData.skills.filter(s => s.category === category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl shadow-sm hover:shadow-lg hover:border-orange-500/30 transition-all duration-300 flex flex-col overflow-hidden border border-stone-200/90 dark:border-stone-800"
              >
                {/* Window top bar */}
                <div className="flex items-center justify-between px-3.5 py-2 bg-stone-100/90 dark:bg-stone-900/90 border-b border-stone-200/80 dark:border-stone-800/80 font-mono text-[11px] text-stone-500 dark:text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/70"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500/70"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70"></span>
                  </div>
                  <span>{getCategoryFileName(category)}</span>
                  <span className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold">{categorySkills.length} pkgs</span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-stone-200/70 dark:border-stone-800/70">
                    <div className="p-2 rounded-lg bg-orange-50 dark:bg-stone-800/90">
                      {getCategoryIcon(category)}
                    </div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-white">
                      {t(`portfolio.skills.${category}`)}
                    </h3>
                  </div>

                  <div className="space-y-2.5 flex-grow font-mono">
                    {categorySkills.map((skill) => (
                      <div 
                        key={skill.name} 
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-white/60 dark:bg-stone-900/50 border border-stone-200/60 dark:border-stone-800/60 hover:border-orange-500/40 hover:bg-orange-50/40 dark:hover:bg-stone-800/90 transition-all group cursor-default"
                      >
                        <div className="p-1.5 rounded-lg bg-orange-50 dark:bg-stone-800 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                          <skill.icon size={14} />
                        </div>
                        <span className="text-stone-800 dark:text-stone-200 font-medium text-xs">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


