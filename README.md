# Comparador Financiero Ecuador 2026 🇪🇨

Aplicación web para comparar bancos y cooperativas de Ecuador con enfoque en educación financiera para el público general.

**[Ver aplicación →](https://jordanvt18.github.io/bancos-cooperativas-ecuador/)**

## 🎯 Objetivo

Entregar una herramienta informativa y educativa para que cualquier persona pueda evaluar instituciones financieras ecuatorianas, entendiendo indicadores clave como:

- **Solvencia** — capacidad de absorber pérdidas
- **Morosidad** — calidad de la cartera de crédito
- **Liquidez** — disponibilidad de efectivo
- **Cobertura** — protección ante cartera vencida
- **Rentabilidad** — ROA y ROE
- **Calificación de riesgo** — evaluación por calificadoras

## 📊 Funcionalidades

| Sección | Descripción |
|---------|-------------|
| 📊 **Dashboard** | Indicadores agregados del sistema financiero con gráficos interactivos |
| 🏦 **Bancos** | Tabla comparativa de los principales bancos con ordenamiento por columnas |
| 🏢 **Cooperativas** | Tabla del sector cooperativo (segmento 1) con datos de socios |
| 📈 **Indicadores Avanzados** | ROA, ROE, CIR, solvencia y semáforo de riesgo + gráfico radar |
| 💳 **Crédito** | Mercado de productos crediticios con calculadora de cuotas |
| ⚖️ **Comparador** | Comparación lado a lado de hasta 3 instituciones |
| 🚨 **Alertas CREA** | Lecciones del caso de liquidación de la Cooperativa CREA (2025) |
| 📚 **Guía** | Conceptos clave explicados para el público general |
| 🔍 **Búsqueda** | Filtro instantáneo en todas las tablas |
| 🌙 **Modo oscuro** | Tema claro/oscuro con detección automática |

## 📁 Estructura del Proyecto

```
bancos-cooperativas-ecuador/
├── index.html              # Aplicación principal
├── app.js                  # Lógica de la aplicación
├── style.css               # Estilos (incluye print y responsive)
├── data/
│   ├── bancos.json         # Datos de bancos (10 instituciones)
│   ├── cooperativas.json   # Datos de cooperativas (7 instituciones)
│   ├── indicadores_sistema.json  # Métricas agregadas del sistema
│   └── monthly/            # Backups mensuales
├── scripts/
│   ├── update_data.py      # Script de actualización automática
│   └── validate_data.py    # Validación de consistencia
└── assets/
    └── charts/             # Datos históricos para gráficos
```

## 📅 Datos y Alcance

- **Corte actual:** 2026-03-31
- **Bancos incluidos:** 10 (principales del sistema)
- **Cooperativas incluidas:** 7 (segmento 1)
- **Fuentes:** Superintendencia de Bancos, SEPS, BCE
- **Seguro de depósitos COSEDE:** $32,000 por persona por institución

⚠️ **Los datos son aproximados con fines informativos.** Para decisiones de inversión definitivas, verifica siempre con publicaciones oficiales.

## 🚀 Ejecución Local

```bash
# Clonar el repositorio
git clone https://github.com/jordanvt18/bancos-cooperativas-ecuador.git
cd bancos-cooperativas-ecuador

# Opción 1: Servidor Python
python -m http.server 8000

# Opción 2: Servidor Node.js
npx serve .

# Opción 3: Abrir directamente
# Arrastra index.html a tu navegador
```

## 🌐 Despliegue

El proyecto está configurado para GitHub Pages:

1. Ve a Settings → Pages en el repositorio
2. Selecciona la rama `main` y carpeta `/ (root)`
3. Click Save — la app estará disponible en `https://jordanvt18.github.io/bancos-cooperativas-ecuador/`

## 📝 Nota Metodológica

Este repositorio usa una serie de datos mantenida dentro del proyecto. Los datos se actualizan manualmente con cada corte trimestral publicado por los organismos de control.

Para validación regulatoria formal o decisiones de inversión definitivas, contrasta siempre con publicaciones oficiales de:
- [Superintendencia de Bancos](https://www.superbancos.gob.ec/)
- [SEPS](https://www.seps.gob.ec/)
- [Banco Central del Ecuador](https://www.bce.fin.ec/)
- [COSEDE](https://www.cosede.fin.ec/)

## ⚖️ Aviso Legal

Este contenido se comparte con fines **exclusivamente informativos y educativos**. No constituye recomendación, asesoría ni invitación a invertir en bancos o cooperativas específicas.

## 📄 Licencia

MIT — © 2026 Jordan VT
