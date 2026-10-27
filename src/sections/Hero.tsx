import { motion } from 'framer-motion';
import { ArrowDown, Mail, Github, Linkedin, Gamepad2, Layers, MapPin, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  onOpenArcade: () => void;
}

export const Hero = ({ onOpenArcade }: HeroProps) => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-28 pb-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-start"
        >
          {/* Status beacon badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 status-beacon inline-block" />
            <span>{t('hero.badge')}</span>
          </div>

          {/* Main Title / Profile */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4 leading-[1.1]">
            <span className="text-stone-500 dark:text-stone-400 font-normal text-2xl sm:text-3xl md:text-4xl block mb-2 font-mono">
              {t('hero.greeting')}
            </span>
            <span>{portfolioData.name}</span>
          </h1>

          {/* Professional Role & Statement */}
          <p className="text-xl sm:text-2xl text-emerald-700 dark:text-emerald-400 font-mono font-semibold mb-6 flex items-center gap-2">
            <span className="text-stone-400 dark:text-stone-600">&gt;</span>
            <span>{t('hero.role')}</span>
          </p>

          <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 max-w-2xl leading-relaxed mb-8">
            {t('portfolio.bio')}
          </p>

          {/* Tactical Profile Deck (Gaming & Football Thematic Telemetry) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 font-mono text-xs">
            <div className="p-3.5 rounded-xl console-card flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-400 mb-2">
                <span className="uppercase text-[10px] tracking-wider font-semibold text-stone-500 dark:text-stone-400">
                  {t('hero.telemetry_stack')}
                </span>
                <Layers size={14} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="font-bold text-stone-900 dark:text-white">
                Java, React, Node, .NET
              </p>
            </div>

            <div className="p-3.5 rounded-xl console-card flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-400 mb-2">
                <span className="uppercase text-[10px] tracking-wider font-semibold text-stone-500 dark:text-stone-400">
                  {t('hero.telemetry_tactics')}
                </span>
                <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="font-bold text-stone-900 dark:text-white">
                Agile / Clean Architecture
              </p>
            </div>

            <div className="p-3.5 rounded-xl console-card flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-400 mb-2">
                <span className="uppercase text-[10px] tracking-wider font-semibold text-stone-500 dark:text-stone-400">
                  {t('hero.telemetry_location')}
                </span>
                <MapPin size={14} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="font-bold text-stone-900 dark:text-white">
                Mons & Bruxelles, BE
              </p>
            </div>
          </div>

          {/* Primary Action Row */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-10">
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-950 font-mono text-xs font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>{t('hero.cta_projects')}</span>
              <ArrowDown size={14} />
            </a>

            <button
              type="button"
              onClick={onOpenArcade}
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-mono text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Gamepad2 size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>{t('hero.cta_arcade')}</span>
            </button>

            <a
              href="mailto:abouillon1802@gmail.com"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-800 font-mono text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Mail size={15} />
              <span>{t('hero.cta_contact')}</span>
            </a>
          </div>

          {/* Direct Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono text-stone-500 dark:text-stone-400">
            <span className="text-[11px] uppercase tracking-wider">{t('hero.socials_label')}:</span>
            <a
              href="https://github.com/Hulkgreen-web"
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-900 dark:hover:text-white transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded p-1"
              aria-label="GitHub Profile"
            >
              <Github size={15} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/arnaud-bouillon-91419435b"
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-900 dark:hover:text-white transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded p-1"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={15} />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
