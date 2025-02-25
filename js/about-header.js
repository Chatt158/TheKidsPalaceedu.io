document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main_about');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        // Mover las mitades de la imagen en direcciones opuestas
        if (header.matches(':before')) {
            header.style.transform = `translateX(-${rate}px)`;
        }
        if (header.matches(':after')) {
            header.style.transform = `translateX(${rate}px)`;
        }
    });

    // Efecto al mover el mouse
    header.addEventListener('mousemove', function(e) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = header.getBoundingClientRect();
        
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        
        const moveX = x * 20;
        const moveY = y * 20;
        
        if (header.matches(':before')) {
            header.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        }
        if (header.matches(':after')) {
            header.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}); 