// Runs before styles so a saved dark theme never flashes light on load.
(() => {
  'use strict';
  const key = 'trace-report-theme';
  const choices = ['light', 'dark', 'system'];
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (choices.includes(saved)) preference = saved;
  } catch { /* Private or file-based reports may not allow storage. */ }

  function apply() {
    root.dataset.theme = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference;
    root.dataset.themePreference = preference;
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === preference));
    });
  }

  apply();
  document.addEventListener('DOMContentLoaded', apply, { once: true });
  system.addEventListener('change', apply);
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-theme-choice]');
    if (!button || !choices.includes(button.dataset.themeChoice)) return;
    preference = button.dataset.themeChoice;
    try { localStorage.setItem(key, preference); } catch { /* Keep the selection for this session. */ }
    apply();
  });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    preference = choices.includes(event.newValue) ? event.newValue : 'system';
    apply();
  });
})();
