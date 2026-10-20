# Zarroz · web

Web de Zarroz (arroces valencianos a domicilio en Madrid). Web estática: HTML, CSS y JavaScript, sin base de datos. Se publica con GitHub Pages.

## Qué hay en cada sitio

- `index.html`: la página principal.
- `aviso-legal.html`, `privacidad.html`, `cookies.html`: textos legales (borrador).
- `assets/js/config.js`: **datos editables**: carta, precios, email, teléfono, WhatsApp, Instagram.
- `assets/css/styles.css`: colores, tipografías y diseño.
- `assets/img/`: logotipos, isotipo, ilustraciones, patrones y foto de textura.
- `assets/fonts/`: tipografías gratuitas (Jost y Big Shoulders Display, licencia OFL).
- `robots.txt`: ahora bloquea a los buscadores porque la web está en pruebas.

## Cómo cambiar precios, platos o datos de contacto

1. En GitHub, entra en `assets/js/config.js`.
2. Pulsa el icono del lápiz (Edit).
3. Cambia lo que necesites respetando las comillas y las comas.
4. Pulsa **Commit changes**. En uno o dos minutos la web se actualiza.

Si dejas un dato vacío (`""`), su botón no aparece. Por ejemplo, al rellenar `whatsapp` aparece el botón "Enviar por WhatsApp".

## Pendiente antes de lanzar

- [ ] Precios reales de cada arroz.
- [ ] Teléfono, WhatsApp e Instagram (si se van a usar).
- [ ] NIF, domicilio social y datos registrales en los textos legales.
- [ ] Revisión de los textos legales por un asesor.
- [ ] Información de alérgenos de cada plato.
- [ ] Licencias web de Guaro y Futura PT (o quedarse con las gratuitas).
- [ ] Crear el alias pedidos@zarroz.com y probar que llegan los correos.

## Día del lanzamiento

1. `config.js`: poner `enPruebas: false`.
2. Borrar la línea `<meta name="robots" content="noindex, nofollow">` de las cuatro páginas HTML.
3. Cambiar `robots.txt` para permitir buscadores.
4. Conectar el dominio zarroz.com (GitHub Pages + DNS en GoDaddy, sin tocar los registros de correo).
