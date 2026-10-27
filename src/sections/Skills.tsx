import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';
import { Server, Layout, Wrench, Smartphone, Layers } from 'lucide-react';

export const Skills = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Backend', 'Frontend', 'Outils', 'Mobile'] as const;

  const filteredSkills = selectedCategory === 'all'
    ? portfolioData.skills
    : portfolioData.skills.filter(s => s.category === selectedCategory);

  const getCategoryMeta = (cat: string) => {
    switch (cat) {
      case 'Backend':
        return { icon: Server, color: 'text-emerald-600 dark:text-emerald-400', count: portfolioData.skills.filter(s => s.category === 'Backend').length };
      case 'Frontend':
        return { icon: Layout, color: 'text-emerald-600 dark:text-emerald-400', count: portfolioData.skills.filter(s => s.category === 'Frontend').length };
      case 'Outils':
        return { icon: Wrench, color: 'text-emerald-600 dark:text-emerald-400', count: portfolioData.skills.filter(s => s.category === 'Outils').length };
      case 'Mobile':
        return { icon: Smartphone, color: 'text-emerald-600 dark:text-emerald-400', count: portfolioData.skills.filter(s => s.category === 'Mobile').length };
      default:
        return { icon: Layers, color: 'text-stone-500', count: portfolioData.skills.length };
    }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-800 mb-3">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">&gt;</span>
            <span>{t('sections.skills_tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-3">
            {t('sections.skills')}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-xl text-base sm:text-lg">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8" role="tablist" aria-label="Skills Category Filter">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const meta = getCategoryMeta(cat);
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isSelected
                    ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
                }`}
              >
                <meta.icon size={13} className={isSelected ? 'text-emerald-400 dark:text-emerald-600' : meta.color} />
                <span>{cat === 'all' ? t('skills.filter_all') : t(`portfolio.skills.${cat}`)}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                  isSelected 
                    ? 'bg-stone-800 dark:bg-stone-200 text-stone-200 dark:text-stone-800' 
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}>
                  {meta.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Tactical Playbook Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="console-card p-4 rounded-xl flex items-center gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform flex-shrink-0">
                    <IconComponent size={17} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-xs font-bold text-stone-900 dark:text-white truncate">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                      {t(`portfolio.skills.${skill.category}`)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
