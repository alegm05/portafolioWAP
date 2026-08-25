document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. EFECTO HEADER COLAPSABLE (SHRINKING HEADER)
    // =========================================================
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // =========================================================
    // 2. MENÚ MÓVIL (HAMBURGUESA)
    // =========================================================
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            // Alternar el estado de aria-expanded para accesibilidad
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Mostrar/ocultar la lista de navegación
            navList.classList.toggle('is-open');
        });
    }

    // =========================================================
    // 3. PROCESAMIENTO DEL FORMULARIO DE CONTACTO (EMAILJS REAL)
    // =========================================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue
            
            const btnSubmit = this.querySelector('.btn-submit');
            const btnLabel = btnSubmit.querySelector('.btn-label');
            const formStatus = document.getElementById('form-status');
            const originalText = btnLabel.innerText;
            
            // Estado visual de carga
            btnSubmit.classList.add('is-sending');
            btnLabel.innerText = 'Transmitiendo datos...';
            btnSubmit.disabled = true;
            formStatus.innerText = '';
            formStatus.style.color = "var(--text-muted)";

            // ENVÍO REAL MEDIANTE EMAILJS
            emailjs.sendForm('service_nyiozsj', 'template_6igrjjh', this)
                .then(() => {
                    // Éxito
                    formStatus.innerText = "[+] CONEXIÓN EXITOSA: Mensaje y autorespuesta enviados.";
                    formStatus.style.color = "var(--accent)";
                    
                    // Restaurar botón y limpiar formulario
                    btnSubmit.classList.remove('is-sending');
                    btnLabel.innerText = originalText;
                    btnSubmit.disabled = false;
                    contactForm.reset();

                    // Borrar el mensaje después de 6 segundos
                    setTimeout(() => { formStatus.innerText = ''; }, 6000);
                }, (error) => {
                    // Error
                    console.log('FAILED...', error);
                    formStatus.innerText = "[-] ERROR CRÍTICO: Fallo en la transmisión (Revisa la consola).";
                    formStatus.style.color = "#FF5F56";
                    
                    btnSubmit.classList.remove('is-sending');
                    btnLabel.innerText = originalText;
                    btnSubmit.disabled = false;
                });
        });
    }
});