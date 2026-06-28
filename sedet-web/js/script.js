/* ═══════════════════════════════════════════════════════
   MentalCare Kids Perú — JavaScript
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Menú móvil ──────────────────────────────────────
  const burger = document.getElementById('burgerBtn');
  const navLinks = document.querySelector('.nav__links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // ─── Contadores animados ─────────────────────────────
  const counters = document.querySelectorAll('.stat__num');
  if (counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = target * ease;
        el.textContent = val.toLocaleString('es-PE', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => obs.observe(c));
  }

  // ─── Gráficos (Chart.js) ─────────────────────────────
  if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
    Chart.defaults.color = '#4a4e6b';
    Chart.defaults.borderColor = '#e6e1d3';

    const palette = {
      brand: '#E31837',
      brand2: '#b71230',
      accent: '#f59e7a',
      danger: '#dc4d4d',
      warn: '#e8a93b',
      ok: '#4caf81',
      ink: '#1a1a1a',
    };

    // Tiempo de detección
    const t = document.getElementById('chartTiempo');
    if (t) new Chart(t, {
      type: 'bar',
      data: {
        labels: ['Menos\nde 1 sem', '1 a 4\nsemanas', '1 a 3\nmeses', 'Más de\n3 meses', 'Nunca se\ndetecta'],
        datasets: [{
          label: 'Familias',
          data: [4, 6, 3, 2, 4],
          backgroundColor: [palette.ok, palette.brand2, palette.warn, palette.accent, palette.danger],
          borderRadius: 8,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 2 }, grid: { color: '#f1ede4' } },
          x: { grid: { display: false } },
        },
      },
    });

    // Eficacia
    const e = document.getElementById('chartEficacia');
    if (e) new Chart(e, {
      type: 'doughnut',
      data: {
        labels: ['1 — Muy baja', '2 — Baja', '3 — Moderada', '4 — Alta', '5 — Muy alta'],
        datasets: [{
          data: [3, 4, 9, 3, 0],
          backgroundColor: [palette.danger, palette.warn, palette.brand2, palette.brand, palette.ok],
          borderWidth: 3,
          borderColor: '#fff',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: { position: 'right', labels: { padding: 14, font: { size: 12 } } },
        },
      },
    });

    // Capacitación
    const c = document.getElementById('chartCapacitacion');
    if (c) new Chart(c, {
      type: 'bar',
      data: {
        labels: ['Trimestral\no más', 'Semestral', 'Anual', 'Nunca'],
        datasets: [{
          label: 'Personal',
          data: [1, 6, 5, 6],
          backgroundColor: palette.brand,
          borderRadius: 8,
        }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, grid: { color: '#f1ede4' } },
          y: { grid: { display: false } },
        },
      },
    });

    // Cobertura
    const cob = document.getElementById('chartCobertura');
    if (cob) new Chart(cob, {
      type: 'bar',
      data: {
        labels: ['Plazas 2023', 'Plazas 2024', 'Proyección 2026', 'Demanda real estimada'],
        datasets: [{
          label: 'Psicólogos escolares',
          data: [2291, 3000, 4000, 55000],
          backgroundColor: [palette.danger, palette.warn, palette.brand2, palette.ink],
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f1ede4' }, ticks: { callback: (v) => v.toLocaleString('es-PE') } },
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        },
      },
    });
  }

  // ─── Pestañas (página beta) ──────────────────────────
  const tabs = document.querySelectorAll('.tab');
  if (tabs.length) {
    tabs.forEach((t) => {
      t.addEventListener('click', () => {
        const target = t.dataset.tab;
        tabs.forEach((x) => x.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
        t.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });
  }

  // ─── Formulario tamizaje ─────────────────────────────
  const formTam = document.getElementById('formTamizaje');
  const alertBox = document.getElementById('formAlert');
  const successBox = document.getElementById('formSuccess');
  if (formTam) {
    // Detecta señal de riesgo alto (última checkbox)
    const checkboxes = formTam.querySelectorAll('input[type="checkbox"]');
    const lastCheck = checkboxes[checkboxes.length - 1];
    checkboxes.forEach((cb) => {
      cb.addEventListener('change', () => {
        if (lastCheck.checked) alertBox.hidden = false;
        else alertBox.hidden = true;
      });
    });

    formTam.addEventListener('submit', (ev) => {
      ev.preventDefault();
      successBox.hidden = false;
      formTam.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setTimeout(() => {
        formTam.reset();
        alertBox.hidden = true;
      }, 500);
      setTimeout(() => { successBox.hidden = true; }, 6000);
    });
  }

  // ─── Slots de agendamiento ───────────────────────────
  document.querySelectorAll('.slot__times button:not(.taken)').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.slot__times button').forEach((x) => x.classList.remove('picked'));
      b.style.background = '#1a1d2e';
      b.style.color = '#fff';
      b.style.borderColor = '#1a1d2e';
      const orig = b.textContent;
      b.textContent = '✓ ' + orig;
      setTimeout(() => {
        alert('Horario reservado (demo): ' + orig + '\n\nEn la versión real, recibirías un correo de confirmación con la ubicación y los datos del profesional asignado.');
      }, 200);
    });
  });

  // ─── Feedback form ───────────────────────────────────
  const fb = document.getElementById('feedbackForm');
  const fbThanks = document.getElementById('feedbackThanks');
  if (fb) {
    fb.addEventListener('submit', (ev) => {
      ev.preventDefault();
      fb.reset();
      fbThanks.hidden = false;
      setTimeout(() => { fbThanks.hidden = true; }, 5000);
    });
  }
});
