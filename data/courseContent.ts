
import { Module, Resource, JourneyPoint } from '../types';

export const JOURNEY_POINTS: JourneyPoint[] = [
  {
    id: 1,
    name: "Ramsés",
    x: 11, y: 65,
    title: "La Partida (Egipto)",
    description: "Israel sale de Ramsés, en el Delta del Nilo, después de la décima plaga. Es el inicio de la redención física.",
    biblicalRef: "Éxodo 12:37"
  },
  {
    id: 2,
    name: "Mar Rojo",
    x: 12, y: 68,
    title: "El Paso del Mar",
    description: "Dios abre las aguas en la región de Suez. El evento fundacional donde el ejército egipcio es derrotado.",
    biblicalRef: "Éxodo 14"
  },
  {
    id: 3,
    name: "Mara y Elim",
    x: 36, y: 58,
    title: "Aguas Amargas y Oasis",
    description: "Costa este del Golfo de Suez. Dios sana las aguas en Mara y provee descanso en el oasis de Elim.",
    biblicalRef: "Éxodo 15:22-27"
  },
  {
    id: 4,
    name: "Desierto de Sin",
    x: 44, y: 70,
    title: "El Maná del Cielo",
    description: "Situado entre Elim y el Sinaí. Dios provee el Maná por primera vez ante la queja del pueblo.",
    biblicalRef: "Éxodo 16"
  },
  {
    id: 5,
    name: "Refidim",
    x: 52, y: 80,
    title: "Agua de la Roca",
    description: "Cerca del macizo montañoso. Moisés golpea la roca y Josué derrota a Amalec mientras Moisés ora.",
    biblicalRef: "Éxodo 17"
  },
  {
    id: 6,
    name: "Monte Sinaí",
    x: 58, y: 88,
    title: "La Entrega de la Ley",
    description: "En el corazón de la península. Dios desciende con fuego y entrega el Decálogo y el diseño del Tabernáculo.",
    biblicalRef: "Éxodo 19-20"
  },
  {
    id: 7,
    name: "Taberá",
    x: 64, y: 65,
    title: "Fuego de YHWH",
    description: "Ruta norte hacia Parán. El juicio de Dios cae sobre los quejosos en los bordes del campamento.",
    biblicalRef: "Números 11"
  },
  {
    id: 8,
    name: "Cades-barnea",
    x: 70, y: 45,
    title: "El Informe de los Espías",
    description: "Oasis estratégico al sur de Canaán. La incredulidad causa el castigo de 40 años en el desierto.",
    biblicalRef: "Números 13-14"
  },
  {
    id: 9,
    name: "Ezion-geber",
    x: 78, y: 62,
    title: "Peregrinaje del Desierto",
    description: "Puerto en el Golfo de Aqaba. Israel rodea la tierra de Edom durante décadas de disciplina.",
    biblicalRef: "Números 33:35"
  },
  {
    id: 10,
    name: "Monte Hor",
    x: 82, y: 48,
    title: "Muerte de Aarón",
    description: "En la frontera de Edom. Aarón el Sumo Sacerdote muere y entrega el cargo a su hijo Eleazar.",
    biblicalRef: "Números 20:22-29"
  },
  {
    id: 11,
    name: "Ar de Moab",
    x: 88, y: 32,
    title: "Serpiente de Bronce",
    description: "Subida por el este del Mar Muerto. Dios provee sanidad a través de la fe al mirar el bronce.",
    biblicalRef: "Números 21:4-9"
  },
  {
    id: 12,
    name: "Llanuras de Moab",
    x: 92, y: 22,
    title: "El Umbral del Jordán",
    description: "Frente a Jericó. Punto final del Pentateuco. Balaam bendice y Moisés da sus últimos discursos.",
    biblicalRef: "Números 22-36"
  }
];

export const RESOURCES: Resource[] = [];

export const MODULES: Module[] = [
  {
    id: "module5",
    title: "Módulo 5: Deuteronomio - La Segunda Ley (Parte 1)",
    lessons: [
      {
        id: "lesson16",
        title: "5.1 Introducción y Teología del Pacto",
        subtitle: "El testamento final de Moisés en los campos de Moab",
        duration: "30 min",
        icon: "fa-scroll",
        bannerImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1920&q=80",
        blocks: [
          { type: 'heading', level: 2, text: 'Introducción a Deuteronomio' },
          { type: 'paragraph', text: 'El nombre "Deuteronomio" proviene de la Septuaginta y significa "segunda ley" (deuteronomion). Sin embargo, no es una nueva ley, sino una reformulación del pacto establecido en el Sinaí, adaptado para una comunidad a punto de establecerse en Canaán.' },
          { type: 'note', text: 'Contexto Histórico: Son tres sermones predicados por Moisés en el año 40 después del Éxodo, dirigidos a la nueva generación que estaba por cruzar el Jordán.' },
          
          { type: 'heading', level: 2, text: 'La Teología del Pacto (Berit)' },
          { type: 'paragraph', text: 'El pacto (berit) es un convenio u obligación. Dios escogió a Israel por gracia, pero demandaba obediencia. Si Israel obedecía, gozaría de una relación privilegiada:' },
          { type: 'accordion', items: [
            { title: 'Pueblo Especial (Segullah)', content: 'Un tesoro de mucho valor. Una comunidad que pertenece a Jehovah de manera distinta a las demás naciones.' },
            { title: 'Reino de Sacerdotes', content: 'Israel fue elegido para mediar entre las otras naciones y Dios, haciendo intercesión por el mundo entero.' },
            { title: 'Nación Santa', content: 'Separados del mundo y enviados al mundo para proclamar la salvación de Dios.' }
          ]},
          
          { type: 'heading', level: 2, text: 'Tipos de Pactos en el Antiguo Oriente' },
          { type: 'flipcards', flipCards: [
            { frontTitle: 'Soberanía', frontSubtitle: 'El Gran Rey y su Vasallo', backTitle: 'Pacto de Soberanía', backContent: 'Un superior ata a un inferior a obligaciones definidas. Similar al pacto de Dios con Israel en Sinaí.', biblicalCitation: 'Éxodo 20', interpretation: 'Dios como soberano establece las reglas para nuestro bien.', icon: 'fa-crown' },
            { frontTitle: 'Igualdad', frontSubtitle: 'Entre pares', backTitle: 'Pacto de Igualdad', backContent: 'Dos personas de igual posición se comprometen mutuamente por un juramento.', biblicalCitation: 'Génesis 31:44-50', interpretation: 'Acuerdos mutuos de paz y respeto.', icon: 'fa-handshake' },
            { frontTitle: 'Protección', frontSubtitle: 'Beneficio del inferior', backTitle: 'Pacto de Protección', backContent: 'La parte superior se compromete a obligaciones para el beneficio de un inferior.', biblicalCitation: 'Génesis 15:1-21', interpretation: 'La promesa incondicional de Dios a Abraham.', icon: 'fa-shield-alt' },
            { frontTitle: 'Promisorio', frontSubtitle: 'Garantía futura', backTitle: 'Pacto Promisorio', backContent: 'Establece una nueva relación para garantizar el desarrollo futuro de obligaciones.', biblicalCitation: '2 Reyes 23:1-3', interpretation: 'Renovación del compromiso con Dios.', icon: 'fa-file-signature' }
          ]},
          
          { type: 'quiz', question: '¿Qué significa el término hebreo "Segullah" aplicado a Israel?', options: [
            { text: 'Una nación guerrera', isCorrect: false },
            { text: 'Un tesoro especial de mucho valor', isCorrect: true },
            { text: 'Un pueblo nómada', isCorrect: false }
          ], explanation: 'Segullah describe la relación especial de Dios con Israel, considerándolos su tesoro personal.' }
        ]
      },
      {
        id: "lesson17",
        title: "5.2 Enseñanzas y Estructura",
        subtitle: "El corazón de la fe israelita",
        duration: "35 min",
        icon: "fa-heart",
        bannerImage: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/983b4096-4b4f-4b05-9f01-101574d8b389_rw_1920.png?h=fa905a0cff06711164c6d944b0d2ff15",
        blocks: [
          { type: 'heading', level: 2, text: 'Estructura de Deuteronomio' },
          { type: 'table', headers: ['Sección', 'Capítulos', 'Contenido Principal'], rows: [
            ['Primer Sermón', '1:5 - 4:43', 'Reseña histórica y exhortación a la obediencia.'],
            ['Segundo Sermón', '4:44 - 28:68', 'El Decálogo, el Shema, Leyes del Pacto y Bendiciones/Maldiciones.'],
            ['Tercer Sermón', '29:1 - 30:20', 'Renovación del pacto en Moab y la alternativa entre vida y muerte.'],
            ['Conclusión', '31:1 - 34:12', 'Sucesión de Josué, Cántico y Muerte de Moisés.']
          ]},
          
          { type: 'heading', level: 2, text: 'Enseñanzas Principales' },
          { type: 'slideshow', items: [
            { image: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/c9f40e23-b97b-4b33-b886-2d83df9fee96_rw_1920.png?h=3e698745362edf7ffde86fa4dbcdba44', caption: '1. Amor hacia Dios: Dios amó a Israel primero; Israel debe amar a Dios con todo su ser (Deut 6:5).' },
            { image: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/70a84036-3da5-445b-b221-5f69dde52216_rw_1920.jpg?h=6016c24f492cc48df332bffa08d73175', caption: '2. Monoteísmo: "Jehovah nuestro Dios, Jehovah uno es". Exclusividad absoluta en la adoración.' },
            { image: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/f2c0a68b-ac8d-4228-befb-160c205ea200_rw_1920.jpg?h=1b4c3a778020e8d2a1b1b9250c455c57', caption: '3. Ética Personal: La obediencia a Dios se refleja en el trato justo al prójimo, especialmente al huérfano, la viuda y el extranjero.' },
            { image: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/309331e5-66c1-45e7-9c90-e1e99509ff17_rw_1920.jpg?h=070b598b56dc813532630586d8366311', caption: '4. El Shema: La confesión de fe diaria del judaísmo, llamando a escuchar y obedecer.' },
            { image: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/e3d10340-e1ee-418a-967b-f094ff666a93_rw_1920.png?h=85dab01505c7bd78990453bab1e26002', caption: '5. El Decálogo: Repetición de los 10 mandamientos con un enfoque más social y humanitario.' }
          ]},

          { type: 'note', text: 'Joya Bíblica: "Escucha, Israel: Jehovah nuestro Dios, Jehovah uno es. Y amarás a Jehovah tu Dios con todo tu corazón, con toda tu alma y con todas tus fuerzas." (Deut. 6:4-5)' },
          
          { type: 'heading', level: 3, text: 'Semillero Homilético: El Mandamiento Supremo' },
          { type: 'paragraph', text: 'El Dios que merece amor es único, justo y bueno. Nos libró de la esclavitud (del pecado). Debemos amarlo con todo nuestro corazón (mente y voluntad), alma (vitalidad) y fuerzas. Este amor requiere entrega total y obediencia.' }
        ]
      },
      {
        id: "lesson18",
        title: "5.3 El Primer Sermón de Moisés",
        subtitle: "Recordando el camino (Deut 1-4)",
        duration: "40 min",
        icon: "fa-route",
        bannerImage: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/12aa15ba-6965-4725-8221-2ec01cf28d3c_rw_1920.jpg?h=2b1d852a3836d74f09622ebd4f55ecb4",
        blocks: [
          { type: 'heading', level: 2, text: 'Reseña Histórica: De Horeb a Moab' },
          { type: 'timeline', timelineItems: [
            { year: "Punto 1", title: "Salida de Horeb", description: "Dios ordena marchar hacia Canaán.", detailedContent: "Israel había estado casi dos años en Sinaí. Era tiempo de llevar la revelación a la acción.", biblicalCitation: "Deut 1:5-8" },
            { year: "Punto 2", title: "Nombramiento de Jueces", description: "Delegación de autoridad.", detailedContent: "Moisés no podía solo. Se nombraron hombres sabios y experimentados para administrar justicia sin acepción de personas.", biblicalCitation: "Deut 1:9-18" },
            { year: "Punto 3", title: "Rebelión en Cades-barnea", description: "El fracaso de los espías.", detailedContent: "Por miedo a los gigantes (anaquitas), el pueblo se rebeló. Fueron condenados a vagar 38 años más hasta que muriera esa generación.", biblicalCitation: "Deut 1:19-40" },
            { year: "Punto 4", title: "Jornada por Transjordania", description: "Rodeando a los hermanos.", detailedContent: "Dios prohibió atacar a Edom, Moab y Amón por ser parientes. Pero les dio victoria sobre Sejón y Og, reyes amorreos.", biblicalCitation: "Deut 2:1 - 3:11" }
          ]},
          
          { type: 'heading', level: 2, text: 'La Oración Negada de Moisés' },
          { type: 'paragraph', text: 'Moisés suplicó entrar a la Tierra Prometida, pero Dios se lo negó por su pecado en Meriba. Sin embargo, le permitió verla desde el monte Pisga y le ordenó comisionar a Josué.' },
          { type: 'note', text: 'Verdades Prácticas: Dios no contesta en el momento cada petición según nuestro deseo. A veces, la respuesta es "no" por causa de la disciplina, pero Él provee consuelo y continuidad a su obra a través de otros (Josué).' },

          { type: 'heading', level: 2, text: 'Advertencia contra la Idolatría (Deut 4)' },
          { type: 'paragraph', text: 'Moisés advierte que no vieron ninguna figura en Horeb, solo oyeron la voz. Por tanto, no deben hacer imágenes. La idolatría es corromperse y olvidar el pacto.' },
          { type: 'quiz', question: '¿Por qué Dios prohibió estrictamente a Israel hacer imágenes de Él?', options: [
            { text: 'Porque no tenían buenos artesanos', isCorrect: false },
            { text: 'Porque en Horeb no vieron figura, solo oyeron su voz', isCorrect: true },
            { text: 'Para ahorrar oro y plata', isCorrect: false }
          ], explanation: 'Dios es espíritu y no puede ser limitado a una imagen. En la teofanía del Sinaí, se reveló por su Palabra, no por una forma visual.' }
        ]
      },
      {
        id: "lesson19",
        title: "5.4 El Segundo Sermón: Leyes del Pacto",
        subtitle: "Culto, Fiestas y Justicia (Deut 12-17)",
        duration: "45 min",
        icon: "fa-balance-scale",
        bannerImage: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/ed973b3f-7d8e-4d1d-8a56-b9052e1c36b5_rw_1920.jpg?h=51e74ccfb933db4f462bb20b5036f357",
        blocks: [
          { type: 'heading', level: 2, text: 'Centralización del Culto (Cap. 12)' },
          { type: 'paragraph', text: 'Para evitar el sincretismo con la religión cananea, Dios ordenó destruir todos los lugares altos paganos y adorar a Jehovah en un único santuario que Él escogería (más tarde, Jerusalén).' },
          { type: 'note', text: 'Joya Bíblica: "Allí comeréis delante de Jehovah vuestro Dios, y os regocijaréis vosotros y vuestras familias por todo lo que vuestras manos hayan emprendido..." (Deut 12:7)' },

          { type: 'heading', level: 2, text: 'Leyes Humanitarias y Fiestas' },
          { type: 'accordion', items: [
            { title: 'El Año de Remisión (Cap. 15)', content: 'Cada siete años se perdonaban las deudas entre israelitas. El ideal era que no hubiera pobres, pero ante la realidad de la pobreza, se exigía abrir la mano al necesitado.' },
            { title: 'Esclavitud Económica (Cap. 15)', content: 'Un hebreo vendido por deudas servía 6 años. Al séptimo salía libre, y su amo debía proveerle generosamente para que empezara una nueva vida, recordando que ellos fueron esclavos en Egipto.' },
            { title: 'Las Tres Fiestas Anuales (Cap. 16)', content: '1. Pascua y Panes sin Levadura (Redención). 2. Pentecostés/Semanas (Cosecha, gratitud). 3. Tabernáculos (Fin de cosecha, recuerdo del desierto). Todos debían presentarse con ofrendas.' }
          ]},

          { type: 'heading', level: 2, text: 'Obligaciones de los Oficiales (Cap. 16-17)' },
          { type: 'list', items: [
            'Jueces: Debían juzgar con justo juicio, sin torcer el derecho ni aceptar sobornos. "La justicia, solo la justicia seguirás".',
            'Tribunal Supremo: Casos difíciles se llevaban a los sacerdotes levitas y al juez en el santuario central. Su decisión era final bajo pena de muerte.',
            'El Rey: Debía ser elegido por Dios, israelita, no multiplicar caballos (poder militar/Egipto), ni mujeres (alianzas paganas), ni oro. Debía escribir una copia de la ley y leerla todos los días para mantenerse humilde.'
          ]},

          { type: 'wordGame', items: [
            { word: "PACTO", hint: "La renovación del compromiso entre Dios y la nueva generación de Israel" },
            { word: "MEMORIA", hint: "El mandato constante de no olvidar la liberación de Egipto y las leyes de Dios" },
            { word: "SABIDURÍA", hint: "La reputación que ganaría el pueblo ante otras naciones por cumplir la Ley" },
            { word: "SHEMA", hint: "La confesión de fe: Escucha, Israel..." },
          ]},

          { type: 'heading', level: 3, text: 'Conclusión Práctica' },
          { type: 'paragraph', text: 'El libro de Deuteronomio no es solo un código legal; es un llamado al corazón. Nos enseña que la verdadera religión combina la adoración exclusiva a Dios con la justicia social y la compasión hacia los más vulnerables.' }
        ]
      }
    ]
  }
];
