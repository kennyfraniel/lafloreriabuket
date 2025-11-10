
// js/carrusel.js
(function() {
  const root = document.getElementById('carousel-ramos');
  if (!root) return;

  const viewport = root.querySelector('.carousel-viewport');
  const track = root.querySelector('.carousel-track');
  const prevBtn = root.querySelector('.carousel-btn.prev');
  const nextBtn = root.querySelector('.carousel-btn.next');
  const live = root.querySelector('.sr-only');

  // Slides
  const slides = Array.from(root.querySelectorAll('.carousel-slide'));
  const total = slides.length;

  // Crear dots dinámicamente según cantidad de slides
  const dotsContainer = root.querySelector('.carousel-dots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-controls', `slide-${i + 1}`);
    dot.dataset.index = String(i);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dotsContainer.appendChild(dot);
  }
  const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

  // Estado
  let index = 0;
  let autoplay = true;
  const INTERVAL = 5000;
  let timer = null;

  function update() {
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;

    // actualizar dots y aria
    dots.forEach((d, i) => d.setAttribute('aria-selected', i === index ? 'true' : 'false'));
    if (live) live.textContent = `Slide ${index + 1} de ${total}`;
  }

  function go(n) {
    index = (n + total) % total;
    update();
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  // Autoplay
  function start() {
    stop();
    if (autoplay) timer = setInterval(next, INTERVAL);
  }
  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  // Controles
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });

  // Dots click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      go(parseInt(dot.dataset.index, 10));
      start();
    });
  });

  // Pausa en hover
  viewport.addEventListener('mouseenter', stop);
  viewport.addEventListener('mouseleave', start);

  // Teclado
  root.tabIndex = 0; // para poder enfocar la sección con teclado
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); start(); }
    if (e.key === 'ArrowLeft')  { prev(); start(); }
  });

  // Swipe táctil / mouse (pointer events)
  let startX = 0, currentX = 0, isDown = false;
  function onDown(x) {
    isDown = true;
    startX = x;
    currentX = x;
    track.style.transition = 'none';
    stop();
  }
  function onMove(x) {
    if (!isDown) return;
    currentX = x;
    const dx = currentX - startX;
    const pct = (dx / viewport.clientWidth) * 100;
    const base = -index * 100;
    track.style.transform = `translateX(${base + pct}%)`;
  }
  function onUp() {
    if (!isDown) return;
    isDown = false;
    track.style.transition = ''; // vuelve a transición CSS
    const dx = currentX - startX;
    const threshold = viewport.clientWidth * 0.15;
    if (Math.abs(dx) > threshold) {
      dx < 0 ? next() : prev();
    } else {
      update();
    }
    start();
  }

  viewport.addEventListener('pointerdown', (e) => onDown(e.clientX));
  window.addEventListener('pointermove', (e) => onMove(e.clientX));
  window.addEventListener('pointerup', onUp);

  // Fallback touch (iOS)
  viewport.addEventListener('touchstart', (e) => onDown(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchend', onUp);

  // Init
  update();
  start();
})();
