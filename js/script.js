// Mobilmeny
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menu.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Diskré scroll-animasjon. Innholdet vises direkte hvis nettleseren ikke støtter IntersectionObserver.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

// Endrer navigasjonen ved scrolling og markerer seksjonen som er i visning.
const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function updateNavigation() {
  header.classList.toggle('scrolled', window.scrollY > 30);

  const marker = window.scrollY + window.innerHeight * 0.32;
  let currentId = '';
  sections.forEach((section) => {
    if (section.offsetTop <= marker) currentId = section.id;
  });

  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
});
updateNavigation();
