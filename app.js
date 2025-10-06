// Data from JSON
const appData = {
    "bancos": [
        {
            "id": 1,
            "nombre": "Banco Pichincha",
            "activos_mill": 19493,
            "patrimonio_mill": 1965.1,
            "calificacion": "AA+",
            "solvencia": 14.2,
            "morosidad": 2.8,
            "liquidez": 32.1,
            "cobertura": 215,
            "liquidez_inmediata": 22.4,
            "morosidad_consumo": 3.1,
            "morosidad_comercial": 2.2,
            "cartera_vencida": 2.8,
            "depositos_corto_plazo": 68.2,
            "roa": 0.79,
            "roe": 11.2,
            "cir": 52.3,
            "solvencia_estructural": 14.2,
            "calce_plazos": 8.5,
            "diversificacion_fondeo": 7.8,
            "crecimiento_cartera_12m": 12.5,
            "productos_credito": {
                "consumo": {
                    "monto_min": 1000,
                    "monto_max": 200000,
                    "tasa_min": 9.5,
                    "tasa_max": 12.8,
                    "plazo_max_meses": 60,
                    "requisitos": ["Cédula", "RUC/RISE", "Rol de pagos", "Cuenta corriente/ahorros"]
                },
                "hipotecario": {
                    "monto_min": 15000,
                    "monto_max": 400000,
                    "tasa_min": 7.2,
                    "tasa_max": 8.9,
                    "plazo_max_meses": 240,
                    "financiamiento_max": 80,
                    "requisitos": ["Entrada 20%", "Ingresos demostrables", "Avalúo", "Escrituras"]
                },
                "pyme": {
                    "monto_min": 5000,
                    "monto_max": 500000,
                    "tasa_min": 10.8,
                    "tasa_max": 14.2,
                    "plazo_max_meses": 48,
                    "requisitos": ["RUC activo", "Balances", "Flujo de caja", "Garantías"]
                }
            },
            "estado": "Activo",
            "supervision": "Superintendencia de Bancos",
            "website": "https://www.pichincha.com",
            "tipo": "banco"
        },
        {
            "id": 2,
            "nombre": "Banco del Pacífico",
            "activos_mill": 8960,
            "patrimonio_mill": 907.2,
            "calificacion": "AA",
            "solvencia": 13.8,
            "morosidad": 3.1,
            "liquidez": 28.9,
            "cobertura": 198,
            "liquidez_inmediata": 21.2,
            "morosidad_consumo": 3.4,
            "morosidad_comercial": 2.6,
            "cartera_vencida": 3.1,
            "depositos_corto_plazo": 71.5,
            "roa": 1.76,
            "roe": 17.42,
            "cir": 48.7,
            "solvencia_estructural": 13.8,
            "calce_plazos": 9.1,
            "diversificacion_fondeo": 8.2,
            "crecimiento_cartera_12m": 15.8,
            "productos_credito": {
                "consumo": {
                    "monto_min": 500,
                    "monto_max": 150000,
                    "tasa_min": 9.8,
                    "tasa_max": 13.5,
                    "plazo_max_meses": 60,
                    "requisitos": ["Cédula", "Ingresos", "Referencias", "Cuenta en el banco"]
                },
                "hipotecario": {
                    "monto_min": 20000,
                    "monto_max": 350000,
                    "tasa_min": 7.8,
                    "tasa_max": 9.2,
                    "plazo_max_meses": 300,
                    "financiamiento_max": 75,
                    "requisitos": ["Entrada 25%", "Estabilidad laboral", "Avalúo comercial", "Seguro hipotecario"]
                },
                "pyme": {
                    "monto_min": 3000,
                    "monto_max": 300000,
                    "tasa_min": 11.2,
                    "tasa_max": 15.1,
                    "plazo_max_meses": 60,
                    "requisitos": ["Experiencia comercial", "Estados financieros", "Plan de negocios", "Garantías reales"]
                }
            },
            "estado": "Activo",
            "supervision": "Superintendencia de Bancos",
            "website": "https://www.bancodelpacifico.com",
            "tipo": "banco"
        },
        {
            "id": 3,
            "nombre": "Banco Guayaquil",
            "activos_mill": 8728,
            "patrimonio_mill": 768.3,
            "calificacion": "AA",
            "solvencia": 13.5,
            "morosidad": 3.0,
            "liquidez": 26.7,
            "cobertura": 202,
            "liquidez_inmediata": 20.8,
            "morosidad_consumo": 3.2,
            "morosidad_comercial": 2.5,
            "cartera_vencida": 3.0,
            "depositos_corto_plazo": 69.3,
            "roa": 1.38,
            "roe": 15.63,
            "cir": 51.2,
            "solvencia_estructural": 13.5,
            "calce_plazos": 8.8,
            "diversificacion_fondeo": 7.9,
            "crecimiento_cartera_12m": 11.4,
            "productos_credito": {
                "consumo": {
                    "monto_min": 1000,
                    "monto_max": 180000,
                    "tasa_min": 10.2,
                    "tasa_max": 13.8,
                    "plazo_max_meses": 72,
                    "requisitos": ["Documento identidad", "Comprobante ingresos", "Referencias comerciales", "Cuenta activa"]
                },
                "hipotecario": {
                    "monto_min": 25000,
                    "monto_max": 450000,
                    "tasa_min": 7.5,
                    "tasa_max": 8.8,
                    "plazo_max_meses": 360,
                    "financiamiento_max": 85,
                    "requisitos": ["Entrada 15%", "Certificados ingresos", "Avalúo actualizado", "Póliza seguro"]
                },
                "pyme": {
                    "monto_min": 2000,
                    "monto_max": 400000,
                    "tasa_min": 11.5,
                    "tasa_max": 14.8,
                    "plazo_max_meses": 72,
                    "requisitos": ["RUC vigente", "Declaraciones SRI", "Balances auditados", "Experiencia sector"]
                }
            },
            "estado": "Activo",
            "supervision": "Superintendencia de Bancos",
            "website": "https://www.bancoguayaquil.com",
            "tipo": "banco"
        },
        {
            "id": 4,
            "nombre": "Produbanco",
            "activos_mill": 8200,
            "patrimonio_mill": 626.1,
            "calificacion": "AA+",
            "solvencia": 14.1,
            "morosidad": 2.9,
            "liquidez": 31.2,
            "cobertura": 220,
            "liquidez_inmediata": 23.1,
            "morosidad_consumo": 3.0,
            "morosidad_comercial": 2.4,
            "cartera_vencida": 2.9,
            "depositos_corto_plazo": 66.7,
            "roa": 0.52,
            "roe": 6.85,
            "cir": 55.8,
            "solvencia_estructural": 14.1,
            "calce_plazos": 8.2,
            "diversificacion_fondeo": 8.5,
            "crecimiento_cartera_12m": 9.8,
            "productos_credito": {
                "consumo": {
                    "monto_min": 2500,
                    "monto_max": 300000,
                    "tasa_min": 10.5,
                    "tasa_max": 13.5,
                    "plazo_max_meses": 60,
                    "requisitos": ["Cédula vigente", "Estabilidad laboral", "Ingresos demostrables", "Buen historial crediticio"]
                },
                "hipotecario": {
                    "monto_min": 30000,
                    "monto_max": 500000,
                    "tasa_min": 7.5,
                    "tasa_max": 9.0,
                    "plazo_max_meses": 240,
                    "financiamiento_max": 80,
                    "requisitos": ["Entrada 20%", "Ingresos estables", "Avalúo comercial", "Escrituras globales"]
                },
                "pyme": {
                    "monto_min": 5000,
                    "monto_max": 1000000,
                    "tasa_min": 11.0,
                    "tasa_max": 14.0,
                    "plazo_max_meses": 48,
                    "requisitos": ["RUC activo 2 años", "Estados financieros", "Flujos proyectados", "Garantías suficientes"]
                }
            },
            "estado": "Activo",
            "supervision": "Superintendencia de Bancos",
            "website": "https://www.produbanco.com.ec",
            "tipo": "banco"
        }
    ],
    "cooperativas": [
        {
            "id": 1,
            "nombre": "Juventud Ecuatoriana Progresista (JEP)",
            "nombre_corto": "JEP",
            "ruc": "0190115798001",
            "activos_mill": 3774.836,
            "patrimonio_mill": 363.4,
            "segmento": 1,
            "calificacion": "A+",
            "solvencia": 18.2,
            "morosidad": 4.8,
            "liquidez": 24.1,
            "cobertura": 195,
            "liquidez_inmediata": 18.5,
            "captaciones_corto_plazo": 78.4,
            "morosidad_consumo": 5.2,
            "morosidad_microcredito": 6.8,
            "morosidad_comercial": 3.9,
            "cartera_improductiva": 4.8,
            "roa": 1.85,
            "roe": 14.2,
            "eficiencia_operativa": 82.1,
            "solvencia_estructural": 18.2,
            "crecimiento_patrimonial_12m": 18.5,
            "crecimiento_socios_12m": 12.3,
            "diversificacion_productos": 8.7,
            "productos_credito": {
                "consumo": {
                    "monto_min": 300,
                    "monto_max": 50000,
                    "tasa_min": 12.5,
                    "tasa_max": 16.8,
                    "plazo_max_meses": 60,
                    "requisitos": ["Socio activo", "Cédula", "Certificado ingresos", "Garante personal"],
                    "ventajas": ["Trámite ágil", "Menos documentos", "Tasas preferenciales socios"]
                },
                "microcredito": {
                    "monto_min": 500,
                    "monto_max": 20000,
                    "tasa_min": 15.2,
                    "tasa_max": 22.5,
                    "plazo_max_meses": 36,
                    "requisitos": ["Actividad económica", "RUC/RISE", "Referencias comerciales", "Capacidad pago"],
                    "ventajas": ["Evaluación in situ", "Flexibilidad garantías", "Acompañamiento técnico"]
                },
                "credipymes": {
                    "monto_min": 1000,
                    "monto_max": 1000000,
                    "tasa_min": 11.33,
                    "tasa_max": 16.8,
                    "plazo_max_meses": 48,
                    "requisitos": ["RUC activo", "Balances", "Plan inversión", "Garantías reales/personales"],
                    "ventajas": ["Tasa competitiva", "Seguimiento personalizado", "Periodos gracia"]
                },
                "hipotecario": {
                    "monto_min": 10000,
                    "monto_max": 200000,
                    "tasa_min": 8.9,
                    "tasa_max": 11.5,
                    "plazo_max_meses": 180,
                    "financiamiento_max": 70,
                    "requisitos": ["Socio 6 meses", "Entrada 30%", "Avalúo", "Seguro hipotecario"],
                    "ventajas": ["Menor entrada", "Proceso personalizado", "Tasas fijas"]
                }
            },
            "estado": "Activa",
            "provincia": "Pichincha",
            "socios_aprox": 180000,
            "supervision": "SEPS",
            "website": "https://www.jep.coop",
            "tipo": "cooperativa"
        },
        {
            "id": 2,
            "nombre": "Jardín Azuayo",
            "nombre_corto": "Jardín Azuayo",
            "ruc": "0190155722001",
            "activos_mill": 2107.233,
            "patrimonio_mill": 275.1,
            "segmento": 1,
            "calificacion": "A+",
            "solvencia": 19.1,
            "morosidad": 5.2,
            "liquidez": 22.8,
            "cobertura": 188,
            "liquidez_inmediata": 17.2,
            "captaciones_corto_plazo": 82.1,
            "morosidad_consumo": 5.8,
            "morosidad_microcredito": 7.2,
            "morosidad_comercial": 4.1,
            "cartera_improductiva": 5.2,
            "roa": 2.1,
            "roe": 15.8,
            "eficiencia_operativa": 79.5,
            "solvencia_estructural": 19.1,
            "crecimiento_patrimonial_12m": 16.2,
            "crecimiento_socios_12m": 8.9,
            "diversificacion_productos": 9.2,
            "productos_credito": {
                "consumo": {
                    "monto_min": 500,
                    "monto_max": 40000,
                    "tasa_min": 13.2,
                    "tasa_max": 17.5,
                    "plazo_max_meses": 48,
                    "requisitos": ["Antigüedad socio 3 meses", "Cédula", "Rol pagos", "Garante"],
                    "ventajas": ["Tasa diferenciada socios", "Sin comisiones", "Aprobación rápida"]
                },
                "microcredito": {
                    "monto_min": 300,
                    "monto_max": 15000,
                    "tasa_min": 16.8,
                    "tasa_max": 24.2,
                    "plazo_max_meses": 24,
                    "requisitos": ["Actividad 6 meses", "Referencias", "Visita negocio", "Croquis ubicación"],
                    "ventajas": ["Metodología grupal", "Capacitación empresarial", "Renovación automática"]
                },
                "agropecuario": {
                    "monto_min": 1000,
                    "monto_max": 50000,
                    "tasa_min": 11.8,
                    "tasa_max": 16.2,
                    "plazo_max_meses": 60,
                    "requisitos": ["Actividad agropecuaria", "Título propiedad", "Asistencia técnica", "Seguro cultivos"],
                    "ventajas": ["Periodos gracia", "Pagos estacionales", "Asesoría técnica"]
                },
                "vivienda": {
                    "monto_min": 8000,
                    "monto_max": 150000,
                    "tasa_min": 9.5,
                    "tasa_max": 12.2,
                    "plazo_max_meses": 180,
                    "financiamiento_max": 80,
                    "requisitos": ["Socio 1 año", "Entrada 20%", "Avalúo", "Pólizas"],
                    "ventajas": ["Menor entrada que bancos", "Proceso ágil", "Tasas competitivas"]
                }
            },
            "estado": "Activa",
            "provincia": "Azuay",
            "socios_aprox": 140000,
            "supervision": "SEPS",
            "website": "https://www.jardinazuayo.fin.ec",
            "tipo": "cooperativa"
        },
        {
            "id": 3,
            "nombre": "Policía Nacional",
            "nombre_corto": "Policía Nacional",
            "ruc": "1790866084001",
            "activos_mill": 1523.701,
            "patrimonio_mill": 136.1,
            "segmento": 1,
            "calificacion": "A",
            "solvencia": 16.8,
            "morosidad": 4.9,
            "liquidez": 23.4,
            "cobertura": 182,
            "liquidez_inmediata": 19.8,
            "captaciones_corto_plazo": 85.6,
            "morosidad_consumo": 4.2,
            "morosidad_microcredito": 8.1,
            "morosidad_comercial": 3.8,
            "cartera_improductiva": 4.9,
            "roa": 1.2,
            "roe": 10.8,
            "eficiencia_operativa": 88.9,
            "solvencia_estructural": 16.8,
            "crecimiento_patrimonial_12m": 14.5,
            "crecimiento_socios_12m": 5.2,
            "diversificacion_productos": 6.8,
            "productos_credito": {
                "consumo_policial": {
                    "monto_min": 500,
                    "monto_max": 100000,
                    "tasa_min": 8.5,
                    "tasa_max": 12.8,
                    "plazo_max_meses": 72,
                    "requisitos": ["Miembro activo Policía", "Antigüedad", "Descuento rol", "Garante institucional"],
                    "ventajas": ["Tasas preferenciales", "Descuento automático", "Montos altos", "Sin garante externo"]
                },
                "consumo_general": {
                    "monto_min": 300,
                    "monto_max": 25000,
                    "tasa_min": 14.5,
                    "tasa_max": 18.2,
                    "plazo_max_meses": 48,
                    "requisitos": ["Socio cooperativa", "Ingresos comprobados", "Referencias", "Capacidad pago"],
                    "ventajas": ["Proceso rápido", "Requisitos flexibles", "Atención personalizada"]
                },
                "emergencia": {
                    "monto_min": 200,
                    "monto_max": 5000,
                    "tasa_min": 15.8,
                    "tasa_max": 19.5,
                    "plazo_max_meses": 24,
                    "requisitos": ["Socio activo", "Justificación emergencia", "Descuento automático"],
                    "ventajas": ["Aprobación inmediata", "Desembolso 24h", "Sin papeleos"]
                }
            },
            "estado": "Activa",
            "provincia": "Pichincha",
            "socios_aprox": 95000,
            "supervision": "SEPS",
            "website": "https://www.cooppolicianacional.fin.ec",
            "tipo": "cooperativa"
        }
    ],
    "indicadores_sistema": {
        "bancos_promedio": {
            "roa": 1.12,
            "roe": 12.8,
            "solvencia": 13.9,
            "morosidad": 2.95,
            "liquidez": 29.7,
            "cir": 52.0
        },
        "cooperativas_promedio": {
            "roa": 1.72,
            "roe": 13.6,
            "solvencia": 18.0,
            "morosidad": 4.97,
            "liquidez": 23.4,
            "eficiencia": 83.5
        },
        "sistema_general": {
            "total_activos_bancos": 45533,
            "total_activos_coops": 7405,
            "seguro_depositos": 32000,
            "instituciones_supervisadas": 157
        }
    },
    "alertas_crea": {
        "fecha_liquidacion": "2025-07-29",
        "solvencia_final": 3.36,
        "perdidas_estimadas": 189.5,
        "socios_afectados": 75211,
        "lecciones": [
            "Monitorear solvencia mensual",
            "Diversificar siempre",
            "No exceder $32,000 por institución",
            "Preferir calificaciones AA+/AA",
            "Revisar estados financieros"
        ]
    }
};

// Global variables
let currentTheme = 'light';
let charts = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupTabNavigation();
    setupEventListeners();
    loadDashboard();
    loadBancosTable();
    loadCooperativasTable();
    loadIndicatorsTable();
    loadCreditProducts();
    setupComparator();
    setupThemeToggle();
}

function setupTabNavigation() {
    document.querySelectorAll('.nav__tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetTab = this.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.nav__tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show target content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Load specific content if needed
                if (targetTab === 'dashboard') {
                    loadDashboard();
                } else if (targetTab === 'indicadores') {
                    setTimeout(() => createRadarChart(), 100);
                }
            }
        });
    });
}

function setupEventListeners() {
    // Theme toggle - separate event listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });
    }
    
    // Modal close
    const modalClose = document.getElementById('modal-close');
    const modal = document.getElementById('institution-modal');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal__backdrop')) closeModal();
        });
    }
    
    // Credit filters
    const filterCreditsBtn = document.getElementById('filter-credits');
    if (filterCreditsBtn) {
        filterCreditsBtn.addEventListener('click', filterCreditProducts);
    }
    
    // Comparator
    const generateComparisonBtn = document.getElementById('generate-comparison');
    if (generateComparisonBtn) {
        generateComparisonBtn.addEventListener('click', generateComparison);
    }
    
    // Risk simulator
    const simulateBtn = document.getElementById('simulate-diversification');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', simulateDiversification);
    }
    
    // Indicators filters
    document.querySelectorAll('.indicators-filters .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.indicators-filters .btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterIndicators(this.dataset.filter);
        });
    });
}

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
    
    if (charts.sectorsChart) {
        charts.sectorsChart.destroy();
    }
    
    charts.sectorsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Bancos', 'Cooperativas'],
            datasets: [{
                data: [
                    appData.indicadores_sistema.sistema_general.total_activos_bancos,
                    appData.indicadores_sistema.sistema_general.total_activos_coops
                ],
                backgroundColor: ['#1FB8CD', '#FFC185'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribución de Activos por Sector (Millones USD)'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createIndicatorsChart() {
    const canvas = document.getElementById('indicatorsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (charts.indicatorsChart) {
        charts.indicatorsChart.destroy();
    }
    
    charts.indicatorsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ROA', 'ROE', 'Solvencia', 'Morosidad', 'Liquidez'],
            datasets: [{
                label: 'Bancos',
                data: [
                    appData.indicadores_sistema.bancos_promedio.roa,
                    appData.indicadores_sistema.bancos_promedio.roe,
                    appData.indicadores_sistema.bancos_promedio.solvencia,
                    appData.indicadores_sistema.bancos_promedio.morosidad,
                    appData.indicadores_sistema.bancos_promedio.liquidez
                ],
                backgroundColor: '#1FB8CD'
            }, {
                label: 'Cooperativas',
                data: [
                    appData.indicadores_sistema.cooperativas_promedio.roa,
                    appData.indicadores_sistema.cooperativas_promedio.roe,
                    appData.indicadores_sistema.cooperativas_promedio.solvencia,
                    appData.indicadores_sistema.cooperativas_promedio.morosidad,
                    appData.indicadores_sistema.cooperativas_promedio.liquidez
                ],
                backgroundColor: '#FFC185'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Indicadores Promedio por Sector'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function loadBancosTable() {
    const tbody = document.getElementById('bancos-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appData.bancos.forEach(banco => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${banco.nombre}</strong>
                <div style="font-size: 0.8em; color: var(--color-text-secondary);">${banco.calificacion}</div>
            </td>
            <td>$${banco.activos_mill.toLocaleString()}</td>
            <td><span class="status-indicator status-indicator--${getRatingClass(banco.calificacion)}">${banco.calificacion}</span></td>
            <td>${banco.solvencia}%</td>
            <td>${banco.morosidad}%</td>
            <td>${banco.roa}%</td>
            <td>${banco.roe}%</td>
            <td>${banco.liquidez}%</td>
            <td>
                <button class="btn btn--outline btn--sm action-btn" onclick="showInstitutionDetails('banco', ${banco.id})">Ver detalles</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    setupTableSorting('bancos-table');
}

function loadCooperativasTable() {
    const tbody = document.getElementById('cooperativas-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appData.cooperativas.forEach(coop => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${coop.nombre_corto}</strong>
                <div style="font-size: 0.8em; color: var(--color-text-secondary);">${coop.calificacion}</div>
            </td>
            <td>$${coop.activos_mill.toLocaleString()}</td>
            <td><span class="status-indicator status-indicator--${getRatingClass(coop.calificacion)}">${coop.calificacion}</span></td>
            <td>${coop.solvencia}%</td>
            <td>${coop.morosidad}%</td>
            <td>${coop.roa}%</td>
            <td>${coop.roe}%</td>
            <td>${coop.socios_aprox.toLocaleString()}</td>
            <td>
                <button class="btn btn--outline btn--sm action-btn" onclick="showInstitutionDetails('cooperativa', ${coop.id})">Ver detalles</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    setupTableSorting('cooperativas-table');
}

function loadIndicatorsTable() {
    const tbody = document.getElementById('indicators-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const allInstitutions = [...appData.bancos, ...appData.cooperativas];
    
    allInstitutions.forEach(inst => {
        const crecimiento = inst.crecimiento_cartera_12m || inst.crecimiento_patrimonial_12m || 0;
        const semaforo = getSemaforoRating(inst);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${inst.nombre_corto || inst.nombre}</td>
            <td>${inst.roa}%</td>
            <td>${inst.roe}%</td>
            <td>${inst.cir || 'N/A'}</td>
            <td>${inst.solvencia}%</td>
            <td>${crecimiento}%</td>
            <td><span class="status-indicator status-indicator--${semaforo.class}">${semaforo.text}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function createRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (charts.radarChart) {
        charts.radarChart.destroy();
    }
    
    // Sample institutions for radar chart
    const sampleInstitutions = [
        appData.bancos[0], // Pichincha
        appData.cooperativas[0], // JEP
        appData.bancos[1] // Pacífico
    ];
    
    const datasets = sampleInstitutions.map((inst, index) => ({
        label: inst.nombre_corto || inst.nombre.split(' ')[0],
        data: [
            inst.roa,
            inst.roe,
            100 - (inst.cir || 50), // Inverted for better visualization
            inst.solvencia,
            inst.liquidez
        ],
        backgroundColor: `rgba(${['31, 184, 205', '255, 193, 133', '180, 65, 60'][index]}, 0.2)`,
        borderColor: `rgb(${['31, 184, 205', '255, 193, 133', '180, 65, 60'][index]})`,
        pointBackgroundColor: `rgb(${['31, 184, 205', '255, 193, 133', '180, 65, 60'][index]})`,
        borderWidth: 2
    }));
    
    charts.radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['ROA', 'ROE', 'Eficiencia', 'Solvencia', 'Liquidez'],
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 50
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación Multidimensional'
                }
            }
        }
    });
}

function loadCreditProducts() {
    const container = document.getElementById('credit-products');
    if (!container) return;
    
    container.innerHTML = '';
    
    const allProducts = [];
    
    // Extract products from banks
    appData.bancos.forEach(banco => {
        Object.entries(banco.productos_credito).forEach(([tipo, producto]) => {
            allProducts.push({
                institucion: banco.nombre,
                tipo: tipo,
                ...producto,
                sector: 'banco'
            });
        });
    });
    
    // Extract products from cooperatives
    appData.cooperativas.forEach(coop => {
        Object.entries(coop.productos_credito).forEach(([tipo, producto]) => {
            allProducts.push({
                institucion: coop.nombre_corto,
                tipo: tipo,
                ...producto,
                sector: 'cooperativa'
            });
        });
    });
    
    displayCreditProducts(allProducts);
}

function displayCreditProducts(products) {
    const container = document.getElementById('credit-products');
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'credit-product';
        
        const ventajas = product.ventajas ? 
            `<div class="product-advantages">
                <strong>Ventajas:</strong>
                <ul>${product.ventajas.map(v => `<li>${v}</li>`).join('')}</ul>
            </div>` : '';
        
        productCard.innerHTML = `
            <div class="product-header">
                <div class="product-title">${product.institucion}</div>
                <div class="product-type">${product.tipo}</div>
            </div>
            <div class="product-details">
                <div class="detail-item">
                    <span class="detail-label">Monto:</span>
                    <span class="detail-value">$${product.monto_min.toLocaleString()} - $${product.monto_max.toLocaleString()}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Tasa:</span>
                    <span class="detail-value">${product.tasa_min}% - ${product.tasa_max}%</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Plazo máximo:</span>
                    <span class="detail-value">${product.plazo_max_meses} meses</span>
                </div>
                ${product.financiamiento_max ? `
                <div class="detail-item">
                    <span class="detail-label">Financiamiento:</span>
                    <span class="detail-value">Hasta ${product.financiamiento_max}%</span>
                </div>
                ` : ''}
            </div>
            ${ventajas}
            <button class="apply-btn" onclick="calculateLoan(${product.monto_min}, ${product.tasa_min}, 24)">
                Calcular Cuota
            </button>
        `;
        
        container.appendChild(productCard);
    });
}

function filterCreditProducts() {
    const typeSelect = document.getElementById('credit-type');
    const amountInput = document.getElementById('credit-amount');
    const termInput = document.getElementById('credit-term');
    
    if (!typeSelect || !amountInput || !termInput) return;
    
    const type = typeSelect.value;
    const amount = parseInt(amountInput.value) || 0;
    const term = parseInt(termInput.value) || 0;
    
    const allProducts = [];
    
    // Extract and filter products
    [...appData.bancos, ...appData.cooperativas].forEach(inst => {
        Object.entries(inst.productos_credito).forEach(([tipo, producto]) => {
            if (type !== 'all' && !tipo.includes(type)) return;
            if (amount > 0 && (amount < producto.monto_min || amount > producto.monto_max)) return;
            if (term > 0 && term > producto.plazo_max_meses) return;
            
            allProducts.push({
                institucion: inst.nombre_corto || inst.nombre,
                tipo: tipo,
                ...producto,
                sector: inst.tipo
            });
        });
    });
    
    displayCreditProducts(allProducts);
}

function calculateLoan(amount, rate, term) {
    const monthlyRate = rate / 100 / 12;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                   (Math.pow(1 + monthlyRate, term) - 1);
    
    const resultDiv = document.getElementById('calculator-result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <strong>Cuota mensual estimada: $${payment.toFixed(2)}</strong><br>
            <small>Monto: $${amount.toLocaleString()} | Tasa: ${rate}% | Plazo: ${term} meses</small>
        `;
    }
}

function setupComparator() {
    const selectors = ['compare-1', 'compare-2', 'compare-3'];
    const allInstitutions = [...appData.bancos, ...appData.cooperativas];
    
    selectors.forEach(selectorId => {
        const select = document.getElementById(selectorId);
        if (!select) return;
        
        select.innerHTML = '<option value="">Seleccionar...</option>';
        
        allInstitutions.forEach(inst => {
            const option = document.createElement('option');
            option.value = `${inst.tipo}-${inst.id}`;
            option.textContent = inst.nombre_corto || inst.nombre;
            select.appendChild(option);
        });
    });
}

function generateComparison() {
    const select1 = document.getElementById('compare-1');
    const select2 = document.getElementById('compare-2');
    const select3 = document.getElementById('compare-3');
    
    if (!select1 || !select2 || !select3) return;
    
    const selections = [
        select1.value,
        select2.value,
        select3.value
    ].filter(val => val !== '');
    
    if (selections.length < 2) {
        alert('Selecciona al menos 2 instituciones para comparar');
        return;
    }
    
    const institutions = selections.map(sel => {
        const [type, id] = sel.split('-');
        const data = type === 'banco' ? appData.bancos : appData.cooperativas;
        return data.find(inst => inst.id == id);
    }).filter(Boolean);
    
    displayComparison(institutions);
    generateRecommendations(institutions);
}

function displayComparison(institutions) {
    const container = document.getElementById('comparison-result');
    if (!container) return;
    
    if (institutions.length === 0) {
        container.innerHTML = '<p>Selecciona instituciones para comparar</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'comparison-table';
    
    const headers = ['Indicador', ...institutions.map(inst => inst.nombre_corto || inst.nombre)];
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    table.appendChild(thead);
    
    const indicators = [
        ['Activos (MM)', 'activos_mill', '$'],
        ['Calificación', 'calificacion', ''],
        ['Solvencia', 'solvencia', '%'],
        ['Morosidad', 'morosidad', '%'],
        ['ROA', 'roa', '%'],
        ['ROE', 'roe', '%'],
        ['Liquidez', 'liquidez', '%']
    ];
    
    const tbody = document.createElement('tbody');
    indicators.forEach(([label, key, suffix]) => {
        const row = document.createElement('tr');
        const cells = [label, ...institutions.map(inst => {
            const value = inst[key];
            if (typeof value === 'number') {
                return suffix === '$' ? `$${value.toLocaleString()}` : `${value}${suffix}`;
            }
            return value || 'N/A';
        })];
        row.innerHTML = cells.map(cell => `<td>${cell}</td>`).join('');
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    container.innerHTML = '<h3>Comparación Detallada</h3>';
    container.appendChild(table);
}

function generateRecommendations(institutions) {
    const container = document.getElementById('recommendations');
    if (!container) return;
    
    if (institutions.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    const recommendations = [];
    
    // Find best ROA
    const bestROA = institutions.reduce((best, inst) => 
        inst.roa > best.roa ? inst : best
    );
    recommendations.push(`**Mejor ROA**: ${bestROA.nombre_corto || bestROA.nombre} con ${bestROA.roa}%`);
    
    // Find best solvency
    const bestSolvency = institutions.reduce((best, inst) => 
        inst.solvencia > best.solvencia ? inst : best
    );
    recommendations.push(`**Mayor Solvencia**: ${bestSolvency.nombre_corto || bestSolvency.nombre} con ${bestSolvency.solvencia}%`);
    
    // Find lowest delinquency
    const bestMorosidad = institutions.reduce((best, inst) => 
        inst.morosidad < best.morosidad ? inst : best
    );
    recommendations.push(`**Menor Morosidad**: ${bestMorosidad.nombre_corto || bestMorosidad.nombre} con ${bestMorosidad.morosidad}%`);
    
    container.innerHTML = `
        <h3>💡 Recomendaciones</h3>
        ${recommendations.map(rec => 
            `<div class="recommendation-item">${rec}</div>`
        ).join('')}
        <div class="recommendation-item">
            <strong>Recomendación General:</strong> Considera diversificar entre diferentes instituciones 
            y sectores para reducir el riesgo de concentración.
        </div>
    `;
}

function simulateDiversification() {
    const totalAmountInput = document.getElementById('total-amount');
    if (!totalAmountInput) return;
    
    const totalAmount = parseFloat(totalAmountInput.value);
    
    if (!totalAmount || totalAmount <= 0) {
        alert('Ingresa un monto válido para simular');
        return;
    }
    
    const resultDiv = document.getElementById('simulation-result');
    if (!resultDiv) return;
    
    const maxPerInstitution = 32000; // Seguro de depósitos
    const recommendedInstitutions = Math.ceil(totalAmount / maxPerInstitution);
    
    const topInstitutions = [
        ...appData.bancos.filter(b => ['AA+', 'AA'].includes(b.calificacion)),
        ...appData.cooperativas.filter(c => ['A+', 'A'].includes(c.calificacion))
    ].sort((a, b) => b.solvencia - a.solvencia).slice(0, recommendedInstitutions);
    
    const amountPerInstitution = Math.min(totalAmount / recommendedInstitutions, maxPerInstitution);
    
    resultDiv.innerHTML = `
        <h4>📊 Simulación de Diversificación</h4>
        <p><strong>Monto total:</strong> $${totalAmount.toLocaleString()}</p>
        <p><strong>Instituciones recomendadas:</strong> ${recommendedInstitutions}</p>
        <p><strong>Monto por institución:</strong> $${amountPerInstitution.toLocaleString()}</p>
        
        <h5>Instituciones Sugeridas:</h5>
        <ul>
            ${topInstitutions.map(inst => 
                `<li>${inst.nombre_corto || inst.nombre} (${inst.calificacion}) - $${amountPerInstitution.toLocaleString()}</li>`
            ).join('')}
        </ul>
        
        <div class="alert-card" style="margin-top: 16px; border-left-color: var(--color-success);">
            <strong>✓ Protección del seguro de depósitos:</strong> 
            ${totalAmount <= maxPerInstitution * recommendedInstitutions ? 
              'Completa' : 'Parcial - considera más instituciones'}
        </div>
    `;
}

// Utility functions
function getRatingClass(rating) {
    if (['AAA', 'AA+', 'AA'].includes(rating)) return 'excellent';
    if (['AA-', 'A+', 'A'].includes(rating)) return 'good';
    return 'warning';
}

function getSemaforoRating(institution) {
    let score = 0;
    
    // ROA scoring
    if (institution.roa >= 1.5) score += 2;
    else if (institution.roa >= 1.0) score += 1;
    
    // Solvency scoring
    if (institution.solvencia >= 15) score += 2;
    else if (institution.solvencia >= 12) score += 1;
    
    // Delinquency scoring (inverted)
    if (institution.morosidad <= 3) score += 2;
    else if (institution.morosidad <= 5) score += 1;
    
    if (score >= 5) return { class: 'excellent', text: '🟢 Excelente' };
    if (score >= 3) return { class: 'good', text: '🟡 Bueno' };
    return { class: 'warning', text: '🔴 Precaución' };
}

function setupTableSorting(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const headers = table.querySelectorAll('th.sortable');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.dataset.sort;
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            const isNumeric = ['activos_mill', 'solvencia', 'morosidad', 'roa', 'roe', 'liquidez'].includes(column);
            
            rows.sort((a, b) => {
                const aVal = a.cells[Array.from(this.parentNode.children).indexOf(this)].textContent;
                const bVal = b.cells[Array.from(this.parentNode.children).indexOf(this)].textContent;
                
                if (isNumeric) {
                    return parseFloat(bVal.replace(/[^0-9.-]/g, '')) - parseFloat(aVal.replace(/[^0-9.-]/g, ''));
                }
                
                return aVal.localeCompare(bVal);
            });
            
            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}

function showInstitutionDetails(type, id) {
    const data = type === 'banco' ? appData.bancos : appData.cooperativas;
    const institution = data.find(inst => inst.id === id);
    
    if (!institution) return;
    
    const modal = document.getElementById('institution-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    if (!modal || !title || !body) return;
    
    title.textContent = institution.nombre;
    
    const products = Object.entries(institution.productos_credito).map(([tipo, producto]) => `
        <div style="margin-bottom: 16px; padding: 12px; background: var(--color-surface); border-radius: 8px;">
            <h5 style="margin: 0 0 8px 0; color: var(--color-primary);">${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h5>
            <p style="margin: 4px 0;"><strong>Monto:</strong> $${producto.monto_min.toLocaleString()} - $${producto.monto_max.toLocaleString()}</p>
            <p style="margin: 4px 0;"><strong>Tasa:</strong> ${producto.tasa_min}% - ${producto.tasa_max}%</p>
            <p style="margin: 4px 0;"><strong>Plazo:</strong> Hasta ${producto.plazo_max_meses} meses</p>
            ${producto.ventajas ? `<p style="margin: 4px 0;"><strong>Ventajas:</strong> ${producto.ventajas.join(', ')}</p>` : ''}
        </div>
    `).join('');
    
    body.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div>
                <h4>Indicadores Financieros</h4>
                <p><strong>Activos:</strong> $${institution.activos_mill.toLocaleString()} millones</p>
                <p><strong>Calificación:</strong> ${institution.calificacion}</p>
                <p><strong>Solvencia:</strong> ${institution.solvencia}%</p>
                <p><strong>Morosidad:</strong> ${institution.morosidad}%</p>
                <p><strong>ROA:</strong> ${institution.roa}%</p>
                <p><strong>ROE:</strong> ${institution.roe}%</p>
                <p><strong>Liquidez:</strong> ${institution.liquidez}%</p>
            </div>
            <div>
                <h4>Información General</h4>
                <p><strong>Estado:</strong> ${institution.estado}</p>
                <p><strong>Supervisión:</strong> ${institution.supervision}</p>
                ${institution.socios_aprox ? `<p><strong>Socios:</strong> ${institution.socios_aprox.toLocaleString()}</p>` : ''}
                ${institution.provincia ? `<p><strong>Provincia:</strong> ${institution.provincia}</p>` : ''}
                <p><strong>Website:</strong> <a href="${institution.website}" target="_blank">Visitar</a></p>
            </div>
        </div>
        <div>
            <h4>Productos de Crédito</h4>
            ${products}
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('institution-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function filterIndicators(filterType) {
    // This would filter the indicators table based on short/long term
    console.log('Filtering indicators by:', filterType);
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    if (currentTheme === 'light') {
        body.setAttribute('data-color-scheme', 'dark');
        themeToggle.textContent = '☀️ Modo Claro';
        currentTheme = 'dark';
    } else {
        body.setAttribute('data-color-scheme', 'light');
        themeToggle.textContent = '🌙 Modo Oscuro';
        currentTheme = 'light';
    }
    
    // Refresh charts with new theme
    setTimeout(() => {
        Object.values(charts).forEach(chart => {
            if (chart && chart.update) {
                chart.update();
            }
        });
    }, 100);
}

function setupThemeToggle() {
    // Initialize theme based on system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleTheme();
    }
}