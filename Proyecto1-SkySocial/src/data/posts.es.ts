// JSONPlaceholder devuelve texto de relleno en pseudolatín (lorem ipsum) y ciudades de otros países.
// Aquí se reemplazan por contenido en español sobre el clima y por una zona de Costa Rica para cada usuario.
// El resto de los datos (id, autor, usuario) sigue viniendo de la API.
export interface PostTranslation {
  title: string;
  body: string;
}

// Zona del país de cada usuario, por su id en /users
export const ZONES_BY_USER: Record<number, string> = {
  1: 'San Carlos, Alajuela',
  2: 'Liberia, Guanacaste',
  3: 'Limón, Caribe',
  4: 'Puntarenas, Pacífico central',
  5: 'Pérez Zeledón, Zona Sur',
  6: 'Cartago, Valle Central',
  7: 'Heredia, Valle Central',
  8: 'San José, Valle Central',
  9: 'Sarapiquí, Heredia',
  10: 'Monteverde, Puntarenas',
};

// Textos por id de post. Se usa el primer post de cada usuario, así cada publicación es de una zona distinta.
export const POSTS_ES: Record<number, PostTranslation> = {
  1: {
    title: 'Amaneció lloviendo en San Carlos',
    body: 'Desde las cinco de la mañana cae una lluvia fina que no para aquí en San Carlos. Saquen el paraguas y cuidado en la carretera, que está resbalosa.',
  },
  11: {
    title: 'Calor fuerte en Guanacaste',
    body: 'Aquí en Liberia marcamos treinta y seis grados al mediodía. Tomen mucha agua, usen bloqueador y eviten salir entre las once y las tres.',
  },
  21: {
    title: 'Aguacero en el Caribe',
    body: 'Acá en Limón llovió toda la noche y las calles amanecieron con agua. Si viven cerca de la costa, revisen los desagües antes de que vuelva a caer.',
  },
  31: {
    title: 'Viento fuerte en Puntarenas',
    body: 'Hoy las ráfagas en el Pacífico central levantaron láminas de zinc y movieron los botes del muelle. Aseguren lo que tengan suelto en el patio.',
  },
  41: {
    title: 'Tormenta eléctrica en la Zona Sur',
    body: 'En Pérez Zeledón cayó una tormenta con truenos que duró casi una hora. Los ríos de la zona subieron, así que estén atentos si viven cerca de una quebrada.',
  },
  51: {
    title: 'Mañana fría en Cartago',
    body: 'En Cartago amaneció con doce grados y neblina cerca del Irazú. Es buen momento para sacar las cobijas gruesas y tomar algo caliente.',
  },
  61: {
    title: 'Aguacero de la tarde en Heredia',
    body: 'Como cada día a las tres, en Heredia se soltó un aguacero torrencial que duró cuarenta minutos y llenó las calles de agua.',
  },
  71: {
    title: 'Pronóstico para San José',
    body: 'En San José, lunes y martes soleados, miércoles con lluvia por la tarde y jueves nublado con viento. El fin de semana vuelve el sol.',
  },
  81: {
    title: 'Lluvia constante en Sarapiquí',
    body: 'Aquí en Sarapiquí lleva tres días lloviendo sin parar y el río ya está bien crecido. Precaución para quienes viven en zonas bajas.',
  },
  91: {
    title: 'Niebla espesa en Monteverde',
    body: 'En Monteverde no se veía a diez metros esta mañana. Si van a manejar, enciendan las luces bajas y vayan despacio.',
  },
};
