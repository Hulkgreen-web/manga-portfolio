import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-dbz-dark transition-colors duration-300">
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
