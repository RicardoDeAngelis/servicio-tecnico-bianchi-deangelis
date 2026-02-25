function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initYear();
});

