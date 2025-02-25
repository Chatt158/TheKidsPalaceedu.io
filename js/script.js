document.querySelector(".icon-menu").addEventListener("click", function (event) {
  event.preventDefault();
  document.body.classList.toggle("menu-open");
});

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    const parent = currentItem.parentNode;
    const isOneSpoller = parent.hasAttribute("data-one-spoller");

    if (isOneSpoller) {
      const allItems = parent.querySelectorAll("[data-spoller]");
      allItems.forEach((item) => {
        if (item !== currentItem) {
          const otherContent = item.querySelector(".spollers-faq__text");
          item.classList.remove("active");
          otherContent.style.maxHeight = null;
        }
      });
    }

    if (currentItem.classList.contains("active")) {
      currentItem.classList.remove("active");
      content.style.maxHeight = null;
    } else {
      currentItem.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Función para animar el contador
function animateCounter(element, target, delay = 0) {
  setTimeout(() => {
    let current = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    const isGraduates = target === 2700;
    
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.classList.add('animate');
      
      function update() {
        current += increment;
        if (current >= target) {
          element.textContent = isGraduates ? `${target.toLocaleString()}+` : `${target}+`;
          return;
        }
        
        if (isGraduates) {
          element.textContent = `${Math.floor(current).toLocaleString()}+`;
        } else {
          element.textContent = `${Math.floor(current)}+`;
        }
        
        requestAnimationFrame(update);
      }
      
      update();
    }, 200);
    
  }, delay);
}

// Observer para detectar cuando la sección es visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.stats__number');
      numbers.forEach((number, index) => {
        const delay = index * 600;
        const target = parseInt(number.textContent);
        animateCounter(number, target, delay);
        
        const text = number.nextElementSibling;
        setTimeout(() => {
          text.style.opacity = '1';
          text.classList.add('animate');
        }, delay + 400);
      });
      
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.7,
  rootMargin: '-100px'
});

// Observar la sección de estadísticas
const statsSection = document.querySelector('.stats');
if (statsSection) {
  observer.observe(statsSection);
}

// Observer para el título de About
const observerAbout = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observerAbout.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5,
  rootMargin: '-50px'
});

// Observar el título de About
const aboutTitle = document.querySelector('.about__title');
if (aboutTitle) {
  observerAbout.observe(aboutTitle);
}

// Observer para la sección de maestras
const observerServices = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observerServices.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '-50px'
});

// Observar la sección de servicios
const servicesSection = document.querySelector('.services');
if (servicesSection) {
  observerServices.observe(servicesSection);
}
