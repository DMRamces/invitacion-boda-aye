document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("musica");
    const btn = document.getElementById("toggleMusica");
  
    btn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        btn.textContent = String.fromCodePoint(0x1D194); // Pausa
      } else {
        audio.pause();
        btn.textContent = String.fromCodePoint(0x1D160); // Play
      }
    });
  });
  
  // Carrusel de imágenes
const imagenes = [
  "imagenes/galeria/1.jpg",
  "imagenes/galeria/2.jpg",
  "imagenes/galeria/3.jpg",
  "imagenes/galeria/4.jpg"
];

let indice = 0;
const imagen = document.getElementById("imagenCarrusel");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

btnPrev.addEventListener("click", () => {
  indice = (indice - 1 + imagenes.length) % imagenes.length;
  imagen.src = imagenes[indice];
});

btnNext.addEventListener("click", () => {
  indice = (indice + 1) % imagenes.length;
  imagen.src = imagenes[indice];
});

// Modal de bienvenida
const modal = document.getElementById("modalBienvenida");
const cerrarModal = document.getElementById("cerrarModal");

if (!sessionStorage.getItem("modalMostrado")) {
  modal.style.display = "flex";
  sessionStorage.setItem("modalMostrado", "true");
}

cerrarModal.addEventListener('click', () => {
  modal.style.display = "none";
  
  // Obtener el audio
  const audio = document.getElementById("musica");
  
  // Reproducir música si está pausada
  if (audio.paused) {
    audio.play().catch(e => {
      console.log("Error al intentar reproducir la música:", e);
    });
  }
});


// Modales de asistencia
document.querySelectorAll('.modal-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const modalId = this.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'block';
  });
});

document.querySelectorAll('.modal-info .cerrar').forEach(btn => {
  btn.addEventListener('click', function () {
    this.closest('.modal-info').style.display = 'none';
  });
});

window.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-info')) {
    e.target.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Abre el modal correspondiente cuando se hace clic en un botón
  const openModalButtons = document.querySelectorAll('.open-modal-btn');
  const modals = document.querySelectorAll('.custom-modal');
  const closeButtons = document.querySelectorAll('.close-btn');
  const closeModalButtons = document.querySelectorAll('.close-modal-btn');

  openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
          const modalId = button.getAttribute('data-modal');
          const modal = document.getElementById(modalId);
          modal.style.display = 'flex'; // Abre el modal
      });
  });

  // Cerrar los modales cuando se hace clic en la X
  closeButtons.forEach(button => {
      button.addEventListener('click', () => {
          const modal = button.closest('.custom-modal');
          modal.style.display = 'none';
      });
  });

  // Cerrar los modales cuando se hace clic en el botón de "Cerrar"
  closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
          const modal = button.closest('.custom-modal');
          modal.style.display = 'none';
      });
  });

  // Cerrar el modal si se hace clic fuera del contenido del modal
  modals.forEach(modal => {
      modal.addEventListener('click', (event) => {
          if (event.target === modal) {
              modal.style.display = 'none';
          }
      });
  });
});

// Cuenta regresiva
const fechaObjetivo = new Date("2026-05-29T15:00:00").getTime(); // ejemplo

setInterval(() => {
  const ahora = new Date().getTime();
  const distancia = fechaObjetivo - ahora;

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = dias.toString().padStart(2, "0");
  document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
  document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
  document.getElementById("segundos").textContent = segundos.toString().padStart(2, "0");
}, 1000);
