/* Zarroz · lógica de la web. Los datos se editan en config.js */
(function () {
  "use strict";
  var C = window.ZARROZ || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var euros = function (n) {
    return n.toLocaleString("es-ES", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + " €";
  };
  var MIN = C.racionesMin || 3, MAX = C.racionesMax || 14;

  /* ---------- Datos de contacto y avisos ---------- */
  if (C.enPruebas) $$("[data-pruebas]").forEach(function (e) { e.hidden = false; });
  $$("[data-min]").forEach(function (e) { e.textContent = MIN; });
  $$("[data-max]").forEach(function (e) { e.textContent = MAX; });
  if (C.recogidaPaellera) $$("[data-recogida]").forEach(function (e) { e.textContent = C.recogidaPaellera; });
  $$("[data-anio]").forEach(function (e) { e.textContent = new Date().getFullYear(); });
  $$("[data-email]").forEach(function (a) { a.href = "mailto:" + C.email; a.textContent = C.email; });
  $$("[data-email-grupo]").forEach(function (a) { a.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Pedido para un grupo"); });
  ["telefono", "whatsapp", "instagram"].forEach(function (k) {
    if (C[k]) $$('[data-si="' + k + '"]').forEach(function (e) { e.hidden = false; });
  });
  var telHref = C.telefono ? "tel:" + (C.telefono.trim().charAt(0) === "+" ? "" : "+34") + C.telefono.replace(/[^\d+]/g, "") : "";
  if (C.telefono) {
    $$("[data-tel]").forEach(function (a) { a.href = telHref; a.textContent = C.telefono; });
    $$("[data-tel-box]").forEach(function (a) { a.href = telHref; });
    $$("[data-tel-texto]").forEach(function (e) { e.textContent = "Llámanos al " + C.telefono; });
  }
  if (C.whatsapp) $$("[data-wa]").forEach(function (a) { a.href = "https://wa.me/" + C.whatsapp; a.target = "_blank"; a.rel = "noopener"; });
  if (C.instagram) $$("[data-ig]").forEach(function (a) { a.href = C.instagram; a.target = "_blank"; a.rel = "noopener"; });

  /* ---------- Menú móvil ---------- */
  var botonMenu = $(".menu__abrir"), enlaces = $("#menu-enlaces");
  if (botonMenu) {
    botonMenu.addEventListener("click", function () {
      var abierto = enlaces.classList.toggle("abierto");
      botonMenu.setAttribute("aria-expanded", abierto);
      botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
    $$("a", enlaces).forEach(function (a) {
      a.addEventListener("click", function () { enlaces.classList.remove("abierto"); botonMenu.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- Carta ---------- */
  // pedido: clave -> { nombre, precio, cantidad, unidad }
  var pedido = {};
  var listaEntrantes = $("#lista-entrantes");
  if (!listaEntrantes) return; // páginas legales

  function contador(clave, etiqueta) {
    return '<div class="contador" role="group" aria-label="' + etiqueta + '">' +
      '<button type="button" data-menos="' + clave + '" aria-label="Quitar">−</button>' +
      '<output data-cant="' + clave + '" aria-live="polite">0</output>' +
      '<button type="button" data-mas="' + clave + '" aria-label="Añadir">+</button></div>';
  }
  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }

  // Arroces y fideuà van en paellera (tipo "arroz": mínimo y máximo de raciones)
  function platoPaellera(a, k, lista) {
    pedido[k] = { nombre: a.nombre, precio: a.precio, cantidad: 0, tipo: "arroz" };
    var li = document.createElement("li");
    li.className = "plato"; li.dataset.fila = k;
    li.innerHTML = '<div><p class="plato__nombre">' + esc(a.nombre) + '</p><p class="plato__info">' + euros(a.precio) + ' por ración</p></div>' +
      '<div class="plato__opciones"><div class="opcion">' + contador(k, "Raciones de " + esc(a.nombre)) + '</div></div>';
    lista.appendChild(li);
  }
  (C.arroces || []).forEach(function (a, i) {
    var lista = $("#lista-" + (a.grupo || "carne")) || $("#lista-carne");
    platoPaellera(a, "a" + i, lista);
  });
  (C.fideuas || []).forEach(function (a, i) { platoPaellera(a, "f" + i, $("#lista-fideua")); });
  // Oculta los apartados de la carta que se queden vacíos
  $$(".carta__grupo").forEach(function (g) { var ul = $("ul", g); if (ul && !ul.children.length && ul.id !== "lista-entrantes") g.hidden = true; });

  (C.entrantes || []).forEach(function (e, i) {
    var li = document.createElement("li");
    li.className = "plato";
    var opts = "";
    var precios = [];
    e.opciones.forEach(function (o, j) {
      var k = "e" + i + "_" + j;
      var nombre = e.opciones.length > 1 ? e.nombre + " (" + o.nombre.toLowerCase() + ")" : e.nombre;
      pedido[k] = { nombre: nombre, precio: o.precio, cantidad: 0, tipo: "entrante" };
      precios.push(e.opciones.length > 1 ? o.nombre + " " + euros(o.precio) : euros(o.precio));
      opts += '<div class="opcion" data-fila="' + k + '">' +
        (e.opciones.length > 1 ? '<span class="opcion__etiqueta">' + esc(o.nombre) + '</span>' : "") +
        contador(k, esc(nombre)) + "</div>";
    });
    var info = precios.join(", ") + (e.nota ? ". " + esc(e.nota) : "");
    li.innerHTML = '<div><p class="plato__nombre">' + esc(e.nombre) + '</p><p class="plato__info">' + info + '</p></div>' +
      '<div class="plato__opciones">' + opts + "</div>";
    listaEntrantes.appendChild(li);
  });

  function cambiar(k, delta) {
    var p = pedido[k], n = p.cantidad;
    if (p.tipo === "arroz") {
      if (delta > 0) n = n === 0 ? MIN : Math.min(MAX, n + 1);
      else n = n <= MIN ? 0 : n - 1;
    } else {
      n = Math.max(0, Math.min(20, n + delta));
    }
    p.cantidad = n;
    pintar();
  }
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-mas],[data-menos]");
    if (!b) return;
    if (b.dataset.mas) cambiar(b.dataset.mas, 1); else cambiar(b.dataset.menos, -1);
  });

  /* ---------- Resumen del pedido ---------- */
  var lineasEl = $("#pedido-lineas"), vacioEl = $("#pedido-vacio"), resumenEl = $("#pedido-resumen"),
      totalEl = $("#pedido-total"), barra = $("#barra-pedido");

  function lineas() {
    return Object.keys(pedido).filter(function (k) { return pedido[k].cantidad > 0; }).map(function (k) { return pedido[k]; });
  }
  function total() { return lineas().reduce(function (s, p) { return s + p.precio * p.cantidad; }, 0); }

  // Envío según código postal: número = precio, null = no repartimos, undefined = aún sin CP válido
  var cpEl = $("#f-cp");
  function envioDe(cp) {
    cp = (cp || "").trim();
    if (!/^\d{5}$/.test(cp)) return undefined;
    for (var i = 0; i < (C.envio || []).length; i++) if (C.envio[i].cps.indexOf(cp) >= 0) return C.envio[i].precio;
    return null;
  }
  function precioEnvio(e) { return e === 0 ? "Gratis" : euros(e); }

  function pintar() {
    Object.keys(pedido).forEach(function (k) {
      var p = pedido[k];
      var out = $('[data-cant="' + k + '"]'); if (out) out.textContent = p.cantidad;
      var menos = $('[data-menos="' + k + '"]'); if (menos) menos.disabled = p.cantidad === 0;
      var mas = $('[data-mas="' + k + '"]');
      if (mas) {
        var tope = p.tipo === "arroz" ? MAX : 20;
        mas.disabled = p.cantidad >= tope;
        mas.setAttribute("aria-label", p.tipo === "arroz" && p.cantidad === 0 ? "Añadir " + MIN + " raciones" : "Añadir");
      }
      var fila = $('[data-fila="' + k + '"]');
      if (fila) fila.classList.toggle(p.tipo === "arroz" ? "activo" : "activa", p.cantidad > 0);
    });
    var ls = lineas(), t = total();
    lineasEl.innerHTML = ls.map(function (p) {
      var cant = p.tipo === "arroz" ? p.cantidad + " raciones" : p.cantidad + " ×";
      return "<li><span>" + (p.tipo === "arroz" ? esc(p.nombre) + " · " + cant : cant + " " + esc(p.nombre)) + "</span><span>" + euros(p.precio * p.cantidad) + "</span></li>";
    }).join("");
    vacioEl.hidden = ls.length > 0;
    resumenEl.hidden = ls.length === 0;
    var cp = cpEl.value.trim(), env = envioDe(cp), conEnvio = typeof env === "number";
    $("#pedido-subtotal-fila").hidden = !conEnvio;
    $("#pedido-envio-fila").hidden = !conEnvio;
    $("#pedido-subtotal").textContent = euros(t);
    $("#pedido-envio-precio").textContent = conEnvio ? precioEnvio(env) : "";
    $("#pedido-envio").textContent = conEnvio ? "Envío al " + cp + "." : env === null
      ? "De momento no repartimos en el " + cp + "."
      : "Más el envío: gratis, 6 € o 9 € según tu código postal.";
    var aviso = $("#cp-aviso");
    aviso.className = "campo__aviso" + (conEnvio ? " campo__aviso--ok" : env === null ? " campo__aviso--no" : "");
    aviso.textContent = conEnvio ? (env === 0 ? "✓ Envío gratis a tu zona" : "Envío a tu zona: " + euros(env))
      : env === null ? "De momento no llegamos a tu zona" : "";
    if (conEnvio) t += env;
    totalEl.textContent = euros(t);

    var raciones = ls.filter(function (p) { return p.tipo === "arroz"; }).reduce(function (s, p) { return s + p.cantidad; }, 0);
    $("#barra-total").textContent = euros(t);
    $("#barra-resumen").textContent = raciones ? raciones + " raciones" : "Sin arroz todavía";
    var visible = ls.length > 0 && !pedidoEnPantalla;
    barra.classList.toggle("visible", visible);
    barra.setAttribute("aria-hidden", !visible);
    document.body.classList.toggle("con-pedido", ls.length > 0);
  }

  // Ocultar la barra móvil cuando el panel del pedido está a la vista
  var pedidoEnPantalla = false;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { pedidoEnPantalla = es[0].isIntersecting; pintar(); }, { threshold: 0.15 })
      .observe($("#pedido"));
  }

  cpEl.addEventListener("input", pintar);

  /* ---------- Formulario ---------- */
  var form = $("#pedido-form"), errorEl = $("#pedido-error"), okEl = $("#pedido-ok");
  var fecha = $("#f-fecha");
  var hoy = new Date(); hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  fecha.min = hoy.toISOString().slice(0, 10);

  if (C.whatsapp) $('[data-canal="whatsapp"]').hidden = false;

  function datos() {
    var f = new FormData(form), o = {};
    f.forEach(function (v, k) { o[k] = String(v).trim(); });
    return o;
  }
  function validar() {
    var errores = [];
    $$("[aria-invalid]", form).forEach(function (e) { e.removeAttribute("aria-invalid"); });
    if (!lineas().length) errores.push("Elige al menos un plato de la carta.");
    else if (!lineas().some(function (p) { return p.tipo === "arroz"; })) errores.push("Añade al menos un arroz o una fideuà.");
    var faltan = $$("[required]", form).filter(function (i) { return !i.value.trim(); });
    faltan.forEach(function (i) { i.setAttribute("aria-invalid", "true"); });
    if (faltan.length) errores.push("Completa: " + faltan.map(function (i) { return $('label[for="' + i.id + '"]').textContent.toLowerCase(); }).join(", ") + ".");
    var cp = $("#f-cp");
    var env = envioDe(cp.value);
    if (cp.value.trim() && env === undefined) { cp.setAttribute("aria-invalid", "true"); errores.push("Escribe un código postal de 5 cifras."); }
    else if (env === null) { cp.setAttribute("aria-invalid", "true"); errores.push("De momento no repartimos en el código postal " + cp.value.trim() + ". Si quieres, llámanos y lo vemos."); }
    if (fecha.value && fecha.value < fecha.min) { fecha.setAttribute("aria-invalid", "true"); errores.push("El día no puede ser anterior a hoy."); }
    errorEl.hidden = !errores.length;
    errorEl.textContent = errores.join(" ");
    if (faltan.length) faltan[0].focus();
    return !errores.length;
  }
  function fechaBonita(iso) {
    if (!iso) return "";
    var p = iso.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
  }
  function textoPedido() {
    var d = datos();
    var t = "Hola, Zarroz. Quiero hacer este pedido:\n\n";
    lineas().forEach(function (p) {
      t += p.tipo === "arroz"
        ? "- " + p.nombre + ": " + p.cantidad + " raciones (" + euros(p.precio * p.cantidad) + ")\n"
        : "- " + p.cantidad + " x " + p.nombre + " (" + euros(p.precio * p.cantidad) + ")\n";
    });
    var env = envioDe(d.cp);
    t += "\nPlatos: " + euros(total()) + "\nEnvío: " + precioEnvio(env) + "\nTotal: " + euros(total() + env) + "\n\n";
    t += "Día: " + fechaBonita(d.fecha) + "\nHora: " + d.hora + "\n";
    t += "Dirección: " + d.direccion + ", " + d.cp + (d.cp === "28109" ? " La Moraleja (Alcobendas)" : " Madrid") + "\n";
    t += "Nombre: " + d.nombre + "\nTeléfono: " + d.telefono + "\n";
    if (d.notas) t += "Comentarios: " + d.notas + "\n";
    t += "\nPago al recibir el pedido.";
    return t;
  }
  function asunto() { var d = datos(); return "Pedido Zarroz · " + fechaBonita(d.fecha) + " · " + d.nombre; }
  function confirmar(html) { okEl.innerHTML = html; okEl.hidden = false; }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!validar()) return;
    window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent(asunto()) + "&body=" + encodeURIComponent(textoPedido());
    confirmar("<p><strong>Se ha abierto tu correo con el pedido escrito.</strong> Revísalo y pulsa enviar.</p><p>Si no se ha abierto, usa «Copiar el pedido» y pégalo en un email a " + esc(C.email) + ".</p>");
  });

  $('[data-canal="whatsapp"]').addEventListener("click", function () {
    if (!validar()) return;
    window.open("https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(textoPedido()), "_blank", "noopener");
  });

  $('[data-canal="copiar"]').addEventListener("click", function () {
    if (!validar()) return;
    var t = "Para: " + C.email + "\nAsunto: " + asunto() + "\n\n" + textoPedido();
    var hecho = function () { confirmar("<p><strong>Pedido copiado.</strong> Pégalo en un email a " + esc(C.email) + " y envíalo.</p>"); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(t).then(hecho, function () { mostrarTexto(t); });
    } else { mostrarTexto(t); }
  });
  function mostrarTexto(t) {
    confirmar('<p>Selecciona este texto, cópialo y envíalo a ' + esc(C.email) + ':</p><textarea readonly style="width:100%;min-height:200px;font:inherit;font-size:.9rem">' + esc(t) + "</textarea>");
  }

  pintar();

  /* ---------- Eventos ---------- */
  var evForm = $("#evento-form");
  if (evForm) {
    var rango = $("#ev-rango"), evPersonas = $("#f-ev-personas"), evError = $("#ev-error"), evOk = $("#ev-ok");
    var precios = (C.arroces || []).concat(C.fideuas || []).map(function (p) { return p.precio; });
    var precioMin = precios.length ? Math.min.apply(null, precios) : 0;
    var evFecha = $("#f-ev-fecha"); evFecha.min = fecha.min;

    function calcular(n) {
      n = Math.max(1, parseInt(n, 10) || 0);
      var pae = Math.ceil(n / MAX);
      $("#ev-personas-txt").textContent = n;
      $("#ev-paelleras").textContent = pae + (pae === 1 ? " paellera" : " paelleras");
      $("#ev-raciones").textContent = n + " raciones";
      $("#ev-precio").textContent = "desde " + euros(n * precioMin);
    }
    rango.addEventListener("input", function () { evPersonas.value = rango.value; calcular(rango.value); });
    evPersonas.addEventListener("input", function () { rango.value = evPersonas.value; calcular(evPersonas.value); });
    calcular(rango.value);

    function evDatos() {
      var o = {};
      new FormData(evForm).forEach(function (v, k) { o[k] = String(v).trim(); });
      return o;
    }
    function evValidar() {
      $$("[aria-invalid]", evForm).forEach(function (e) { e.removeAttribute("aria-invalid"); });
      var faltan = $$("[required]", evForm).filter(function (i) { return !i.value.trim(); });
      faltan.forEach(function (i) { i.setAttribute("aria-invalid", "true"); });
      var errores = [];
      if (faltan.length) errores.push("Completa: " + faltan.map(function (i) { return $('label[for="' + i.id + '"]').textContent.toLowerCase(); }).join(", ") + ".");
      if (evFecha.value && evFecha.value < evFecha.min) { evFecha.setAttribute("aria-invalid", "true"); errores.push("La fecha no puede ser anterior a hoy."); }
      evError.hidden = !errores.length;
      evError.textContent = errores.join(" ");
      if (faltan.length) faltan[0].focus();
      return !errores.length;
    }
    function textoEvento() {
      var d = evDatos();
      var t = "Hola, Zarroz. Quiero pedir presupuesto para un evento:\n\n";
      t += "Fecha: " + fechaBonita(d.fecha) + "\nInvitados: " + d.personas + "\nFormato: " + d.formato + "\nLugar: " + d.lugar + "\n";
      t += "Alergias o intolerancias: " + (d.alergias ? "sí" : "no") + "\n";
      t += "Nombre: " + d.nombre + "\nContacto: " + d.contacto + "\n";
      if (d.notas) t += "Comentarios: " + d.notas + "\n";
      return t;
    }
    function evAsunto() { var d = evDatos(); return "Evento Zarroz · " + fechaBonita(d.fecha) + " · " + d.personas + " invitados"; }

    if (C.whatsapp) $('[data-ev-canal="whatsapp"]').hidden = false;
    $('[data-ev-canal="whatsapp"]').addEventListener("click", function () {
      if (!evValidar()) return;
      window.open("https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(textoEvento()), "_blank", "noopener");
    });
    evForm.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!evValidar()) return;
      window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent(evAsunto()) + "&body=" + encodeURIComponent(textoEvento());
      evOk.innerHTML = "<p><strong>Se ha abierto tu correo con los datos del evento.</strong> Revísalo y pulsa enviar.</p><p>Si no se ha abierto, escríbenos a " + esc(C.email) + ".</p>";
      evOk.hidden = false;
    });
  }
})();
