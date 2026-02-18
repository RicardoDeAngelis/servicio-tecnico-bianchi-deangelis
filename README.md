# SPA Servicio Técnico Bianchi & De Angelis (demo)

Aplicación de una sola página (SPA) muy ligera para la pyme **Servicio Técnico Bianchi & De Angelis**, dedicada a aires acondicionados y electricidad doméstica. Todo el frontend está hecho con HTML, CSS y JavaScript puro (sin build ni dependencias).

## Archivos principales

- `index.html`: estructura principal de la SPA.
- `styles.css`: estilos con un diseño moderno tipo dashboard oscuro.
- `app.js`: lógica de navegación, formularios y almacenamiento local de órdenes.

## Cómo ejecutarla

Opción más simple (recomendada):

1. Asegurate de tener estos archivos en la misma carpeta.
2. Haz doble clic en `index.html` o ábrelo con tu navegador preferido (Chrome, Edge, etc.).

No se necesita ningún servidor ni instalación de dependencias: es solo frontend.

## Rutas disponibles dentro de la SPA

- **Inicio**: hero con resumen de servicio y formulario rápido.
- **Servicios**: detalle de servicios de aire acondicionado y electricidad doméstica.
- **Solicitar servicio**: formulario completo que genera un número de orden.
- **Estado de orden**: permite consultar el estado usando el número de orden generado.
- **Contacto**: datos de contacto y formulario de mensaje.

> Nota: Las órdenes se guardan solamente en el `localStorage` del navegador para fines de demostración. No hay backend real.

## Publicar en GitHub Pages

Para subir la página a GitHub Pages y tenerla online, sigue las instrucciones en `DEPLOY.md`.

Una vez publicado, tu sitio estará disponible en:
- `https://TU_USUARIO.github.io/NOMBRE_REPOSITORIO/`

