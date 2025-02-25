document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel__track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel__button--right');
  const prevButton = document.querySelector('.carousel__button--left');
  const dotsNav = document.querySelector('.carousel__nav');
  const dots = Array.from(dotsNav.children);

  // Configurar el tamaño de los slides
  const slideWidth = slides[0].getBoundingClientRect().width;
  
  // Asegurar que todas las imágenes se carguen antes de iniciar el carrusel
  const preloadImages = () => {
    slides.forEach(slide => {
      const img = slide.querySelector('img');
      if (img) {
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
      }
    });
  };
  
  // Esperar a que todas las imágenes estén cargadas
  Promise.all(Array.from(document.images).map(img => {
    if (img.complete) return Promise.resolve(img.naturalHeight !== 0);
    return new Promise(resolve => {
      img.addEventListener('load', () => resolve(true));
      img.addEventListener('error', () => resolve(false));
    });
  })).then(() => {
    preloadImages();
    track.style.transition = 'transform 0.5s ease-in-out';
  });

  // Establecer el primer slide como actual
  slides[0].classList.add('current-slide');

  const moveToSlide = (currentSlide, targetSlide) => {
    const targetIndex = slides.findIndex(slide => slide === targetSlide);
    const moveAmount = -targetIndex * 100;
    requestAnimationFrame(() => {
      track.style.transform = `translateX(${moveAmount}%)`;
    });
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  }

  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('active');
    targetDot.classList.add('active');
  }

  // Click en botón previo
  prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
    const currentDot = dotsNav.querySelector('.active');
    const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];

    moveToSlide(currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
  });

  // Click en botón siguiente
  nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling || slides[0];
    const currentDot = dotsNav.querySelector('.active');
    const nextDot = currentDot.nextElementSibling || dots[0];

    moveToSlide(currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
  });

  // Click en los indicadores
  dotsNav.addEventListener('click', e => {
    const targetDot = e.target;
    if (!targetDot.classList.contains('carousel__indicator')) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.active');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
  });

  // Avance automático
  let slideInterval = setInterval(autoSlide, 5000);

  function autoSlide() {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling || slides[0];
    const currentDot = dotsNav.querySelector('.active');
    const nextDot = currentDot.nextElementSibling || dots[0];

    moveToSlide(currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
  }

  // Pausar el carrusel al hover
  track.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  track.addEventListener('mouseleave', () => {
    slideInterval = setInterval(autoSlide, 5000);
  });

  // Ajustar el tamaño del carrusel cuando cambie el tamaño de la ventana
  window.addEventListener('resize', () => {
    preloadImages();
  });

  // Prevenir el arrastre de imágenes
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    if (img) {
      img.addEventListener('dragstart', (e) => e.preventDefault());
    }
  });
}); 