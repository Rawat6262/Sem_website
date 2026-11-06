/* =========================================================
   SEM Group – Locations page
   To add or change a location, edit LOCATIONS below. New locations also
   need a link in the Locations dropdown in each page's navbar.
   ========================================================= */

// TODO: real WhatsApp number in international format, no + or spaces
const WHATSAPP_NUMBER = '910000000000';

// map: position on the simplified map, in percent. coords: real latitude and longitude, used by the office finder.
// venues: add image: 'images/venues/name.webp' to show a photo instead of the illustration.
const LOCATIONS = {
  ludhiana: {
    name: 'Ludhiana', region: 'Ludhiana & Punjab', role: 'Head office', group: 'india', map: [54, 33], coords: [30.90, 75.85],
    local: 'Ludhiana is our headquarters and the base for our work across India and overseas.',
    photos: ['about-sem-stall.webp', 'service-turnkey.webp'],
    venues: [
      { name: 'Ludhiana Exhibition & Convention Centre', place: 'GT Road, Sahnewal' },
      { name: 'Punjab Agricultural University', place: 'Ludhiana' },
      { name: 'Cattle Fair Ground', place: 'Jagraon' }
    ],
    projects: [['INTEXT Expo 2026', 'intext-expo-2026'], ['PDFA – Progressive Dairy Farmers’ Association', 'pdfa-dairy-farmers-association']]
  },
  delhi: {
    name: 'Delhi', region: 'Delhi NCR', role: 'Regional office', group: 'india', map: [76, 46], coords: [28.61, 77.21],
    local: 'Our Delhi office supports exhibitions across Delhi and the National Capital Region.',
    photos: ['service-turnkey.webp', 'service-modular.webp'],
    venues: [
      { name: 'Bharat Mandapam', place: 'Pragati Maidan, New Delhi' },
      { name: 'Pragati Maidan', place: 'New Delhi' },
      { name: 'Yashobhoomi', place: 'Dwarka, New Delhi' },
      { name: 'India Expo Centre & Mart', place: 'Greater Noida' }
    ],
    projects: [['Hand Tools Expo & Fastener Expo 2024', 'hand-tools-fastener-expo-2024'], ['Global Solar Expo India – Delhi', 'delhi-global-solar-expo'], ['Korea Street Fair 2025', 'korea-street-fair-2025'], ['National AYUSH Festival 2026', 'national-ayush-festival-2026']]
  },
  chandigarh: {
    name: 'Chandigarh', region: 'the Chandigarh region', role: 'Regional office', group: 'india', map: [66, 16], coords: [30.73, 76.78],
    local: 'Our Chandigarh office supports exhibitions and events across the region.',
    photos: ['service-custom-design.webp', 'infra-installation.webp'],
    venues: [
      { name: 'Parade Ground', place: 'Sector 17, Chandigarh' },
      { name: 'Exhibition Ground', place: 'Sector 34, Chandigarh' },
      { name: 'Olympian Balbir Singh Sr. Stadium', place: 'Mohali' }
    ],
    projects: [['PharmaTech Expo & LabTech Expo 2026', 'pharmatech-expo-2026'], ['Ins & Outs – The Archibuild Show 2026', 'ins-and-outs-archibuild-2026'], ['Hero Asian Champions Trophy – Punjab 2026', 'asian-champions-trophy-2026']]
  },
  pune: {
    name: 'Pune', region: 'Pune & western India', role: 'Regional office', group: 'india', map: [58, 66], coords: [18.52, 73.86],
    local: 'Our Pune office supports exhibitions across western India.',
    photos: ['industry-machinery.webp', 'service-fabrication.webp'],
    venues: [
      { name: 'Pune International Exhibition & Convention Centre', place: 'Moshi, Pune' },
      { name: 'Auto Cluster Exhibition Centre', place: 'Chinchwad, Pune' },
      { name: 'Mahalakshmi Lawns', place: 'Karve Nagar, Pune' },
      { name: 'Agriculture College Ground', place: 'Shivajinagar, Pune' }
    ],
    projects: []
  },
  bengaluru: {
    name: 'Bengaluru', region: 'Bengaluru & southern India', role: 'Regional office', group: 'india', map: [70, 82], coords: [12.97, 77.59],
    local: 'Our Bengaluru office supports exhibitions across southern India.',
    photos: ['service-3d-design.webp', 'industry-automotive.webp'],
    venues: [
      { name: 'Bangalore International Exhibition Centre', place: 'Tumakuru Road, Bengaluru' },
      { name: 'KTPO Trade Centre', place: 'Whitefield, Bengaluru' },
      { name: 'Palace Grounds', place: 'Bengaluru' },
      { name: 'Manpho Convention Centre', place: 'Nagawara, Bengaluru' }
    ],
    projects: []
  },
  germany: {
    name: 'Germany', region: 'Germany', role: 'International market', group: 'intl', map: [12, 20],
    local: 'Exhibiting in Germany? We take on exhibition stall design and fabrication projects here.',
    photos: ['industry-automotive.webp', 'infra-machinery.webp'],
    venues: [
      { name: 'Messe Frankfurt', place: 'Frankfurt' },
      { name: 'Messe Düsseldorf', place: 'Düsseldorf' },
      { name: 'Koelnmesse', place: 'Cologne' },
      { name: 'Messe München', place: 'Munich' }
    ],
    projects: []
  },
  turkey: {
    name: 'Turkey', region: 'Turkey', role: 'International market', group: 'intl', map: [26, 44],
    local: 'We take on custom stall projects for international exhibitions in Turkey.',
    photos: ['service-custom-design.webp', 'industry-interior.webp'],
    venues: [
      { name: 'Istanbul Expo Center', place: 'Yeşilköy, Istanbul' },
      { name: 'Tüyap Fair Convention Center', place: 'Büyükçekmece, Istanbul' },
      { name: 'Antalya Expo Center', place: 'Antalya' }
    ],
    projects: []
  },
  dubai: {
    name: 'Dubai', region: 'Dubai & the UAE', role: 'International market', group: 'intl', map: [40, 68],
    local: 'Exhibiting in Dubai? We offer turnkey exhibition stall solutions here.',
    photos: ['service-turnkey.webp', 'industry-food.webp'],
    venues: [
      { name: 'Dubai World Trade Centre', place: 'Dubai' },
      { name: 'Expo City Dubai', place: 'Dubai' }
    ],
    projects: []
  }
};

// Other cities the finder recognises, as [latitude, longitude]
const FINDER_CITIES = {
  ahmedabad: [23.02, 72.57], amritsar: [31.63, 74.87], chennai: [13.08, 80.27], goa: [15.50, 73.83], 'greater noida': [28.47, 77.50],
  gurugram: [28.46, 77.03], hyderabad: [17.39, 78.49], indore: [22.72, 75.86], jaipur: [26.91, 75.79], jalandhar: [31.33, 75.58],
  kochi: [9.93, 76.27], kolkata: [22.57, 88.36], lucknow: [26.85, 80.95], mohali: [30.70, 76.72], mumbai: [19.08, 72.88],
  nagpur: [21.15, 79.09], 'new delhi': [28.61, 77.21], noida: [28.54, 77.39], raipur: [21.25, 81.63]
};

const DEFAULT_LOCATION = 'ludhiana';
const quoteUrl = (city, service) => 'contact.html?' + new URLSearchParams(service ? { service, city } : { city });
const whatsappUrl = city => `https://wa.me/${WHATSAPP_NUMBER}?text=` + encodeURIComponent(`Hello SEM Group, I am planning an exhibition in ${city}.`);

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function faqsFor(loc) {
  const where = `in ${loc.name}`;
  const local = loc.group === 'india'
    ? `Yes. We provide exhibition stall design and fabrication across ${loc.region}, with on-site installation at the venue.`
    : `Yes. We take on projects in ${loc.name}, with installation support overseas. Share the venue and dates, and we will confirm how we can support you.`;
  return [
    [`Which company provides exhibition stall fabrication ${where}?`, `SEM Group provides exhibition stall design, fabrication and installation ${where}, from the first 3D concept to the finished stall at the venue.`],
    ['Do you provide custom exhibition stall design?', 'Yes. We design each custom stall around your brand, products and stall size, and show you realistic 3D visuals before fabrication starts.'],
    [`Do you provide Octanorm stall fabrication ${where}?`, 'Yes. We set up Octanorm system stalls for exhibitions and trade shows, with your branding and graphics added to the structure.'],
    [`Do you provide exhibition stall fabrication across ${loc.region}?`, local]
  ];
}

const page = {
  venues: document.getElementById('locVenues'),
  faq: document.getElementById('locFaq'),
  projects: document.getElementById('locProjects'),
  projectsSection: document.getElementById('locProjectsSection'),
  map: document.getElementById('locMap')
};

function renderMap() {
  const [hubX, hubY] = LOCATIONS[DEFAULT_LOCATION].map;
  const lines = Object.entries(LOCATIONS).filter(([id]) => id !== DEFAULT_LOCATION).map(([id, loc]) => {
    const [x, y] = loc.map;
    const midX = (x + hubX) / 2 + (loc.group === 'india' ? 7 : 0);
    const midY = loc.group === 'india' ? (y + hubY) * 0.28 : Math.min(y, hubY) * 0.5625 - 8;
    return `<path class="net-line" data-loc="${id}" d="M${hubX} ${hubY * 0.5625}Q${midX} ${midY} ${x} ${y * 0.5625}"/>`;
  }).join('');
  const pins = Object.entries(LOCATIONS).map(([id, loc]) =>
    `<button type="button" class="net-pin" data-loc="${id}" data-region="${loc.group}" style="left:${loc.map[0]}%;top:${loc.map[1]}%" aria-pressed="false"><i></i><span>${loc.name}</span></button>`
  ).join('');
  page.map.innerHTML = `<svg viewBox="0 0 100 56.25" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>${pins}`;
  page.map.querySelectorAll('.net-pin').forEach(pin => pin.addEventListener('click', () => showLocation(pin.dataset.loc, true)));
}

function showLocation(id, addToHistory) {
  const loc = LOCATIONS[id];
  const intl = loc.group === 'intl';

  const values = {
    name: loc.name, region: loc.region, role: loc.role, local: loc.local,
    h1Lead: intl ? 'Services in ' : 'Company in ',
    region2: loc.region.replace(/^the /, '')
  };
  document.querySelectorAll('[data-bind]').forEach(el => { el.textContent = values[el.dataset.bind]; });

  document.querySelectorAll('[data-quote]').forEach(a => { a.href = quoteUrl(loc.name); });
  document.querySelectorAll('[data-service]').forEach(a => { a.href = quoteUrl(loc.name, a.dataset.service); });
  document.querySelectorAll('[data-whatsapp]').forEach(a => { a.href = whatsappUrl(loc.name); });
  document.getElementById('locIntroPhoto').src = 'images/' + loc.photos[0];
  document.getElementById('locWhyPhoto').src = 'images/' + loc.photos[1];

  page.venues.innerHTML = loc.venues.map(v => `
    <article class="venue-card">
      ${v.image ? `<img src="${v.image}" alt="${escapeHtml(v.name)}" loading="lazy">` : '<div class="venue-art" aria-hidden="true"><svg class="icon"><use href="#i-building"/></svg></div>'}
      <div class="venue-body"><svg class="icon"><use href="#i-pin"/></svg><p><strong>${escapeHtml(v.name)}</strong>${escapeHtml(v.place)}</p></div>
    </article>`).join('');

  page.faq.innerHTML = faqsFor(loc).map(([q, a], i) =>
    `<details${i === 0 ? ' open' : ''}><summary>${escapeHtml(q)}<span class="faq-plus" aria-hidden="true"></span></summary><p>${escapeHtml(a)}</p></details>`
  ).join('');

  page.projectsSection.hidden = !loc.projects.length;
  page.projects.innerHTML = loc.projects.map(([title, anchor]) =>
    `<li><a href="projects.html#${anchor}"><strong>${escapeHtml(title)}</strong><svg class="icon"><use href="#i-chev-r"/></svg></a></li>`
  ).join('');

  document.querySelectorAll('.loc-switch a').forEach(a => {
    const on = a.dataset.loc === id;
    a.classList.toggle('active', on);
    if (on) { a.setAttribute('aria-current', 'page'); a.scrollIntoView({ block: 'nearest', inline: 'center' }); } else { a.removeAttribute('aria-current'); }
  });
  page.map.querySelectorAll('.net-pin').forEach(p => p.setAttribute('aria-pressed', p.dataset.loc === id));
  page.map.querySelectorAll('.net-line').forEach(l => l.classList.toggle('active', l.dataset.loc === id));

  document.title = `Exhibition Stall Fabricators in ${loc.name} | SEM Group`;
  document.querySelector('meta[name="description"]').content =
    `SEM Group provides exhibition stall design, fabrication and turnkey solutions in ${loc.name}: custom stalls, modular booths, Octanorm stalls and on-site installation.`;

  if (addToHistory) {
    setMenu(false);
    if (document.activeElement) document.activeElement.blur();
    history.pushState({ id }, '', `locations.html?city=${id}`);
    window.scrollTo({ top: 0 });
  }
}

// Navbar dropdown and location tabs switch location without reloading the page
document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="locations.html?city="]');
  if (!link) return;
  const id = new URL(link.href).searchParams.get('city');
  if (!LOCATIONS[id]) return;
  e.preventDefault();
  showLocation(id, true);
});

function locationFromUrl() {
  const id = new URLSearchParams(location.search).get('city');
  return Object.prototype.hasOwnProperty.call(LOCATIONS, id) ? id : DEFAULT_LOCATION;
}
window.addEventListener('popstate', () => showLocation(locationFromUrl(), false));

/* ---------- Nearest office finder ---------- */
(function initOfficeFinder() {
  const finder = document.getElementById('officeFinder');
  const input = document.getElementById('finderCity');
  const result = document.getElementById('finderResult');

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
    quote.href = quoteUrl(city);
    quote.textContent = 'Get a quote for ' + city;
    links.append(quote);
    if (locationId) {
      const see = document.createElement('button');
      see.type = 'button';
      see.textContent = `View ${LOCATIONS[locationId].name} page`;
      see.addEventListener('click', () => showLocation(locationId, true));
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
    if (Object.prototype.hasOwnProperty.call(LOCATIONS, key)) {
      const loc = LOCATIONS[key];
      const title = loc.group === 'intl' ? `We take on projects in ${loc.name}` : `We have an office in ${loc.name}`;
      show(title, loc.local, loc.name, key);
    } else if (Object.prototype.hasOwnProperty.call(FINDER_CITIES, key)) {
      const [nearest, km] = Object.entries(LOCATIONS)
        .filter(([, loc]) => loc.coords)
        .map(([id, loc]) => [id, kmBetween(FINDER_CITIES[key], loc.coords)])
        .sort((a, b) => a[1] - b[1])[0];
      const city = typed.replace(/\b\w/g, ch => ch.toUpperCase());
      show(`Nearest office: ${LOCATIONS[nearest].name}`, `About ${(Math.round(km / 10) * 10).toLocaleString('en-IN')} km from ${city} in a straight line.`, city, nearest);
    } else {
      show('We don’t have that city listed yet', 'We deliver across India, so send us the venue and dates and we will confirm how we can support you.', typed, null);
    }
  });
})();

renderMap();
showLocation(locationFromUrl(), false);
