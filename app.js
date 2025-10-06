// 
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".nav__tab");
  const contents = document.querySelectorAll(".tab-content");
  const themeToggleBtn = document.getElementById("theme-toggle");

  let bancosData = null;
  let cooperativasData = null;
  let indicadoresSistema = null;

  // Estado aplicación
  let comparadorSeleccion = [];

  // Cambiar modo claro/oscuro
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggleBtn.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Modo Claro"
      : "🌙 Modo Oscuro";
  });

  // Cambiar pestañas y cargar contenido
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");

      switch (tab.dataset.tab) {
        case "dashboard":
          renderDashboard();
          break;
        case "bancos":
          renderBancos();
          break;
        case "cooperativas":
          renderCooperativas();
          break;
        case "indicadores":
          renderIndicadores();
          break;
        case "credito":
          renderModuloCredito();
          break;
        case "comparador":
          renderComparador();
          break;
        case "alertas":
          renderAlertasCREA();
          break;
      }
    });
  });

  // Cargar los datos JSON
  async function loadData() {
    bancosData = await fetchJson("data/bancos.json");
    cooperativasData = await fetchJson("data/cooperativas.json");
    indicadoresSistema = await fetchJson("data/indicadores_sistema.json");
  }

  async function fetchJson(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error al cargar ${url}`);
      return await res.json();
    } catch (e) {
      alert("Error cargando datos. Asegúrate que los archivos JSON están disponibles.");
      console.error(e);
      return null;
    }
  }

  // Formato dinero
  function formatCurrency(num) {
    return `$${num.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  }

  // -----------------------------------
  // Renderizar Dashboard
  // -----------------------------------

  function renderDashboard() {
    if (!indicadoresSistema) {
      showLoading("dashboard");
      return;
    }
    const ds = indicadoresSistema;
    document.getElementById("dashboard-metrics").innerHTML = `
      <h2>Dashboard Financiero Ecuador 2025</h2>
      <ul>
        <li><b>Total activos bancos:</b> ${formatCurrency(ds.sistema_bancario.total_activos_millones)} millones</li>
        <li><b>Total activos cooperativas:</b> ${formatCurrency(ds.sistema_cooperativo.total_activos_millones)} millones</li>
        <li><b>Solvencia Promedio Bancos:</b> ${ds.sistema_bancario.indicadores_promedio.solvencia}%</li>
        <li><b>Solvencia Promedio Cooperativas:</b> ${ds.sistema_cooperativo.indicadores_promedio_seg1.solvencia}%</li>
        <li><b>ROA Promedio Bancos:</b> ${ds.sistema_bancario.indicadores_promedio.roa}%</li>
        <li><b>ROA Promedio Cooperativas:</b> ${ds.sistema_cooperativo.indicadores_promedio_seg1.roa}%</li>
      </ul>
    `;
  }

  // -----------------------------------
  // Renderizar bancos con indicadores
  // -----------------------------------

  function renderBancos() {
    if (!bancosData) {
      showLoading("bancos");
      return;
    }
    const container = document.getElementById("bancos");
    let html = `<h2>Bancos Privados Ecuador</h2>
    <table id="tabla-bancos" class="table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Activos</th>
        <th>Solvencia %</th>
        <th>ROA %</th>
        <th>ROE %</th>
        <th>Calificación</th>
        <th>Web</th>
        <th>Acción</th>
      </tr>
    </thead><tbody>`;

    bancosData.bancos.forEach((banco) => {
      html += `<tr>
          <td>${banco.nombre}</td>
          <td>${formatCurrency(banco.activos_mill)}</td>
          <td>${banco.solvencia.toFixed(2)}</td>
          <td>${banco.roa.toFixed(2)}</td>
          <td>${banco.roe.toFixed(2)}</td>
          <td>${banco.calificacion}</td>
          <td><a href="${banco.website}" target="_blank">Sitio</a></td>
          <td><button class="btn-select" data-id="${banco.id}" data-tipo="banco">Seleccionar</button></td>
        </tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;

    addSelectButtons();
  }

  // -----------------------------------
  // Renderizar cooperativas con indicadores
  // -----------------------------------

  function renderCooperativas() {
    if (!cooperativasData) {
      showLoading("cooperativas");
      return;
    }
    const container = document.getElementById("cooperativas");
    let html = `<h2>Cooperativas Segmento 1 Ecuador</h2>
    <table id="tabla-cooperativas" class="table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Activos</th>
        <th>Solvencia %</th>
        <th>ROA %</th>
        <th>ROE %</th>
        <th>Socios</th>
        <th>Web</th>
        <th>Acción</th>
      </tr>
    </thead><tbody>`;

    cooperativasData.cooperativas.forEach((coop) => {
      html += `<tr>
          <td>${coop.nombre}</td>
          <td>${formatCurrency(coop.activos_mill)}</td>
          <td>${coop.solvencia.toFixed(2)}</td>
          <td>${coop.roa.toFixed(2)}</td>
          <td>${coop.roe.toFixed(2)}</td>
          <td>${coop.socios_aprox.toLocaleString()}</td>
          <td><a href="${coop.website}" target="_blank">Sitio</a></td>
          <td><button class="btn-select" data-id="${coop.id}" data-tipo="cooperativa">Seleccionar</button></td>
        </tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;

    addSelectButtons();
  }

  // -----------------------------------
  // Renderizar Indicadores Avanzados
  // -----------------------------------

  function renderIndicadores() {
    if (!indicadoresSistema) {
      showLoading("indicadores");
      return;
    }
    const container = document.getElementById("indicadores");
    const ind = indicadoresSistema;

    // Ejemplo: gráfico radar ROA, ROE bancos vs cooperativas con Chart.js
    container.innerHTML = '<h2>Indicadores Avanzados</h2><canvas id="radarChart"></canvas>';

    const ctx = document.getElementById('radarChart').getContext('2d');
    const radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['ROA', 'ROE', 'Solvencia', 'Morosidad', 'Liquidez', 'CIR'],
        datasets: [{
          label: 'Bancos',
          data: [
            ind.sistema_bancario.indicadores_promedio.roa,
            ind.sistema_bancario.indicadores_promedio.roe,
            ind.sistema_bancario.indicadores_promedio.solvencia,
            ind.sistema_bancario.indicadores_promedio.morosidad,
            ind.sistema_bancario.indicadores_promedio.liquidez,
            ind.sistema_bancario.indicadores_promedio.cir ?? 50
          ],
          borderColor: 'rgba(33, 150, 243, 1)',
          backgroundColor: 'rgba(33, 150, 243, 0.3)'
        }, {
          label: 'Cooperativas',
          data: [
            ind.sistema_cooperativo.indicadores_promedio_seg1.roa,
            ind.sistema_cooperativo.indicadores_promedio_seg1.roe,
            ind.sistema_cooperativo.indicadores_promedio_seg1.solvencia,
            ind.sistema_cooperativo.indicadores_promedio_seg1.morosidad,
            ind.sistema_cooperativo.indicadores_promedio_seg1.liquidez,
            ind.sistema_cooperativo.indicadores_promedio_seg1.eficiencia_operativa ?? 70
          ],
          borderColor: 'rgba(76, 175, 80, 1)',
          backgroundColor: 'rgba(76, 175, 80, 0.3)'
        }]
      },
      options: {
        scales: { r: { beginAtZero: true } },
        responsive: true,
        plugins: { legend: { position: 'top' } }
      }
    });
  }

  // -----------------------------------
  // Renderizar Modulo de Crédito
  // -----------------------------------

  function renderModuloCredito() {
    if (!bancosData || !cooperativasData) {
      showLoading("credito");
      return;
    }
    const container = document.getElementById("credito");

    // Mostrar un listado filtrable y comparador
    let html = `<h2>Módulo Crédito</h2>
    <p>Filtra y compara productos de crédito bancarios y cooperativos.</p>
    <label for="tipo-credito-filter">Tipo de Crédito: </label>
    <select id="tipo-credito-filter">
      <option value="todos">Todos</option>
      <option value="consumo">Consumo</option>
      <option value="hipotecario">Hipotecario</option>
      <option value="pyme">PYME</option>
      <option value="microcredito">Microcrédito</option>
      <option value="agropecuario">Agropecuario</option>
      <option value="emergencia">Emergencia</option>
    </select>
    <div id="credit-products-list"></div>`;

    container.innerHTML = html;

    document.getElementById("tipo-credito-filter").addEventListener("change", function () {
      renderProductosCredito(this.value);
    });

    renderProductosCredito("todos");
  }

  // Render productos de crédito filtrados
  function renderProductosCredito(tipo) {
    const listContainer = document.getElementById("credit-products-list");
    let productos = [];

    // Extraer productos según tipo
    bancosData.bancos.forEach((b) => {
      Object.entries(b.productos_credito).forEach(([key, prod]) => {
        if (tipo === "todos" || key === tipo) {
          productos.push({
            nombre: b.nombre,
            tipo: key,
            tasa_min: prod.tasa_min,
            tasa_max: prod.tasa_max,
            monto_min: prod.monto_min,
            monto_max: prod.monto_max,
            requisitos: prod.requisitos,
            sector: "Banco"
          });
        }
      });
    });

    cooperativasData.cooperativas.forEach((c) => {
      if (!c.productos_credito) return;
      Object.entries(c.productos_credito).forEach(([key, prod]) => {
        if (tipo === "todos" || key === tipo) {
          productos.push({
            nombre: c.nombre,
            tipo: key,
            tasa_min: prod.tasa_min,
            tasa_max: prod.tasa_max,
            monto_min: prod.monto_min,
            monto_max: prod.monto_max,
            requisitos: prod.requisitos,
            sector: "Cooperativa"
          });
        }
      });
    });

    // Renderizar tabla
    let html = `<table>
    <thead><tr><th>Institución</th><th>Tipo</th><th>Monto Min</th><th>Monto Max</th><th>Tasa Min %</th><th>Tasa Max %</th><th>Requisitos</th></tr></thead><tbody>`;

    productos.forEach((p) => {
      html += `<tr>
        <td>${p.nombre} (${p.sector})</td>
        <td>${p.tipo}</td>
        <td>${formatCurrency(p.monto_min)}</td>
        <td>${formatCurrency(p.monto_max)}</td>
        <td>${p.tasa_min.toFixed(2)}</td>
        <td>${p.tasa_max.toFixed(2)}</td>
        <td>${p.requisitos.join(", ")}</td>
      </tr>`;
    });

    html += `</tbody></table>`;
    listContainer.innerHTML = html;
  }

  // -----------------------------------
  // Renderizar Comparador
  // -----------------------------------

  function renderComparador() {
    const container = document.getElementById("comparador");
    container.innerHTML = `
      <h2>Comparador de Instituciones (Funcionalidad en Desarrollo)</h2>
      <p>Permite comparar hasta 3 instituciones en detalle (bancos y cooperativas).</p>
      <p>Próximamente...</p>
    `;
  }

  // -----------------------------------
  // Renderizar Alertas CREA
  // -----------------------------------

  function renderAlertasCREA() {
    const container = document.getElementById("alertas");
    container.innerHTML = `
      <h2>Alertas Caso CREA</h2>
      <p>La cooperativa CREA fue liquidada en Julio 2025 debido a una solvencia crítica (<b>3.36%</b>, inferior al mínimo requerido <b>9%</b>), afectando a más de 75,000 socios.</p>
      <ul>
        <li>Deterioro progresivo de solvencia bajo seguimiento</li>
        <li>Alta morosidad persistente y baja cobertura</li>
        <li>Incumplimiento en planes de supervisión</li>
        <li>Importancia de diversificar inversiones para evitar impactos similares</li>
      </ul>
    `;
  }

  // Mostrar texto de carga en una pestaña
  function showLoading(tabId) {
    document.getElementById(tabId).innerHTML = "<p>Cargando datos...</p>";
  }

  // Cargar datos inicialmente
  loadData().then(() => {
    renderDashboard();
  });
});
