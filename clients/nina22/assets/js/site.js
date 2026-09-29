/* NINA 22 · minimal client-side behavior; site contents are built statically from data/site.json. */
(() => {
  document.documentElement.classList.add('js');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-nav');
  const closeMenu = () => {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Otvori meni');
    document.body.classList.remove('menu-open');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    if (isOpen) return closeMenu();
    menu.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Zatvori meni');
    document.body.classList.add('menu-open');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  const dialog = document.getElementById('info-dialog');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogDescription = document.getElementById('dialog-description');
  let dialogTrigger = null;
  document.querySelectorAll('[data-modal-title]').forEach(card => {
    card.addEventListener('click', () => {
      dialogTrigger = card;
      dialogTitle.textContent = card.dataset.modalTitle;
      dialogDescription.textContent = card.dataset.modalDescription;
      dialog.showModal();
      document.body.classList.add('dialog-open');
    });
  });
  const closeDialog = () => { if (dialog.open) dialog.close(); };
  dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
  dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(); });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); dialogTrigger?.focus(); });
  document.getElementById('dialog-cta').addEventListener('click', closeDialog);

  const selectedService = document.getElementById('service');
  document.querySelectorAll('[data-select-service]').forEach(link => link.addEventListener('click', () => {
    selectedService.value = link.dataset.selectService;
  }));

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { rootMargin: '0px 0px -20px 0px', threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

  // GitHub Pages is static hosting. Deliberately show the drafted email and a copy fallback;
  // never claim that a contact request has been sent to a backend.
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const fields = ['name','phone','email','service','message'].map(id => document.getElementById(id));
  fields.forEach(field => field.addEventListener('input', () => field.removeAttribute('aria-invalid')));
  const showError = text => { feedback.hidden = false; feedback.classList.add('error'); feedback.textContent = text; };
  form.addEventListener('submit', e => {
    e.preventDefault();
    feedback.hidden = true;
    feedback.classList.remove('error');
    const invalid = fields.find(field => (field.required && !field.value.trim()) || !field.checkValidity());
    if (invalid) { invalid.setAttribute('aria-invalid','true'); invalid.focus(); return showError('Molimo proverite obavezna polja i ispravnost unetih podataka.'); }
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const msg = document.getElementById('message').value.trim();
    const subject = `Upit sa sajta NINA 22 – ${service}`;
    const body = `Ime i prezime: ${name}\nTelefon: ${phone}\nEmail: ${email || 'Nije naveden'}\nUsluga: ${service}\n\nPoruka:\n${msg}\n\n---\nUpit je pripremljen na demonstracionom sajtu NINA 22.`;
    const href = `mailto:${form.dataset.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    feedback.hidden = false;
    const title = document.createElement('strong'); title.textContent = 'Upit je pripremljen. Izaberite način slanja:';
    const note = document.createElement('span'); note.textContent = 'Poruka još NIJE poslata. Otvorite email aplikaciju ili kopirajte upit.';
    const actions = document.createElement('div'); actions.className = 'feedback-buttons';
    const emailLink = document.createElement('a'); emailLink.href = href; emailLink.textContent = 'Otvori email aplikaciju';
    const copyButton = document.createElement('button'); copyButton.type = 'button'; copyButton.textContent = 'Kopiraj upit';
    copyButton.addEventListener('click', async () => {
      const messageText = `Za: ${form.dataset.contactEmail}\nNaslov: ${subject}\n\n${body}`;
      try { await navigator.clipboard.writeText(messageText); copyButton.textContent = 'Kopirano ✓'; }
      catch {
        // Fallback for local file:// without clipboard permission.
        const area = document.createElement('textarea'); area.value = messageText; area.style.width = '100%'; area.rows = 7;
        feedback.appendChild(area); area.focus(); area.select(); copyButton.textContent = 'Označite tekst i kopirajte';
      }
    });
    actions.append(emailLink,copyButton);
    feedback.replaceChildren(title,note,actions);
    feedback.scrollIntoView({ block:'nearest', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
})();
