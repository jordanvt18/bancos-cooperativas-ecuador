# Comparador Financiero Ecuador 2026

Aplicacion web para comparar bancos y cooperativas de Ecuador con enfoque en inversion conservadora y renta fija.

## Objetivo

Entregar una alternativa informada para evaluar instituciones financieras, con foco en:
- Solvencia
- Morosidad
- Liquidez
- Cobertura
- Rentabilidad (ROA y ROE)

## Datos y alcance

- Corte actualizado: `2026-03-31`
- Archivos principales:
  - `data/bancos.json`
  - `data/cooperativas.json`
  - `data/bancos_expandidos.json`
  - `data/cooperativas_expandidas.json`
  - `data/indicadores_sistema.json`
- Frontend sincronizado con el mismo corte en `app.js` e `index.html`

## Funcionalidades

- Dashboard de indicadores agregados del sistema
- Tablas comparativas de bancos y cooperativas
- Modulo de credito con filtros por tipo, monto y plazo
- Comparador de instituciones con recomendaciones
- Simulador de diversificacion con referencia de cobertura COSEDE

## Validacion de datos

La actualizacion incluye validaciones de consistencia interna:
- Estructura minima por institucion
- Umbrales regulatorios basicos (solvencia minima y morosidad)
- Coherencia entre archivos simplificados y expandidos
- Coherencia entre agregados del sistema y datos por institucion

## Ejecucion local

Abrir `index.html` en navegador o publicar con GitHub Pages.

## Nota metodologica

Este repositorio usa una serie de datos mantenida dentro del proyecto.
Para validacion regulatoria formal o decisiones de inversion definitivas, contrastar siempre con publicaciones oficiales de Superintendencia de Bancos, SEPS y BCE.

## Licencia

MIT
