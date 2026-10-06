import { motion } from 'framer-motion';
import { ArrowRight, Terminal as TerminalIcon } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-28 pb-20 relative overflow-hidden bg-grid-pattern">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-8 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t('hero.badge')}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-3 leading-[1.15]"
          >
            {t('hero.greeting')}{' '}
            <span className="text-gradient inline-block">
              {portfolioData.name}
            </span>
          </motion.h1>

          {/* Subtitle / Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-sm sm:text-base font-semibold text-orange-600 dark:text-orange-400 mb-6"
          >
            <span className="text-stone-400 dark:text-stone-600">&gt;</span>
            <span>{t('hero.role')}</span>
          </motion.div>

          {/* Developer Terminal Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="terminal-box rounded-2xl overflow-hidden text-left font-mono text-xs sm:text-sm max-w-2xl w-full mx-auto mb-10 border border-stone-800/80 shadow-2xl"
          >
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-stone-900/90 border-b border-stone-800/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-400 text-xs font-mono select-none">
                <TerminalIcon size={13} className="text-orange-500" />
                <span>arnaud@portfolio: ~</span>
              </div>
              <span className="text-[11px] text-stone-500 font-mono">bash</span>
            </div>

            {/* Terminal Body */}
            <div className="p-5 sm:p-6 space-y-3.5 bg-stone-950/90">
              <div className="flex items-center gap-2 text-stone-300">
                <span className="text-orange-500 font-bold">➜</span>
                <span className="text-amber-400">~</span>
                <span className="text-stone-200 font-semibold">$ whoami</span>
              </div>
              <p className="text-stone-300 pl-4 border-l-2 border-orange-500/40 leading-relaxed font-sans text-xs sm:text-sm">
                {t('portfolio.bio')}
              </p>
              
              <div className="flex items-center gap-2 text-stone-300 pt-1">
                <span className="text-orange-500 font-bold">➜</span>
                <span className="text-amber-400">~</span>
                <span className="text-stone-200 font-semibold">$ cat stack.summary</span>
              </div>
              <div className="text-stone-300 pl-4 border-l-2 border-orange-500/40 text-xs sm:text-xs leading-relaxed font-mono">
                <p><span className="text-orange-400 font-bold">backend:</span> ["Java / Spring Boot", "Node.js", "ASP.NET", "SQL"]</p>
                <p><span className="text-amber-400 font-bold">frontend:</span> ["React", "TypeScript", "Tailwind CSS"]</p>
                <p><span className="text-stone-400">status:</span> <span className="text-emerald-400 font-semibold">"available_for_hire"</span></p>
              </div>

              <div className="flex items-center gap-2 text-stone-300 pt-1">
                <span className="text-orange-500 font-bold">➜</span>
                <span className="text-amber-400">~</span>
                <span className="text-stone-200 font-semibold">$</span>
                <span className="w-2 h-4 bg-orange-500 animate-pulse inline-block align-middle"></span>
              </div>
            </div>
          </motion.div>
          
          {/* Action buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-4 w-full sm:w-auto mb-10"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-mono font-medium text-xs sm:text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="text-amber-200">&gt;</span>
              <span>{t('hero.cta_projects')}</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            {portfolioData.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl text-stone-500 hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400 bg-white dark:bg-stone-900/80 hover:bg-orange-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 shadow-sm hover:scale-105 transition-all duration-200"
                aria-label={social.name}
              >
                <social.icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


