document.addEventListener("DOMContentLoaded", function () {
  // 🎵 --- MÚSICA Y MODAL ---
  const audio = document.getElementById("musica");
  const modal = document.getElementById("modalBienvenida");
  const btnCerrarModal = document.getElementById("cerrarModal");
  const btnMusica = document.getElementById("toggleMusica");

  // Cerrar el modal y activar música
  btnCerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
    audio.play();
  });

  // Botón de encender/apagar música
  btnMusica.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      btnMusica.innerHTML = String.fromCodePoint(0x1D194) + "<br><small>Apaga música</small>"; // símbolo pausa
    } else {
      audio.pause();
      btnMusica.innerHTML = String.fromCodePoint(0x1D160) + "<br><small>Enciende música</small>"; // símbolo play
    }
  });

  // Estado inicial del botón de música
  btnMusica.innerHTML = String.fromCodePoint(0x1D194) + "<br><small>Apaga música</small>";

  // 🎞️ --- CARRUSEL ---
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
  const imagen = document.getElementById("imagenCarrusel");
  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");

  function mostrarImagen() {
    imagen.src = imagenes[indice];
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
  imagen.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  imagen.addEventListener("touchend", (e) => {
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
});

// 🎯 --- CUENTA REGRESIVA ---
const fechaBoda = new Date(2026, 5, 29, 15, 0, 0); // AAAA, MM-1, DD, HH, MM, SS

function actualizarCuentaRegresiva() {
  const ahora = new Date();
  const diferencia = fechaBoda - ahora;

  if (diferencia <= 0) {
    // Actualizamos todos los spans a 0 y mostramos mensaje
    document.getElementById('dias').textContent = 0;
    document.getElementById('horas').textContent = 0;
    document.getElementById('minutos').textContent = 0;
    document.getElementById('segundos').textContent = 0;
    clearInterval(intervalo);
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById('dias').textContent = dias;
  document.getElementById('horas').textContent = horas;
  document.getElementById('minutos').textContent = minutos;
  document.getElementById('segundos').textContent = segundos;
}

const intervalo = setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva();
