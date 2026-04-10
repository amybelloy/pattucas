/**
 * script.js - Pattucas Pet Shop 🐾
 * Multi-page Navigation & Interactive UI
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU LOGIC
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        if (!menuToggle || !navMenu) return;
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    };

    menuToggle?.addEventListener('click', toggleMenu);
    navOverlay?.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu?.classList.contains('active')) toggleMenu();
        });
    });

    // 2. HEADER SCROLL & BACK TO TOP
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop?.classList.add('show');
        } else {
            backToTop?.classList.remove('show');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. ACTIVE LINK HIGHLIGHTING (Multi-page version)
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === pageName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 4. PRODUCT FILTERING (Only for produtos.html)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease';
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. LIGHTBOX (Only for galeria.html)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    window.openLightbox = (src) => {
        if (!lightboxImg || !lightbox) return;
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = () => {
        lightbox?.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });



    // 7. CONTACT FORM (Only for contato.html)
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'flex';
    });

    // 8. REVEAL ON SCROLL
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
