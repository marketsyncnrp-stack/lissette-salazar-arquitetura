(() => {

  const data = window.LISSETTE_SITE || { projects: [], gallery: [], contactEmail: '', contactWhatsapp: '' };
  const $ = (q, root = document) => root.querySelector(q);
  const esc = (str) => String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  // Capa: slider horizontal automático (6,5s), com navegação manual e pausa.
  function initHeroSlider() {
    const hero = $('.hero');
    const track = $('#hero-slides');
    if (!hero || !track) return;
    const slides = Array.from(track.querySelectorAll('.hero-slide'));
    const dots = Array.from(document.querySelectorAll('[data-hero-dot]'));
    const controls = $('.hero-slider-controls');
    const counter = $('#hero-slide-count');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0;
    let interval = null;
    let controlsFocused = false;
    let controlsHovered = false;
    let startTouch = null;
    const total = slides.length;
    if (total < 2) return;

    function showSlide(next) {
      current = (next + total) % total;
      track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;
      slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== current)));
      dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
      if (counter) counter.textContent = `${String(current + 1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;
    }
    function pause() {
      if (interval !== null) window.clearInterval(interval);
      interval = null;
    }
    function play() {
      pause();
      if (motionPreference.matches || document.hidden || controlsFocused || controlsHovered) return;
      interval = window.setInterval(() => showSlide(current + 1), 6500);
    }
    function manual(next) {
      showSlide(next);
      play();
    }
    $('#hero-slide-prev')?.addEventListener('click', () => manual(current - 1));
    $('#hero-slide-next')?.addEventListener('click', () => manual(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => manual(i)));
    controls?.addEventListener('pointerenter', () => { controlsHovered = true; pause(); });
    controls?.addEventListener('pointerleave', () => { controlsHovered = false; play(); });
    controls?.addEventListener('focusin', () => { controlsFocused = true; pause(); });
    controls?.addEventListener('focusout', (event) => {
      if (!controls.contains(event.relatedTarget)) { controlsFocused = false; play(); }
    });
    track.addEventListener('touchstart', (event) => {
      const touch = event.touches[0];
      if (touch) startTouch = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });
    track.addEventListener('touchend', (event) => {
      if (!startTouch) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - startTouch.x;
      const dy = touch.clientY - startTouch.y;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) manual(current + (dx < 0 ? 1 : -1));
      startTouch = null;
    }, { passive: true });
    document.addEventListener('visibilitychange', () => document.hidden ? pause() : play());
    motionPreference.addEventListener?.('change', play);
    // Pré-carrega os slides seguintes para evitar imagens vazias na transição.
    slides.slice(1).forEach(slide => {
      const img = slide.querySelector('img');
      if (img) { const preload = new Image(); preload.src = img.currentSrc || img.src; }
    });
    showSlide(0);
    play();
  }

  // Rolagem fluida de mouse/trackpad. Em dispositivos de toque e com preferência
  // por movimento reduzido, preserva a rolagem nativa do navegador.
  function initSmoothScrolling() {
    if (typeof window.Lenis !== 'function') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    new window.Lenis({
      autoRaf: true,
      autoToggle: true,
      anchors: true,
      allowNestedScroll: true,
      lerp: 0.075,
      wheelMultiplier: 0.9,
      smoothWheel: true
    });
  }
  initHeroSlider();
  initSmoothScrolling();

  const grid = $('#projects-grid');
  const projectDialog = $('#project-dialog');
  let currentFilter = 'todos';

  function renderProjects() {
    if (!grid) return;
    const filtered = data.projects.filter(p => currentFilter === 'todos' || p.category === currentFilter);
    grid.innerHTML = filtered.map((p,i) => `
      <article class="project-card" data-position="${i % 6}">
        <button class="project-image-button" type="button" data-open-project="${esc(p.id)}" aria-label="Ver referência ${esc(p.title)}">
          <img src="${esc(p.image)}" alt="Referência arquitetônica: ${esc(p.title)}" loading="lazy" decoding="async" />
          <span class="project-view" aria-hidden="true">EXPLORAR REFERÊNCIA ↗</span>
        </button>
        <div class="project-caption"><div><h3>${esc(p.title)}</h3><span>${esc(p.type)}</span></div><span class="project-number">${String(i+1).padStart(2,'0')} / ${String(filtered.length).padStart(2,'0')}</span></div>
      </article>`).join('');
  }
  renderProjects();
  document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll('.filter').forEach(x => { const active = x === btn; x.classList.toggle('active', active); x.setAttribute('aria-pressed', String(active)); });
    renderProjects();
  }));
  grid?.addEventListener('click', e => {
    const trigger = e.target.closest('[data-open-project]');
    if (!trigger) return;
    const p = data.projects.find(item => item.id === trigger.dataset.openProject);
    if (!p || !projectDialog) return;
    $('#dialog-title').textContent = p.title;
    $('#dialog-description').textContent = p.description;
    const image = $('#dialog-img'); image.src = p.image; image.alt = `Referência visual ${p.title}`;
    $('#dialog-credit').href = p.source;
    $('#dialog-credit').textContent = `Fotografia: ${p.photographer} / Unsplash ↗`;
    projectDialog.showModal();
  });
  $('#close-dialog')?.addEventListener('click', () => projectDialog.close());
  const closeOnBackdrop = (dlg) => dlg?.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  closeOnBackdrop(projectDialog);

  const galleryTrack = $('#gallery-track');
  const viewport = $('#gallery-viewport');
  if (galleryTrack) {
    galleryTrack.innerHTML = data.gallery.map((g,i) => `<div class="gallery-item"><div class="gallery-image"><img src="${esc(g.image)}" alt="Referência de arquitetura ${i+1}" loading="lazy" decoding="async"></div><p>${esc(g.label)} · IMAGEM ILUSTRATIVA</p></div>`).join('');
  }
  let galleryIndex = 0;
  const slideCount = data.gallery.length;
  const galleryCounter = $('#gallery-counter');
  function updateCounter() { if (galleryCounter) galleryCounter.textContent = `${String(galleryIndex+1).padStart(2,'0')} / ${String(slideCount).padStart(2,'0')}`; }
  function goToSlide(index) {
    if (!viewport || !galleryTrack || !slideCount) return;
    galleryIndex = Math.max(0, Math.min(slideCount-1, index));
    const item = galleryTrack.children[galleryIndex];
    viewport.scrollTo({ left: item.offsetLeft - galleryTrack.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    updateCounter();
  }
  $('#gallery-prev')?.addEventListener('click', () => goToSlide(galleryIndex-1));
  $('#gallery-next')?.addEventListener('click', () => goToSlide(galleryIndex+1));
  viewport?.addEventListener('keydown', e => {
    if(e.key === 'ArrowRight'){e.preventDefault();goToSlide(galleryIndex+1)}
    if(e.key === 'ArrowLeft'){e.preventDefault();goToSlide(galleryIndex-1)}
  });
  let lastScrollUpdate = 0;
  viewport?.addEventListener('scroll', () => {
    if (performance.now() - lastScrollUpdate < 120) return;
    lastScrollUpdate = performance.now();
    const items = Array.from(galleryTrack.children);
    const nearest = items.reduce((best, item, i) => Math.abs(item.offsetLeft-galleryTrack.offsetLeft-viewport.scrollLeft) < Math.abs(items[best].offsetLeft-galleryTrack.offsetLeft-viewport.scrollLeft) ? i : best, 0);
    if (nearest !== galleryIndex) { galleryIndex = nearest; updateCounter(); }
  }, {passive:true});

  const menuBtn = $('.mobile-nav-toggle');
  const menu = $('#mobile-menu');
  function closeMenu(){menu.hidden = true;menuBtn?.setAttribute('aria-expanded','false');menuBtn?.setAttribute('aria-label','Abrir menu')}
  menuBtn?.addEventListener('click', () => { const isOpen = menu.hidden; menu.hidden = !isOpen; menuBtn.setAttribute('aria-expanded', String(isOpen)); menuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu'); });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {if(e.key === 'Escape' && !menu?.hidden) closeMenu()});
  $('#year').textContent = new Date().getFullYear();

  const contactDialog = $('#contact-dialog');
  $('#open-contact')?.addEventListener('click', () => contactDialog.showModal());
  $('#close-contact')?.addEventListener('click', () => contactDialog.close());
  closeOnBackdrop(contactDialog);
  $('#brief-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const name = String(values.get('nome')).trim();
    const email = String(values.get('email')).trim();
    const type = String(values.get('tipo')).trim();
    const message = String(values.get('mensagem')).trim();
    const text = `Olá, Lissette! Meu nome é ${name}.\n\nE-mail: ${email}\nInteresse: ${type}\n\nSobre meu projeto:\n${message}`;
    const feedback = $('#brief-feedback');
    if (data.contactWhatsapp) {
      window.open(`https://wa.me/${data.contactWhatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      feedback.textContent = 'Seu WhatsApp foi aberto com a mensagem preparada.';
    } else if (data.contactEmail) {
      window.location.href = `mailto:${data.contactEmail}?subject=${encodeURIComponent('Novo projeto — contato pelo site Lissette Salazar')}&body=${encodeURIComponent(text)}`;
      feedback.textContent = 'Seu aplicativo de e-mail será aberto com a mensagem preparada.';
    } else {
      try {
        await navigator.clipboard.writeText(text);
        feedback.textContent = 'Seu briefing foi copiado. O contato profissional da arquiteta será adicionado antes da publicação.';
      } catch {
        feedback.textContent = 'O canal de envio ainda não foi configurado. Selecione e copie seus dados para guardá-los.';
      }
    }
  });
})();