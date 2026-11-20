(() => {
  const data = window.LISSETTE_SITE || { projects: [], gallery: [], contactEmail: '', contactWhatsapp: '' };
  const $ = (q, root = document) => root.querySelector(q);
  const esc = (str) => String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
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