document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggle for Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close nav menu when a link is clicked (for mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Matrix Background Effect (Canvas)
    const canvas = document.createElement('canvas');
    const heroSection = document.querySelector('.matrix-background');
    if (heroSection) {
        heroSection.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let W, H;
        const font_size = 16;
        let columns;
        let drops = [];
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()_+{}:"<>?|\[];\',./`~!'; // Caracteres del Matrix
        const matrixColor = '#00BFFF'; // Azul Brillante
        const trailColor = 'rgba(13, 13, 13, 0.15)'; // Negro Carbón con transparencia para el rastro

        function resizeCanvas() {
            W = canvas.width = heroSection.offsetWidth;
            H = canvas.height = heroSection.offsetHeight;
            columns = Math.floor(W / font_size);
            drops = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
        }

        function drawMatrix() {
            ctx.fillStyle = trailColor; // Fondo con rastro transparente
            ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = matrixColor;
            ctx.font = `${font_size}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * font_size, drops[i] * font_size);

                if (drops[i] * font_size > H && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            requestAnimationFrame(drawMatrix);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawMatrix();
    }

    // Dynamic Plans Data
    const plans = [
        {
            title: 'Conexión Esencial',
            speed: '100MB',
            description: 'Ideal para navegación, redes sociales y streaming ocasional. Tu puerta de entrada al mundo digital.',
            price: '$21.500',
            features: [
                'Navegación fluida',
                'Redes sociales sin interrupciones',
                'Streaming en SD'
            ],
            icon: 'fas fa-wifi'
        },
        {
            title: 'Fibra Avanzada',
            speed: '200MB',
            description: 'Perfecto para teletrabajo, clases online y streaming en HD. Mayor velocidad para tus actividades diarias.',
            price: '$23.700',
            features: [
                'Teletrabajo y estudio remoto',
                'Streaming en HD y juegos casuales',
                'Videollamadas estables'
            ],
            icon: 'fas fa-cloud'
        },
        {
            title: 'Máxima Velocidad',
            speed: '300MB',
            description: 'Para gamers, creadores de contenido y hogares con múltiples usuarios. Velocidad sin límites para tus pasiones.',
            price: '$25.999',
            features: [
                'Gaming online de baja latencia',
                'Streaming 4K y descargas rápidas',
                'Ideal para creadores de contenido'
            ],
            icon: 'fas fa-tachometer-alt'
        },
        {
            title: 'Power Gamer',
            speed: '500MB',
            description: 'La conexión definitiva para profesionales y entusiastas. Experimenta el verdadero poder de la fibra óptica.',
            price: '$29.999',
            features: [
                'Rendimiento extremo para juegos',
                'Transmisiones en vivo sin buffer',
                'Soporte para múltiples dispositivos 4K'
            ],
            icon: 'fas fa-gamepad'
        },
        {
            title: 'Fibra Extrema',
            speed: '600MB',
            description: 'La máxima expresión de velocidad para los más exigentes. El futuro de la conectividad en tu hogar o negocio.',
            price: '$35.999',
            features: [
                'Velocidad ultra rápida para todo',
                'Ideal para domótica y smart home',
                'Carga y descarga instantánea'
            ],
            icon: 'fas fa-rocket'
        }
    ];

    const planGrid = document.querySelector('.plan-grid');

    if (planGrid) {
        plans.forEach(plan => {
            const planCard = document.createElement('div');
            planCard.classList.add('plan-card');

            const featuresHtml = plan.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('');

            planCard.innerHTML = `
                <div class="icon"><i class="${plan.icon}"></i></div>
                <h3>${plan.title}</h3>
                <div class="speed">${plan.speed}</div>
                <p class="description">${plan.description}</p>
                <div class="price">${plan.price}<span>/mes</span></div>
                <ul class="features">
                    ${featuresHtml}
                </ul>
                <a href="https://wa.me/5491158353221?text=Hola%2C%20me%20interesa%20el%20plan%20de%20${encodeURIComponent(plan.speed)}%20-${encodeURIComponent(plan.title)}." class="btn-primary" target="_blank">Contratar</a>
            `;
            planGrid.appendChild(planCard);
        });
    }

    // Carousel functionality for plans on mobile
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const carouselButtons = document.querySelectorAll('.carousel-button');
    const carouselIndicatorsContainer = document.querySelector('.carousel-indicators');
    let planCards = document.querySelectorAll('.plan-card');
    let currentIndex = 0;

    const isMobile = () => window.innerWidth <= 768;

    function updateCarousel() {
        if (isMobile()) {
            const offset = -currentIndex * 100;
            carouselWrapper.style.transform = `translateX(${offset}%)`;
            updateIndicators();
            carouselButtons.forEach(button => button.style.display = 'block'); // Show buttons on mobile
            carouselIndicatorsContainer.style.display = 'flex'; // Show indicators on mobile
        } else {
            carouselWrapper.style.transform = 'translateX(0)'; // Reset for desktop
            carouselButtons.forEach(button => button.style.display = 'none'); // Hide buttons on desktop
            carouselIndicatorsContainer.style.display = 'none'; // Hide indicators on desktop
        }
    }

    function createIndicators() {
        carouselIndicatorsContainer.innerHTML = '';
        planCards.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
            carouselIndicatorsContainer.appendChild(indicator);
        });
    }

    function updateIndicators() {
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    if (carouselWrapper) {
        // Re-query planCards after they have been dynamically added
        planCards = document.querySelectorAll('.plan-card'); 

        carouselButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('prev')) {
                    currentIndex = (currentIndex - 1 + planCards.length) % planCards.length;
                } else {
                    currentIndex = (currentIndex + 1) % planCards.length;
                }
                updateCarousel();
            });
        });

        // Initial setup
        createIndicators();
        updateCarousel();

        // Update carousel on window resize
        window.addEventListener('resize', () => {
            planCards = document.querySelectorAll('.plan-card'); // Re-query in case of dynamic changes
            createIndicators(); // Re-create indicators on resize to adjust to potential changes in planCards length
            updateCarousel();
        });

        // Optional: Swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carouselWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        carouselWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            if (isMobile()) {
                if (touchEndX < touchStartX - 50) { // Swipe left
                    currentIndex = (currentIndex + 1) % planCards.length;
                } else if (touchEndX > touchStartX + 50) { // Swipe right
                    currentIndex = (currentIndex - 1 + planCards.length) % planCards.length;
                }
                updateCarousel();
            }
        }
    }
}); 