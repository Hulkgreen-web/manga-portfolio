import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { useTranslation } from 'react-i18next';
import { portfolioData } from './data/portfolioData';

function App() {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="space-y-12 sm:space-y-16">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="py-12 border-t border-stone-200/80 dark:border-stone-800/80 bg-white/60 dark:bg-stone-950/60 backdrop-blur-md text-center transition-colors duration-300 font-mono">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>© {new Date().getFullYear()} {portfolioData.name}. {t('footer.rights')}</p>
          <p className="flex items-center gap-1.5">
            <span className="text-orange-500">&gt;</span>
            <span>{t('footer.built_with')}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

