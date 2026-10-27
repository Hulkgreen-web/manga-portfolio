import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { ArcadeModal } from './components/ArcadeModal';
import { AchievementToast, type ToastItem } from './components/AchievementToast';
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

  const [isArcadeOpen, setIsArcadeOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleUnlockAchievement = (title: string, desc: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, description: desc }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(item => item.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#101216] text-stone-900 dark:text-stone-100 transition-colors duration-200">
      {/* Keyboard accessible skip-to-content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[200] px-4 py-2 bg-emerald-600 text-white font-mono text-xs font-bold rounded-lg shadow-lg"
      >
        Skip to main content
      </a>

      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-emerald-500 z-[100] origin-left"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Navbar with Arcade Trigger */}
      <Navbar onOpenArcade={() => setIsArcadeOpen(true)} />

      {/* Main Content */}
      <main id="main-content" className="space-y-12 sm:space-y-16">
        <Hero onOpenArcade={() => setIsArcadeOpen(true)} />
        <Projects />
        <Skills />
        <Experience />
      </main>
      
      {/* Footer */}
      <footer className="py-12 border-t border-stone-200 dark:border-stone-800/80 bg-white dark:bg-[#14171d] text-center transition-colors duration-200 font-mono">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600 dark:text-stone-400">
          <p>© {new Date().getFullYear()} {portfolioData.name}. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsArcadeOpen(true)}
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              ⚽ Penalty Shootout Cup
            </button>
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <p className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">&gt;</span>
              <span>{t('footer.built_with')}</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Interactive Arcade Easter Egg Modal */}
      <ArcadeModal
        isOpen={isArcadeOpen}
        onClose={() => setIsArcadeOpen(false)}
        onUnlockAchievement={handleUnlockAchievement}
      />

      {/* Achievement Notifications */}
      <AchievementToast
        toasts={toasts}
        onDismiss={handleDismissToast}
      />
    </div>
  );
}

export default App;
