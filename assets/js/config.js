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
  recogidaPaellera: "entre las 16:30 y las 18:00",

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
  arroces: [
    { nombre: "Paella valenciana", anfitrion: "El anfitrión social", descripcion: "Pollo, conejo, judía verde y garrofó", precio: 16, grupo: "carne" },
    { nombre: "Secreto ibérico", anfitrion: "El anfitrión elegante", descripcion: "Secreto Joselito, panceta ibérica salada y calabaza de la huerta", precio: 16, grupo: "carne" },
    { nombre: "Rabo de toro", anfitrion: "El anfitrión clásico", descripcion: "Con setas de temporada", precio: 16, grupo: "carne" },
    { nombre: "Costillas", anfitrion: "El anfitrión perfeccionista", descripcion: "A baja temperatura, al papillote", precio: 16, grupo: "carne" },
    { nombre: "Arroz al horno", anfitrion: "El anfitrión planificador", descripcion: "Receta tradicional", precio: 16, grupo: "carne" },
    { nombre: "Entrecot", anfitrion: "El anfitrión equilibrado", descripcion: "A baja temperatura, con alcachofas", precio: 16, grupo: "carne" },
    { nombre: "Arroz negro", anfitrion: "El anfitrión original", descripcion: "Ajetes tiernos y carpaccio de gamba roja", precio: 16, grupo: "marisco" },
    { nombre: "Carabineros", anfitrion: "El anfitrión generoso", descripcion: "Con sepia y alcachofa", precio: 16, grupo: "marisco" },
    { nombre: "Senyoret de bogavante", anfitrion: "El anfitrión perfeccionista", descripcion: "Arroz a banda o senyoret, con bogavante",precio: 16, grupo: "marisco", etiqueta: "Recomendado" },
    { nombre: "A banda de rape", anfitrion: "El anfitrión consciente", descripcion: "Arroz a banda con rape", precio: 16, grupo: "marisco" },
    { nombre: "Arroz de bogavante", anfitrion: "El anfitrión generoso", descripcion: "Bogavante y fumet de marisco", precio: 16, grupo: "marisco" },
    { nombre: "Arroz de cocido", anfitrion: "El anfitrión clásico", descripcion: "Solo en temporada", precio: 16, grupo: "temporada" }
  ],

  // ---- Carta: fideuà (precio por ración, mismas paelleras que el arroz) ----
  fideuas: [
    { nombre: "Fideuà de marisco", anfitrion: "El anfitrión original", descripcion: "Fideo fino con gamba y sepia, con alioli", precio: 16 },
    { nombre: "Fideuà de carne", anfitrion: "El anfitrión equilibrado", descripcion: "Fideo fino con costilla y verduras", precio: 16 }
  ],

  // ---- Carta: para empezar ----
  // "opciones" son los tamaños. Si solo hay uno, deja una opción.
  // "detalle" (opcional) sale junto al tamaño: gramos, unidades… Ejemplo: detalle: "6 uds"
  entrantes: [
    { nombre: "Croquetas de jamón ibérico", opciones: [{ nombre: "Media", detalle: "5 uds", precio: 6 }, { nombre: "Entera", detalle: "10 uds", precio: 10 }] },
    { nombre: "Ensaladilla rusa", opciones: [{ nombre: "Media", detalle: "300 g", precio: 6 }, { nombre: "Entera", detalle: "600 g", precio: 10 }] },
    { nombre: "Gazpacho", nota: "Solo en temporada", opciones: [{ nombre: "Ración", precio: 10 }] },
    { nombre: "Alioli", nota: "Tarrina de 160 ml", opciones: [{ nombre: "Tarrina", precio: 2 }] }
  ]
};
