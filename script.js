const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const reveals = Array.from(document.querySelectorAll('.reveal'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const updateHeader = () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 24);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const closeMenu = () => {
  if (!header || !navToggle) return;
  header.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menú');
};

if (navToggle) {
  navToggle.addEventListener('click', () => {
    if (!header) return;
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
}

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.addEventListener('click', (event) => {
  if (header && !header.contains(event.target)) closeMenu();
});

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  reveals.forEach((element) => revealObserver.observe(element));
}

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-42% 0px -52% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));
}

const yearElement = document.querySelector('[data-year]');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const heroVisual = document.querySelector('.hero-visual');
const profileCard = document.querySelector('.profile-card');

if (heroVisual && profileCard && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    profileCard.style.setProperty('--rx', `${(y * -6).toFixed(2)}deg`);
    profileCard.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`);
  });

  heroVisual.addEventListener('pointerleave', () => {
    profileCard.style.setProperty('--rx', '0deg');
    profileCard.style.setProperty('--ry', '0deg');
  });
}
