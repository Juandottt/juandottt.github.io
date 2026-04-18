/* ════════════════════════════════════════════════
   Juan Constantin — Portfolio · script.js
   ════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── THEME TOGGLE ─────────────────────────────── */
  const html        = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const THEME_KEY   = 'jc-portfolio-theme';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    if (themeToggle) {
      themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '◐' : '●';
      themeToggle.setAttribute('aria-label', theme === 'dark'
        ? 'Cambiar a modo claro'
        : 'Cambiar a modo oscuro');
    }
  }

  // Init: prefer stored → prefers-color-scheme → dark default
  const storedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(storedTheme ?? (prefersDark ? 'dark' : 'light'));

  themeToggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ── NAVBAR SCROLL STATE ──────────────────────── */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ── MOBILE MENU ──────────────────────────────── */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks   = document.getElementById('nav-links');

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on nav link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── TYPING EFFECT ────────────────────────────── */
  const typedEl = document.getElementById('typed-text');
  const phrases = [
    '.NET 8 + React developer',
    'Clean Architecture advocate',
    'Student at ORT Uruguay',
    'Looking for part-time roles',
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let isDeleting = false;
  let timeoutId  = null;

  function typeNext() {
    if (!typedEl) return;

    const phrase = phrases[phraseIdx];
    const displayText = isDeleting
      ? phrase.slice(0, charIdx - 1)
      : phrase.slice(0, charIdx + 1);

    typedEl.textContent = displayText;

    if (!isDeleting) {
      charIdx++;
      if (charIdx > phrase.length) {
        isDeleting = true;
        timeoutId = setTimeout(typeNext, 2200);
        return;
      }
    } else {
      charIdx--;
      if (charIdx < 0) {
        isDeleting = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
        charIdx    = 0;
        timeoutId  = setTimeout(typeNext, 400);
        return;
      }
    }

    const speed = isDeleting ? 38 : 65;
    timeoutId = setTimeout(typeNext, speed);
  }

  // Start after hero entrance animations settle
  setTimeout(typeNext, 900);

  /* ── INTERSECTION OBSERVER — REVEAL ON SCROLL ─── */
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));

    // Hero reveals trigger immediately (they're already in viewport)
    document.querySelectorAll('.hero .reveal').forEach(el => {
      // Small delay so the page finishes loading
      setTimeout(() => el.classList.add('visible'), 100);
    });
  } else {
    // Fallback: show everything
    document.querySelectorAll('.reveal, .reveal-up, .reveal-card')
      .forEach(el => el.classList.add('visible'));
  }

  /* ── COUNT-UP ANIMATION ───────────────────────── */
  const counters = document.querySelectorAll('.stat-num[data-target]');

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const start  = performance.now();
        const dur    = 1200;

        function step(now) {
          const elapsed  = Math.min(now - start, dur);
          const progress = elapsed / dur;
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = String(Math.round(target * eased));
          if (elapsed < dur) requestAnimationFrame(step);
          else el.textContent = target;
        }

        requestAnimationFrame(step);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => countObserver.observe(el));

  /* ── SMOOTH ACTIVE NAV LINK ───────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const top    = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
        active?.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ── PROGRESS BAR ANIMATION ───────────────────── */
  // Reset progress bars to 0 then animate when card becomes visible
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const target = bar.style.getPropertyValue('--pct');
    bar.style.setProperty('--pct', '0%');

    const cardObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger after a short delay for visual effect
          setTimeout(() => bar.style.setProperty('--pct', target), 200);
          cardObserver.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    cardObserver.observe(bar.closest('.project-card'));
  });

})();
