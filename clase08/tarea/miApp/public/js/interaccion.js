const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Header sólido al hacer scroll
const header = document.querySelector('.header');

function actualizarHeader() {
  header.classList.toggle('header--solido', window.scrollY > 60);
}

window.addEventListener('scroll', actualizarHeader, { passive: true });
actualizarHeader();

// Aparición de bloques al entrar en pantalla
const bloques = document.querySelectorAll('.revelar');

if ('IntersectionObserver' in window && !reducirMovimiento) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        contarNumeros(entrada.target);
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  bloques.forEach((bloque) => {
    bloque.classList.add('por-aparecer');
    observador.observe(bloque);
  });
}

// Conteo animado de las cifras
function contarNumeros(bloque) {
  bloque.querySelectorAll('[data-numero]').forEach((elemento) => {
    const final = Number(elemento.dataset.numero);
    const duracion = 1400;
    const inicio = performance.now();

    function paso(ahora) {
      const avance = Math.min((ahora - inicio) / duracion, 1);
      const suave = 1 - Math.pow(1 - avance, 3);
      elemento.textContent = Math.round(final * suave);
      if (avance < 1) {
        requestAnimationFrame(paso);
      }
    }

    requestAnimationFrame(paso);
  });
}
