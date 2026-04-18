# juanconstantin.github.io

Portfolio personal de Juan Constantin — Junior Full-Stack Developer.

**URL live:** https://juanconstantin.github.io

Stack: HTML5 + CSS3 + JavaScript vanilla (sin dependencias, sin frameworks).

---

## Deploy (automático)

1. Pushear a `main` en el repo `Juandottt/juanconstantin.github.io`
2. GitHub Pages publica automáticamente en ~30 segundos
3. Acceder a https://juanconstantin.github.io

```bash
git add .
git commit -m "update portfolio"
git push origin main
```

---

## Estructura

```
juanconstantin.github.io/
├── index.html    ← Toda la estructura HTML (semántica, SEO-friendly)
├── style.css     ← Estilos + dark/light mode + responsive + animaciones
├── script.js     ← Typing effect, scroll animations, theme toggle
└── README.md
```

---

## Personalización

### Cambiar información personal

Editar en `index.html`:
- Nombre, descripción, subtítulo: buscar la sección `#hero`
- Email: buscar `juanconstantinb@gmail.com`
- GitHub: buscar `Juandottt`
- LinkedIn: buscar `juanconstantin` (en el href de LinkedIn)

### Agregar un proyecto

Copiar un bloque `<article class="project-card ...">` en la sección `#projects`
y editar:
- `card-completion`: porcentaje (ej: `55%`)
- `card-title`, `card-desc`
- `card-chips`: tecnologías usadas
- `card-features`: features con clase `feat-done`, `feat-wip` o `feat-pending`
- `card-links`: URLs de GitHub

### Cambiar colores

En `style.css`, editar las variables en `:root`:
```css
--blue:  #3B82F6;   /* Color principal */
--green: #10B981;   /* Features completadas */
--amber: #F59E0B;   /* En progreso */
```

### Cambiar el typing effect

En `script.js`, editar el array `phrases`:
```js
const phrases = [
  '.NET 8 + React developer',
  'Clean Architecture advocate',
  // ... agregar más
];
```

---

## Features del sitio

- Dark mode / Light mode (toggle + localStorage + prefers-color-scheme)
- Typing effect en el hero (rotación de frases)
- Animaciones de entrada al hacer scroll (Intersection Observer)
- Progress bars animadas en las project cards
- Count-up animation en las estadísticas del hero
- Navbar se vuelve opaca al hacer scroll
- Fully responsive (mobile, tablet, desktop)
- Sin dependencias externas (0 npm packages)
- Lighthouse score ~95+

---

## Licencia

MIT — libre para usar y adaptar.
