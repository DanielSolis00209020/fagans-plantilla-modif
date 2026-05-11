/* ═══════════════════════════════════════════════════════════════
   FAGANS PROTOTYPE — JS v2
   Nav scroll · Search overlay · Reveal · Carousel · Accordion
   Catalog: filter + sort + grid density
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── 1. Nav scroll ─────────────────────────────────────────────── */
(function initNav() {
  const nav = document.querySelector('.f-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('f-nav--scrolled', window.scrollY > 80);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── 2. Active nav link ────────────────────────────────────────── */
(function setActiveNavLink() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.f-nav__link').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });
})();

/* ── 3. Scroll reveal ──────────────────────────────────────────── */
(function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((el) => observer.observe(el));
})();

/* ── 4. Search overlay (todas las páginas) ─────────────────────── */
(function initSearch() {
  const toggleBtn = document.getElementById('nav-search-toggle');
  const overlay   = document.getElementById('search-overlay');
  const closeBtn  = document.getElementById('search-close');
  const input     = document.getElementById('search-field');
  if (!toggleBtn || !overlay) return;

  function openSearch() {
    overlay.classList.add('is-open');
    overlay.removeAttribute('hidden');
    setTimeout(() => input && input.focus(), 60);
    document.body.style.overflow = 'hidden';
  }
  function closeSearch() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => overlay.setAttribute('hidden', ''), 320);
  }

  toggleBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeSearch();
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey))) { e.preventDefault(); openSearch(); }
  });

  /* Submit → redirect to catalog with query */
  const form = overlay.querySelector('.f-search-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input ? input.value.trim() : '';
      if (q) {
        window.location.href = `catalogo.html?q=${encodeURIComponent(q)}`;
      }
    });
  }
})();

/* ── 5. Hero carousel ──────────────────────────────────────────── */
(function initCarousel() {
  const carousel = document.querySelector('.f-hero');
  if (!carousel) return;

  const slides   = carousel.querySelectorAll('.f-hero__slide');
  const dotsWrap = carousel.querySelector('.f-hero__dots');
  const prevBtn  = carousel.querySelector('[data-prev]');
  const nextBtn  = carousel.querySelector('[data-next]');
  const bar      = carousel.querySelector('.f-hero__progress-fill');

  if (!slides.length) return;

  let current    = 0;
  let timer      = null;
  let startX     = 0;
  let isDragging = false;

  /* Build dots */
  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'f-hero__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', `Ir a diapositiva ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function getDots() {
    return dotsWrap ? Array.from(dotsWrap.querySelectorAll('.f-hero__dot')) : [];
  }

  function goTo(index) {
    slides[current].classList.remove('is-active');
    const dots = getDots();
    if (dots[current]) dots[current].classList.remove('is-active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('is-active');
    if (dots[current]) dots[current].classList.add('is-active');

    resetBar();
    clearInterval(timer);
    timer = setInterval(advance, 5000);
  }

  function advance() { goTo(current + 1); }

  function resetBar() {
    if (!bar) return;
    bar.classList.remove('is-animating');
    void bar.offsetWidth;
    bar.classList.add('is-animating');
  }

  carousel.addEventListener('pointerdown', (e) => { startX = e.clientX; isDragging = true; });
  carousel.addEventListener('pointermove', (e) => { if (isDragging) e.preventDefault(); }, { passive: false });
  carousel.addEventListener('pointerup',   (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  });
  carousel.addEventListener('pointercancel', () => { isDragging = false; });

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  slides[0].classList.add('is-active');
  resetBar();
  timer = setInterval(advance, 5000);
})();

/* ── 6. FAQ accordion ──────────────────────────────────────────── */
(function initAccordion() {
  const items = document.querySelectorAll('.f-accordion__item');
  if (!items.length) return;
  items.forEach((item) => {
    const trigger = item.querySelector('.f-accordion__trigger');
    if (!trigger) return;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      items.forEach((other) => {
        other.classList.remove('is-open');
        const t = other.querySelector('.f-accordion__trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ── 7. Catalog: filter + search + sort + grid density ─────────── */
(function initCatalog() {
  const grid      = document.querySelector('.f-catalog__grid');
  const pills     = document.querySelectorAll('.f-filter-pill');
  const sortSel   = document.querySelector('.f-sort-select');
  const densityBtns = document.querySelectorAll('.f-grid-density__btn');
  const searchInp = document.querySelector('.f-filter-search-input');
  const emptyMsg  = document.querySelector('.f-catalog__empty');

  if (!grid) return;

  let activeFilter = 'all';
  let activeSort   = 'default';
  let searchQuery  = '';

  /* ── Read URL query param on load ── */
  const urlParams = new URLSearchParams(location.search);
  const urlQ = urlParams.get('q');
  if (urlQ && searchInp) {
    searchInp.value = urlQ;
    searchQuery = urlQ.toLowerCase().trim();
  }

  /* ── Filter pills ── */
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      activeFilter = pill.dataset.filter || 'all';
      applyAll();
    });
  });

  /* ── Sort ── */
  if (sortSel) {
    sortSel.addEventListener('change', () => {
      activeSort = sortSel.value;
      applyAll();
    });
  }

  /* ── Search input ── */
  if (searchInp) {
    searchInp.addEventListener('input', () => {
      searchQuery = searchInp.value.toLowerCase().trim();
      applyAll();
    });
  }

  /* ── Grid density ── */
  densityBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      densityBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      grid.dataset.cols = btn.dataset.density;
    });
  });

  /* ── Combined apply ── */
  function applyAll() {
    const cards = Array.from(grid.querySelectorAll('.f-pcard'));

    /* 1. Filter */
    const visible = cards.filter((card) => {
      const tags   = (card.dataset.tags || '').split(',').map(t => t.trim());
      const name   = (card.dataset.name   || '').toLowerCase();
      const vendor = (card.dataset.vendor || '').toLowerCase();
      const allText = tags.join(' ') + ' ' + name + ' ' + vendor;

      const passFilter = activeFilter === 'all' || tags.includes(activeFilter);
      const passSearch = !searchQuery || allText.includes(searchQuery);

      const show = passFilter && passSearch;
      card.style.display = show ? '' : 'none';
      return show;
    });

    /* 2. Sort visible cards */
    if (activeSort !== 'default') {
      visible.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price || '0');
        const priceB = parseFloat(b.dataset.price || '0');
        const nameA  = (a.dataset.name || '').toLowerCase();
        const nameB  = (b.dataset.name || '').toLowerCase();
        switch (activeSort) {
          case 'price-asc':  return priceA - priceB;
          case 'price-desc': return priceB - priceA;
          case 'name-az':    return nameA.localeCompare(nameB);
          case 'newest':     return parseInt(b.dataset.order || '0') - parseInt(a.dataset.order || '0');
          default: return 0;
        }
      });
      /* Re-append in sorted order */
      visible.forEach((card) => grid.appendChild(card));
    }

    /* 3. Empty state */
    if (emptyMsg) {
      emptyMsg.classList.toggle('is-visible', visible.length === 0);
    }
  }

  /* Run on load (applies URL search query) */
  if (searchQuery) applyAll();
})();
