document.addEventListener("DOMContentLoaded", function () {
  // --- ELEMENTOS PRINCIPALES ---
  const audio = document.getElementById("musica");
  const modal = document.getElementById("modalBienvenida");
  const btnCerrarModal = document.getElementById("cerrarModal");
  const btnMusica = document.getElementById("toggleMusica");
  const elementosTraducibles = document.querySelectorAll("[data-es][data-en]");
  const selectorIdioma = document.getElementById("cambiarIdioma");
  // en tu HTML el img de la fecha está dentro de #fecha-boda pero no tiene id,
  // así que lo buscamos por selector para evitar errores
  const imagenFecha = document.querySelector("#fecha-boda img");
  const imagenBienvenida = modal ? modal.querySelector("img") : null;

  // --- FUNCIONALIDAD DE MODAL Y BOTÓN "Dinos Tammy" ---
  if (btnCerrarModal) {
    btnCerrarModal.addEventListener("click", () => {
      if (modal) modal.style.display = "none";
      if (audio) {
        // intenta reproducir audio (si el navegador lo permite)
        audio.play().catch(() => {});
      }
    });
  }

  // --- CONTROL DE MÚSICA ---
  function actualizarBotonMusica() {
    if (!btnMusica) return;
    if (!audio) {
      btnMusica.textContent = ""; // nada si no hay audio
      return;
    }
    // Mantengo sólo los símbolos (como tenías) para no alterar textos/estética.
    if (audio.paused) {
      btnMusica.innerHTML = String.fromCodePoint(0x1D160) //+ "<br><small>Enciende música</small>";
    } else {
      btnMusica.innerHTML = String.fromCodePoint(0x1D194) //+ "<br><small>Apaga música</small>";
    }
  }

  if (btnMusica && audio) {
    btnMusica.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
      actualizarBotonMusica();
    });
  }

  actualizarBotonMusica();

  // --- CARRUSEL ---
  const imagenes = [
    "imagenes/galeria/1.jpg",
    "imagenes/galeria/2.jpg",
    "imagenes/galeria/3.jpg",
    "imagenes/galeria/4.jpg",
    "imagenes/galeria/5.jpg",
    "imagenes/galeria/6.jpg",
    "imagenes/galeria/7.jpg",
    "imagenes/galeria/8.jpg",
    "imagenes/galeria/9.jpg",
    "imagenes/galeria/10.jpg"
  ];

  let indice = 0;
  const imagenCarrusel = document.getElementById("imagenCarrusel");
  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");

  function mostrarImagen() {
    if (imagenCarrusel) imagenCarrusel.src = imagenes[indice];
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      indice = (indice - 1 + imagenes.length) % imagenes.length;
      mostrarImagen();
    });
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      indice = (indice + 1) % imagenes.length;
      mostrarImagen();
    });
  }

  if (imagenCarrusel) {
    let startX = 0;
    imagenCarrusel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    imagenCarrusel.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
        indice = (indice + 1) % imagenes.length;
        mostrarImagen();
      } else if (endX - startX > 50) {
        indice = (indice - 1 + imagenes.length) % imagenes.length;
        mostrarImagen();
      }
    });
  }

  mostrarImagen();

  // --- CUENTA REGRESIVA ---
  const fechaBoda = new Date(2026, 5, 29, 15, 0, 0);

  function actualizarCuentaRegresiva() {
    const ahora = new Date();
    const diferencia = fechaBoda - ahora;

    if (diferencia <= 0) {
      const ids = ['dias', 'horas', 'minutos', 'segundos'];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = 0;
      });
      clearInterval(intervalo);
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    const elDias = document.getElementById('dias');
    const elHoras = document.getElementById('horas');
    const elMin = document.getElementById('minutos');
    const elSeg = document.getElementById('segundos');

    if (elDias) elDias.textContent = dias;
    if (elHoras) elHoras.textContent = horas;
    if (elMin) elMin.textContent = minutos;
    if (elSeg) elSeg.textContent = segundos;
  }

  const intervalo = setInterval(actualizarCuentaRegresiva, 1000);
  actualizarCuentaRegresiva();

  // --- TRADUCCIÓN ---
  let currentLang = "es";

  function aplicarIdioma(idioma) {
    currentLang = idioma || 'es';

    // elementos traducibles: si dataset[idioma] está vacío o no existe, se mantiene el innerHTML original
    elementosTraducibles.forEach(el => {
      const texto = el.dataset ? el.dataset[idioma] : undefined;
      if (typeof texto !== "undefined" && texto !== "") {
        el.innerHTML = texto;
      }
    });

    // Cambiar imágenes específicas sólo si los elementos realmente existen
    if (imagenFecha) {
      imagenFecha.src = (idioma === "en") ? "imagenes/fechaEN.png" : "imagenes/fecha.png";
    }
    if (imagenBienvenida) {
      imagenBienvenida.src = (idioma === "en") ? "imagenes/bienvenidaEN.jpg" : "imagenes/bienvenida.jpg";
    }

    // Actualizar texto del botón modal ("Dinos Tammy")
    if (btnCerrarModal && btnCerrarModal.dataset) {
      const txt = btnCerrarModal.dataset[idioma];
      if (txt) btnCerrarModal.textContent = txt;
    }

    // Mantener el texto del botón de música consistente con estado actual
    actualizarBotonMusica();
  }

  // --- Detectar idioma por URL ---
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang");
  if (langParam === "en") {
    aplicarIdioma("en");
    if (selectorIdioma) selectorIdioma.value = "en";
  } else {
    aplicarIdioma("es");
    if (selectorIdioma) selectorIdioma.value = "es";
  }

  // --- Cambiar idioma con selector ---
  if (selectorIdioma) {
    selectorIdioma.addEventListener("change", () => {
      const nuevoIdioma = selectorIdioma.value || 'es';
      aplicarIdioma(nuevoIdioma);
      // opcional: actualizar URL sin recargar (mantén si quieres)
      const url = new URL(window.location.href);
      url.searchParams.set('lang', nuevoIdioma);
      window.history.replaceState({}, '', url);
    });
  }

  // --- limpieza: eliminar bloques redundantes u obsoletos que podían causar errores ---
  // (no hace nada: sólo evitar tener referencias a ids que no existen)

});
