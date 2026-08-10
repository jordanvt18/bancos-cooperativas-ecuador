'use strict';

/* ================================================================
   Comparador Financiero Ecuador 2026 — app.js
   Carga datos desde archivos JSON, renderiza tablas, gráficos,
   comparador, simulador y módulo de crédito.
   ================================================================ */

// ── Estado global ────────────────────────────────────────────────
const STATE = {
  bancos: [],
  cooperativas: [],
  indicadores: null,
  currentTheme: 'light',
  charts: {},
  searchTerm: '',
  creditProducts: []
};

// ── Inicialización ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
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
  loadGuiaContent();
  updateLastUpdated();
});

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

// ── Navegación por pestañas ─────────────────────────────────────
function setupTabNavigation() {
  document.querySelectorAll('.nav__tab').forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      const targetTab = this.dataset.tab;

      document.querySelectorAll('.nav__tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      const target = document.getElementById(targetTab);
      if (target) {
        target.classList.add('active');
        if (targetTab === 'dashboard') loadDashboard();
        if (targetTab === 'indicadores') setTimeout(() => createRadarChart(), 150);
        if (targetTab === 'credito') buildCreditProducts();
      }

      // Cerrar menú móvil
      document.getElementById('nav-menu')?.classList.remove('nav__menu--open');
    });
  });

  // Menú hamburguesa
  const hamburger = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('nav__menu--open');
    });
  }
}

// ── Búsqueda global ─────────────────────────────────────────────
function setupSearch() {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', debounce(function () {
    STATE.searchTerm = this.value.toLowerCase().trim();
    loadBancosTable();
    loadCooperativasTable();
    loadIndicatorsTable();
  }, 250));
}

function matchesSearch(nombre) {
  if (!STATE.searchTerm) return true;
  return nombre.toLowerCase().includes(STATE.searchTerm);
}

function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

// ── Event Listeners ─────────────────────────────────────────────
function setupEventListeners() {
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  const modal = document.getElementById('institution-modal');
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => {
    if (e.target.classList.contains('modal__backdrop')) closeModal();
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
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (STATE.charts.sectorsChart) STATE.charts.sectorsChart.destroy();

  const ind = STATE.indicadores?.sistema || {};
  const totalBancos = ind.total_activos || 53128.64;
  const totalCoops = (ind.total_activos && ind.instituciones) ? 61992.13 - (ind.total_activos || 53128.64) : 8863.49;

  STATE.charts.sectorsChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Bancos', 'Cooperativas'],
      datasets: [{
        data: [totalBancos, totalCoops],
        backgroundColor: ['#1FB8CD', '#FFC185'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Distribución de Activos por Sector (Millones USD)' },
        legend: { position: 'bottom' }
      }
    }
  });
}

function createIndicatorsChart() {
  const canvas = document.getElementById('indicatorsChart');
  if (!canvas) return;
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
          backgroundColor: '#1FB8CD'
        },
        {
          label: 'Cooperativas',
          data: [cp.roa_promedio || 1.56, cp.roe_promedio || 12.2, cp.solvencia_promedio || 18, cp.morosidad_promedio || 5.65, cp.liquidez_promedio || 22],
          backgroundColor: '#FFC185'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { title: { display: true, text: 'Indicadores Promedio por Sector' } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

// ── Tablas de Bancos y Cooperativas ──────────────────────────────
function loadBancosTable() {
  const tbody = document.getElementById('bancos-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filtered = STATE.bancos.filter(b => matchesSearch(b.nombre));
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="9" class="empty-state">No se encontraron bancos con "${STATE.searchTerm}"</td></tr>`;
    return;
  }

  filtered.forEach(b => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${b.nombre}</strong><div class="cell-sub">${b.calificacion}</div></td>
      <td>$${b.activos_mill.toLocaleString()}</td>
      <td><span class="status-indicator status-indicator--${getRatingClass(b.calificacion)}">${b.calificacion}</span></td>
      <td>${b.solvencia}%</td>
      <td>${b.morosidad}%</td>
      <td>${b.roa != null ? b.roa + '%' : 'N/D'}</td>
      <td>${b.roe != null ? b.roe + '%' : 'N/D'}</td>
      <td>${b.liquidez}%</td>
      <td><button class="btn btn--outline btn--sm action-btn" onclick="showInstitutionDetails('banco', ${b.id})">Ver detalles</button></td>
    `;
    tbody.appendChild(row);
  });
  setupTableSorting('bancos-table');
}

function loadCooperativasTable() {
  const tbody = document.getElementById('cooperativas-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filtered = STATE.cooperativas.filter(c => matchesSearch(c.nombre) || matchesSearch(c.nombre_corto || ''));
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="9" class="empty-state">No se encontraron cooperativas con "${STATE.searchTerm}"</td></tr>`;
    return;
  }

  filtered.forEach(c => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${c.nombre_corto || c.nombre}</strong><div class="cell-sub">${c.calificacion}</div></td>
      <td>$${c.activos_mill.toLocaleString()}</td>
      <td><span class="status-indicator status-indicator--${getRatingClass(c.calificacion)}">${c.calificacion}</span></td>
      <td>${c.solvencia}%</td>
      <td>${c.morosidad}%</td>
      <td>${c.roa != null ? c.roa + '%' : 'N/D'}</td>
      <td>${c.roe != null ? c.roe + '%' : 'N/D'}</td>
      <td>${(c.socios_aprox || 0).toLocaleString()}</td>
      <td><button class="btn btn--outline btn--sm action-btn" onclick="showInstitutionDetails('cooperativa', ${c.id})">Ver detalles</button></td>
    `;
    tbody.appendChild(row);
  });
  setupTableSorting('cooperativas-table');
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
      <td>${inst.roa != null ? inst.roa + '%' : 'N/D'}</td>
      <td>${inst.roe != null ? inst.roe + '%' : 'N/D'}</td>
      <td>${inst.cir != null ? inst.cir : 'N/D'}</td>
      <td>${inst.solvencia}%</td>
      <td>${typeof crecimiento === 'number' ? crecimiento + '%' : crecimiento}</td>
      <td><span class="status-indicator status-indicator--${semaforo.class}">${semaforo.text}</span></td>
    `;
    tbody.appendChild(row);
  });
}

function createRadarChart() {
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (STATE.charts.radarChart) STATE.charts.radarChart.destroy();

  const samples = [STATE.bancos[0], STATE.cooperativas[0], STATE.bancos[1]].filter(Boolean);
  const colors = ['31, 184, 205', '255, 193, 133', '180, 65, 60'];

  STATE.charts.radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['ROA', 'ROE', 'Eficiencia', 'Solvencia', 'Liquidez'],
      datasets: samples.map((inst, i) => ({
        label: inst.nombre_corto || inst.nombre.split(' ')[0],
        data: [inst.roa || 0, inst.roe || 0, 100 - (inst.cir || 50), inst.solvencia || 0, inst.liquidez || 0],
        backgroundColor: `rgba(${colors[i]}, 0.2)`,
        borderColor: `rgb(${colors[i]})`,
        pointBackgroundColor: `rgb(${colors[i]})`,
        borderWidth: 2
      }))
    },
    options: {
      responsive: true,
      scales: { r: { beginAtZero: true, max: 50 } },
      plugins: { title: { display: true, text: 'Comparación Multidimensional' } }
    }
  });
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
        <div class="detail-item"><span class="detail-label">Monto:</span><span class="detail-value">$${p.monto_min?.toLocaleString()} – $${p.monto_max?.toLocaleString()}</span></div>
        <div class="detail-item"><span class="detail-label">Tasa:</span><span class="detail-value">${p.tasa_min}% – ${p.tasa_max}%</span></div>
        <div class="detail-item"><span class="detail-label">Plazo máx.:</span><span class="detail-value">${p.plazo_max_meses} meses</span></div>
        ${p.financiamiento_max ? `<div class="detail-item"><span class="detail-label">Financiamiento:</span><span class="detail-value">Hasta ${p.financiamiento_max}%</span></div>` : ''}
        ${p.ventajas ? `<div class="detail-item"><span class="detail-label">Ventajas:</span><span class="detail-value">${p.ventajas.slice(0, 2).join(', ')}</span></div>` : ''}
      </div>
      <button class="btn btn--primary btn--full-width" onclick="calculateMonthly('${p.institucion}', ${p.tasa_min}, ${p.tasa_max}, ${p.monto_max})">Calcular cuota</button>
    `;
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
      <div><strong>${institucion}</strong></div>
      <div>Cuota mensual estimada: <span style="font-size: 1.5em;">$${cuota.toFixed(2)}</span></div>
      <div style="font-size: 0.85em; color: var(--color-text-secondary);">
        Monto: $${amount.toLocaleString()} | Plazo: ${term} meses | Tasa referencial: ${tasaMin}% – ${tasaMax}%
      </div>
      <div style="font-size: 0.8em; margin-top: 8px; color: var(--color-warning);">
        ⚠️ Esta es una estimación. Solicita una proforma oficial en la institución.
      </div>
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

  const indicadores = [
    { key: 'activos_mill', label: 'Activos (MM USD)', format: v => '$' + v.toLocaleString() },
    { key: 'calificacion', label: 'Calificación', format: v => v },
    { key: 'solvencia', label: 'Solvencia %', format: v => v + '%' },
    { key: 'morosidad', label: 'Morosidad %', format: v => v + '%' },
    { key: 'liquidez', label: 'Liquidez %', format: v => v + '%' },
    { key: 'roa', label: 'ROA %', format: v => (v != null ? v + '%' : 'N/D') },
    { key: 'roe', label: 'ROE %', format: v => (v != null ? v + '%' : 'N/D') },
    { key: 'cobertura', label: 'Cobertura %', format: v => v + '%' }
  ];

  let html = '<div class="table-container"><table class="comparison-table"><thead><tr><th>Indicador</th>';
  selected.forEach(s => { html += `<th>${s.nombre_corto || s.nombre}</th>`; });
  html += '</tr></thead><tbody>';

  indicadores.forEach(ind => {
    html += `<tr><td><strong>${ind.label}</strong></td>`;
    const values = selected.map(s => s[ind.key]);
    const best = ind.key === 'morosidad' ? Math.min(...values.filter(v => v != null)) : Math.max(...values.filter(v => v != null));
    selected.forEach(s => {
      const val = s[ind.key];
      const isBest = val != null && val === best;
      html += `<td style="${isBest ? 'background: var(--color-bg-3); font-weight: 600;' : ''}">${ind.format(val)}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table></div>';
  container.innerHTML = html;

  // Recomendaciones simples
  if (recs) {
    const mejorSolvencia = selected.reduce((a, b) => (a.solvencia > b.solvencia) ? a : b);
    const mejorRentabilidad = selected.reduce((a, b) => ((a.roa || 0) > (b.roa || 0)) ? a : b);
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
      <p style="margin-top: 12px; font-size: 0.85em; color: var(--color-text-secondary);">
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
        <p><strong>Monto:</strong> $${p.monto_min?.toLocaleString()} – $${p.monto_max?.toLocaleString()}</p>
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
        <p><strong>Activos:</strong> $${inst.activos_mill.toLocaleString()} millones</p>
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
        ${inst.socios_aprox ? `<p><strong>Socios:</strong> ${inst.socios_aprox.toLocaleString()}</p>` : ''}
        ${inst.provincia ? `<p><strong>Provincia:</strong> ${inst.provincia}</p>` : ''}
        ${inst.website ? `<p><strong>Sitio web:</strong> <a href="${inst.website}" target="_blank" rel="noopener">Visitar</a></p>` : ''}
      </div>
    </div>
    ${productosHTML ? `<div style="margin-top: 24px;"><h4>💳 Productos de Crédito</h4>${productosHTML}</div>` : ''}
  `;

  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('institution-modal')?.classList.add('hidden');
}

// ── Simulador de Diversificación ─────────────────────────────────
function simulateDiversification() {
  const total = parseFloat(document.getElementById('total-amount')?.value) || 0;
  const container = document.getElementById('simulation-result');
  if (!container || total <= 0) {
    if (container) container.innerHTML = '<p>Ingresa un monto válido para simular.</p>';
    return;
  }

  const limiteCOSEDE = STATE.indicadores?.sistema?.seguro_depósitos || 32000;
  const numInstituciones = Math.max(1, Math.ceil(total / limiteCOSEDE));
  const montoPorInstitucion = total / numInstituciones;

  const topBancos = [...STATE.bancos].sort((a, b) => b.solvencia - a.solvencia).slice(0, Math.ceil(numInstituciones / 2));
  const topCoops = [...STATE.cooperativas].sort((a, b) => b.solvencia - a.solvencia).slice(0, Math.floor(numInstituciones / 2));

  container.innerHTML = `
    <h4>📋 Plan de Diversificación Sugerido</h4>
    <p>Monto total: <strong>$${total.toLocaleString()}</strong></p>
    <p>Límite COSEDE por cuenta: <strong>$${limiteCOSEDE.toLocaleString()}</strong></p>
    <p>Instituciones recomendadas: <strong>${numInstituciones}</strong></p>
    <p>Monto por institución: <strong>$${montoPorInstitucion.toFixed(0).toLocaleString()}</strong></p>
    <div style="margin-top: 16px;">
      <h5>🏦 Bancos sugeridos (mayor solvencia):</h5>
      <ul>${topBancos.map(b => `<li>${b.nombre} — Solvencia: ${b.solvencia}% | Calificación: ${b.calificacion}</li>`).join('')}</ul>
      ${topCoops.length ? `<h5>🏢 Cooperativas sugeridas:</h5><ul>${topCoops.map(c => `<li>${c.nombre_corto || c.nombre} — Solvencia: ${c.solvencia}% | Calificación: ${c.calificacion}</li>`).join('')}</ul>` : ''}
    </div>
    <p style="font-size: 0.85em; color: var(--color-text-secondary); margin-top: 12px;">
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

function setupTableSorting(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  table.querySelectorAll('.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const index = Array.from(th.parentNode.children).indexOf(th);
      const isAsc = th.classList.contains('sorted-asc');

      table.querySelectorAll('.sortable').forEach(t => {
        t.classList.remove('sorted-asc', 'sorted-desc');
      });

      rows.sort((a, b) => {
        let aVal = a.children[index]?.textContent?.replace(/[$,%]/g, '').trim() || '';
        let bVal = b.children[index]?.textContent?.replace(/[$,%]/g, '').trim() || '';
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return isAsc ? bNum - aNum : aNum - bNum;
        }
        return isAsc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      });

      th.classList.add(isAsc ? 'sorted-desc' : 'sorted-asc');
      rows.forEach(row => tbody.appendChild(row));
    });
  });
}

function filterIndicators(filterType) {
  // Placeholder for future filtering (corto/largo plazo)
  console.log('Filtro de indicadores:', filterType);
}

// ── Tema Claro/Oscuro ──────────────────────────────────────────
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  if (STATE.currentTheme === 'light') {
    body.setAttribute('data-color-scheme', 'dark');
    btn.textContent = '☀️ Modo Claro';
    STATE.currentTheme = 'dark';
  } else {
    body.setAttribute('data-color-scheme', 'light');
    btn.textContent = '🌙 Modo Oscuro';
    STATE.currentTheme = 'light';
  }

  setTimeout(() => {
    Object.values(STATE.charts).forEach(c => { if (c?.update) c.update(); });
  }, 100);
}

function setupThemeToggle() {
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    toggleTheme();
  }
}
