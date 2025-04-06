/**
 * PetCare - JavaScript Principal
 * Este archivo contiene todas las funcionalidades interactivas del sitio web PetCare.
 * Para ser usado en todas las páginas del sitio.
 * 
 * Fecha: 2025-04-06
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== Menú de navegación responsivo =====
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const navContainer = document.getElementById('navContainer');
    const navOverlay = document.getElementById('navOverlay');
    
    // Verificar si los elementos existen antes de agregar event listeners
    if (menuToggle && closeMenu && navContainer && navOverlay) {
        // Abrir menú
        menuToggle.addEventListener('click', function() {
            navContainer.classList.add('active');
            navOverlay.classList.add('active');
            document.body.classList.add('menu-open'); // Añadir clase para ocultar hamburguesa
            document.body.style.overflow = 'hidden'; // Evita el desplazamiento
        });
        
        // Cerrar menú
        closeMenu.addEventListener('click', closeNav);
        navOverlay.addEventListener('click', closeNav);
        
        // Cerrar menú al hacer clic en un enlace (para móviles)
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }
    
    function closeNav() {
        if (navContainer && navOverlay) {
            navContainer.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('menu-open'); // Quitar clase para mostrar hamburguesa
            document.body.style.overflow = ''; // Restaura el desplazamiento
        }
    }
    
    // Ajustar para cambios de tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navContainer && navOverlay) {
            navContainer.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('menu-open'); // Asegurar que se quita
            document.body.style.overflow = '';
        }
    });
    
    // ===== Funcionalidad de FAQ (página de contacto y otras) =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
                
                // Cerrar otras preguntas
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // ===== Sliders y carruseles =====
    // Slider de testimonios (si existe)
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        // Código para inicializar un slider simple
        // Nota: Esta es una implementación básica sin biblioteca externa
        let currentSlide = 0;
        const slides = testimonialsSlider.querySelectorAll('.testimonial-card');
        const totalSlides = slides.length;
        
        if (totalSlides > 0) {
            // Botones de navegación si existen
            const prevBtn = document.querySelector('.testimonial-prev');
            const nextBtn = document.querySelector('.testimonial-next');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                    updateSliderPosition();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    updateSliderPosition();
                });
            }
            
            function updateSliderPosition() {
                slides.forEach((slide, index) => {
                    if (index === currentSlide) {
                        slide.style.display = 'block';
                    } else {
                        slide.style.display = 'none';
                    }
                });
            }
            
            // Inicializar
            updateSliderPosition();
            
            // Auto-rotate si se desea
            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSliderPosition();
            }, 5000); // Cada 5 segundos
        }
    }
    
    // ===== Funcionalidades de Carrito de Compras (página de tienda) =====
    const addToCartButtons = document.querySelectorAll('.shop-btn, .add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');
    
    if (addToCartButtons.length > 0 && cartCount) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Incrementar contador del carrito (simulación)
                let count = parseInt(cartCount.textContent || '0');
                cartCount.textContent = count + 1;
                
                // Feedback visual
                const originalText = this.textContent;
                this.textContent = 'Añadido ✓';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1500);
            });
        });
    }
    
    // ===== Funcionalidades de Filtros de Tienda =====
    const filterOptions = document.querySelectorAll('.filter-option input');
    if (filterOptions.length > 0) {
        filterOptions.forEach(option => {
            option.addEventListener('change', function() {
                // Aquí iría el código para filtrar productos
                // Esta es una versión simulada
                const productCards = document.querySelectorAll('.product-card');
                
                if (productCards.length > 0) {
                    // Simulación simple: mostrar/ocultar productos aleatoriamente
                    productCards.forEach(card => {
                        if (Math.random() > 0.5) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    
                    // Para una implementación real, filtrarías en base a categorías,
                    // precios, etc., según los filtros seleccionados
                }
            });
        });
    }
    
    // Ordenación de productos (página de tienda)
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // Aquí iría el código para ordenar productos
            // Esta es una versión simulada
            const productsGrid = document.querySelector('.products-grid');
            if (productsGrid) {
                const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
                
                // Simulación simple: reordenar productos aleatoriamente
                productCards.sort(() => Math.random() - 0.5);
                
                // Limpiar grid y volver a añadir los productos en el nuevo orden
                productsGrid.innerHTML = '';
                productCards.forEach(card => {
                    productsGrid.appendChild(card);
                });
                
                // Para una implementación real, ordenarías según precio, nombre, etc.
            }
        });
    }
    
    // ===== Validación de Formularios =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    // Añadir clase de error
                    field.classList.add('error');
                    
                    // Eliminar clase de error después de escribir
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    }, { once: true });
                }
            });
            
            if (isValid) {
                // Simulación de envío exitoso
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                setTimeout(() => {
                    alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            } else {
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    }
    
    // ===== Formulario de Reserva de Citas =====
    const appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = appointmentForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    // Añadir clase de error
                    field.classList.add('error');
                    
                    // Eliminar clase de error después de escribir
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    }, { once: true });
                }
            });
            
            if (isValid) {
                // Simulación de reserva exitosa
                const submitBtn = appointmentForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Procesando...';
                
                setTimeout(() => {
                    alert('¡Cita reservada correctamente! Te enviaremos un correo de confirmación.');
                    appointmentForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            } else {
                alert('Por favor, completa todos los campos requeridos para reservar tu cita.');
            }
        });
    }
    
    // ===== Formularios de suscripción a newsletter =====
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    if (newsletterForms.length > 0) {
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = form.querySelector('input[type="email"]');
                if (emailInput && emailInput.value.trim()) {
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Suscribiendo...';
                    
                    setTimeout(() => {
                        alert('¡Gracias por suscribirte a nuestro boletín!');
                        form.reset();
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }, 1000);
                } else {
                    alert('Por favor, introduce un email válido.');
                }
            });
        });
    }
    
    // ===== Animación al hacer scroll =====
    // Función para animar elementos cuando entren en el viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // Si el elemento está en el viewport
            if (position.top < window.innerHeight && position.bottom >= 0) {
                element.classList.add('animated');
            }
        });
    }
    
    // Activar animación si hay elementos con la clase
    if (document.querySelectorAll('.animate-on-scroll').length > 0) {
        window.addEventListener('scroll', animateOnScroll);
        // Iniciar para los elementos visibles al cargar
        animateOnScroll();
    }
    
    // ===== Contador para Estadísticas (página About) =====
    const statCounters = document.querySelectorAll('.stat-counter');
    
    if (statCounters.length > 0) {
        let countersStarted = false;
        
        function startCounters() {
            if (countersStarted) return;
            
            statCounters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const step = target / duration * 20; // Actualizar cada 20ms
                let current = 0;
                
                const updateCounter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(updateCounter);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 20);
            });
            
            countersStarted = true;
        }
        
        // Iniciar contadores cuando la sección esté en la vista
        window.addEventListener('scroll', function() {
            if (statCounters[0]) {
                const position = statCounters[0].getBoundingClientRect();
                if (position.top < window.innerHeight && position.bottom >= 0) {
                    startCounters();
                }
            }
        });
        
        // Comprobar si ya están en la vista al cargar
        setTimeout(() => {
            if (statCounters[0]) {
                const position = statCounters[0].getBoundingClientRect();
                if (position.top < window.innerHeight && position.bottom >= 0) {
                    startCounters();
                }
            }
        }, 300);
    }
    
    // ===== Galería de imágenes con lightbox =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        // Crear lightbox elementos
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.display = 'none';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        lightbox.style.zIndex = '9999';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.display = 'none';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.style.maxWidth = '90%';
        lightboxImg.style.maxHeight = '90%';
        lightboxImg.style.borderRadius = '5px';
        lightboxImg.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        
        const closeBtn = document.createElement('span');
        closeBtn.textContent = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '30px';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.color = 'white';
        closeBtn.style.cursor = 'pointer';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Eventos
        galleryItems.forEach(item => {
            item.style.cursor = 'pointer';
            
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
});