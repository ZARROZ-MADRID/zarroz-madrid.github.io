/* =========================================================
   ZARROZ · DATOS EDITABLES DE LA WEB
   Este es el único archivo que necesitas tocar para cambiar
   precios, platos o datos de contacto.
   - Los textos van siempre entre comillas "así".
   - Los precios van sin comillas y con punto decimal: 16.5
   - Si un dato está vacío "", ese botón o enlace no aparece.
   ========================================================= */

window.ZARROZ = {
  // Aviso amarillo de "web en pruebas". Ponlo en false al lanzar.
  enPruebas: true,

  // ---- Contacto ----
  email: "pedidos@zarroz.com",
  telefono: "649 119 997",   // Ejemplo: "600 000 000"
  whatsapp: "34649119997",    // Solo números con prefijo, sin + ni espacios. Ejemplo: "34600000000"
  instagram: "",       // Ejemplo: "https://www.instagram.com/zarroz"

  // ---- Reglas de pedido ----
  racionesMin: 3,      // mínimo de raciones por arroz (una paellera)
  racionesMax: 8,      // máximo por paellera
  recogidaPaellera: "entre hora y media y dos horas después de entregarla",

  // ---- Días y horas de entrega ----
  // "dias": 0 = domingo, 1 = lunes … 6 = sábado. Solo se pueden pedir esos días.
  // "horas": las horas de entrega que aparecen para elegir.
  // PROVISIONAL: confirmar días y franjas reales antes de lanzar.
  servicio: {
    dias: [0, 1, 2, 3, 4, 5, 6],
    horas: ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"]
  },
  // Cuánto tardamos en confirmar un pedido (sale al enviarlo).
  confirmacion: "en menos de 1 hora",

  // ---- Redes sociales (cinta y fotos antes de las preguntas) ----
  // "usuario" es el nombre que sale en la cinta. "fotos" son imágenes de assets/img/redes/.
  // Mientras no haya fotos, salen ilustraciones en su lugar.
  redes: {
    usuario: "@zarroz",
    fotos: []
  },

  // ---- Opiniones de clientes ----
  // "ejemplo: true" marca opiniones de muestra: solo se ven mientras la web está en pruebas.
  // Al tener opiniones reales, bórralas y pon las de verdad sin "ejemplo".
  opiniones: [
    { texto: "Pedimos para el cumpleaños de mi padre y fue lo más comentado de la comida. Llegó en su punto y nosotros, sentados con todos.", nombre: "Marta", detalle: "Chamartín · Arroz de bogavante", ejemplo: true },
    { texto: "El socarrat, como en Valencia. Mi suegro es de Sueca y repitió dos veces.", nombre: "Javier", detalle: "Hortaleza · A banda de rape", ejemplo: true },
    { texto: "Cero cocina y cero fregar: recogieron la paellera y como si nada. Para los domingos en casa, perfecto.", nombre: "Lucía", detalle: "Las Tablas · Secreto ibérico", ejemplo: true }
  ],

  // ---- Envío por código postal ----
  // Precio de envío y códigos postales de cada zona.
  // Si un código postal no aparece en ninguna zona, la web avisa de que no repartimos allí.
  envio: [
    { precio: 0, cps: ["28002", "28016", "28017", "28027", "28033", "28042", "28043", "28050"] },
    { precio: 6, cps: ["28001", "28003", "28006", "28007", "28009", "28010", "28020", "28022", "28028", "28029",
                       "28030", "28036", "28037", "28039", "28046", "28055", "28109"] },
    { precio: 9, cps: ["28004", "28005", "28008", "28011", "28012", "28013", "28014", "28015", "28018", "28019",
                       "28021", "28023", "28024", "28025", "28026", "28031", "28032", "28034", "28035", "28038",
                       "28040", "28041", "28044", "28045", "28047", "28048", "28049", "28051", "28052", "28053", "28054"] }
  ],

  // ---- Carta: arroces (precio por ración) ----
  // "grupo" decide en qué apartado sale: "carne", "marisco" o "temporada".
  // "descripcion" (opcional) sale debajo del nombre, en pequeño.
  // "etiqueta" (opcional) sale como distintivo: "El clásico", "Recomendado", "El más pedido", "Nuevo"…
  // "anfitrion" (opcional) es el tipo de anfitrión que va con ese arroz (territorio creativo de la marca).
  // "icono" (opcional) es la ilustración que sale a la izquierda del plato (archivo en assets/img/ilustraciones, sin .svg).
  arroces: [
    { nombre: "Secreto ibérico", icono: "plato-cerdo", anfitrion: "El anfitrión elegante", descripcion: "Secreto Joselito, panceta ibérica salada y calabaza de la huerta", precio: 16, grupo: "carne" },
    { nombre: "Rabo de toro", icono: "plato-toro", anfitrion: "El anfitrión clásico", descripcion: "Con setas de temporada", precio: 16, grupo: "carne" },
    { nombre: "Costillas", icono: "plato-costillas", anfitrion: "El anfitrión perfeccionista", descripcion: "A baja temperatura, al papillote, con setas", precio: 16, grupo: "carne" },
    { nombre: "Arroz al horno", icono: "plato-arroz-al-horno", anfitrion: "El anfitrión planificador", descripcion: "Valenciano, receta tradicional", precio: 16, grupo: "carne" },
    { nombre: "Carabineros", icono: "plato-carabinero", anfitrion: "El anfitrión generoso", descripcion: "Con sepia y alcachofa", precio: 16, grupo: "marisco" },
    { nombre: "A banda de rape", icono: "plato-rape", anfitrion: "El anfitrión consciente", descripcion: "Arroz a banda con rape y gamba roja", precio: 16, grupo: "marisco" },
    { nombre: "Arroz de bogavante", icono: "plato-bogavante", anfitrion: "El anfitrión generoso", descripcion: "Bogavante y fumet de marisco", precio: 16, grupo: "marisco" },
    { nombre: "Arroz de cocido", icono: "plato-cocido", anfitrion: "El anfitrión clásico", descripcion: "Solo en temporada", precio: 16, grupo: "temporada" }
  ],

  // ---- Carta: fideuà (precio por ración, mismas paelleras que el arroz) ----
  fideuas: [
    { nombre: "Fideuà de carabineros", icono: "plato-fideua-carabineros", anfitrion: "El anfitrión original", descripcion: "Fideo fino con carabineros, con alioli", precio: 16 },
    { nombre: "Fideuà de cocido", icono: "plato-fideua-cocido", anfitrion: "El anfitrión clásico", descripcion: "Fideo fino con el sabor del cocido", precio: 16 }
  ],

  // ---- Carta: para empezar ----
  // "opciones" son los tamaños. Si solo hay uno, deja una opción.
  // "detalle" (opcional) sale junto al tamaño: gramos, unidades… Ejemplo: detalle: "6 uds"
  entrantes: [
    { nombre: "Croquetas de jamón ibérico", icono: "plato-croquetas", opciones: [{ nombre: "Media", detalle: "5 uds", precio: 6 }, { nombre: "Entera", detalle: "10 uds", precio: 10 }] },
    { nombre: "Ensaladilla rusa", icono: "plato-ensaladilla", opciones: [{ nombre: "Media", detalle: "300 g", precio: 6 }, { nombre: "Entera", detalle: "600 g", precio: 10 }] },
    { nombre: "Gildas", icono: "plato-gilda", nota: "4 unidades", opciones: [{ nombre: "Ración", precio: 6 }] },
    { nombre: "Alioli", icono: "plato-alioli", nota: "Tarrina de 160 ml", opciones: [{ nombre: "Tarrina", precio: 2 }] }
  ],

  // ---- Carta: vinos ----
  // Mismo formato que los entrantes. "nota" sale tras el precio (bodega, uva, D.O.…).
  vinos: [
    { nombre: "Vino tinto", icono: "botella-vino-tinto", nota: "Rioja crianza · 75 cl", opciones: [{ nombre: "Botella", precio: 18 }] },
    { nombre: "Vino blanco", icono: "botella-vino-blanco", nota: "Albariño · 75 cl", opciones: [{ nombre: "Botella", precio: 12 }] }
  ]
};
