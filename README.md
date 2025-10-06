# Comparador Financiero Ecuador 2025 🏦

Una aplicación web para evaluar la seguridad de bancos y cooperativas de ahorro y crédito en Ecuador, con actualizaciones mensuales automáticas.

## 🎯 Objetivo

Ayudar a la ciudadanía ecuatoriana a tomar decisiones informadas sobre dónde invertir sus ahorros de manera segura, aprendiendo del caso de la cooperativa CREA y otros precedentes.

## ✨ Características

- 📊 **Ranking interactivo** de bancos y cooperativas
- 🔍 **Comparador directo** entre instituciones
- 📈 **Dashboard de indicadores** financieros en tiempo real  
- ⚠️ **Alertas de riesgo** y lecciones del caso CREA
- 🧮 **Calculadora de diversificación** de inversiones
- 📱 **Diseño responsive** optimizado para móviles
- 🔄 **Actualizaciones automáticas** mensuales

## 🚀 Ver la Aplicación

👉 **[Abrir Comparador Financiero](https://jordanvt18.github.io/bancos-cooperativas-ecuador)**

## 📊 Datos Incluidos

### Bancos Privados (Top 10)
- Banco Pichincha ($19,493 millones - AA+)
- Banco del Pacífico ($8,960 millones - AA)  
- Banco Guayaquil ($8,728 millones - AA)
- Produbanco ($8,200 millones - AA+)
- Y más...

### Cooperativas Segmento 1 (Top 10)
- JEP - Juventud Ecuatoriana Progresista ($3,775 millones)
- Jardín Azuayo ($2,107 millones)
- Policía Nacional ($1,524 millones)
- Alianza del Valle ($1,393 millones)
- Y más...

### Indicadores Monitoreados
- **Solvencia**: Capacidad para cubrir riesgos (mín. 9%)
- **Morosidad**: Porcentaje de cartera vencida
- **Liquidez**: Disponibilidad de fondos
- **Cobertura**: Protección ante cartera improductiva
- **Calificaciones**: Evaluaciones externas de riesgo

## 🛡️ Medidas de Seguridad

### ✅ Recomendaciones Clave
- **Límite por institución**: Máximo $32,000 USD (cobertura COSEDE)
- **Diversificar**: Distribuir entre múltiples instituciones
- **Preferir AA+/AA**: Calificaciones de riesgo altas
- **Monitorear**: Revisar indicadores mensualmente

### 🚨 Señales de Alerta (Caso CREA)
- Solvencia por debajo del 9% normativo
- Morosidad sostenida alta
- Falta de cobertura de cartera
- Patrimonio técnico deteriorado

## 🔄 Actualizaciones Automáticas

Los datos se actualizan automáticamente el **día 15 de cada mes** desde:

- **Superintendencia de Bancos**: Indicadores de banca privada
- **SEPS**: Estados financieros de cooperativas  
- **Banco Central**: Tasas e indicadores monetarios

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Charts**: Chart.js para visualizaciones
- **Hosting**: GitHub Pages (gratuito)
- **Updates**: GitHub Actions (automático)
- **Data**: JSON estático (rápido y confiable)

## 📁 Estructura del Proyecto

```
├── index.html              # Aplicación principal
├── style.css               # Estilos minimalistas
├── app.js                  # Lógica JavaScript
├── data/
│   ├── bancos.json        # Datos actuales bancos
│   ├── cooperativas.json  # Datos actuales cooperativas
│   └── monthly/           # Historial mensual
├── scripts/
│   └── update_data.py     # Script de actualización
├── .github/workflows/
│   └── update-data.yml    # GitHub Actions
└── assets/
    └── charts/            # Gráficos e imágenes
```

## 🚦 Cómo Usar

1. **Explorar Rankings**: Ve los bancos y cooperativas ordenados por tamaño
2. **Comparar**: Selecciona 2 instituciones para análisis detallado
3. **Monitorear**: Revisa indicadores de salud financiera
4. **Alertas CREA**: Aprende del caso y cómo evitar riesgos
5. **Diversificar**: Usa la calculadora de distribución de riesgo

## 🎯 Casos de Uso

- **Inversionistas**: Evaluar dónde colocar ahorros de forma segura
- **Estudiantes**: Aprender sobre el sistema financiero ecuatoriano  
- **Analistas**: Monitorear la salud del sector financiero
- **Ciudadanos**: Proteger patrimonio familiar con decisiones informadas

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Proyecto bajo licencia MIT - ver archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- Crear un [Issue](../../issues) para reportar bugs
- [Discussions](../../discussions) para ideas y sugerencias
- Email: tu-email@ejemplo.com

## ⭐ Apoyar el Proyecto

Si te resulta útil, ¡dale una estrella ⭐ al repositorio!

---

**📅 Última actualización**: Septiembre 2025  
**🔍 Fuentes**: Superintendencia de Bancos, SEPS, Banco Central del Ecuador  
**⚖️ Disclaimer**: Esta herramienta es informativa. Las decisiones de inversión son responsabilidad del usuario.
