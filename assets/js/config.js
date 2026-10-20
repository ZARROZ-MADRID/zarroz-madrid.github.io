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

  // ---- Carta: arroces (precio por ración) ----
  arroces: [
    { nombre: "Paella valenciana", precio: 16 },
    { nombre: "Arroz de secreto ibérico Joselito, panceta ibérica salada y calabaza de la huerta", precio: 16 },
    { nombre: "Arroz de rabo de toro y setas de temporada", precio: 16 },
    { nombre: "Arroz de costillas a baja temperatura al papillote", precio: 16 },
    { nombre: "Arroz de cocido", precio: 16 },
    { nombre: "Arroz al horno valenciano", precio: 16 },
    { nombre: "Arroz de entrecot a baja temperatura y alcachofas", precio: 16 },
    { nombre: "Arroz negro con ajetes tiernos y carpaccio de gamba roja", precio: 16 },
    { nombre: "Arroz de carabineros, sepia y alcachofa", precio: 16 },
    { nombre: "Arroz a banda o senyoret de bogavante", precio: 16 },
    { nombre: "Arroz a banda de rape", precio: 16 },
    { nombre: "Arroz de bogavante", precio: 16 }
  ],

  // ---- Carta: para empezar ----
  // "opciones" son los tamaños. Si solo hay uno, deja una opción.
  entrantes: [
    { nombre: "Croquetas de jamón ibérico", opciones: [{ nombre: "Media", precio: 6 }, { nombre: "Entera", precio: 10 }] },
    { nombre: "Ensaladilla rusa", opciones: [{ nombre: "Media", precio: 6 }, { nombre: "Entera", precio: 10 }] },
    { nombre: "Gazpacho", nota: "Solo en temporada", opciones: [{ nombre: "Ración", precio: 10 }] },
    { nombre: "Alioli", nota: "Tarrina de 160 ml", opciones: [{ nombre: "Tarrina", precio: 2 }] }
  ]
};
