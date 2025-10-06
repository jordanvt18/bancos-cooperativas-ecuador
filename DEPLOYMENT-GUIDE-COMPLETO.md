# 🚀 INSTRUCCIONES DE DESPLIEGUE EN GITHUB

## Paso a Paso para Subir a tu GitHub

### 1. Preparar Repositorio en GitHub
1. Ve a [GitHub.com](https://github.com) y haz login
2. Click en "New repository" (botón verde)
3. Nombre: `bancos-cooperativas-ecuador`
4. Descripción: `Comparador de seguridad financiera para bancos y cooperativas de Ecuador`
5. Público ✅
6. Initialize with README ❌ (no marcar)
7. Click "Create repository"

### 2. Crear Estructura de Carpetas en tu Computadora
Crea esta estructura de carpetas:
```
bancos-cooperativas-ecuador/
├── .github/
│   └── workflows/
├── data/
│   └── monthly/
├── scripts/
└── assets/
```

### 3. Archivos a Crear/Copiar

#### Archivos Principales (raíz del proyecto):
- `index.html` - (usar el generado por la aplicación web)
- `style.css` - (usar el generado por la aplicación web)  
- `app.js` - (usar el generado por la aplicación web)
- `README.md` - (el que creé arriba)
- `package.json` - (el que creé arriba)
- `.gitignore` - (el que creé arriba)

#### En carpeta `.github/workflows/`:
- `update-data.yml` - (el workflow de GitHub Actions que creé)

#### En carpeta `data/`:
- `bancos.json` - (el archivo JSON con datos de bancos)
- `cooperativas.json` - (el archivo JSON con datos de cooperativas)

#### En carpeta `scripts/`:
- `update_data.py` - (el script de actualización Python)

#### En carpeta `assets/`:
- Copia las imágenes de los gráficos generados

### 4. Comandos Git para Subir Todo

Abre terminal/cmd en la carpeta del proyecto y ejecuta:

```bash
# Inicializar git
git init

# Agregar origin (cambiar TU_USUARIO por tu username de GitHub)
git remote add origin https://github.com/TU_USUARIO/bancos-cooperativas-ecuador.git

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "🚀 Despliegue inicial - Comparador Financiero Ecuador"

# Subir a GitHub
git branch -M main
git push -u origin main
```

### 5. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en "Settings" (tab superior)
3. Scroll down hasta "Pages" (menú izquierdo)
4. En "Source" selecciona "Deploy from a branch"
5. Branch: `main`
6. Folder: `/ (root)`
7. Click "Save"

### 6. Verificar Deployment

Después de 2-5 minutos:
- Ve a `https://TU_USUARIO.github.io/bancos-cooperativas-ecuador`
- Tu aplicación debería estar funcionando

### 7. Configurar GitHub Actions (Opcional)

Para que funcionen las actualizaciones automáticas:
1. Ve a tu repo → "Actions" tab
2. Verás el workflow "Actualizar Datos Financieros Ecuador"
3. Las actualizaciones se ejecutarán automáticamente el día 15 de cada mes

### 8. Personalizar

#### Cambiar URLs en README.md:
- Reemplaza `TU_USUARIO` por tu username real de GitHub

#### Si quieres cambiar colores:
- Edita variables CSS en `style.css`

#### Para actualizar datos:
- Edita archivos en carpeta `data/`
- Haz commit y push de los cambios

### 9. Solución de Problemas

#### Si la página no carga:
1. Verifica que GitHub Pages esté habilitado
2. Espera 5-10 minutos para propagación
3. Revisa que `index.html` esté en la raíz del proyecto

#### Si hay errores JavaScript:
1. Abre consola del navegador (F12)
2. Verifica que archivos JSON tengan formato válido
3. Revisa rutas de archivos en `app.js`

#### Si GitHub Actions falla:
1. Ve a "Actions" tab en tu repo
2. Click en el workflow que falló
3. Revisa los logs de error

### 10. URL Final

Tu aplicación estará disponible en:
```
https://TU_USUARIO.github.io/bancos-cooperativas-ecuador
```

---

## ✅ Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Estructura de carpetas creada localmente
- [ ] Todos los archivos copiados
- [ ] Git configurado y archivos subidos
- [ ] GitHub Pages habilitado
- [ ] Aplicación funcionando online
- [ ] GitHub Actions configurado

## 🆘 Si Necesitas Ayuda

1. **Error 404**: Verifica que `index.html` esté en raíz del repositorio
2. **Página en blanco**: Revisa consola del navegador (F12) para errores
3. **Datos no cargan**: Verifica formato JSON y rutas en JavaScript
4. **GitHub Actions falla**: Revisa logs en pestaña "Actions"

¡Tu aplicación estará lista para ayudar a la ciudadanía ecuatoriana! 🇪🇨
