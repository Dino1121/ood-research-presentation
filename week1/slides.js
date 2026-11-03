(() => {
  'use strict';
  const stage = document.getElementById('stage');
  const slides = Array.from(stage.querySelectorAll('.slide'));
  const currentEl = document.getElementById('current');
  const totalEl = document.getElementById('total');
  const progress = document.getElementById('progress');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const notesPanel = document.getElementById('speakerNotes');
  const notesText = document.getElementById('notesText');
  const notesButton = document.getElementById('noteButton');
  let index = 0;
  totalEl.textContent = String(slides.length);


  function fit() {
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;

    const slideWidth = 1280;
    const slideHeight = 720;

    // 슬라이드 전체가 화면 안에 들어오도록 확대/축소
    const scale = Math.min(
      screenWidth / slideWidth,
      screenHeight / slideHeight
    );

    stage.style.setProperty(
      '--deck-scale',
      String(scale)
    );
  }

  function gotoSlide(n, replaceHash = false) {
    index = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.setAttribute('aria-hidden', String(i !== index));
    });
    currentEl.textContent = String(index + 1);
    progress.style.width = String((index + 1) / slides.length * 100) + '%';
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    notesText.textContent = slides[index].querySelector('.notes')?.textContent.trim() || '메모가 없습니다.';
    if (!replaceHash) history.replaceState(null, '', '#/' + index);
  }
  function fromHash() {
    const match = location.hash.match(/^#\/(\d+)$/);
    gotoSlide(match ? Number(match[1]) : 0, true);
  }
  function toggleNotes() { notesPanel.hidden = !notesPanel.hidden; notesButton.setAttribute('aria-pressed', String(!notesPanel.hidden)); }
  prev.addEventListener('click', () => gotoSlide(index - 1));
  next.addEventListener('click', () => gotoSlide(index + 1));
  notesButton.addEventListener('click', toggleNotes);
  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', fromHash);
  window.addEventListener('keydown', (event) => {
    const tag = event.target.tagName?.toLowerCase();
    if (['input', 'textarea', 'select'].includes(tag)) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); gotoSlide(index + 1); }
    if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(event.key)) { event.preventDefault(); gotoSlide(index - 1); }
    if (event.key.toLowerCase() === 'n') toggleNotes();
    if (event.key.toLowerCase() === 'f') { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); }
    if (event.key === 'Home') gotoSlide(0);
    if (event.key === 'End') gotoSlide(slides.length - 1);
    if (event.key === 'Escape' && !notesPanel.hidden) notesPanel.hidden = true;
  });
  let touchStartX = null;
  stage.addEventListener('touchstart', e => { if (e.touches.length === 1) touchStartX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => { if (touchStartX == null) return; const dx = e.changedTouches[0].clientX - touchStartX; if (Math.abs(dx) > 55) gotoSlide(index + (dx < 0 ? 1 : -1)); touchStartX = null; }, { passive: true });
  fit(); fromHash();
})();
