# Instrucciones para subir a GitHub Pages

## Paso 1: Crear el repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `servicio-tecnico-bianchi-deangelis` (o el que prefieras)
3. Marca como **público** (necesario para GitHub Pages gratuito)
4. **NO** marques "Initialize with README" (ya tenemos archivos)
5. Click en **"Create repository"**

## Paso 2: Conectar tu repositorio local con GitHub

Ejecuta estos comandos en la terminal (reemplaza `TU_USUARIO` con tu usuario de GitHub):

```bash
cd C:\Users\Ricci
git remote add origin https://github.com/TU_USUARIO/servicio-tecnico-bianchi-deangelis.git
git branch -M main
git push -u origin main
```

## Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En "Source", selecciona **"Deploy from a branch"**
5. Branch: selecciona **"main"** y carpeta **"/ (root)"**
6. Click en **Save**

## Paso 4: Acceder a tu sitio

Tu sitio estará disponible en:
- `https://TU_USUARIO.github.io/servicio-tecnico-bianchi-deangelis/`

Puede tardar unos minutos en estar disponible la primera vez.

---

## Alternativa: Usar GitHub Desktop

Si prefieres una interfaz gráfica:
1. Descarga GitHub Desktop desde https://desktop.github.com/
2. Abre GitHub Desktop y conecta tu cuenta
3. File → Add Local Repository → selecciona `C:\Users\Ricci`
4. Publish repository (marca "Keep this code private" si quieres, pero GitHub Pages gratis requiere repositorio público)
5. Ve a Settings → Pages en GitHub web para activar Pages
