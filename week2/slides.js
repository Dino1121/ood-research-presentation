
(() => {
  "use strict";

  const slides = Array.from(
    document.querySelectorAll(".slide")
  );

  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const counter = document.getElementById("counter");
  const progress = document.getElementById("progress");

  const notes = document.getElementById("speaker-notes");
  const noteContent = document.getElementById("note-content");
  const noteToggle = document.getElementById("note-toggle");

  let current = 0;

  function show(index, setHash = true) {
    current = Math.max(
      0,
      Math.min(slides.length - 1, index)
    );

    slides.forEach((slide, i) => {
      slide.classList.toggle(
        "active",
        i === current
      );

      slide.setAttribute(
        "aria-hidden",
        String(i !== current)
      );
    });

    counter.textContent =
      `${String(current + 1).padStart(2,"0")} / ` +
      `${String(slides.length).padStart(2,"0")}`;

    progress.style.width =
      `${100 * (current + 1) / slides.length}%`;

    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;

    noteContent.textContent =
      slides[current]
        .querySelector(".notes")
        ?.textContent.trim()
      || "";

    if (setHash) {
      history.replaceState(
        null,
        "",
        "#/" + current
      );
    }
  }

  function toggleNotes() {
    notes.hidden = !notes.hidden;
  }

  function fromHash() {
    const match = /^#\/(\d+)$/.exec(location.hash);

    show(
      match ? Number(match[1]) : 0,
      false
    );
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.();
    }
  }

  prev.addEventListener("click", () => {
    show(current - 1);
  });

  next.addEventListener("click", () => {
    show(current + 1);
  });

  noteToggle.addEventListener(
    "click",
    toggleNotes
  );

  document.getElementById("note-close")
    .addEventListener("click", () => {
      notes.hidden = true;
    });

  document.getElementById("fullscreen")
    .addEventListener("click", toggleFullscreen);

  window.addEventListener(
    "hashchange",
    fromHash
  );

  window.addEventListener("keydown", event => {
    if (
      ["INPUT", "SELECT", "TEXTAREA"].includes(
        event.target.tagName
      )
    ) {
      return;
    }

    if (
      [
        "ArrowRight",
        "ArrowDown",
        "PageDown",
        " "
      ].includes(event.key)
    ) {
      event.preventDefault();
      show(current + 1);
    }

    else if (
      [
        "ArrowLeft",
        "ArrowUp",
        "PageUp"
      ].includes(event.key)
    ) {
      event.preventDefault();
      show(current - 1);
    }

    else if (event.key === "Home") {
      show(0);
    }

    else if (event.key === "End") {
      show(slides.length - 1);
    }

    else if (event.key.toLowerCase() === "n") {
      toggleNotes();
    }

    else if (event.key.toLowerCase() === "f") {
      toggleFullscreen();
    }

    else if (event.key === "Escape") {
      notes.hidden = true;
    }
  });

  let touchX = null;

  document.getElementById("deck")
    .addEventListener(
      "touchstart",
      event => {
        if (event.touches.length === 1) {
          touchX = event.touches[0].clientX;
        }
      },
      { passive:true }
    );

  document.getElementById("deck")
    .addEventListener(
      "touchend",
      event => {
        if (touchX === null) return;

        const dx =
          event.changedTouches[0].clientX - touchX;

        if (Math.abs(dx) > 70) {
          show(
            current + (dx < 0 ? 1 : -1)
          );
        }

        touchX = null;
      },
      { passive:true }
    );

  fromHash();
})();
