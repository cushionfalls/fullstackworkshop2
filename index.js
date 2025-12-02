document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // MOBILE MENU TOGGLE
    // ============================
    const menuButton = document.getElementById('menu-button');
    const navLinks = document.querySelector('.nav-links');

    function toggleMenu(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        navLinks.classList.toggle('open');
        const isExpanded = navLinks.classList.contains('open');
        menuButton.setAttribute('aria-expanded', isExpanded);
        menuButton.innerHTML = isExpanded ? '✕' : '☰';
    }

    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('click', (event) => {
        const isInsideNav = navLinks.contains(event.target);
        const isOnButton = menuButton.contains(event.target);

        if (!isInsideNav && !isOnButton && navLinks.classList.contains('open')) {
            toggleMenu();
        }
    });



    // ============================
    // CONTACT FORM - NO RELOAD
    // ============================
    const contactForm = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');

    if (contactForm && messageDiv) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            const nameInput = document.getElementById('name').value.trim();
            const emailInput = document.getElementById('email').value.trim();
            const messageInput = document.getElementById('message').value.trim();

            messageDiv.className = '';
            messageDiv.textContent = '';

            if (!nameInput || !emailInput || !messageInput) {
                showMessage('Please fill out all required fields.', 'error');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            if (messageInput.length < 10) {
                showMessage('Please enter a message with at least 10 characters.', 'error');
                return;
            }

            showMessage('Thank you for your message, ' + nameInput + '! I will get back to you soon.', 'success');

            contactForm.reset();

            setTimeout(() => {
                hideMessage();
            }, 5000);
        });
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = type + ' show';
    }

    function hideMessage() {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            messageDiv.className = '';
            messageDiv.textContent = '';
        }, 300);
    }



    // ============================
    // SMOOTH SCROLL
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;

                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });



    // ============================
    // SCROLL ANIMATION (FADE-IN)
    // ============================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section:not(#hero)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });



    // ============================
    // ACTIVE NAV LINK ON SCROLL
    // ============================
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinksAll = document.querySelectorAll('.nav-links a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;

            if (window.pageYOffset >= (sectionTop - navbarHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });



    // ============================
    // ACTIVE NAV CSS (INJECTED)
    // ============================
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: #ffcc00;
            border-bottom: 2px solid #ffcc00;
        }
    `;
    document.head.appendChild(style);

});
