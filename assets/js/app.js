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
  if (C.instagram) {
    $$("[data-ig]").forEach(function (a) { a.href = C.instagram; a.target = "_blank"; a.rel = "noopener"; });
    var usuario = C.instagram.replace(/\/+$/, "").split("/").pop();
    if (usuario) $$("[data-ig-usuario]").forEach(function (e) { e.textContent = "@" + usuario; });
  }

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

  /* ---------- Fluidez: aparición suave ---------- */
  var sinMovimiento = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  // El agua de la portada se queda quieta si el usuario pide menos movimiento
  if (sinMovimiento) $$(".portada__fondo").forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
  if ("IntersectionObserver" in window && !sinMovimiento) {
    var obsAparece = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visto"); obsAparece.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$("main > section .contenedor > *").forEach(function (el) {
      if (el.closest(".pedido") || el.closest(".carta__pestanas")) return; // el pedido y las pestañas, siempre quietos
      if (el.getBoundingClientRect().top < innerHeight) return; // lo que ya se ve al cargar, sin animar
      el.classList.add("aparece");
      obsAparece.observe(el);
    });
  }

  /* ---------- Eventos (página eventos.html) ---------- */
  var evForm = $("#evento-form");
  if (evForm) {
    var evError = $("#ev-error"), evOk = $("#ev-ok");
    // Si se llega desde "Empresas" o "Celebraciones", se apunta en los comentarios
    var tipoEv = (location.search.match(/[?&]tipo=(empresa|celebracion)/) || [])[1];
    if (tipoEv && !$("#f-ev-notas").value) $("#f-ev-notas").value = tipoEv === "empresa" ? "Evento de empresa. " : "Celebración. ";
    var evFecha = $("#f-ev-fecha"); var hoyEv = new Date(); hoyEv.setMinutes(hoyEv.getMinutes() - hoyEv.getTimezoneOffset()); evFecha.min = hoyEv.toISOString().slice(0, 10);

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
  // Ilustración pequeña a la izquierda de cada plato (opcional, campo "icono" en config.js)
  function icono(nombre) {
    if (!nombre) return "";
    var u = "assets/img/ilustraciones/" + encodeURIComponent(nombre) + ".svg";
    return '<span class="ilu plato__icono" aria-hidden="true" style="-webkit-mask-image:url(' + u + ');mask-image:url(' + u + ')"></span>';
  }

  // Opiniones de clientes (las marcadas como ejemplo solo se ven con la web en pruebas)
  var opiniones = (C.opiniones || []).filter(function (o) { return !o.ejemplo || C.enPruebas; });
  if (opiniones.length && $("#lista-opiniones")) {
    $("#lista-opiniones").innerHTML = opiniones.map(function (o) {
      return '<li class="opinion">' + (o.ejemplo ? '<span class="opinion__ejemplo">Ejemplo</span>' : "") +
        '<blockquote>«' + esc(o.texto) + '»</blockquote><p class="opinion__autor"><strong>' + esc(o.nombre) + "</strong>" +
        (o.detalle ? " · " + esc(o.detalle) : "") + "</p></li>";
    }).join("");
    $("#opiniones").hidden = false;
  }

  // Redes: cinta con el usuario que se desplaza y tira de fotos (o ilustraciones mientras no haya fotos)
  var R = C.redes || {};
  if ($("#redes")) {
    var usuario = R.usuario || "@zarroz";
    var trozo = '<span>' + esc(usuario) + '</span><span class="ilu" aria-hidden="true" style="-webkit-mask-image:url(assets/img/instagram.svg);mask-image:url(assets/img/instagram.svg)"></span>';
    $("#redes-pista").innerHTML = new Array(17).join(trozo);
    var cinta = $("#redes-cinta");
    cinta.setAttribute("aria-label", "Síguenos en Instagram: " + usuario);
    if (C.instagram) { cinta.href = C.instagram; cinta.target = "_blank"; cinta.rel = "noopener"; }
    else cinta.removeAttribute("href");
    var fotos = (R.fotos || []).map(function (f) { return '<img src="assets/img/redes/' + encodeURIComponent(f) + '" alt="" loading="lazy">'; });
    if (!fotos.length) {
      fotos = ["gente-amigos", "plato-fideua-carabineros", "brindis", "cuchara-socarrat", "gente-sobremesa", "plato-croquetas", "gente-cocinero", "manos-y-paellera", "gente-servir-plato", "plato-bogavante"]
        .map(function (n, i) {
          var u = "assets/img/ilustraciones/" + n + ".svg";
          return '<span class="redes-tira__hueco redes-tira__hueco--' + (i % 3) + '"><span class="ilu" style="-webkit-mask-image:url(' + u + ');mask-image:url(' + u + ')"></span></span>';
        });
    }
    // Se repite la tira para que el desplazamiento sea continuo
    $("#redes-fotos").innerHTML = '<div class="redes-tira__pista-fotos">' + fotos.join("") + fotos.join("") + "</div>";
  }

  // Si todos los arroces y fideuàs cuestan lo mismo, el precio se dice una vez arriba
  var paelleras = (C.arroces || []).concat(C.fideuas || []);
  var pu = $("[data-precio-unico]");
  var precioUnico = pu && paelleras.length && paelleras.every(function (a) { return a.precio === paelleras[0].precio; }) ? paelleras[0].precio : null;
  if (precioUnico !== null) {
    pu.innerHTML = "Todos nuestros arroces y fideuàs a <strong>" + euros(precioUnico) + "</strong> la ración";
    pu.hidden = false;
    $$("[data-precio-nota]").forEach(function (e) { e.textContent = ""; });
  }

  // Arroces y fideuà van en paellera (tipo "arroz": mínimo y máximo de raciones)
  function platoPaellera(a, k, lista) {
    pedido[k] = { nombre: a.nombre, precio: a.precio, cantidad: 0, tipo: "arroz" };
    var li = document.createElement("li");
    li.className = "plato"; li.dataset.fila = k;
    var info = [a.descripcion ? esc(a.descripcion) : "", precioUnico === null ? '<span class="plato__precio">' + euros(a.precio) + " / ración</span>" : ""].filter(Boolean).join(" · ");
    li.innerHTML = '<div class="plato__cuerpo">' + icono(a.icono) + '<div>' + (a.etiqueta ? '<span class="plato__etiqueta">' + esc(a.etiqueta) + '</span>' : "") +
      '<p class="plato__nombre">' + esc(a.nombre) + '</p>' + (a.anfitrion ? '<p class="plato__anfitrion">' + esc(a.anfitrion) + '</p>' : "") + (info ? '<p class="plato__info">' + info + '</p>' : "") + '</div></div>' +
      '<div class="plato__opciones"><div class="opcion opcion--arroz">' + contador(k, "Raciones de " + esc(a.nombre)) +
      '<span class="opcion__min" data-min-de="' + k + '">Mín. ' + MIN + ' raciones</span></div></div>';
    lista.appendChild(li);
  }
  (C.arroces || []).forEach(function (a, i) {
    var lista = $("#lista-" + (a.grupo || "carne")) || $("#lista-carne");
    platoPaellera(a, "a" + i, lista);
  });
  (C.fideuas || []).forEach(function (a, i) { platoPaellera(a, "f" + i, $("#lista-fideua")); });

  // Entrantes y vinos: se piden por unidades, con uno o varios tamaños
  function platosSueltos(items, prefijo, lista) {
    if (!lista) return;
    (items || []).forEach(function (e, i) {
      var li = document.createElement("li");
      li.className = "plato";
      var opts = "";
      var precios = [];
      e.opciones.forEach(function (o, j) {
        var k = prefijo + i + "_" + j;
        var nombre = e.opciones.length > 1 ? e.nombre + " (" + o.nombre.toLowerCase() + ")" : e.nombre;
        pedido[k] = { nombre: nombre, precio: o.precio, cantidad: 0, tipo: "entrante" };
        precios.push(e.opciones.length > 1 ? o.nombre + (o.detalle ? " (" + o.detalle + ")" : "") + " " + euros(o.precio) : euros(o.precio));
        opts += '<div class="opcion" data-fila="' + k + '">' +
          (e.opciones.length > 1 ? '<span class="opcion__etiqueta">' + esc(o.nombre) + '</span>' : "") +
          contador(k, esc(nombre)) + "</div>";
      });
      var info = precios.join(", ") + (e.nota ? ". " + esc(e.nota) : "");
      li.innerHTML = '<div class="plato__cuerpo">' + icono(e.icono) + '<div><p class="plato__nombre">' + esc(e.nombre) + '</p><p class="plato__info">' + info + '</p></div></div>' +
        '<div class="plato__opciones">' + opts + "</div>";
      lista.appendChild(li);
    });
  }
  platosSueltos(C.entrantes, "e", listaEntrantes);
  platosSueltos(C.vinos, "v", $("#lista-vinos"));

  // Oculta los apartados de la carta que se queden vacíos (y su pestaña)
  $$(".carta__grupo").forEach(function (g) {
    var ul = $("ul", g);
    if (ul && !ul.children.length) {
      g.hidden = true;
      var p = $('[data-pestana="' + g.id + '"]'); if (p) p.hidden = true;
    }
  });

  // Pestañas de la carta: filtran y muestran un apartado cada vez
  var grupos = $$(".carta__grupo").filter(function (g) { return !g.hidden; });
  function mostrarApartado(id) {
    grupos.forEach(function (g) { g.classList.toggle("visible", g.id === id); });
    $$("[data-pestana]").forEach(function (a) {
      var on = a.dataset.pestana === id;
      a.classList.toggle("activa", on);
      a.setAttribute("aria-selected", on);
      if (on) a.parentNode.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
    });
  }
  $$("[data-pestana]").forEach(function (a) {
    a.setAttribute("role", "tab");
    a.addEventListener("click", function (ev) { ev.preventDefault(); mostrarApartado(a.dataset.pestana); });
  });
  if (grupos.length) {
    $("#carta").classList.add("carta--filtrada");
    mostrarApartado(grupos[0].id);
  }

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
      totalEl = $("#pedido-total");

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
      var min = $('[data-min-de="' + k + '"]');
      if (min) min.textContent = p.cantidad ? p.cantidad + " raciones" : "Mín. " + MIN + " raciones";
    });
    var ls = lineas(), t = total();
    lineasEl.innerHTML = ls.map(function (p) {
      var cant = p.tipo === "arroz" ? p.cantidad + " raciones" : p.cantidad + " ×";
      return "<li><span>" + (p.tipo === "arroz" ? esc(p.nombre) + " · " + cant : cant + " " + esc(p.nombre)) + "</span><span>" + euros(p.precio * p.cantidad) + "</span></li>";
    }).join("");
    vacioEl.hidden = ls.length > 0;
    resumenEl.hidden = ls.length === 0;
    // Los datos de entrega solo se piden cuando ya hay algo en el pedido
    $("#pedido-form").hidden = ls.length === 0;
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

    // Botón «Pedir» de la cabecera (siempre visible): con platos, lleva al pedido y muestra el total
    var hayPedido = ls.length > 0, botonPedir = $("#cabecera-pedir");
    if (botonPedir) {
      botonPedir.textContent = hayPedido ? "Pedido · " + euros(t) : "Pedir";
      botonPedir.setAttribute("href", hayPedido ? "#pedido" : "#carta");
    }
  }

  cpEl.addEventListener("input", pintar);

  /* ---------- Formulario ---------- */
  var form = $("#pedido-form"), errorEl = $("#pedido-error"), okEl = $("#pedido-ok");
  var fecha = $("#f-fecha");
  var hoy = new Date(); hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  fecha.min = hoy.toISOString().slice(0, 10);
  var limite = new Date(hoy); limite.setDate(limite.getDate() + 60);
  fecha.max = limite.toISOString().slice(0, 10);

  // Solo las horas y los días en que repartimos (config.js → servicio)
  var S = C.servicio || {};
  var DIAS_SEMANA = ["domingos", "lunes", "martes", "miércoles", "jueves", "viernes", "sábados"];
  (S.horas || []).forEach(function (h) {
    var o = document.createElement("option"); o.value = o.textContent = h; $("#f-hora").appendChild(o);
  });
  function diaDeServicio(iso) {
    if (!iso || !S.dias) return true;
    var p = iso.split("-");
    if ((S.festivos && S.festivos[p[0]] || []).indexOf(iso) >= 0 || especial(iso)) return true;
    return S.dias.indexOf(new Date(+p[0], +p[1] - 1, +p[2]).getDay()) >= 0;
  }
  function textoDias() {
    return S.textoDias || (S.dias || []).map(function (d) { return DIAS_SEMANA[d]; }).join(", ");
  }
  $$("[data-dias-servicio]").forEach(function (e) { e.textContent = textoDias(); });
  function especial(iso) {
    return (S.especiales || []).filter(function (e) { return e.fecha === iso; })[0];
  }
  // En días especiales (Nochebuena, Nochevieja…) se ofrece también pedir por email o teléfono
  function avisoEspecial() {
    var e = especial(fecha.value), aviso = $("#fecha-especial");
    if (!e) { aviso.hidden = true; return; }
    var dia = fechaBonita(e.fecha);
    aviso.innerHTML = "<strong>" + esc(e.nombre) + " (" + esc(dia) + ").</strong> Ese día tenemos mucha demanda: si lo prefieres, pide escribiéndonos a <a href=\"mailto:" + esc(C.email) + "?subject=" + encodeURIComponent("Pedido " + e.nombre) + "\">" + esc(C.email) + "</a>" +
      (C.telefono ? " o llamándonos al <a href=\"tel:+34" + C.telefono.replace(/\s/g, "") + "\">" + esc(C.telefono) + "</a>" : "") + ".";
    aviso.hidden = false;
  }
  fecha.addEventListener("change", avisoEspecial);
  fecha.addEventListener("change", function () {
    var ok = diaDeServicio(fecha.value);
    if (ok) fecha.removeAttribute("aria-invalid"); else fecha.setAttribute("aria-invalid", "true");
    errorEl.hidden = ok;
    errorEl.textContent = ok ? "" : "Ese día no repartimos. Servimos " + textoDias() + ".";
  });
  if (C.confirmacion) $$("[data-confirmacion]").forEach(function (e) { e.textContent = C.confirmacion; });

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
    else if (!diaDeServicio(fecha.value)) { fecha.setAttribute("aria-invalid", "true"); errores.push("Ese día no repartimos. Servimos " + textoDias() + "."); }
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
  function confirmar(html) { okEl.innerHTML = html; okEl.hidden = false; okEl.scrollIntoView({ block: "nearest" }); }
  // Qué pasa después de enviar: se dice siempre igual, sea por WhatsApp, email o copiado
  function despues() {
    return "<p>Te confirmamos el pedido " + esc(C.confirmacion || "lo antes posible") + (C.whatsapp ? " por WhatsApp" : "") + "." +
      (C.telefono ? " Si no te llega nuestra respuesta, llámanos al " + esc(C.telefono) + "." : "") + "</p>";
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!validar()) return;
    window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent(asunto()) + "&body=" + encodeURIComponent(textoPedido());
    confirmar("<p><strong>Se ha abierto tu correo con el pedido escrito.</strong> Revísalo y pulsa enviar.</p>" + despues() + "<p>Si no se ha abierto, usa «Copiar el pedido» y pégalo en un email a " + esc(C.email) + ".</p>");
  });

  $('[data-canal="whatsapp"]').addEventListener("click", function () {
    if (!validar()) return;
    window.open("https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(textoPedido()), "_blank", "noopener");
    confirmar("<p><strong>Te hemos abierto WhatsApp con el pedido escrito.</strong> Solo tienes que pulsar enviar.</p>" + despues());
  });

  $('[data-canal="copiar"]').addEventListener("click", function () {
    if (!validar()) return;
    var t = "Para: " + C.email + "\nAsunto: " + asunto() + "\n\n" + textoPedido();
    var hecho = function () { confirmar("<p><strong>Pedido copiado.</strong> Pégalo en un email a " + esc(C.email) + " y envíalo.</p>" + despues()); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(t).then(hecho, function () { mostrarTexto(t); });
    } else { mostrarTexto(t); }
  });
  function mostrarTexto(t) {
    confirmar('<p>Selecciona este texto, cópialo y envíalo a ' + esc(C.email) + ':</p><textarea readonly style="width:100%;min-height:200px;font:inherit;font-size:.9rem">' + esc(t) + "</textarea>");
  }

  pintar();

})();
