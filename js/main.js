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
    const img = btn.querySelector('.poster-img') || btn.querySelector('img');
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
const submitBtn = form && form.querySelector('button[type="submit"]');

function setStatus(message, type) {
  statusEl.textContent = message;
  statusEl.className = 'form-status ' + type;
}

if (form) form.addEventListener('submit', async e => {
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

if (form) form.querySelectorAll('[required]').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('invalid'));
});

/* ---------- Projects page filter ---------- */
(function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;
  const items = document.querySelectorAll('#projectGrid [data-cat], #projectDetails [data-cat]');

  function apply(cat) {
    buttons.forEach(b => b.classList.toggle('active', b.dataset.filter === cat));
    items.forEach(el => {
      const show = cat === 'all' || el.dataset.cat === cat;
      el.classList.toggle('is-hidden', !show);
      if (show) el.classList.add('visible');
    });
  }

  buttons.forEach(b => b.addEventListener('click', () => apply(b.dataset.filter)));

  // Links like projects.html?cat=agriculture open with that filter applied
  const fromUrl = new URLSearchParams(location.search).get('cat');
  if (fromUrl && [...buttons].some(b => b.dataset.filter === fromUrl)) apply(fromUrl);
})();

/* ---------- Services page: stall layout picker ---------- */
(function initStallPicker() {
  const options = document.querySelectorAll('.picker-option');
  if (!options.length) return;
  const sides = document.querySelectorAll('.plan .side');

  function choose(option) {
    const open = option.dataset.open.split(' ');
    options.forEach(o => o.setAttribute('aria-pressed', o === option));
    sides.forEach(side => side.classList.toggle('open', open.includes(side.dataset.side)));
  }
  options.forEach(o => o.addEventListener('click', () => choose(o)));
})();

/* ---------- Services page: highlight the service in view ---------- */
(function initSideIndex() {
  const links = document.querySelectorAll('.side-index a');
  if (!links.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  links.forEach(link => observer.observe(document.getElementById(link.getAttribute('href').slice(1))));
})();

/* ---------- Contact page: links like contact.html?service=...&city=... fill in the form ---------- */
if (form) {
  const params = new URLSearchParams(location.search);
  const select = form.querySelector('select[name="service"]');
  if ([...select.options].some(o => o.value === params.get('service'))) select.value = params.get('service');
  if (params.get('city')) form.querySelector('input[name="city"]').value = params.get('city');
}

/* ---------- Locations page: map explorer ---------- */
const chooseLocation = (function initExplorer() {
  const pins = [...document.querySelectorAll('.net-pin')];
  if (!pins.length) return null;
  const lines = [...document.querySelectorAll('.net-line')];
  const panels = [...document.querySelectorAll('.loc-panel')];
  const tabs = document.querySelectorAll('.region-tabs button');

  function choose(id) {
    pins.forEach(p => p.setAttribute('aria-pressed', p.dataset.loc === id));
    lines.forEach(l => l.classList.toggle('active', l.dataset.loc === id));
    panels.forEach(p => { p.hidden = p.dataset.loc !== id; });
  }

  function filter(region) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.region === region));
    pins.concat(lines).forEach(el => {
      const show = region === 'all' || el.dataset.region === region;
      el.toggleAttribute('hidden', !show);
    });
    const current = pins.find(p => p.getAttribute('aria-pressed') === 'true');
    if (current.hidden) choose(pins.find(p => !p.hidden).dataset.loc);
  }

  pins.forEach(p => p.addEventListener('click', () => choose(p.dataset.loc)));
  tabs.forEach(t => t.addEventListener('click', () => filter(t.dataset.region)));

  // Links like locations.html#delhi open with that location selected
  const fromHash = location.hash.slice(1);
  choose(pins.some(p => p.dataset.loc === fromHash) ? fromHash : 'ludhiana');

  return id => {
    filter('all');
    choose(id);
    document.querySelector('.region-tabs').scrollIntoView({ block: 'start' });
  };
})();

/* ---------- Locations page: nearest office finder ---------- */
(function initOfficeFinder() {
  const finder = document.getElementById('officeFinder');
  if (!finder) return;
  const input = document.getElementById('finderCity');
  const result = document.getElementById('finderResult');
  const offices = {
    Ludhiana: [30.90, 75.85], Chandigarh: [30.73, 76.78], Delhi: [28.61, 77.21], Pune: [18.52, 73.86], Bengaluru: [12.97, 77.59]
  };
  const cities = {
    ahmedabad: [23.02, 72.57], amritsar: [31.63, 74.87], chennai: [13.08, 80.27], goa: [15.50, 73.83], 'greater noida': [28.47, 77.50],
    gurugram: [28.46, 77.03], hyderabad: [17.39, 78.49], indore: [22.72, 75.86], jaipur: [26.91, 75.79], jalandhar: [31.33, 75.58],
    kochi: [9.93, 76.27], kolkata: [22.57, 88.36], lucknow: [26.85, 80.95], mohali: [30.70, 76.72], mumbai: [19.08, 72.88],
    nagpur: [21.15, 79.09], 'new delhi': [28.61, 77.21], noida: [28.54, 77.39], raipur: [21.25, 81.63]
  };
  const markets = ['Germany', 'Dubai', 'Turkey'];

  function kmBetween([lat1, lon1], [lat2, lon2]) {
    const rad = Math.PI / 180;
    const a = Math.sin((lat2 - lat1) * rad / 2) ** 2 +
      Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin((lon2 - lon1) * rad / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.sqrt(a));
  }

  function show(title, text, city, locationId) {
    result.replaceChildren();
    const strong = document.createElement('strong');
    strong.textContent = title;
    const p = document.createElement('p');
    p.textContent = text;
    const links = document.createElement('div');
    links.className = 'finder-links';
    const quote = document.createElement('a');
    quote.className = 'btn btn-primary';
    quote.href = 'contact.html?city=' + encodeURIComponent(city);
    quote.textContent = 'Get a quote for ' + city;
    links.append(quote);
    if (locationId) {
      const see = document.createElement('button');
      see.type = 'button';
      see.textContent = 'See it on the map';
      see.addEventListener('click', () => chooseLocation(locationId));
      links.append(see);
    }
    result.append(strong, p, links);
  }

  finder.addEventListener('submit', e => {
    e.preventDefault();
    const typed = input.value.trim();
    if (!typed) {
      result.textContent = 'Enter a city name to find your nearest office.';
      return;
    }
    const key = typed.toLowerCase();
    const market = markets.find(m => m.toLowerCase() === key);
    const office = Object.keys(offices).find(o => o.toLowerCase() === key);
    if (market) {
      show('We take on projects in ' + market, 'Share your event details and we will confirm how we can support you there.', market, market.toLowerCase());
    } else if (office) {
      show('We have an office in ' + office, 'Our ' + office + ' team can support your exhibition there.', office, office.toLowerCase());
    } else if (cities[key]) {
      const [nearest, km] = Object.entries(offices)
        .map(([name, at]) => [name, kmBetween(cities[key], at)])
        .sort((a, b) => a[1] - b[1])[0];
      const city = typed.replace(/\b\w/g, ch => ch.toUpperCase());
      show('Nearest office: ' + nearest, 'About ' + (Math.round(km / 10) * 10).toLocaleString('en-IN') + ' km from ' + city + ' in a straight line.', city, nearest.toLowerCase());
    } else {
      show('We don’t have that city listed yet', 'We deliver across India, so send us the venue and dates and we will confirm how we can support you.', typed, null);
    }
  });
})();

/* ---------- Locations page: work by city ---------- */
(function initCityProjects() {
  const buttons = document.querySelectorAll('.city-filters button');
  if (!buttons.length) return;
  const rows = document.querySelectorAll('#cityProjects li');
  buttons.forEach(b => b.addEventListener('click', () => {
    buttons.forEach(o => o.classList.toggle('active', o === b));
    rows.forEach(r => { r.hidden = b.dataset.city !== 'all' && !r.dataset.cities.split('|').includes(b.dataset.city); });
  }));
})();

/* ---------- Night mode ---------- */
// The starting theme is set by the inline script in <head>, before first paint.
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
  const dark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-label', dark ? 'Switch to day mode' : 'Switch to night mode');
  themeToggle.querySelector('use').setAttribute('href', dark ? '#i-sun' : '#i-moon');
}
setTheme(document.documentElement.dataset.theme);

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.classList.add('theme-fade');
  setTimeout(() => document.documentElement.classList.remove('theme-fade'), 350);
  setTheme(next);
  try { localStorage.setItem('theme', next); } catch (err) { /* storage blocked: theme lasts this page only */ }
});

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
