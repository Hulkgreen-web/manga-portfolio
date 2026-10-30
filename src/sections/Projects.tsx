import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';

export const Projects = () => {
  const { t } = useTranslation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalProjects = portfolioData.projects.length;

  const updateScrollState = useCallback(() => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const items = container.querySelectorAll<HTMLElement>('[data-carousel-item]');
    if (!items.length) return;

    let closestIndex = 0;
    let minDiff = Infinity;

    items.forEach((item, idx) => {
      const diff = Math.abs(item.offsetLeft - container.scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
    setCanScrollLeft(container.scrollLeft > 10);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 10);
  }, []);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    updateScrollState();
    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateScrollState]);

  const scrollPrev = () => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelector<HTMLElement>('[data-carousel-item]');
    const scrollAmount = card ? card.offsetWidth + 24 : 320;
    carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelector<HTMLElement>('[data-carousel-item]');
    const scrollAmount = card ? card.offsetWidth + 24 : 320;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const items = carouselRef.current.querySelectorAll<HTMLElement>('[data-carousel-item]');
    if (items[index]) {
      items[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  return (
    <section 
      id="projects" 
      className="py-24 relative"
      aria-roledescription="carousel"
      aria-label={t('sections.projects')}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tactical Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-800 mb-3">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">&gt;</span>
              <span>{t('sections.projects_tag')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-3">
              {t('sections.projects')}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 max-w-xl text-base sm:text-lg">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Tactical Carousel Navigation Controls */}
          <div className="flex items-center gap-3 self-start sm:self-end">
            <span className="font-mono text-xs font-bold text-stone-500 dark:text-stone-400 mr-2 tracking-wider">
              {String(activeIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              aria-label={t('projects.prev')}
              className="w-11 h-11 rounded-xl bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-800 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollRight}
              aria-label={t('projects.next')}
              className="w-11 h-11 rounded-xl bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-800 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div
            ref={carouselRef}
            onScroll={updateScrollState}
            tabIndex={0}
            role="region"
            aria-live="polite"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollPrev();
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollNext();
              }
            }}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {portfolioData.projects.map((project, index) => (
              <article
                key={project.id}
                data-carousel-item
                className="snap-start flex-shrink-0 w-full md:w-[calc(50%-12px)] flex flex-col console-card rounded-2xl overflow-hidden group"
              >
                {/* Project Visual Container */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-100 dark:bg-[#121419] border-b border-stone-200 dark:border-stone-800 flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={t(`portfolio.projects.${project.translationKey}.title`)}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 font-mono text-center">
                      <div className="w-12 h-12 rounded-xl bg-stone-200 dark:bg-stone-800 flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400">
                        <Code2 size={24} />
                      </div>
                      <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                        {t('projects.no_preview')}
                      </span>
                    </div>
                  )}
                  {/* Tactical project number badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-stone-900/90 text-white font-mono text-[11px] font-bold border border-stone-700 shadow-sm">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Project Meta & Description */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                  {/* Tech stack tags */}
                  <div className="flex gap-1.5 mb-4 flex-wrap" aria-label="Technologies used">
                    {(Array.isArray(t(`portfolio.projects.${project.translationKey}.tags`, { returnObjects: true }))
                      ? (t(`portfolio.projects.${project.translationKey}.tags`, { returnObjects: true }) as string[])
                      : project.tags
                    ).map(tag => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">
                    {t(`portfolio.projects.${project.translationKey}.title`)}
                  </h3>

                  <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-6 flex-grow">
                    {t(`portfolio.projects.${project.translationKey}.description`)}
                  </p>

                  {/* Real Action Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800/80 mt-auto">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                      >
                        <span>{t('projects.demo')}</span>
                        <ExternalLink size={13} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                      >
                        <Github size={13} />
                        <span>{t('projects.github')}</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Tactical Pagination Dots / Bars */}
          <div className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
            {portfolioData.projects.map((_, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  aria-label={t('projects.indicator', { index: index + 1 })}
                  aria-current={isActive ? 'true' : undefined}
                  className="py-3 px-1 flex items-center justify-center focus-visible:outline-none cursor-pointer"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-8 bg-emerald-600 dark:bg-emerald-400'
                        : 'w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
