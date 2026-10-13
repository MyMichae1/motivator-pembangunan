/**
 * Yayasan MPM - Main JavaScript File
 */

const initializeScrollReveals = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const cardSelector = [
    '.program-card',
    '.blog-card',
    '.partner-logo-link',
    '.field-story-card',
    '.meeting-package-card',
    '.training-package-card',
    '#product-container > *',
    '#room-container > *',
    '[data-blog-list] > *',
    '[data-newsletter-list] > *',
    '[data-newsletter-related] > *',
    'section .grid > a.relative.group',
    'section .grid > section.bg-white.rounded-2xl'
  ].join(',');
  const observed = new WeakSet();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

  const observe = (element, delay = 0, options = {}) => {
    if (observed.has(element) || element.closest('.hero')) return;
    observed.add(element);
    element.classList.add('scroll-reveal-item');
    if (options.card) element.classList.add('scroll-reveal-card');
    if (options.image) element.classList.add('scroll-reveal-image');
    if (delay) element.style.setProperty('--scroll-reveal-delay', `${delay}ms`);
    observer.observe(element);
  };

  const collectTargets = root => {
    const find = selector => {
      const elements = [];
      if (root.nodeType === Node.ELEMENT_NODE && root.matches(selector)) elements.push(root);
      if (root.querySelectorAll) elements.push(...root.querySelectorAll(selector));
      return elements;
    };

    find('section h1, section h2').forEach(heading => {
      if (heading.closest('.hero')) return;
      observe(heading);
      const description = heading.nextElementSibling;
      if (description?.tagName === 'P') observe(description, 80);
    });

    const cardParents = new Set();
    find(cardSelector).forEach(card => cardParents.add(card.parentElement));
    cardParents.forEach(parent => {
      if (!parent) return;
      [...parent.children]
        .filter(child => child.matches(cardSelector))
        .forEach((card, index) => observe(card, Math.min(index * 100, 400), { card: true }));
    });

    find('.about-teaser__main-image, .about-teaser__overlay-image, main article > img, [data-newsletter-cover]')
      .forEach(image => observe(image, 100, { image: true }));
  };

  collectTargets(document);
  const mutationObserver = new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) collectTargets(node);
    }));
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
  document.body.classList.add('scroll-reveal-ready');
};

const initializePage = () => {
  initializeScrollReveals();

  /* =========================================
     1. Sticky Header
     ========================================= */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled', 'shadow-md');
      } else {
        header.classList.remove('scrolled', 'shadow-md');
      }
    });
  }

  /* =========================================
     2. Mobile Menu Toggle
     ========================================= */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a normal link
    const mobileLinks = mobileMenu.querySelectorAll('a:not([id="programDropdownToggle"])');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Only close if it's not expanding a dropdown (which is already excluded)
        if (!link.classList.contains('search-toggle')) {
          mobileMenu.classList.add('hidden');
        }
      });
    });
  }

  /* =========================================
     3. Navbar Search Logic
     ========================================= */
  const searchBtns = document.querySelectorAll('.search-toggle');
  const searchPanel = document.getElementById('searchPanel');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchClose');
  const searchForm = document.querySelector('form[data-site-search]');

  const setSearchOpen = isOpen => {
    if (!searchPanel || !searchInput) return;
    searchPanel.classList.toggle('hidden', !isOpen);
    searchBtns.forEach(button => {
      button.setAttribute('aria-expanded', String(isOpen));
    });

    if (isOpen) {
      if (mobileMenu) mobileMenu.classList.add('hidden');
      searchInput.focus();
    } else {
      searchInput.value = '';
    }
  };

  searchBtns.forEach(button => {
    button.addEventListener('click', () => {
      const isOpen = searchPanel && !searchPanel.classList.contains('hidden');
      setSearchOpen(!isOpen);
    });
  });

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', event => {
      if (!searchInput.value.trim()) {
        event.preventDefault();
        searchInput.focus();
      }
    });
  }
  
  if (searchClose) searchClose.addEventListener('click', () => setSearchOpen(false));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && searchPanel && !searchPanel.classList.contains('hidden')) {
      setSearchOpen(false);
    }
  });

  /* =========================================
     4. Scroll to Top Button
     ========================================= */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  if(scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================================
     5. Program Dropdown Toggle (Mobile)
     ========================================= */
  const programDropdownToggle = document.getElementById('programDropdownToggle');
  const programDropdownMenu = document.getElementById('programDropdownMenu');

  if(programDropdownToggle && programDropdownMenu) {
    programDropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      programDropdownMenu.classList.toggle('hidden');
    });
  }

  /* =========================================
     6. Hero Carousel Logic
     ========================================= */
  const heroSlidesData = [
    {
      image: "https://penamasmotivator.org/wp-content/uploads/2024/05/video-tumb.png.webp",
      category: "Pertanian",
      title: "Informasi & Solusi <span class='bg-clip-text text-transparent bg-gradient-to-r from-light to-white'>Budidaya Pertanian</span>",
      description: "Menyediakan informasi, pendampingan, dan solusi untuk mendukung pengembangan budidaya pertanian serta pemberdayaan masyarakat.",
      link: "pages/kegiatan.html",
      cta: "Lihat Kegiatan"
    },
    {
      image: "https://penamasmotivator.org/wp-content/uploads/2024/05/img-sec2.jpg.webp",
      category: "Pemberdayaan Masyarakat",
      title: "Bersama Membangun <span class='bg-clip-text text-transparent bg-gradient-to-r from-light to-white'>Perubahan Positif</span>",
      description: "Mendampingi masyarakat pedesaan di Tana Toraja untuk kemandirian ekonomi, sosial, dan ekologi berkelanjutan.",
      link: "pages/tentang.html",
      cta: "Pelajari Lebih Lanjut"
    },
    {
      image: "https://rycam.id/wp-content/uploads/2025/12/25-1200x675.png",
      category: "Pelatihan & Pengembangan",
      title: "Meningkatkan <span class='bg-clip-text text-transparent bg-gradient-to-r from-light to-white'>Kapasitas Masyarakat</span>",
      description: "Melalui pelatihan intensif, kami membekali pemuda dan petani dengan keterampilan untuk beradaptasi dan berkembang di daerah terpencil.",
      link: "pages/program.html",
      cta: "Lihat Program"
    },
    {
      image: "https://penamasmotivator.org/wp-content/uploads/2026/05/C7821T01-1024x576.jpg.webp",
      category: "Kegiatan MPM",
      title: "Kolaborasi untuk <span class='bg-clip-text text-transparent bg-gradient-to-r from-light to-white'>Masa Depan</span>",
      description: "Berbagai inisiatif mulai dari mitigasi perubahan iklim hingga pembangunan perdamaian bersama komunitas lokal.",
      link: "pages/donasi.html",
      cta: "Dukung Kami"
    }
  ];

  const sliderContainer = document.getElementById('hero-slides-container');
  const indicatorsContainer = document.getElementById('hero-indicators');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  
  if (sliderContainer && heroSlidesData.length > 0) {
    let currentSlide = 0;
    let autoplayInterval;
    const AUTOPLAY_DELAY = 6000;

    // Render Slides
    heroSlidesData.forEach((slide, index) => {
      // Create Slide Element
      const slideEl = document.createElement('article');
      slideEl.className = `hero-slide ${index === 0 ? 'active' : ''}`;
      
      const lazyLoad = index === 0 ? '' : 'loading="lazy"';
      
      slideEl.innerHTML = `
        <img src="${slide.image}" class="hero-slide-bg" alt="${slide.category}" ${lazyLoad}>
        <div class="hero-overlay"></div>
        <div class="container mx-auto px-4 lg:px-8 max-w-7xl hero-slide-content">
          <div class="hero-content-inner">
            <span class="inline-block py-1 px-3 rounded-full bg-light/20 border border-light/30 text-light text-sm font-semibold mb-6 backdrop-blur-sm">
              ${slide.category}
            </span>
            <${index === 0 ? 'h1' : 'h2'} class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 mt-2 tracking-tight">
              ${slide.title}
            </${index === 0 ? 'h1' : 'h2'}>
            <p class="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light">
              ${slide.description}
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="${slide.link}" class="btn btn-primary text-lg px-8 py-4 !min-h-[56px] shadow-[0_8px_30px_rgb(27,107,47,0.3)]">${slide.cta}</a>
            </div>
          </div>
        </div>
      `;
      sliderContainer.appendChild(slideEl);

      // Create Indicator
      const dot = document.createElement('button');
      dot.className = `hero-indicator ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Tampilkan slide ${index + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoplay();
      });
      indicatorsContainer.appendChild(dot);
    });

    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-indicator');

    function updateSlides() {
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      currentSlide++;
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }
      updateSlides();
    }

    function prevSlide() {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }
      updateSlides();
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlides();
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Event Listeners for Nav Buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopAutoplay);
      heroSection.addEventListener('mouseleave', startAutoplay);
    }

    // Touch Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (sliderContainer) {
      sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
      }, {passive: true});

      sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
      }, {passive: true});
    }

    function handleSwipe() {
      const SWIPE_THRESHOLD = 50;
      if (touchEndX < touchStartX - SWIPE_THRESHOLD) {
        // Swiped left
        nextSlide();
      }
      if (touchEndX > touchStartX + SWIPE_THRESHOLD) {
        // Swiped right
        prevSlide();
      }
    }

    // Start Autoplay initially
    startAutoplay();
  }
  
  // Global Cart Badge Update
  const cartData = JSON.parse(localStorage.getItem('mpm_cart')) || [];
  const cartCount = cartData.reduce((sum, item) => sum + item.qty, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(b => {
    if (cartCount > 0) {
      b.textContent = cartCount;
      b.classList.remove('hidden');
    } else {
      b.classList.add('hidden');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const headerSlot = document.getElementById('site-header');
  if (headerSlot && headerSlot.dataset.loadError !== 'true') {
    document.addEventListener('site-header:loaded', initializePage, { once: true });
    return;
  }

  initializePage();
});
