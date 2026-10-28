/* =========================================================
   SEM Group – site interactions
   ========================================================= */

const header = document.querySelector('.site-header');
const nav = document.getElementById('mainNav');
const navToggle = document.getElementById('navToggle');
const navLinks = nav.querySelectorAll('a[href^="#"]');

/* ---------- Header background on scroll ---------- */
function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ---------- Mobile menu ---------- */
function setMenu(open) {
  nav.classList.toggle('open', open);
  header.classList.toggle('menu-open', open);
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navToggle.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
}
navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ---------- Highlight the menu link of the section in view ---------- */
const sections = [...navLinks]
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter((el, i, all) => el && el.id !== 'top' && all.indexOf(el) === i);

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

window.addEventListener('scroll', () => {
  if (window.scrollY < 200) {
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#top'));
  }
}, { passive: true });

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Count-up numbers ---------- */
function countUp(el) {
  const target = Number(el.dataset.target);
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count').forEach(el => countObserver.observe(el));

/* ---------- Testimonial slider ---------- */
(function initSlider() {
  const slider = document.getElementById('testimonialSlider');
  if (!slider) return;
  const track = slider.querySelector('.slider-track');
  const slides = [...track.children];
  const dotsWrap = slider.querySelector('.slider-dots');
  let index = 0;
  let timer;

  const perView = () => window.innerWidth <= 720 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  const maxIndex = () => Math.max(slides.length - perView(), 0);

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement('button');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      dot.addEventListener('click', () => { go(i); restart(); });
      dotsWrap.appendChild(dot);
    }
  }

  function go(i) {
    index = (i + maxIndex() + 1) % (maxIndex() + 1);
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const offset = index * (slides[0].offsetWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    [...dotsWrap.children].forEach((d, n) => d.classList.toggle('active', n === index));
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), 6000);
  }

  slider.querySelector('.prev').addEventListener('click', () => { go(index - 1); restart(); });
  slider.querySelector('.next').addEventListener('click', () => { go(index + 1); restart(); });
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', restart);

  // Swipe on touch screens
  let startX = null;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    if (startX === null) return;
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 40) { go(index + (diff < 0 ? 1 : -1)); restart(); }
    startX = null;
  });

  window.addEventListener('resize', () => { buildDots(); go(Math.min(index, maxIndex())); });

  buildDots();
  go(0);
  restart();
})();

/* ---------- Project photo lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('[data-lightbox]').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}
lightbox.addEventListener('click', e => { if (e.target !== lightboxImg) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

/* ---------- Quote form ---------- */
// Enquiries are emailed through Web3Forms (https://web3forms.com).
// Get a free access key there using the inbox that should receive enquiries,
// then paste it below. The key is safe to keep in public code.
const WEB3FORMS_ACCESS_KEY = 'c5513605-2964-49fb-a2d3-d02ef17c5df8';

const form = document.getElementById('quoteForm');
const statusEl = document.getElementById('formStatus');
const submitBtn = form.querySelector('button[type="submit"]');

function setStatus(message, type) {
  statusEl.textContent = message;
  statusEl.className = 'form-status ' + type;
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const ok = field.value.trim() !== '' && field.checkValidity();
    field.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    setStatus('Please fill in your name, phone and a valid email.', 'err');
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  if (data.botcheck) return; // filled by a spam bot

  if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
    setStatus('Form not connected yet: add the Web3Forms access key in js/main.js.', 'err');
    return;
  }

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `New quote enquiry from ${data.name}${data.company ? ' (' + data.company + ')' : ''}`,
    from_name: 'SEM Group Website',
    replyto: data.email,
    Name: data.name,
    Company: data.company,
    Phone: data.phone,
    Email: data.email,
    'Exhibition / Event': data.event,
    City: data.city,
    Service: data.service,
    'Stall size (sq m)': data.size,
    Message: data.message,
    botcheck: ''
  };

  submitBtn.disabled = true;
  const btnHtml = submitBtn.innerHTML;
  submitBtn.textContent = 'Sending…';
  setStatus('', '');

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (!res.ok || !result.success) throw new Error(result.message || 'Send failed');
    setStatus('Thank you! Our team will contact you within 24 hours.', 'ok');
    form.reset();
  } catch (err) {
    setStatus('Sorry, your enquiry could not be sent. Please call or WhatsApp us instead.', 'err');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = btnHtml;
  }
});

form.querySelectorAll('[required]').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('invalid'));
});

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
