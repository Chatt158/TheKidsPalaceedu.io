document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main_kinder');
    
    // Crear contenedor para elementos flotantes
    const floatingContainer = document.createElement('div');
    // Efecto parallax al hacer scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        header.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });

    // Efecto de partículas flotantes (burbujas educativas)
    const particles = document.createElement('div');
    particles.className = 'particles';
    header.appendChild(particles);

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${3 + Math.random() * 3}s`;
        particles.appendChild(particle);
    }
}); 