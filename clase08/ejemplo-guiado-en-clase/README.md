# Clase 08 - Motores de plantilla (EJS)

Ejemplo guiado en clase siguiendo el documento **"Motores de plantilla"**.

## Ejecutar

```
npm install
npm run dev
```

| Ruta | Contenido |
|---|---|
| `/` | Título, fecha actual, estado del servidor (`if`) y lista de usuarios (`for`) |
| `/about` | Título enviado desde Express con `res.render()` |
| `/panel` | Vista que reutiliza los parciales `header` y `footer` |

## Correcciones a la guía

Al ejecutar el código de la guía tal como está, dos rutas fallan, una vista no existe y el CSS enlazado no se encuentra. Estos son los cambios mínimos para que funcione:

### 1. Nombre de variable inconsistente (`title` / `titulo`)

La ruta `/` envía `title`, pero `index.ejs` imprime `<%= titulo %>` (el nombre que usa `/about`).

```
GET /  ->  ReferenceError: titulo is not defined
```

**Solución:** usar el mismo nombre en ambas rutas (`src/routes/home.ts`):

```ts
res.render('index', { titulo: 'Index page', isActive, usuarios });
```

### 2. `isActive` no existe en `/about`

`index.ejs` evalúa `<% if (isActive) { %>`, pero `/about` solo envía `titulo`. En EJS, usar una variable que no se envió lanza error.

```
GET /about  ->  ReferenceError: isActive is not defined
```

**Solución:** validar con `typeof`, el mismo patrón que la guía ya usa para `usuarios` (`views/index.ejs`):

```html
<% if (typeof isActive !== 'undefined' && isActive) { %>
```

### 3. Falta la vista `panel.ejs`

La guía define la ruta `/panel` con `res.render('panel')`, pero no incluye el archivo de la vista.

```
GET /panel  ->  Error: Failed to lookup view "panel" in views directory
```

**Solución:** crear `views/panel.ejs` usando los parciales.

### 4. Falta el CSS y su configuración

`header.ejs` enlaza `<link rel="stylesheet" href="/public/index.css">` y `index.ejs` usa las clases `status-active` y `status-inactive`, pero la guía no incluye el archivo CSS ni configura Express para servir archivos estáticos.

```
GET /public/index.css  ->  404 Not Found
```

**Solución:** servir la carpeta `public` con el prefijo `/public`, para que coincida con el `href` del header (`src/index.ts`):

```ts
app.use('/public', express.static(path.join(__dirname, '../public')));
```

Y crear `public/index.css` con fondo oscuro como en la captura final de la guía, más los colores de `status-active` (verde) y `status-inactive` (rojo).

## Notas

- `isActive` vale `false` como en el código de la guía, por eso `/` muestra "El servidor está inactivo".
