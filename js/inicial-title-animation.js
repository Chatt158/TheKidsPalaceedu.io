document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.main_inicial .main__title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    
    // Crear span para cada letra
    [...text].forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.className = 'animated-letter';
        
        // Aplicar la animación con retraso progresivo
        span.style.animation = `popIn 0.6s ease forwards ${i * 0.1}s`;
        
        // Agregar clase para mantener visible después de la animación
        setTimeout(() => {
            span.classList.add('visible');
        }, (i * 100) + 600);
        
        title.appendChild(span);
    });

    // Efecto de onda al pasar el mouse
    title.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('animated-letter')) {
            const letters = document.querySelectorAll('.animated-letter');
            const index = Array.from(letters).indexOf(e.target);
            
            letters.forEach((letter, i) => {
                const distance = Math.abs(index - i);
                const delay = distance * 0.1;
                
                letter.style.animation = `rubberBand 0.8s ease ${delay}s forwards`;
            });
        }
    });
}); 