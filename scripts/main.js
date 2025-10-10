document.addEventListener("DOMContentLoaded", function () {
    // --- ELEMENTOS PRINCIPALES ---
    const audio = document.getElementById("musica");
    const modal = document.getElementById("modalBienvenida");
    const btnCerrarModal = document.getElementById("cerrarModal");
    const btnMusica = document.getElementById("toggleMusica");
    const elementosTraducibles = document.querySelectorAll("[data-es][data-en]");
    const selectorIdioma = document.getElementById("cambiarIdioma");
    const btnLangToggle = document.getElementById("btn-lang-toggle");
    const imagenFecha = document.getElementById("imagen-fecha");
    const imagenBienvenida = modal.querySelector("img");

    // --- OBJETO DE IMÁGENES ---
    const images = {
        bienvenida: { es: "imagenes/bienvenida.jpg", en: "imagenes/bienvenidaEN.jpg" },
        fecha: { es: "imagenes/fecha.png", en: "imagenes/fechaEN.png" }
    };

    // --- FUNCIONALIDAD DE MODAL ---
    btnCerrarModal.addEventListener("click", () => {
        modal.style.display = "none";
        audio.play();
    });

    // --- CONTROL DE MÚSICA ---
    function actualizarBotonMusica() {
        if (audio.paused) {
            btnMusica.innerHTML = String.fromCodePoint(0x1D160); // 🎵
        } else {
            btnMusica.innerHTML = String.fromCodePoint(0x1D194); // 🎶
        }
    }

    btnMusica.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        actualizarBotonMusica();
        aplicarIdioma(currentLang); // Actualiza texto si cambia idioma
    });

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
        imagenCarrusel.src = imagenes[indice];
    }

    btnPrev.addEventListener("click", () => {
        indice = (indice - 1 + imagenes.length) % imagenes.length;
        mostrarImagen();
    });

    btnNext.addEventListener("click", () => {
        indice = (indice + 1) % imagenes.length;
        mostrarImagen();
    });

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

    mostrarImagen();

    // --- CUENTA REGRESIVA ---
    const fechaBoda = new Date(2026, 5, 29, 15, 0, 0);

    function actualizarCuentaRegresiva() {
        const ahora = new Date();
        const diferencia = fechaBoda - ahora;

        if (diferencia <= 0) {
            document.getElementById("dias").textContent = 0;
            document.getElementById("horas").textContent = 0;
            document.getElementById("minutos").textContent = 0;
            document.getElementById("segundos").textContent = 0;
            clearInterval(intervalo);
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("dias").textContent = dias;
        document.getElementById("horas").textContent = horas;
        document.getElementById("minutos").textContent = minutos;
        document.getElementById("segundos").textContent = segundos;
    }

    const intervalo = setInterval(actualizarCuentaRegresiva, 1000);
    actualizarCuentaRegresiva();

    // --- TRADUCCIÓN ---
    let currentLang = "es";

    function aplicarIdioma(idioma) {
        currentLang = idioma;
        elementosTraducibles.forEach(el => (el.innerHTML = el.dataset[idioma]));

        // Cambiar imágenes
        if (imagenBienvenida) imagenBienvenida.src = images.bienvenida[idioma];
        if (imagenFecha) imagenFecha.src = images.fecha[idioma];

        // Actualizar botones
        btnCerrarModal.textContent = btnCerrarModal.dataset[idioma];
        actualizarBotonMusica();
        selectorIdioma.value = idioma;
    }

    // --- Detectar idioma por URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    if (langParam === "en") {
        aplicarIdioma("en");
    } else {
        aplicarIdioma("es");
    }

    // --- Cambiar idioma con selector ---
    selectorIdioma.addEventListener("change", () => {
        aplicarIdioma(selectorIdioma.value);
    });

    // --- Toggle de idioma ---
    if (btnLangToggle) {
        btnLangToggle.addEventListener("click", () => {
            const newLang = currentLang === "es" ? "en" : "es";
            aplicarIdioma(newLang);
        });
    }
});
