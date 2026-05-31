/* =============================================
   ТОКСИЧНИЙ | ЧАТ — script.js
   ============================================= */

'use strict';

/* =============================================
   STARS PRICING TABLE
   ============================================= */
const STARS_PRICES = [
  { stars: 100,  price: 95  },
  { stars: 150,  price: 130 },
  { stars: 200,  price: 170 },
  { stars: 250,  price: 220 },
  { stars: 300,  price: 250 },
  { stars: 350,  price: 290 },
  { stars: 400,  price: 320 },
  { stars: 450,  price: 370 },
  { stars: 500,  price: 390 },
  { stars: 550,  price: 420 },
  { stars: 600,  price: 460 },
  { stars: 650,  price: 500 },
  { stars: 700,  price: 530 },
  { stars: 750,  price: 570 },
  { stars: 800,  price: 620 },
  { stars: 850,  price: 640 },
  { stars: 900,  price: 680 },
  { stars: 950,  price: 730 }
];

/* =============================================
   PARTICLE SYSTEM
   ============================================= */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let W = window.innerWidth;
  let H = window.innerHeight;

  canvas.width  = W;
  canvas.height = H;

  const COLORS = [
    'rgba(108,43,255,',
    'rgba(139,92,255,',
    'rgba(177,140,255,',
    'rgba(168,85,247,'
  ];

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.1,
      alphaDir: (Math.random() > 0.5 ? 1 : -1) * 0.005
    };
  }

  const COUNT = Math.min(120, Math.floor((W * H) / 12000));
  for (let i = 0; i < COUNT; i++) particles.push(createParticle());

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const a = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108,43,255,${a})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += p.alphaDir;
      if (p.alpha <= 0.05 || p.alpha >= 0.6) p.alphaDir *= -1;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.fill();
    });

    connect();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
  });
})();

/* =============================================
   FALLING STARS
   ============================================= */
(function initFallingStars() {
  const container = document.getElementById('falling-stars');
  if (!container) return;

  const CHARS = ['⭐', '✦', '★', '✧', '✶', '✵'];
  const COUNT = 18;

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('span');
    el.className = 'falling-star';
    el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${6 + Math.random() * 10}s`;
    el.style.animationDelay = `${Math.random() * 12}s`;
    el.style.fontSize = `${10 + Math.random() * 14}px`;
    container.appendChild(el);
  }
})();

/* =============================================
   NAVBAR SCROLL EFFECT
   ============================================= */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
})();

/* =============================================
   MOBILE BURGER MENU
   ============================================= */
(function initBurger() {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
})();

/* =============================================
   REVEAL ON SCROLL
   ============================================= */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => io.observe(el));
})();

/* =============================================
   ANIMATED COUNTERS
   ============================================= */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = 16;
    const steps = duration / step;
    let current = 0;

    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
})();

/* =============================================
   CALCULATOR
   ============================================= */
(function initCalculator() {
  const input   = document.getElementById('calc-input');
  const priceEl = document.getElementById('calc-price');
  const packEl  = document.getElementById('calc-pack');
  const saveEl  = document.getElementById('calc-save');
  const orderEl = document.getElementById('calc-order');

  if (!input) return;

  function calcPriceForStars(n) {
    // Find best package (nearest >= n)
    const above = STARS_PRICES.filter(p => p.stars >= n);
    if (!above.length) {
      // More than 950 — extrapolate from last
      return null;
    }
    return above[0];
  }

  function getBasePrice(n) {
    // Price per star from 100-pack
    const base = STARS_PRICES[0];
    return (n / base.stars) * base.price;
  }

  function calculate() {
    const raw = parseInt(input.value, 10);
    if (!raw || raw <= 0) {
      priceEl.textContent = '—';
      packEl.textContent  = '—';
      saveEl.textContent  = '—';
      if (orderEl) orderEl.style.display = 'none';
      return;
    }

    const best = calcPriceForStars(raw);
    const basePrice = getBasePrice(raw);

    if (!best) {
      priceEl.textContent = 'Напишіть адмін для розрахунку';
      packEl.textContent  = `${raw} ⭐ (індивідуально)`;
      saveEl.textContent  = '—';
      if (orderEl) orderEl.style.display = 'flex';
      return;
    }

    const saving = Math.max(0, Math.round(basePrice - best.price));

    priceEl.textContent = `${best.price} грн`;
    packEl.textContent  = `${best.stars} ⭐`;
    saveEl.textContent  = saving > 0 ? `${saving} грн` : 'Максимальна вигода';
    if (orderEl) orderEl.style.display = 'flex';
  }

  input.addEventListener('input', calculate);
  input.addEventListener('keyup', calculate);
})();

/* =============================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================= */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
})();

/* =============================================
   CARD TILT ON MOUSE MOVE (desktop)
   ============================================= */
(function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.premium-card, .benefit-card, .review-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
