import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const datos = [
    { etiqueta: 'Fundado en', valor: '1971' },
    { etiqueta: 'Años de historia', valor: '55', contar: true },
    { etiqueta: 'Especialidades diurnas', valor: '5', contar: true },
    { etiqueta: 'Técnicos nocturnos', valor: '5', contar: true },
    { etiqueta: 'Recomendación en Facebook', valor: '90 %' }
  ];

  const historia = [
    'El Colegio Técnico Profesional Nataniel Arias Murillo es una institución pública del Ministerio de Educación Pública, fundada en 1971 en Aguas Zarcas de San Carlos. Ofrece el III y el IV ciclo con formación técnica: sus estudiantes terminan con el bachillerato y, además, con un título de técnico medio.',
    'Su escudo resume la vida de la zona norte: un libro abierto, una familia bajo un mismo techo, el ganado, la caña de azúcar y el café, sobre los colores de la bandera de Costa Rica.',
    'En 2021 celebró 50 años con una revista conmemorativa de su biblioteca. Hoy mantiene una cooperativa de ahorro estudiantil, Coopeagro R.L., y servicios en línea como Aula en Casa para quienes no pueden asistir temporalmente.'
  ];

  const especialidades = [
    {
      nombre: 'Agropecuaria en Producción Pecuaria',
      descripcion: 'Manejo, alimentación y sanidad del ganado y otras especies de producción.'
    },
    {
      nombre: 'Agropecuaria en Producción Agrícola',
      descripcion: 'Cultivos de la zona, manejo del suelo y producción sostenible.'
    },
    {
      nombre: 'Agroindustria Alimentaria con Tecnología Pecuaria',
      descripcion: 'Transformación de productos como la leche y la carne en alimentos seguros y de calidad.'
    },
    {
      nombre: 'Contabilidad',
      descripcion: 'Registro contable, estados financieros y control interno.'
    },
    {
      nombre: 'Informática Empresarial',
      descripcion: 'Sistemas de información, programación y soporte para empresas.'
    }
  ];

  const nocturnas = ['Contabilidad', 'Informática Empresarial', 'Electrónica Industrial', 'Secretariado Ejecutivo', 'Agroindustria'];

  const logros = [
    {
      anio: '2025',
      titulo: 'Primero y segundo lugar nacional',
      descripcion: 'Los equipos KRONOS y ARTEMIS ganaron el primer y el segundo lugar de la Olimpiada Nacional de Robótica y clasificaron a la Olimpiada Mundial de Robótica (WRO) en Singapur.'
    },
    {
      anio: '2024',
      titulo: 'Campeonas nacionales en RoboSport',
      descripcion: 'Un equipo del colegio ganó la categoría RoboSport de la Olimpiada Nacional de Robótica 2024 y representó a Costa Rica en la final mundial de Turquía.'
    }
  ];

  res.render('index', {
    titulo: 'Inicio',
    pagina: 'inicio',
    encabezado: 'Colegio Técnico Profesional',
    encabezadoAcento: 'Nataniel Arias Murillo',
    descripcion: 'Educación que abre oportunidades en Aguas Zarcas de San Carlos desde 1971.',
    imagen: '/assets/images/institucional/campus-1280.webp',
    datos,
    historia,
    especialidades,
    nocturnas,
    logros,
    lema: 'Educación que abre oportunidades.'
  });
});

router.get('/Instalaciones', (req, res) => {
  const instalaciones = [
    {
      nombre: 'Laboratorio de cómputo',
      detalle: 'Informática Empresarial',
      descripcion: 'Espacio con computadoras para practicar programación, ofimática y sistemas de información.',
      etiquetas: ['Programación', 'Ofimática', 'Redes'],
      imagen: '/assets/images/instalaciones/laboratorio-computo.webp'
    },
    {
      nombre: 'Taller de Electrónica',
      detalle: 'Electrónica Industrial · Sección nocturna',
      descripcion: 'Circuitos, protoboards e instrumentos de medición para aprender a diseñar, probar y reparar sistemas electrónicos.',
      etiquetas: ['Circuitos', 'Multímetros', 'Mantenimiento'],
      imagen: '/assets/images/instalaciones/taller-electronica.webp'
    },
    {
      nombre: 'Finca y áreas pecuarias',
      detalle: 'Agropecuaria en Producción Pecuaria',
      descripcion: 'Áreas de práctica para el manejo del ganado, el mismo que aparece en el escudo del colegio.',
      etiquetas: ['Ganado', 'Potreros', 'Sanidad animal'],
      imagen: '/assets/images/instalaciones/finca-pecuaria.webp'
    },
    {
      nombre: 'Planta de Agroindustria',
      detalle: 'Agroindustria Alimentaria con Tecnología Pecuaria',
      descripcion: 'Espacio de práctica donde la leche y otros productos del campo se transforman en alimentos, con normas de higiene.',
      etiquetas: ['Lácteos', 'Higiene', 'Procesamiento'],
      imagen: '/assets/images/instalaciones/planta-agroindustria.webp'
    },
    {
      nombre: 'Pabellones y corredores',
      detalle: 'Todo el colegio',
      descripcion: 'Corredores techados que unen las aulas y los laboratorios, decorados con murales pintados del CTP de Aguas Zarcas.',
      etiquetas: ['Aulas', 'Murales', 'Zonas verdes'],
      imagen: '/assets/images/instalaciones/corredores.webp'
    }
  ];

  const servicios = ['Cooperativa Coopeagro R.L.', 'Biblioteca', 'Aula en Casa', 'Horarios en línea', 'Servicio Comunal Estudiantil', 'Sección nocturna gratuita'];

  res.render('instalaciones', {
    titulo: 'Instalaciones',
    pagina: 'Instalaciones',
    encabezado: 'Nuestras',
    encabezadoAcento: 'instalaciones',
    descripcion: 'Laboratorios, talleres y áreas de campo donde el estudiantado aprende haciendo. Cada especialidad tiene un lugar propio para practicar lo que estudia.',
    instalaciones,
    servicios
  });
});

export default router;
