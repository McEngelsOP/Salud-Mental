# MentalCare Kids Perú — Web del proyecto

Sitio web del proyecto **MentalCare Kids Perú — Sistema de Detección Temprana de Salud Mental Escolar**, elaborado para el curso TDCPRO-2 de la Universidad ESAN.

## Estructura

```
sedet-web/
├── index.html          ← página principal (problema, datos, solución, equipo)
├── propuesta.html      ← plataforma beta navegable (Componente 3)
├── css/
│   └── styles.css      ← todos los estilos
├── js/
│   └── script.js       ← interactividad, gráficos, formularios
└── README.md
```

## Cómo abrirlo en VS Code

1. **Descomprime** el archivo `sedet-web.zip` en una carpeta de tu computador.
2. Abre **Visual Studio Code**.
3. Ve a `Archivo → Abrir carpeta…` y selecciona la carpeta `sedet-web/`.
4. En el panel de la izquierda verás la estructura. Abre `index.html`.

### Opción A — Vista rápida con Live Server (recomendado)

1. En VS Code, instala la extensión **Live Server** (de Ritwick Dey) desde la pestaña Extensions.
2. Haz clic derecho sobre `index.html` → `Open with Live Server`.
3. Se abrirá en tu navegador en `http://127.0.0.1:5500/` y recargará automáticamente cuando edites cualquier archivo.

### Opción B — Sin extensiones

Solo haz doble clic en `index.html` desde tu explorador de archivos. Se abre en el navegador directamente. Funciona, pero no se recarga sola.

## Tecnologías usadas

- **HTML5** semántico, sin frameworks
- **CSS3** con variables (no usa Tailwind, Bootstrap, etc.)
- **JavaScript vanilla** (sin librerías propias)
- **Chart.js 4.4** vía CDN (para los gráficos de datos)
- **Google Fonts**: Inter y Fraunces (vía CDN)

Como todo se carga por CDN, **necesitas conexión a internet** la primera vez que abras el sitio para que descarguen las fuentes y Chart.js.

## Páginas

### `index.html`
- Hero con el problema central
- Sección de causas (las 7 causas del informe)
- Datos clave con contadores animados
- Cuatro gráficos interactivos (tiempo de detección, eficacia, capacitación, cobertura nacional)
- Propuesta con los 6 componentes
- Equipo + Matriz RACI
- CTA hacia la beta + footer

### `propuesta.html`
Maqueta navegable del Componente 3 con 4 pestañas:
1. **Ficha de tamizaje** — formulario funcional con alerta cuando se marca señal grave
2. **Agendar consulta** — slots disponibles que se pueden reservar (demo)
3. **Tablero de seguimiento** — KPIs y lista de casos para el coordinador
4. **Recursos** — descargas y materiales para familias y docentes

## Personalización rápida

- **Cambiar colores**: edita las variables CSS en `css/styles.css` (líneas 1–30, sección `:root`).
- **Cambiar datos de gráficos**: en `js/script.js`, busca cada `new Chart(...)` y modifica el array `data`.
- **Agregar miembros al equipo**: duplica un bloque `<article class="member">` en `index.html`.

## Despliegue

Para publicar el sitio puedes usar cualquiera de estos servicios gratuitos:
- **GitHub Pages** — sube la carpeta a un repositorio y actívalo en Settings.
- **Netlify Drop** — arrastra la carpeta en https://app.netlify.com/drop.
- **Vercel** — `vercel deploy` desde la terminal.

Como no hay backend, basta con servir los archivos estáticos.

---

© 2026 · Universidad ESAN — TDCPRO-2  
Equipo: Leo Higinio, Harol Flores, Zaida Ramírez, Engels Quispe.
