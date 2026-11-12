# LibroTeca

Práctica de React con TypeScript basada en la diapositiva 16 de la presentación de clase.

## Ejecutar

```powershell
npm.cmd install
npm.cmd run dev
```

## Organización para la revisión

- `src/App.tsx`: organiza la página, guarda las categorías seleccionadas y filtra los libros.
- `src/components/Header.tsx`: muestra el logo y el nombre de la biblioteca.
- `src/components/Categorias.tsx`: recibe las opciones y comunica los cambios mediante props.
- `src/components/Catalogo.tsx`: muestra las tarjetas, los detalles y los botones de añadir y favorito.
- `src/data/libros.ts`: define el tipo `Libro` y los datos de muestra.
- `src/App.css`: distribución, tarjetas, colores y adaptación a pantallas pequeñas.
- `src/index.css`: estilos generales.

El filtro permite seleccionar varias categorías. Sin selección se muestran todos los libros.
“Mostrar todos” limpia el filtro. Los detalles se cierran con el botón Cerrar o con Escape.
Los estados de favoritos y de biblioteca se mantienen durante la sesión de la página y se reinician al recargar.

Las portadas y el logo se muestran desde la imagen de referencia incluida en la diapositiva 16,
guardada localmente en `public/libros-referencia.png`. CSS selecciona el área correspondiente.
Los títulos, descripciones y valoraciones son datos de muestra para el ejercicio; el primer registro
reproduce el texto de la tarjeta de referencia y no pretende identificar la portada fotografiada.

## Verificar

```powershell
npm.cmd run build
npm.cmd run lint
```

Para la revisión: componentes → props e interfaces → map y key → useState → eventos y filtros → CSS.
