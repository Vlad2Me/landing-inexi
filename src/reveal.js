export const setupScrollReveal = () => {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => {
      el.classList.remove('opacity-0', 'translate-y-2');
    });
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.remove('opacity-0', 'translate-y-2');
          if (!prefersReducedMotion) {
            el.classList.add('animate-fade-in-up');
          }
          obs.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
};
