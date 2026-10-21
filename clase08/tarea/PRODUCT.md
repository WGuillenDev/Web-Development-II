# Product

## Platform

web

## Stack

Express 5 + EJS 7 en JavaScript (ES Modules, `"type": "module"`), sin TypeScript. Lo fija el enunciado de la tarea: la estructura exige `home.js` y `routes/index.js`. App en `miApp/`; CSS separado en `miApp/public/css/` (`tokens.css`, `main.css`, `animations.css`); imágenes en `miApp/public/assets/images/` y fuentes en `miApp/public/assets/fonts/`.

## Users

- **Evaluadora:** la docente del curso Web II (UTN) revisa la entrega con una rúbrica y en una revisión presencial.
- **Visitantes del sitio (escenario de la tarea), en igual prioridad:** futuros estudiantes y sus familias, y la comunidad actual del colegio.

## Product Purpose

Landing page limpia y de calidad del **CTP Nataniel Arias Murillo** con dos páginas: Inicio (`/`) e Instalaciones (`/sobre`). Es la tarea de la Clase 8 y tiene que demostrar el uso de EJS, los parciales y el módulo Router de Express.

## Capabilities and Constraints

Requisitos del enunciado, que no se pueden cambiar:
- Estructura: `miApp/views/partials/{header,footer}.ejs`, `miApp/views/{index,instalaciones}.ejs`, `miApp/routes/index.js` y `miApp/home.js`.
- `header.ejs`: un `h1` y un menú `<nav>` con lista, con los enlaces `Inicio` (`/`) y `Sobre` (`/sobre`). El enlace "Sobre" muestra `instalaciones.ejs`.
- `footer.ejs`: un `<p>` con el texto exacto `&copy; 2024 Mi Sitio Web`.
- `index.ejs`: el hero lleva un `h2`, un párrafo y una imagen. Por decisión del usuario, también lleva secciones extra: quiénes somos, especialidades, robótica y lema.
- `instalaciones.ejs`: un `h2`, un párrafo y una lista con 5 instalaciones, más una sección de servicios.
- La rúbrica evalúa la seguridad (todo el texto se escapa con `<%= %>`) y la calidad del código.

## Brand Commitments

- Nombre: **Colegio Técnico Profesional Nataniel Arias Murillo** (CTP NAM, "CTP de Aguas Zarcas"), Aguas Zarcas, San Carlos, Alajuela.
- Fundado en 1971; en 2026 cumple 55 años. Celebró 50 años en 2021 con una revista de su biblioteca, publicada en Calaméo.
- Lema del sitio oficial: "Educación que abre oportunidades."
- Escudo oficial (de ctpaguaszarcas.ed.cr): libro abierto, familia bajo un techo, ganado, caña de azúcar, café y la bandera de Costa Rica, con "Aguas Zarcas 1971 San Carlos". Colores: verde azulado del borde, crema de las cintas y rojo de la bandera.
- Contacto: ctp.natanielariasmurillo@mep.go.cr · tel. 2474 4189 · costado este del cementerio de Aguas Zarcas.

## Evidence on Hand

- **Especialidades diurnas** (lista aprobada en 2020, puede estar incompleta): Agropecuaria en Producción Pecuaria, Agropecuaria en Producción Agrícola, Agroindustria Alimentaria con Tecnología Pecuaria, Contabilidad e Informática Empresarial.
- **Sección nocturna** (San Carlos Digital, 2023; gratuita, con bachillerato y más de 17 años): Contabilidad, Informática Empresarial, Electrónica Industrial, Secretariado Ejecutivo y Agroindustria.
- **Robótica** (San Carlos Digital):
  - 2024: campeonas nacionales de RoboSport en la WRO, que viajaron al mundial en Turquía.
  - 2025: los equipos KRONOS (primer lugar) y ARTEMIS (segundo lugar) clasificaron a la WRO de Singapur.
  - El nombre del tutor aparece escrito de tres formas distintas en las fuentes (Maynor, Mynor, Mainor), así que no se publica.
  - En el sitio no se publican los nombres de los estudiantes, porque son menores de edad.
- **Otros datos:** cooperativa de ahorro estudiantil Coopeagro R.L. (tesis de la UNA); servicios en línea (Aula en Casa, horarios, Servicio Comunal); en Facebook lo recomienda el 90 % (275 opiniones).
- **Fotos reales:**
  - Vista aérea (Facebook oficial, 2019; se recortó el logo).
  - Entrada y corredores (TVN Canal 14, 2024; se quitó el logo del canal).
  - Equipos de robótica (San Carlos Digital, 2025).
  - Escudo oficial.
- **Fotos de las instalaciones:** cuatro imágenes referenciales de Unsplash, rotuladas así en el sitio, más la foto real de los corredores.
- **Pendiente:** no se encontró información sobre quién fue Nataniel Arias Murillo. No se debe inventar.

## Product Principles

1. **El enunciado manda.** Cada elemento pedido existe tal cual.
2. **Explicable línea por línea.** Datos en arreglos en las rutas, recorridos con `forEach` en EJS.
3. **Solo hechos verificados**, con su fuente en `routes/index.js`. Las imágenes genéricas se rotulan como referenciales.
4. **Limpio y editorial:** estilo inspirado en Villa Castagneto (Newsreader + Hanken Grotesk) con los colores del escudo.

## Accessibility & Inclusion

`alt` descriptivo y honesto en cada imagen, `lang="es"`, contraste legible, respeto de `prefers-reduced-motion` y funcionamiento en celular.
