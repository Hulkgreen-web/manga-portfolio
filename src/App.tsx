import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-dbz-light dark:bg-dbz-dark transition-colors duration-300">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-dbz-orange z-[100] origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      
      <footer className="py-8 border-t-4 border-black dark:border-white bg-dbz-yellow text-center text-black font-black uppercase italic transition-colors duration-300">
        <p>© {new Date().getFullYear()} - {t('footer.trained_with', "ENTRAÎNÉ AVEC REACT, TYPESCRIPT & TAILWIND CSS")}</p>
        <p className="mt-2 text-sm">{t('footer.max_power', "PUISSANCE MAXIMALE ATTEINTE !")}</p>
      </footer>
    </div>
  );
}

export default App;
