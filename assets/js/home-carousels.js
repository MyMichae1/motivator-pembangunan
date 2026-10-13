document.querySelectorAll('[data-home-carousel]').forEach(carousel => {
  const viewport = carousel.querySelector('[data-home-carousel-viewport]');
  const track = carousel.querySelector('[data-home-carousel-track]');
  const previousButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  if (!viewport || !track) return;

  // Update optional controls (prev/next may be absent)
  const updateControls = () => {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (previousButton) previousButton.disabled = viewport.scrollLeft <= 1;
    if (nextButton) nextButton.disabled = maxScroll <= 1 || viewport.scrollLeft >= maxScroll - 1;
  };

  const scrollByCard = direction => {
    const card = track.firstElementChild;
    if (!card) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    viewport.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };

  // Autoplay support per-carousel
  const autoplayEnabled = carousel.dataset.autoplay !== 'false';
  const autoplayDelay = Number(carousel.dataset.autoplayDelay) || 4500;
  let autoplayTimer = null;

  function startAutoplay() {
    if (!autoplayEnabled) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      scrollByCard(1);
    }, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Wire up optional navigation buttons
  if (previousButton) previousButton.addEventListener('click', () => { scrollByCard(-1); resetAutoplay(); });
  if (nextButton) nextButton.addEventListener('click', () => { scrollByCard(1); resetAutoplay(); });

  viewport.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);
  updateControls();

  // Pause/resume on interaction (respect reduced-motion)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);
  }

  // Start autoplay when carousel is visible (saves CPU)
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) startAutoplay(); else stopAutoplay();
      });
    }, { threshold: 0.25 });
    obs.observe(carousel);
  } else {
    startAutoplay();
  }

});

  const scrollByCard = direction => {
    const card = track.firstElementChild;
    if (!card) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    viewport.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };

  previousButton.addEventListener('click', () => scrollByCard(-1));
  nextButton.addEventListener('click', () => scrollByCard(1));
  viewport.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);
  updateControls();
});
