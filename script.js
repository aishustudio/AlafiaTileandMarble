(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduced.matches) document.documentElement.classList.add('motion');
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));
  document.addEventListener('focusin', e => e.target.closest('.reveal')?.classList.add('visible'));
  const clearOpening = () => document.querySelector('.opening')?.remove();
  setTimeout(clearOpening, 1700);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') clearOpening(); });
  reduced.addEventListener('change', e => { if (e.matches) { document.documentElement.classList.remove('motion'); clearOpening(); } });
})();
