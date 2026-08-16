'use strict';

/* ================================================================
   Comparador Financiero Ecuador 2026 — app.js
   Carga datos desde archivos JSON, renderiza tablas, gráficos,
   comparador, simulador y módulo de crédito.
   v3.0 — interfaz profesional: tokens CSS en gráficos, accesibilidad
   (modal, teclado, aria), ordenamiento robusto, búsqueda con acentos.
   ================================================================ */

// ── Estado global ────────────────────────────────────────────────
const STATE = {
  bancos: [],
  cooperativas: [],
  indicadores: null,
  currentTheme: 'light',
  charts: {},
  searchTerm: '',
  creditProducts: [],
  sortHandlers: new WeakMap() // evita listeners duplicados por tabla
};

// ── Utilidades ───────────────────────────────────────────────────
function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function normalizeText(str) {
  return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function fmtNum(n, decimals = 0) {
  return Number(n || 0).toLocaleString('es-EC', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

// ── Inicialización ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  setupChartDefaults();
  await loadAllData();
  setupTabNavigation();
  setupEventListeners();
  setupThemeToggle();
  loadDashboard();
  loadBancosTable();
  loadCooperativasTable();
  loadIndicatorsTable();
  buildCreditProducts();
  setupComparator();
  setupSearch();
  setupTableSorting('bancos-table');
  setupTableSorting('cooperativas-table');
  loadGuiaContent();
  updateLastUpdated();
  populateDashboardMetrics();
});

// ── Configuración global de Chart.js ─────────────────────────────
function setupChartDefaults() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.font.family = cssVar('--font-family-base') || 'Inter, sans-serif';
  Chart.defaults.color = cssVar('--color-text-secondary') || '#626c71';
}

// ── Carga de datos desde JSON ──────────────────────────────────
async function loadAllData() {
  try {
    const [bancosRes, coopsRes, indicadoresRes] = await Promise.all([
      fetch('data/bancos.json'),
      fetch('data/cooperativas.json'),
      fetch('data/indicadores_sistema.json')
    ]);

    if (!bancosRes.ok || !coopsRes.ok || !indicadoresRes.ok) {
      throw new Error('Error al cargar uno o más archivos de datos');
    }

    const bancosData = await bancosRes.json();
    const coopsData = await coopsRes.json();
    const indicadoresData = await indicadoresRes.json();

    STATE.bancos = bancosData.bancos || [];
    STATE.cooperativas = coopsData.cooperativas || [];
    STATE.indicadores = indicadoresData;

    console.log(`✅ Datos cargados: ${STATE.bancos.length} bancos, ${STATE.cooperativas.length} cooperativas`);
  } catch (err) {
    console.error('❌ Error cargando datos:', err);
    showDataError();
  }
}

function showDataError() {
  const sections = ['dashboard', 'bancos', 'cooperativas', 'indicadores', 'credito', 'comparador', 'alertas'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = `<div class="error-state">
        <p>⚠️ No se pudieron cargar los datos financieros.</p>
        <p>Verifica que los archivos JSON estén disponibles en la carpeta <code>data/</code>.</p>
        <button class="btn btn--primary" onclick="location.reload()">Reintentar</button>
      </div>`;
    }
  });
}

function updateLastUpdated() {
  const el = document.getElementById('last-updated');
  if (el && STATE.indicadores) {
    el.textContent = STATE.indicadores.metadata?.last_updated || '2026-03-31';
  }
}

function populateDashboardMetrics() {
  const ind = STATE.indicadores?.sistema;
  if (!ind) return;

  const setVal = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  setVal('metric-bancos', '$' + fmtNum(ind.total_activos_bancos || 53128.64) + ' MM');
  setVal('metric-coops', '$' + fmtNum(ind.total_activos_coops || 8863.49) + ' MM');
  setVal('metric-instituciones', fmtNum((ind.instituciones?.bancos || 0) + (ind.instituciones?.cooperativas || 0)));
  setVal('metric-seguro', '$' + fmtNum(ind.seguro_depósitos || 32000));
}

// ── Navegación por pestañas ─────────────────────────────────────
function setupTabNavigation() {
  document.querySelectorAll('.nav__tab').forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      const targetTab = this.dataset.tab;

      document.querySelectorAll('.nav__tab').forEach(t => {
        t.classList.remove('active');
        t.removeAttribute('aria-current');
      });
      this.classList.add('active');
      this.setAttribute('aria-current', 'true');

      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      const target = document.getElementById(targetTab);
      if (target) {
        target.classList.add('active');
        if (targetTab === 'dashboard') loadDashboard();
        if (targetTab === 'indicadores') setTimeout(() => createRadarChart(), 150);
        if (targetTab === 'credito') buildCreditProducts();
      }

      // Cerrar menú móvil
      const navMenu = document.getElementById('nav-menu');
      const hamburger = document.getElementById('menu-toggle');
      if (navMenu) navMenu.classList.remove('nav__menu--open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Menú hamburguesa
  const hamburger = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const open = navMenu.classList.toggle('nav__menu--open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }
}

// ── Búsqueda global ─────────────────────────────────────────────
function setupSearch() {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', debounce(function () {
    STATE.searchTerm = normalizeText(this.value);
    loadBancosTable();
    loadCooperativasTable();
    loadIndicatorsTable();
  }, 250));
}

function matchesSearch(nombre) {
  if (!STATE.searchTerm) return true;
  return normalizeText(nombre).includes(STATE.searchTerm);
}

// ── Event Listeners ─────────────────────────────────────────────
function setupEventListeners() {
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  const modal = document.getElementById('institution-modal');
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => {
    if (e.target.classList.contains('modal__backdrop')) closeModal();
  });
  modal?.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') trapModalFocus(e);
  });

  document.getElementById('filter-credits')?.addEventListener('click', filterCreditProducts);
  document.getElementById('generate-comparison')?.addEventListener('click', generateComparison);
  document.getElementById('simulate-diversification')?.addEventListener('click', simulateDiversification);

  document.querySelectorAll('.indicators-filters .btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.indicators-filters .btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterIndicators(this.dataset.filter);
    });
  });
}

// ── Dashboard ────────────────────────────────────────────────────
function loadDashboard() {
  setTimeout(() => {
    createSectorsChart();
    createIndicatorsChart();
  }, 100);
}

function createSectorsChart() {
  const canvas = document.getElementById('sectorsChart');
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');
  if (STATE.charts.sectorsChart) STATE.charts.sectorsChart.destroy();

  const ind = STATE.indicadores?.sistema || {};
  const totalBancos = ind.total_activos_bancos || 53128.64;
  const totalCoops = ind.total_activos_coops || 8863.49;

  STATE.charts.sectorsChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Bancos', 'Cooperativas'],
      datasets: [{
        data: [totalBancos, totalCoops],
        backgroundColor: [cssVar('--color-primary') || '#21808D', cssVar('--color-warning') || '#A84B2F'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: chartTheme({
      responsive: true,
      cutout: '62%',
      plugins: {
        title: { display: true, text: 'Distribución de Activos por Sector (Millones USD)' },
        legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 16 } }
      }
    })
  });
}

function createIndicatorsChart() {
  const canvas = document.getElementById('indicatorsChart');
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');
  if (STATE.charts.indicatorsChart) STATE.charts.indicatorsChart.destroy();

  const ind = STATE.indicadores?.sistema?.indicadores || {};
  const bp = ind.bancos || {};
  const cp = ind.cooperativas || {};

  STATE.charts.indicatorsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['ROA', 'ROE', 'Solvencia', 'Morosidad', 'Liquidez'],
      datasets: [
        {
          label: 'Bancos',
          data: [bp.roa_promedio || 1.03, bp.roe_promedio || 11.68, bp.solvencia_promedio || 14.26, bp.morosidad_promedio || 3.19, bp.liquidez_promedio || 29.25],
          backgroundColor: cssVar('--color-primary') || '#21808D',
          borderRadius: 6,
          maxBarThickness: 36,
          borderWidth: 0
        },
        {
          label: 'Cooperativas',
          data: [cp.roa_promedio || 1.56, cp.roe_promedio || 12.2, cp.solvencia_promedio || 18, cp.morosidad_promedio || 5.65, cp.liquidez_promedio || 22],
          backgroundColor: cssVar('--color-warning') || '#A84B2F',
          borderRadius: 6,
          maxBarThickness: 36,
          borderWidth: 0
        }
      ]
    },
    options: chartTheme({
      responsive: true,
      plugins: {
        title: { display: true, text: 'Indicadores Promedio por Sector' },
        legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 16 } }
      },
      scales: {
        y: { beginAtZero: true },
        x: { grid: { display: false } }
      }
    })
  });
}

// Aplica colores del tema a opciones de Chart.js
function chartTheme(options) {
  const textColor = cssVar('--color-text') || '#13343B';
  const textSecondary = cssVar('--color-text-secondary') || '#626C71';
  const gridColor = STATE.currentTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(128,128,128,0.15)';
  const surface = cssVar('--color-charcoal-800') || '#262828';
  const surfaceText = cssVar('--color-gray-200') || '#F5F5F5';

  options = options || {};
  options.plugins = options.plugins || {};
  options.plugins.title = options.plugins.title || {};
  options.plugins.title.color = textColor;

  options.plugins.tooltip = {
    backgroundColor: surface,
    titleColor: surfaceText,
    bodyColor: surfaceText,
    padding: 12,
    cornerRadius: 8,
    displayColors: false
  };

  if (options.scales) {
    Object.values(options.scales).forEach(scale => {
      scale.ticks = scale.ticks || {};
      scale.ticks.color = textSecondary;
      scale.grid = scale.grid || {};
      scale.grid.color = gridColor;
    });
  }
  return options;
}

// ── Tablas de Bancos y Cooperativas ──────────────────────────────
function loadBancosTable() {
  const tbody = document.getElementById('bancos-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filtered = STATE.bancos.filter(b => matchesSearch(b.nombre));
  updateResultCount('bancos-count', filtered.length, STATE.bancos.length, 'bancos');

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="9" class="empty-state">No se encontraron bancos con "${STATE.searchTerm}"</td></tr>`;
    return;
  }

  filtered.forEach(b => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${b.nombre}</strong><div class="cell-sub">${b.supervision}</div></td>
      <td class="num" data-value="${b.activos_mill}">$${fmtNum(b.activos_mill)}</td>
      <td><span class="status-indicator status-indicator--${getRatingClass(b.calificacion)}">${b.calificacion}</span></td>
      <td class="num" data-value="${b.solvencia}">${b.solvencia}%</td>
      <td class="num" data-value="${b.morosidad}">${b.morosidad}%</td>
      <td class="num" data-value="${b.roa ?? ''}">${b.roa != null ? b.roa + '%' : 'N/D'}</td>
      <td class="num" data-value="${b.roe ?? ''}">${b.roe != null ? b.roe + '%' : 'N/D'}</td>
      <td class="num" data-value="${b.liquidez}">${b.liquidez}%</td>
      <td><button class="btn btn--outline btn--sm action-btn" onclick="showInstitutionDetails('banco', ${b.id})">Ver detalles</button></td>
    `;
    tbody.appendChild(row);
  });
}

function loadCooperativasTable() {
  const tbody = document.getElementById('cooperativas-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filtered = STATE.cooperativas.filter(c => matchesSearch(c.nombre) || matchesSearch(c.nombre_corto || ''));
  updateResultCount('cooperativas-count', filtered.length, STATE.cooperativas.length, 'cooperativas');

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="9" class="empty-state">No se encontraron cooperativas con "${STATE.searchTerm}"</td></tr>`;
    return;
  }

  filtered.forEach(c => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${c.nombre_corto || c.nombre}</strong><div class="cell-sub">${c.provincia || c.supervision}</div></td>
      <td class="num" data-value="${c.activos_mill}">$${fmtNum(c.activos_mill)}</td>
      <td><span class="status-indicator status-indicator--${getRatingClass(c.calificacion)}">${c.calificacion}</span></td>
      <td class="num" data-value="${c.solvencia}">${c.solvencia}%</td>
      <td class="num" data-value="${c.morosidad}">${c.morosidad}%</td>
      <td class="num" data-value="${c.roa ?? ''}">${c.roa != null ? c.roa + '%' : 'N/D'}</td>
      <td class="num" data-value="${c.roe ?? ''}">${c.roe != null ? c.roe + '%' : 'N/D'}</td>
      <td class="num" data-value="${c.socios_aprox || 0}">${fmtNum(c.socios_aprox || 0)}</td>
      <td><button class="btn btn--outline btn--sm action-btn" onclick="showInstitutionDetails('cooperativa', ${c.id})">Ver detalles</button></td>
    `;
    tbody.appendChild(row);
  });
}

function updateResultCount(id, shown, total, label) {
  const el = document.getElementById(id);
  if (el) el.textContent = `${shown} de ${total} ${label}`;
}

// ── Ordenamiento de tablas (accesible, sin duplicar listeners) ──
function setupTableSorting(tableId) {
  const table = document.getElementById(tableId);
  if (!table || STATE.sortHandlers.has(table)) return;
  STATE.sortHandlers.set(table, true);

  const thead = table.querySelector('thead');
  if (!thead) return;

  thead.addEventListener('click', e => {
    const th = e.target.closest('th.sortable');
    if (th) sortByColumn(table, th);
  });

  thead.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const th = e.target.closest('th.sortable');
    if (th) {
      e.preventDefault();
      sortByColumn(table, th);
    }
  });

  thead.querySelectorAll('th.sortable').forEach(th => {
    th.setAttribute('tabindex', '0');
    th.setAttribute('role', 'button');
  });
}

function sortByColumn(table, th) {
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const index = Array.from(th.parentNode.children).indexOf(th);
  const isAsc = th.classList.contains('sorted-asc');
  const colKey = th.dataset.sort || '';

  table.querySelectorAll('.sortable').forEach(t => {
    t.classList.remove('sorted-asc', 'sorted-desc');
    t.setAttribute('aria-sort', 'none');
  });

  rows.sort((a, b) => {
    const aCell = a.children[index];
    const bCell = b.children[index];
    if (!aCell || !bCell) return 0;

    const aVal = aCell.dataset.value !== undefined ? aCell.dataset.value : aCell.textContent;
    const bVal = bCell.dataset.value !== undefined ? bCell.dataset.value : bCell.textContent;
    const aNum = parseFloat(String(aVal).replace(/,/g, ''));
    const bNum = parseFloat(String(bVal).replace(/,/g, ''));

    let cmp;
    if (!isNaN(aNum) && !isNaN(bNum)) {
      cmp = aNum - bNum;
    } else {
      cmp = String(aVal).localeCompare(String(bVal), 'es');
    }
    return isAsc ? -cmp : cmp;
  });

  th.classList.add(isAsc ? 'sorted-desc' : 'sorted-asc');
  th.setAttribute('aria-sort', isAsc ? 'desc' : 'asc');
  rows.forEach(row => tbody.appendChild(row));
}

// ── Indicadores Avanzados ────────────────────────────────────────
function loadIndicatorsTable() {
  const tbody = document.getElementById('indicators-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const all = [...STATE.bancos, ...STATE.cooperativas].filter(i => matchesSearch(i.nombre));
  all.forEach(inst => {
    const semaforo = getSemaforoRating(inst);
    const row = document.createElement('tr');
    const crecimiento = inst.crecimiento_cartera_12m || inst.crecimiento_patrimonial_12m || 'N/D';
    row.innerHTML = `
      <td>${inst.nombre_corto || inst.nombre}</td>
      <td class="num" data-value="${inst.roa ?? ''}">${inst.roa != null ? inst.roa + '%' : 'N/D'}</td>
      <td class="num" data-value="${inst.roe ?? ''}">${inst.roe != null ? inst.roe + '%' : 'N/D'}</td>
      <td class="num" data-value="${inst.cir ?? ''}">${inst.cir != null ? inst.cir : 'N/D'}</td>
      <td class="num" data-value="${inst.solvencia}">${inst.solvencia}%</td>
      <td class="num">${typeof crecimiento === 'number' ? crecimiento + '%' : crecimiento}</td>
      <td><span class="status-indicator status-indicator--${semaforo.class}">${semaforo.text}</span></td>
    `;
    tbody.appendChild(row);
  });
}

function filterIndicators(filterType) {
  const tbody = document.getElementById('indicators-tbody');
  if (!tbody) return;

  let all = [...STATE.bancos, ...STATE.cooperativas].filter(i => matchesSearch(i.nombre));

  if (filterType === 'liquidez') {
    all = all.filter(i => (i.liquidez || 0) >= 25);
  } else if (filterType === 'solvencia') {
    all = all.filter(i => (i.solvencia || 0) >= 15);
  }

  tbody.innerHTML = '';
  if (!all.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-state">No hay instituciones que coincidan con este filtro.</td></tr>`;
    return;
  }

  all.forEach(inst => {
    const semaforo = getSemaforoRating(inst);
    const row = document.createElement('tr');
    const crecimiento = inst.crecimiento_cartera_12m || inst.crecimiento_patrimonial_12m || 'N/D';
    row.innerHTML = `
      <td>${inst.nombre_corto || inst.nombre}</td>
      <td class="num" data-value="${inst.roa ?? ''}">${inst.roa != null ? inst.roa + '%' : 'N/D'}</td>
      <td class="num" data-value="${inst.roe ?? ''}">${inst.roe != null ? inst.roe + '%' : 'N/D'}</td>
      <td class="num" data-value="${inst.cir ?? ''}">${inst.cir != null ? inst.cir : 'N/D'}</td>
      <td class="num" data-value="${inst.solvencia}">${inst.solvencia}%</td>
      <td class="num">${typeof crecimiento === 'number' ? crecimiento + '%' : crecimiento}</td>
      <td><span class="status-indicator status-indicator--${semaforo.class}">${semaforo.text}</span></td>
    `;
    tbody.appendChild(row);
  });
}

function createRadarChart() {
  const canvas = document.getElementById('radarChart');
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');
  if (STATE.charts.radarChart) STATE.charts.radarChart.destroy();

  const samples = [STATE.bancos[0], STATE.cooperativas[0], STATE.bancos[1]].filter(Boolean);
  const colors = [
    cssVar('--color-primary') || '#21808D',
    cssVar('--color-warning') || '#A84B2F',
    cssVar('--color-error') || '#C0152F'
  ];

  STATE.charts.radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['ROA', 'ROE', 'Eficiencia', 'Solvencia', 'Liquidez'],
      datasets: samples.map((inst, i) => ({
        label: inst.nombre_corto || inst.nombre.split(' ')[0],
        data: [inst.roa || 0, inst.roe || 0, 100 - (inst.cir || 50), inst.solvencia || 0, inst.liquidez || 0],
        backgroundColor: hexToRgba(colors[i], 0.2),
        borderColor: colors[i],
        pointBackgroundColor: colors[i],
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2
      }))
    },
    options: chartTheme({
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 50,
          ticks: { stepSize: 10 },
          pointLabels: { color: cssVar('--color-text') || '#13343B' }
        }
      },
      plugins: { title: { display: true, text: 'Comparación Multidimensional' } }
    })
  });
}

function hexToRgba(color, alpha) {
  if (!color) return `rgba(0, 0, 0, ${alpha})`;
  // Soporta rgb()/rgba() devueltos por getComputedStyle y hex
  const rgbMatch = String(color).match(/[\d.]+/g);
  if (rgbMatch && rgbMatch.length >= 3) {
    return `rgba(${rgbMatch[0]}, ${rgbMatch[1]}, ${rgbMatch[2]}, ${alpha})`;
  }
  const m = String(color).replace('#', '');
  if (m.length === 3) {
    const r = parseInt(m[0] + m[0], 16);
    const g = parseInt(m[1] + m[1], 16);
    const b = parseInt(m[2] + m[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (m.length === 6) {
    const r = parseInt(m.substring(0, 2), 16);
    const g = parseInt(m.substring(2, 4), 16);
    const b = parseInt(m.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(0, 0, 0, ${alpha})`;
}

// ── Módulo de Crédito ────────────────────────────────────────────
function buildCreditProducts() {
  STATE.creditProducts = [];
  const container = document.getElementById('credit-products');
  if (!container) return;

  STATE.bancos.forEach(b => {
    if (b.productos_credito) {
      Object.entries(b.productos_credito).forEach(([tipo, p]) => {
        STATE.creditProducts.push({ ...p, tipo, institucion: b.nombre, tipoInstitucion: 'Banco', calificacion: b.calificacion });
      });
    }
  });
  STATE.cooperativas.forEach(c => {
    if (c.productos_credito) {
      Object.entries(c.productos_credito).forEach(([tipo, p]) => {
        STATE.creditProducts.push({ ...p, tipo, institucion: c.nombre_corto || c.nombre, tipoInstitucion: 'Cooperativa', calificacion: c.calificacion });
      });
    }
  });

  renderCreditProducts(STATE.creditProducts);
}

function renderCreditProducts(products) {
  const container = document.getElementById('credit-products');
  if (!container) return;
  container.innerHTML = '';

  if (!products.length) {
    container.innerHTML = '<p class="empty-state">No hay productos que coincidan con los filtros seleccionados.</p>';
    return;
  }

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'credit-product';
    card.innerHTML = `
      <div class="product-header">
        <div>
          <div class="product-title">${p.institucion}</div>
          <div class="product-type">${formatProductType(p.tipo)}</div>
        </div>
        <span class="status-indicator status-indicator--${getRatingClass(p.calificacion)}">${p.calificacion}</span>
      </div>
      <div class="product-details">
        <div class="detail-item"><span class="detail-label">Monto:</span><span class="detail-value">$${fmtNum(p.monto_min)} – $${fmtNum(p.monto_max)}</span></div>
        <div class="detail-item"><span class="detail-label">Tasa:</span><span class="detail-value">${p.tasa_min}% – ${p.tasa_max}%</span></div>
        <div class="detail-item"><span class="detail-label">Plazo máx.:</span><span class="detail-value">${p.plazo_max_meses} meses</span></div>
        ${p.financiamiento_max ? `<div class="detail-item"><span class="detail-label">Financiamiento:</span><span class="detail-value">Hasta ${p.financiamiento_max}%</span></div>` : ''}
        ${p.ventajas ? `<div class="detail-item"><span class="detail-label">Ventajas:</span><span class="detail-value">${p.ventajas.slice(0, 2).join(', ')}</span></div>` : ''}
      </div>
      <button class="btn btn--primary btn--full-width" data-institucion="${p.institucion}" data-tasa-min="${p.tasa_min}" data-tasa-max="${p.tasa_max}" data-monto-max="${p.monto_max}">Calcular cuota</button>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => calculateMonthly(p.institucion, p.tasa_min, p.tasa_max, p.monto_max));
    container.appendChild(card);
  });
}

function filterCreditProducts() {
  const type = document.getElementById('credit-type')?.value || 'all';
  const amount = parseFloat(document.getElementById('credit-amount')?.value) || 0;
  const term = parseInt(document.getElementById('credit-term')?.value) || 0;

  let filtered = STATE.creditProducts;
  if (type !== 'all') {
    filtered = filtered.filter(p => p.tipo === type);
  }
  if (amount > 0) {
    filtered = filtered.filter(p => p.monto_min <= amount && p.monto_max >= amount);
  }
  if (term > 0) {
    filtered = filtered.filter(p => p.plazo_max_meses >= term);
  }

  renderCreditProducts(filtered);
}

function calculateMonthly(institucion, tasaMin, tasaMax, montoMax) {
  const amount = parseFloat(document.getElementById('credit-amount')?.value) || 10000;
  const term = parseInt(document.getElementById('credit-term')?.value) || 24;
  const tasaMedia = (tasaMin + tasaMax) / 2;
  const tasaMensual = tasaMedia / 100 / 12;

  let cuota = 0;
  if (tasaMensual > 0) {
    cuota = amount * (tasaMensual * Math.pow(1 + tasaMensual, term)) / (Math.pow(1 + tasaMensual, term) - 1);
  } else {
    cuota = amount / term;
  }

  const resultado = document.getElementById('calculator-result');
  if (resultado) {
    resultado.innerHTML = `
      <div class="calc-result__institution">${institucion}</div>
      <div class="calc-result__amount">$${fmtNum(cuota, 2)} <span class="calc-result__amount-label">/ mes</span></div>
      <div class="calc-result__meta">Monto: $${fmtNum(amount)} | Plazo: ${term} meses | Tasa referencial: ${tasaMin}% – ${tasaMax}%</div>
      <div class="calc-result__disclaimer">⚠️ Esta es una estimación. Solicita una proforma oficial en la institución.</div>
    `;
  }
}

function formatProductType(tipo) {
  const map = {
    consumo: 'Consumo',
    hipotecario: 'Hipotecario',
    pyme: 'PYME',
    microcredito: 'Microcrédito',
    credipymes: 'CrediPYMES',
    agropecuario: 'Agropecuario',
    vivienda: 'Vivienda',
    consumo_policial: 'Consumo Policial',
    consumo_general: 'Consumo General',
    emergencia: 'Emergencia'
  };
  return map[tipo] || tipo;
}

// ── Comparador ───────────────────────────────────────────────────
function setupComparator() {
  const selects = ['compare-1', 'compare-2', 'compare-3'];
  selects.forEach(sid => {
    const sel = document.getElementById(sid);
    if (!sel) return;
    sel.innerHTML = '<option value="">Seleccionar...</option>';

    const grupoBanco = document.createElement('optgroup');
    grupoBanco.label = '🏦 Bancos';
    STATE.bancos.forEach(b => {
      grupoBanco.appendChild(new Option(b.nombre, `banco-${b.id}`));
    });
    sel.appendChild(grupoBanco);

    const grupoCoop = document.createElement('optgroup');
    grupoCoop.label = '🏢 Cooperativas';
    STATE.cooperativas.forEach(c => {
      grupoCoop.appendChild(new Option(c.nombre_corto || c.nombre, `coop-${c.id}`));
    });
    sel.appendChild(grupoCoop);
  });

  const placeholder = document.getElementById('comparison-result');
  if (placeholder) {
    placeholder.innerHTML = `<div class="comparison-placeholder">
      <p><strong>¿Cómo usar el comparador?</strong></p>
      <ol>
        <li>Elige entre 2 y 3 instituciones (bancos o cooperativas).</li>
        <li>Haz clic en «Generar Comparación».</li>
        <li>Revisa la tabla y las recomendaciones informativas.</li>
      </ol>
    </div>`;
  }
}

function generateComparison() {
  const container = document.getElementById('comparison-result');
  const recs = document.getElementById('recommendations');
  if (!container) return;

  const selected = [];
  ['compare-1', 'compare-2', 'compare-3'].forEach(sid => {
    const val = document.getElementById(sid)?.value;
    if (!val) return;
    const [tipo, idStr] = val.split('-');
    const id = parseInt(idStr);
    const list = tipo === 'banco' ? STATE.bancos : STATE.cooperativas;
    const inst = list.find(i => i.id === id);
    if (inst) selected.push({ ...inst, tipo_institucion: tipo === 'banco' ? 'Banco' : 'Cooperativa' });
  });

  if (selected.length < 2) {
    container.innerHTML = '<p class="empty-state">Selecciona al menos 2 instituciones para comparar.</p>';
    if (recs) recs.innerHTML = '';
    return;
  }

  // Evitar instituciones duplicadas
  const nombres = selected.map(s => s.id);
  if (new Set(nombres).size !== nombres.length) {
    container.innerHTML = '<p class="empty-state">⚠️ Has seleccionado la misma institución más de una vez. Elige instituciones distintas.</p>';
    if (recs) recs.innerHTML = '';
    return;
  }

  const indicadores = [
    { key: 'activos_mill', label: 'Activos (MM USD)', format: v => '$' + fmtNum(v) },
    { key: 'calificacion', label: 'Calificación', format: v => v },
    { key: 'solvencia', label: 'Solvencia %', format: v => v + '%' },
    { key: 'morosidad', label: 'Morosidad %', format: v => v + '%' },
    { key: 'liquidez', label: 'Liquidez %', format: v => v + '%' },
    { key: 'roa', label: 'ROA %', format: v => (v != null ? v + '%' : 'N/D') },
    { key: 'roe', label: 'ROE %', format: v => (v != null ? v + '%' : 'N/D') },
    { key: 'cobertura', label: 'Cobertura %', format: v => (v != null ? v + '%' : 'N/D') }
  ];

  let html = '<div class="table-container"><table class="comparison-table"><thead><tr><th scope="col">Indicador</th>';
  selected.forEach(s => { html += `<th scope="col">${s.nombre_corto || s.nombre}</th>`; });
  html += '</tr></thead><tbody>';

  indicadores.forEach(ind => {
    html += `<tr><td><strong>${ind.label}</strong></td>`;
    const values = selected.map(s => s[ind.key]).filter(v => v != null);
    const best = ind.key === 'morosidad'
      ? (values.length ? Math.min(...values) : null)
      : (values.length ? Math.max(...values) : null);

    selected.forEach(s => {
      const val = s[ind.key];
      const isBest = val != null && best != null && val === best;
      html += `<td${isBest ? ' class="is-best"' : ''}>${ind.format(val)}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table></div>';
  container.innerHTML = html;

  if (recs) {
    const mejorSolvencia = selected.reduce((a, b) => (a.solvencia > b.solvencia) ? a : b);
    const mejorRentabilidad = selected.reduce((a, b) => ((a.roa || 0) > (b.roa || 0)) ? a : b);
    const mejorMorosidad = selected.reduce((a, b) => ((a.morosidad || 999) < (b.morosidad || 999)) ? a : b);
    recs.innerHTML = `
      <h3>📊 Análisis Comparativo</h3>
      <div class="recommendation-item">
        <strong>Mayor solvencia:</strong> ${mejorSolvencia.nombre_corto || mejorSolvencia.nombre} (${mejorSolvencia.solvencia}%)
        — Indica mayor capacidad para absorber pérdidas.
      </div>
      <div class="recommendation-item">
        <strong>Mayor rentabilidad (ROA):</strong> ${mejorRentabilidad.nombre_corto || mejorRentabilidad.nombre} (${mejorRentabilidad.roa || 'N/D'}%)
        — Indica mejor uso de activos para generar utilidades.
      </div>
      <div class="recommendation-item">
        <strong>Menor morosidad:</strong> ${mejorMorosidad.nombre_corto || mejorMorosidad.nombre} (${mejorMorosidad.morosidad}%)
        — Indica mejor calidad de la cartera de crédito.
      </div>
      <p class="recommendations__disclaimer">
        ⚠️ Este análisis es informativo. No constituye recomendación de inversión.
      </p>
    `;
  }
}

// ── Detalles de Institución (Modal) ──────────────────────────────
function showInstitutionDetails(tipo, id) {
  const list = tipo === 'banco' ? STATE.bancos : STATE.cooperativas;
  const inst = list.find(i => i.id === id);
  if (!inst) return;

  const modal = document.getElementById('institution-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  if (!modal || !title || !body) return;

  title.textContent = inst.nombre;

  let productosHTML = '';
  if (inst.productos_credito) {
    productosHTML = Object.entries(inst.productos_credito).map(([tipo, p]) => `
      <div class="modal-product-card">
        <h5>${formatProductType(tipo)}</h5>
        <p><strong>Monto:</strong> $${fmtNum(p.monto_min)} – $${fmtNum(p.monto_max)}</p>
        <p><strong>Tasa:</strong> ${p.tasa_min}% – ${p.tasa_max}%</p>
        <p><strong>Plazo:</strong> Hasta ${p.plazo_max_meses} meses</p>
        ${p.ventajas ? `<p><strong>Ventajas:</strong> ${p.ventajas.join(', ')}</p>` : ''}
      </div>
    `).join('');
  }

  body.innerHTML = `
    <div class="modal-grid">
      <div>
        <h4>📈 Indicadores Financieros</h4>
        <p><strong>Activos:</strong> $${fmtNum(inst.activos_mill)} millones</p>
        <p><strong>Calificación:</strong> <span class="status-indicator status-indicator--${getRatingClass(inst.calificacion)}">${inst.calificacion}</span></p>
        <p><strong>Solvencia:</strong> ${inst.solvencia}%</p>
        <p><strong>Morosidad:</strong> ${inst.morosidad}%</p>
        <p><strong>ROA:</strong> ${inst.roa != null ? inst.roa + '%' : 'N/D'}</p>
        <p><strong>ROE:</strong> ${inst.roe != null ? inst.roe + '%' : 'N/D'}</p>
        <p><strong>Liquidez:</strong> ${inst.liquidez}%</p>
      </div>
      <div>
        <h4>ℹ️ Información General</h4>
        <p><strong>Estado:</strong> ${inst.estado}</p>
        <p><strong>Supervisión:</strong> ${inst.supervision}</p>
        ${inst.socios_aprox ? `<p><strong>Socios:</strong> ${fmtNum(inst.socios_aprox)}</p>` : ''}
        ${inst.provincia ? `<p><strong>Provincia:</strong> ${inst.provincia}</p>` : ''}
        ${inst.website ? `<p><strong>Sitio web:</strong> <a href="${inst.website}" target="_blank" rel="noopener">Visitar</a></p>` : ''}
      </div>
    </div>
    ${productosHTML ? `<div class="modal-products"><h4>💳 Productos de Crédito</h4>${productosHTML}</div>` : ''}
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  STATE.lastFocused = document.activeElement;
  const content = modal.querySelector('.modal__content');
  if (content) {
    content.setAttribute('tabindex', '-1');
    content.focus();
  }
}

function closeModal() {
  const modal = document.getElementById('institution-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  if (STATE.lastFocused && typeof STATE.lastFocused.focus === 'function') {
    STATE.lastFocused.focus();
  }
}

function trapModalFocus(e) {
  const modal = document.getElementById('institution-modal');
  const focusables = modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

// ── Simulador de Diversificación ─────────────────────────────────
function simulateDiversification() {
  const total = parseFloat(document.getElementById('total-amount')?.value) || 0;
  const container = document.getElementById('simulation-result');
  if (!container || total <= 0) {
    if (container) container.innerHTML = '<p class="empty-state">Ingresa un monto válido para simular.</p>';
    return;
  }

  const limiteCOSEDE = STATE.indicadores?.sistema?.seguro_depósitos || 32000;
  const numInstituciones = Math.max(1, Math.ceil(total / limiteCOSEDE));
  const montoPorInstitucion = total / numInstituciones;

  const topBancos = [...STATE.bancos].sort((a, b) => b.solvencia - a.solvencia).slice(0, Math.ceil(numInstituciones / 2));
  const topCoops = [...STATE.cooperativas].sort((a, b) => b.solvencia - a.solvencia).slice(0, Math.floor(numInstituciones / 2));

  container.innerHTML = `
    <h4>📋 Plan de Diversificación Sugerido</h4>
    <p>Monto total: <strong>$${fmtNum(total)}</strong></p>
    <p>Límite COSEDE por cuenta: <strong>$${fmtNum(limiteCOSEDE)}</strong></p>
    <p>Instituciones recomendadas: <strong>${numInstituciones}</strong></p>
    <p>Monto por institución: <strong>$${fmtNum(Math.round(montoPorInstitucion))}</strong></p>
    <div class="sim-result__section">
      <h5>🏦 Bancos sugeridos (mayor solvencia):</h5>
      <ul class="sim-result__list">${topBancos.map(b => `<li>${b.nombre} — Solvencia: ${b.solvencia}% | Calificación: ${b.calificacion}</li>`).join('')}</ul>
      ${topCoops.length ? `<h5>🏢 Cooperativas sugeridas:</h5><ul class="sim-result__list">${topCoops.map(c => `<li>${c.nombre_corto || c.nombre} — Solvencia: ${c.solvencia}% | Calificación: ${c.calificacion}</li>`).join('')}</ul>` : ''}
    </div>
    <p class="sim-result__hint">
      ⚠️ Esta simulación es solo una referencia educativa. Consulta con un asesor financiero antes de tomar decisiones de inversión.
    </p>
  `;
}

// ── Guía para el Público ────────────────────────────────────────
function loadGuiaContent() {
  const container = document.querySelector('#guia .guia-grid');
  if (!container) return;

  const secciones = [
    {
      icon: '🏦',
      title: '¿Qué es un banco?',
      text: 'Institución financiera con fines de lucro, regulada por la Superintendencia de Bancos. Ofrece cuentas, créditos, inversiones y más servicios. Sus depósitos están asegurados por la COSEDE hasta $32,000 por persona.'
    },
    {
      icon: '🏢',
      title: '¿Qué es una cooperativa?',
      text: 'Organización sin fines de lucro propiedad de sus socios. Regulada por la SEPS. Suele ofrecer tasas preferenciales a sus miembros y tiene un enfoque más social y comunitario. También cubierta por COSEDE.'
    },
    {
      icon: '📊',
      title: '¿Qué es la solvencia?',
      text: 'Mide la capacidad de una institución para absorber pérdidas. El mínimo regulatorio en Ecuador es 9%. Una solvencia más alta indica mayor respaldo patrimonial. Bancos y cooperativas por encima de 14% se consideran bien capitalizados.'
    },
    {
      icon: '⚠️',
      title: '¿Qué es la morosidad?',
      text: 'Porcentaje de créditos que no se están pagando a tiempo. Una morosidad baja (<3% en bancos, <6% en cooperativas) indica buena calidad de cartera. Morosidad alta puede ser señal de problemas futuros.'
    },
    {
      icon: '💰',
      title: 'ROA y ROE',
      text: 'El ROA (Return on Assets) mide cuánta ganancia genera cada dólar de activos. El ROE (Return on Equity) mide el retorno para los accionistas o socios. Números positivos y estables son una buena señal de rentabilidad.'
    },
    {
      icon: '🛡️',
      title: 'Seguro de Depósitos (COSEDE)',
      text: 'La Corporación del Seguro de Depósitos protege hasta $32,000 por persona por institución. Si una entidad quiebra, COSEDE devuelve ese monto. Por eso se recomienda diversificar: no poner más de $32,000 en una sola institución.'
    },
    {
      icon: '🔍',
      title: '¿Cómo usar este comparador?',
      text: 'Explora las pestañas para ver indicadores. Usa el buscador para encontrar instituciones específicas. Compara hasta 3 entidades en el Comparador. Revisa la sección de Crédito para simular préstamos. La alerta CREA muestra lecciones de casos reales.'
    },
    {
      icon: '📝',
      title: 'Calificaciones de riesgo',
      text: 'Las calificadoras evalúan la salud financiera de cada institución: AAA (máxima), AA+, AA, AA-, A+, A, A-, y así sucesivamente. Prefiere instituciones con calificación A o superior para mayor tranquilidad.'
    },
    {
      icon: '🏠',
      title: 'Créditos: conceptos clave',
      text: 'Tasa de interés: costo anual del préstamo. Plazo: tiempo para pagar. Cuota mensual: pago fijo que incluye capital + intereses. A mayor plazo, menor cuota pero más intereses totales. Compara la Tasa Anual Efectiva (TAE) para decidir.'
    },
    {
      icon: '📚',
      title: 'Fuentes oficiales',
      text: 'Superintendencia de Bancos (superbancos.gob.ec), SEPS (seps.gob.ec), Banco Central (bce.fin.ec), COSEDE (cosede.fin.ec). Siempre verifica información en fuentes oficiales antes de tomar decisiones financieras importantes.'
    }
  ];

  container.innerHTML = secciones.map(s => `
    <div class="guia-card">
      <div class="guia-card__icon">${s.icon}</div>
      <h4>${s.title}</h4>
      <p>${s.text}</p>
    </div>
  `).join('');
}

// ── Utilidades ────────────────────────────────────────────────────
function getRatingClass(calif) {
  if (!calif) return 'neutral';
  if (calif.startsWith('AA+') || calif.startsWith('AA')) return 'excellent';
  if (calif.startsWith('A')) return 'good';
  return 'warning';
}

function getSemaforoRating(inst) {
  const score =
    (inst.solvencia >= 14 ? 3 : inst.solvencia >= 11 ? 2 : 1) +
    (inst.morosidad <= 3.5 ? 3 : inst.morosidad <= 6 ? 2 : 1) +
    ((inst.roa || 0) >= 1 ? 2 : 1);

  if (score >= 7) return { class: 'excellent', text: '🟢 Favorable' };
  if (score >= 5) return { class: 'good', text: '🟡 Precaución' };
  return { class: 'warning', text: '🔴 Revisar' };
}

// ── Tema Claro/Oscuro ──────────────────────────────────────────
function applyTheme(theme) {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  STATE.currentTheme = theme;

  if (theme === 'dark') {
    root.setAttribute('data-color-scheme', 'dark');
    if (btn) {
      btn.textContent = '☀️ Modo Claro';
      btn.setAttribute('aria-pressed', 'true');
    }
  } else {
    root.setAttribute('data-color-scheme', 'light');
    if (btn) {
      btn.textContent = '🌙 Modo Oscuro';
      btn.setAttribute('aria-pressed', 'false');
    }
  }

  // Refrescar colores por defecto de Chart.js con el tema activo
  if (typeof Chart !== 'undefined') {
    Chart.defaults.color = cssVar('--color-text-secondary') || '#626C71';
  }

  // Recrear gráficos visibles con los colores del tema
  setTimeout(() => {
    const active = document.querySelector('.tab-content.active')?.id;
    if (active === 'dashboard') {
      createSectorsChart();
      createIndicatorsChart();
    } else if (active === 'indicadores') {
      createRadarChart();
    }
  }, 50);
}

function toggleTheme() {
  applyTheme(STATE.currentTheme === 'light' ? 'dark' : 'light');
  try {
    localStorage.setItem('cf-theme', STATE.currentTheme);
  } catch (e) { /* sin almacenamiento disponible */ }
}

function setupThemeToggle() {
  let saved = null;
  try {
    saved = localStorage.getItem('cf-theme');
  } catch (e) { /* ignore */ }

  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (systemDark ? 'dark' : 'light'));
}
