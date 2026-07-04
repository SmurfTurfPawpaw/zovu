// ============ ZOVU Landing Page ============

// ---- Marquee: duplicate tiles so the loop is seamless ----
document.querySelectorAll('.marquee').forEach((marquee) => {
  const track = marquee.querySelector('.marquee-track');
  track.innerHTML += track.innerHTML; // second copy for the -50% loop
  const speed = Number(marquee.dataset.speed || 55);
  track.style.setProperty('--duration', speed + 's');
});

// ---- POS mockup: clickable categories with their own items ----
const POS_MENU = {
  alchol:   ['Coca Cola', 'Fanta', 'Ice-Tea', 'Amstel Vaas'],
  main:     ['Ribeye', 'Sea Bass', 'Risotto', 'Burger Deluxe'],
  starters: ['Bread Basket', 'Baked Shrimps', 'Carpacio', 'Soup of the Day'],
  beers:    ['Heineken Large', 'Amstel Vaas', 'La Chouffe', 'Duvel'],
};

const catsWrap = document.getElementById('posCats');
const itemsWrap = document.getElementById('posItems');

function renderItems(cat) {
  itemsWrap.innerHTML = '';
  POS_MENU[cat].forEach((name, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pos-item';
    btn.textContent = name;
    // Mirror the design: "Fanta" starts selected with a count of 1
    if (cat === 'alchol' && name === 'Fanta') selectItem(btn, 1);
    btn.addEventListener('click', () => {
      const count = btn.classList.contains('selected')
        ? Number(btn.dataset.count) + 1
        : 1;
      selectItem(btn, count);
    });
    itemsWrap.appendChild(btn);
  });
}

function selectItem(btn, count) {
  btn.classList.add('selected');
  btn.dataset.count = count;
  let badge = btn.querySelector('.count');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'count';
    btn.appendChild(badge);
  }
  badge.textContent = count;
}

if (catsWrap && itemsWrap) {
  renderItems('alchol');
  catsWrap.querySelectorAll('.pos-cat').forEach((cat) => {
    cat.addEventListener('click', () => {
      catsWrap.querySelector('.active')?.classList.remove('active');
      cat.classList.add('active');
      renderItems(cat.dataset.cat);
    });
  });
}

// ---- Reveal sections on scroll ----
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
