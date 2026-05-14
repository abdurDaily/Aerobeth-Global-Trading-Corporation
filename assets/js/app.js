/* ===================================
   AEROBETH GLOBAL TRADING CORPORATION
   Main Application JS
   =================================== */

'use strict';

/* ---- DOM Ready ---- */
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // PRELOADER
  // ==========================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 700);
      }, 2200);
    });
  }

  // ==========================================
  // NAVBAR SCROLL BEHAVIOR
  // ==========================================
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.querySelector('.scroll-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 60);
    }
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', scrollY > 400);
    }
    updateActiveNav();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ==========================================
  // ACTIVE NAV LINK ON SCROLL
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
        });
      }
    });
  };

  // ==========================================
  // SMOOTH SCROLL
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMobileNav();
      }
    });
  });

  // ==========================================
  // MOBILE NAV
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');

  const closeMobileNav = () => {
    hamburger?.classList.remove('active');
    mobileNav?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      hamburger.classList.add('active');
      mobileNav.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  mobileOverlay?.addEventListener('click', closeMobileNav);

  // ==========================================
  // TYPED.JS - Hero Typing Effect
  // ==========================================
  if (typeof Typed !== 'undefined') {
    const typedEl = document.getElementById('typed');
    if (typedEl) {
      new Typed('#typed', {
        strings: [
          'Trading Solutions',
          'Turnkey Projects',
          'Engineering Support',
          'Industrial Automation',
          'Procurement & Supply',
        ],
        typeSpeed: 60,
        backSpeed: 35,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
      });
    }
  }

  // ==========================================
  // AOS INIT
  // ==========================================
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }

  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  const counters = document.querySelectorAll('.counter-num[data-target]');
  let countersStarted = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const suffix = counter.dataset.suffix || '';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const update = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + suffix;
        }
      };
      requestAnimationFrame(update);
    });
  };

  const counterSection = document.querySelector('.counters-row');
  if (counterSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
      }
    }, { threshold: 0.3 });
    observer.observe(counterSection);
  }

  // ==========================================
  // HERO STATS COUNTER
  // ==========================================
  const heroStats = document.querySelectorAll('.hero-stat-num[data-target]');
  let heroStatsStarted = false;

  const heroSection = document.getElementById('hero');
  if (heroSection && heroStats.length) {
    setTimeout(() => {
      if (!heroStatsStarted) {
        heroStatsStarted = true;
        heroStats.forEach(stat => {
          const target = parseInt(stat.dataset.target, 10);
          const suffix = stat.dataset.suffix || '';
          const duration = 2500;
          const step = target / (duration / 16);
          let current = 0;
          const update = () => {
            current += step;
            if (current < target) {
              stat.innerHTML = Math.floor(current) + `<span>${suffix}</span>`;
              requestAnimationFrame(update);
            } else {
              stat.innerHTML = target + `<span>${suffix}</span>`;
            }
          };
          requestAnimationFrame(update);
        });
      }
    }, 2500);
  }

  // ==========================================
  // PROJECT FILTER
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // PROJECT MODAL
  // ==========================================
  const projectModalEl = document.getElementById('projectModal');
  const projectModal = projectModalEl ? new bootstrap.Modal(projectModalEl) : null;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      if (!projectModal) return;
      const title = card.dataset.title || '';
      const desc = card.dataset.desc || '';
      const category = card.dataset.modalCategory || '';
      const location = card.dataset.location || '';
      const imgSrc = card.querySelector('.project-img')?.src || '';

      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalDesc').textContent = desc;
      document.getElementById('modalCategory').textContent = category;
      document.getElementById('modalLocation').innerHTML = `<i class="bi bi-geo-alt"></i> ${location}`;
      const modalImg = document.getElementById('modalImg');
      if (modalImg) modalImg.src = imgSrc;

      projectModal.show();
    });
  });

  // ==========================================
  // TESTIMONIALS SWIPER
  // ==========================================
  if (typeof Swiper !== 'undefined') {
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.testimonials-swiper .swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.testimonials-swiper .swiper-button-next',
        prevEl: '.testimonials-swiper .swiper-button-prev',
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
    });

    // ---- Clients Logo Swiper ----
    const clientsSwiper = new Swiper('.clients-swiper', {
      slidesPerView: 2,
      spaceBetween: 16,
      loop: true,
      speed: 3000,
      autoplay: { delay: 0, disableOnInteraction: false },
      freeMode: true,
      breakpoints: {
        480: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      },
    });
  }

  // ==========================================
  // SCROLL TO TOP
  // ==========================================
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // CONTACT FORM SUBMIT
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span> <i class="bi bi-arrow-repeat"></i>';

    setTimeout(() => {
      formAlert.classList.remove('d-none');
      contactForm.reset();
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span> <i class="bi bi-send"></i>';
      setTimeout(() => formAlert.classList.add('d-none'), 5000);
    }, 1500);
  });

  // ==========================================
  // NAVBAR LINK ACTIVE ON LOAD
  // ==========================================
  updateActiveNav();

});

// ==========================================
// CSS ANIMATION HELPER
// ==========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInCard {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
