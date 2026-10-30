/* =========================================================
   ZARROZ Â· DATOS EDITABLES DE LA WEB
   Este es el Ãºnico archivo que necesitas tocar para cambiar
   precios, platos o datos de contacto.
   - Los textos van siempre entre comillas "asÃ­".
   - Los precios van sin comillas y con punto decimal: 16.5
   - Si un dato estÃ¡ vacÃ­o "", ese botÃ³n o enlace no aparece.
   ========================================================= */

window.ZARROZ = {
  // Aviso amarillo de "web en pruebas". Ponlo en false al lanzar.
  enPruebas: true,

  // ---- Contacto ----
  email: "pedidos@zarroz.com",
  telefono: "649 119 997",   // Ejemplo: "600 000 000"
  whatsapp: "34649119997",    // Solo nÃºmeros con prefijo, sin + ni espacios. Ejemplo: "34600000000"
  instagram: "https://www.instagram.com/_zarroz_/",       // Ejemplo: "https://www.instagram.com/zarroz"

  // ---- Reglas de pedido ----
  racionesMin: 3,      // mÃ­nimo de raciones por arroz (una paellera)
  racionesMax: 8,      // mÃ¡ximo por paellera
  recogidaPaellera: "entre hora y media y dos horas despuÃ©s de entregarla",

  // ---- DÃ­as y horas de entrega ----
  // "dias": 0 = domingo, 1 = lunes â€¦ 6 = sÃ¡bado. Solo se pueden pedir esos dÃ­as.
  // "horas": las horas de entrega que aparecen para elegir.
  // "festivos": ademÃ¡s de esos dÃ­as, se reparte en los festivos de la Comunidad de Madrid.
  // ACTUALIZAR CADA AÃ‘O: la Comunidad publica el calendario del aÃ±o siguiente en el BOCM
  // hacia septiembre-octubre. AÃ±ade la lista nueva con el formato "AAAA-MM-DD".
  // PROVISIONAL: confirmar las horas de entrega.
  servicio: {
    dias: [5, 6, 0],   // viernes, sÃ¡bados y domingos
    textoDias: "viernes, sÃ¡bados, domingos y festivos",
    horas: ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
    // DÃ­as especiales en que tambiÃ©n repartimos: al elegirlos, la web ofrece pedir por email o telÃ©fono.
    especiales: [
      { fecha: "2026-12-24", nombre: "Nochebuena" },
      { fecha: "2026-12-31", nombre: "Nochevieja" }
    ],
    festivos: {
      // 2026 (BOCM 25-09-2025 y 12-12-2025)
      2026: ["2026-01-01", "2026-01-06", "2026-04-02", "2026-04-03", "2026-05-01", "2026-05-02", "2026-08-15",
             "2026-10-12", "2026-11-02", "2026-12-07", "2026-12-08", "2026-12-25"],
      // 2027 (Decreto 82/2026, BOCM 01-10-2026)
      2027: ["2027-01-01", "2027-01-06", "2027-03-19", "2027-03-25", "2027-03-26", "2027-05-01", "2027-08-16",
             "2027-10-12", "2027-11-01", "2027-12-06", "2027-12-08", "2027-12-25"]
    }
  },
  // CuÃ¡nto tardamos en confirmar un pedido (sale al enviarlo).
  confirmacion: "en menos de 1 hora",

  // ---- Redes sociales (cinta y fotos antes de las preguntas) ----
  // "usuario" es el nombre que sale en la cinta. "fotos" son imÃ¡genes de assets/img/redes/.
  // Mientras no haya fotos, salen ilustraciones en su lugar.
  redes: {
    usuario: "@_zarroz_",
    fotos: ["bogavante-sol.jpg", "paella-valenciana.jpg", "bogavante-alcachofa.jpg", "senyoret.jpg", "carabineros.jpg", "cocido.jpg", "bogavante-cigalas.jpg"]
  },

  // ---- Opiniones de clientes ----
  // "ejemplo: true" marca opiniones de muestra: solo se ven mientras la web estÃ¡ en pruebas.
  // Al tener opiniones reales, bÃ³rralas y pon las de verdad sin "ejemplo".
  opiniones: [
    { texto: "Pedimos para el cumpleaÃ±os de mi padre y fue lo mÃ¡s comentado de la comida. LlegÃ³ en su punto y nosotros, sentados con todos.", nombre: "Marta", detalle: "ChamartÃ­n Â· Arroz de bogavante", ejemplo: true },
    { texto: "El socarrat, como en Valencia. Mi suegro es de Sueca y repitiÃ³ dos veces.", nombre: "Javier", detalle: "Hortaleza Â· A banda de rape", ejemplo: true },
    { texto: "Cero cocina y cero fregar: recogieron la paellera y como si nada. Para los domingos en casa, perfecto.", nombre: "LucÃ­a", detalle: "Las Tablas Â· Secreto ibÃ©rico", ejemplo: true }
  ],

  // ---- EnvÃ­o por cÃ³digo postal ----
  // Precio de envÃ­o y cÃ³digos postales de cada zona.
  // Si un cÃ³digo postal no aparece en ninguna zona, la web avisa de que no repartimos allÃ­.
  envio: [
    { precio: 0, cps: ["28002", "28016", "28017", "28027", "28033", "28042", "28043", "28050"] },
    { precio: 6, cps: ["28001", "28003", "28006", "28007", "28009", "28010", "28020", "28022", "28028", "28029",
                       "28030", "28036", "28037", "28039", "28046", "28055", "28109"] },
    { precio: 9, cps: ["28004", "28005", "28008", "28011", "28012", "28013", "28014", "28015", "28018", "28019",
                       "28021", "28023", "28024", "28025", "28026", "28031", "28032", "28034", "28035", "28038",
                       "28040", "28041", "28044", "28045", "28047", "28048", "28049", "28051", "28052", "28053", "28054"] }
  ],

  // ---- Carta: arroces (precio por raciÃ³n) ----
  // "grupo" decide en quÃ© apartado sale: "carne", "marisco" o "temporada".
  // "descripcion" (opcional) sale debajo del nombre, en pequeÃ±o.
  // "etiqueta" (opcional) sale como distintivo: "El clÃ¡sico", "Recomendado", "El mÃ¡s pedido", "Nuevo"â€¦
  // "anfitrion" (opcional) es el tipo de anfitriÃ³n que va con ese arroz (territorio creativo de la marca).
  // "icono" (opcional) es la ilustraciÃ³n que sale a la izquierda del plato (archivo en assets/img/ilustraciones, sin .svg).
  arroces: [
    { nombre: "Secreto ibÃ©rico", icono: "plato-cerdo", anfitrion: "El anfitriÃ³n elegante", descripcion: "Secreto Joselito, panceta ibÃ©rica salada y calabaza de la huerta", precio: 16, grupo: "carne" },
    { nombre: "Rabo de toro", icono: "plato-toro", anfitrion: "El anfitriÃ³n clÃ¡sico", descripcion: "Con setas de temporada", precio: 16, grupo: "carne" },
    { nombre: "Costillas", icono: "plato-costillas", anfitrion: "El anfitriÃ³n perfeccionista", descripcion: "A baja temperatura, al papillote, con setas", precio: 16, grupo: "carne" },
    { nombre: "Arroz al horno", icono: "plato-arroz-al-horno", anfitrion: "El anfitriÃ³n planificador", descripcion: "Valenciano, receta tradicional", precio: 16, grupo: "carne" },
    { nombre: "Carabineros", icono: "plato-carabinero", anfitrion: "El anfitriÃ³n generoso", descripcion: "Con sepia y alcachofa", precio: 16, grupo: "marisco" },
    { nombre: "A banda de rape", icono: "plato-rape", anfitrion: "El anfitriÃ³n consciente", descripcion: "Arroz a banda con rape y gamba roja", precio: 16, grupo: "marisco" },
    { nombre: "Arroz de bogavante", icono: "plato-bogavante", anfitrion: "El anfitriÃ³n generoso", descripcion: "Bogavante y fumet de marisco", precio: 16, grupo: "marisco" },
    { nombre: "Arroz de cocido", icono: "plato-cocido", anfitrion: "El anfitriÃ³n clÃ¡sico", descripcion: "Solo en temporada", precio: 16, grupo: "temporada" }
  ],

  // ---- Carta: fideuÃ  (precio por raciÃ³n, mismas paelleras que el arroz) ----
  fideuas: [
    { nombre: "FideuÃ  de carabineros", icono: "plato-fideua-carabineros", anfitrion: "El anfitriÃ³n original", descripcion: "Fideo fino con carabineros, con alioli", precio: 16 },
    { nombre: "FideuÃ  de cocido", icono: "plato-fideua-cocido", anfitrion: "El anfitriÃ³n clÃ¡sico", descripcion: "Fideo fino con el sabor del cocido", precio: 16 }
  ],

  // ---- Carta: para empezar ----
  // "opciones" son los tamaÃ±os. Si solo hay uno, deja una opciÃ³n.
  // "detalle" (opcional) sale junto al tamaÃ±o: gramos, unidadesâ€¦ Ejemplo: detalle: "6 uds"
  entrantes: [
    { nombre: "Croquetas de jamÃ³n ibÃ©rico", icono: "plato-croquetas", opciones: [{ nombre: "Media", detalle: "5 uds", precio: 6 }, { nombre: "Entera", detalle: "10 uds", precio: 10 }] },
    { nombre: "Ensaladilla rusa", icono: "plato-ensaladilla", opciones: [{ nombre: "Media", detalle: "300 g", precio: 6 }, { nombre: "Entera", detalle: "600 g", precio: 10 }] },
    { nombre: "Gildas", icono: "plato-gilda", nota: "4 unidades", opciones: [{ nombre: "RaciÃ³n", precio: 6 }] },
    { nombre: "Alioli", icono: "plato-alioli", nota: "Tarrina de 160 ml", opciones: [{ nombre: "Tarrina", precio: 2 }] }
  ],

  // ---- Carta: vinos ----
  // Mismo formato que los entrantes. "nota" sale tras el precio (bodega, uva, D.O.â€¦).
  vinos: [
    { nombre: "Vino tinto", icono: "botella-vino-tinto", nota: "Rioja crianza Â· 75 cl", opciones: [{ nombre: "Botella", precio: 18 }] },
    { nombre: "Vino blanco", icono: "botella-vino-blanco", nota: "AlbariÃ±o Â· 75 cl", opciones: [{ nombre: "Botella", precio: 12 }] }
  ]
};
