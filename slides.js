(() => {
  'use strict';
  const slides = Array.from(document.querySelectorAll('.deck > .slide'));
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const counter = document.getElementById('pageCounter');
  const progressBar = document.getElementById('progressBar');
  const notesToggle = document.getElementById('notesToggle');
  const notesClose = document.getElementById('notesClose');
  const notesPanel = document.getElementById('speakerNotes');
  const notesContent = document.getElementById('notesContent');
  const fullscreenToggle = document.getElementById('fullscreenToggle');
  let index = 0;
  let touchX = null;

  const logitData = {
    id: [5.9713, -1.6375, -2.0727, 1.1479, 0.4061, -1.1183, 0.1196, -0.4136, -0.9720, -1.4309],
    ood: [5.8991, 0.2330, -2.1102, -0.9431, 0.1725, -1.0958, -1.8756, -1.0419, 0.9104, -0.1486]
  };
  const shortNames = ['Air', 'Auto', 'Bird', 'Cat', 'Deer', 'Dog', 'Frog', 'Horse', 'Ship', 'Truck'];

  function svgElement(tag, attributes = {}, text = '') {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [key, val] of Object.entries(attributes)) el.setAttribute(key, String(val));
    if (text) el.textContent = text;
    return el;
  }

  // Actual Seed 43 Logits: no chart library or network required.
  function drawLogitChart(target, values) {
    const w = 420, h = 340, left = 34, right = 13, top = 18, bottom = 60;
    const min = -2.5, max = 6.5;
    const plotHeight = h - top - bottom;
    const sy = value => top + (max - value) * plotHeight / (max - min);
    const svg = svgElement('svg', {viewBox: `0 0 ${w} ${h}`, role: 'img', 'aria-label': '10개 클래스의 실제 Logit 막대 그래프'});
    for (let tick = -2; tick <= 6; tick += 2) {
      const y = sy(tick);
      svg.appendChild(svgElement('line', {x1: left, y1: y, x2: w - right, y2: y, stroke: '#e2e8f0', 'stroke-width': 1}));
      svg.appendChild(svgElement('text', {x: left - 8, y: y + 4, 'text-anchor': 'end', 'font-size': 14, fill: '#64748b'}, String(tick)));
    }
    svg.appendChild(svgElement('line', {x1: left, y1: sy(0), x2: w - right, y2: sy(0), stroke: '#64748b', 'stroke-width': 1.5}));
    const slot = (w - left - right) / values.length;
    values.forEach((v, i) => {
      const x = left + i * slot + slot * .16;
      const y = sy(Math.max(v, 0));
      const height = Math.max(Math.abs(sy(0) - sy(v)), 1.3);
      svg.appendChild(svgElement('rect', {x, y, width: slot * .67, height, rx: 1, fill: i === 0 ? '#2563eb' : '#96b5dc'}));
      svg.appendChild(svgElement('text', {x: x + slot * .34, y: h - bottom + 15, 'text-anchor': 'end', transform: `rotate(-50 ${x + slot * .34} ${h - bottom + 15})`, 'font-size': 12, fill: '#64748b'}, shortNames[i]));
    });
    target.appendChild(svg);
  }
  document.querySelectorAll('.logit-chart').forEach(el => drawLogitChart(el, logitData[el.dataset.dataset]));

  function gotoSlide(n, updateHash = true) {
    index = Math.min(slides.length - 1, Math.max(0, n));
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    notesContent.textContent = slides[index].dataset.notes || '메모가 없습니다.';
    if (updateHash) history.replaceState(null, '', `#/${index}`);
  }
  function readHash() {
    const match = window.location.hash.match(/^#\/(\d+)$/);
    gotoSlide(match ? Number(match[1]) : 0, false);
  }
  function toggleNotes() { notesPanel.hidden = !notesPanel.hidden; }
  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  }
  prev.addEventListener('click', () => gotoSlide(index - 1));
  next.addEventListener('click', () => gotoSlide(index + 1));
  notesToggle.addEventListener('click', toggleNotes);
  notesClose.addEventListener('click', () => { notesPanel.hidden = true; });
  fullscreenToggle.addEventListener('click', toggleFullscreen);
  window.addEventListener('hashchange', readHash);
  document.addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); gotoSlide(index + 1); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); gotoSlide(index - 1); }
    else if (e.key.toLowerCase() === 'n') toggleNotes();
    else if (e.key.toLowerCase() === 'f') toggleFullscreen();
    else if (e.key === 'Home') gotoSlide(0);
    else if (e.key === 'End') gotoSlide(slides.length - 1);
    else if (e.key === 'Escape' && !notesPanel.hidden) notesPanel.hidden = true;
  });
  document.getElementById('deck').addEventListener('touchstart', e => { if (e.touches.length === 1) touchX = e.touches[0].clientX; }, {passive: true});
  document.getElementById('deck').addEventListener('touchend', e => { if (touchX == null) return; const d = e.changedTouches[0].clientX - touchX; if (Math.abs(d) > 55) gotoSlide(index + (d < 0 ? 1 : -1)); touchX = null; }, {passive: true});
  readHash();
})();
