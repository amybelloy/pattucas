/**
 * Pattucas Pet Shop 🐾 - Logic (Multi-Page Version)
 * Pure JavaScript - Interactive modern features
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Header Scroll State ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 2. Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.textContent = '☰';
            });
        });
    }

    // --- 3. Active Link detection via URL ---
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) && href !== '#' && href !== 'index.html') {
            link.classList.add('active');
        } else if ((currentPath === '/' || currentPath.endsWith('index.html')) && (href === 'index.html' || href === '#')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- 4. Reveal Animations on Scroll ---
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- 5. Product Filtering (only on produtos.html) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // --- 6. Gallery Lightbox (only on galeria.html or pages with gallery) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.getElementById('modalClose');

    if (galleryItems.length > 0 && modal && modalImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                modalImg.src = imgSrc;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- 7. Back to Top ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 8. Contact Form Simulation (only on contato.html) ---
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (name && email) {
                const btn = contactForm.querySelector('button');
                btn.textContent = 'Enviando...';
                btn.disabled = true;

                setTimeout(() => {
                    contactForm.style.display = 'none';
                    contactSuccess.style.display = 'block';
                }, 1500);
            }
        });
    }

    // --- 9. Testimonial Submission (only on depoimentos.html) ---
    const testimonialForm = document.getElementById('testimonial-form');
    const testimonialList = document.getElementById('testimonials-list');
    const successMsg = document.getElementById('dep-success');

    if (testimonialForm && testimonialList) {
        testimonialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('dep-name').value;
            const rating = document.getElementById('dep-rating').value;
            const msg = document.getElementById('dep-msg').value;

            if (name && msg) {
                const card = document.createElement('div');
                card.className = 'testimonial-card revealed';
                
                let stars = '';
                for(let i=0; i<5; i++) stars += i < rating ? '★' : '☆';

                card.innerHTML = `
                    <div class="testimonial-text">"${msg}"</div>
                    <div class="testimonial-author">
                        <div class="author-info">
                            <h4>${name}</h4>
                            <div class="stars">${stars}</div>
                        </div>
                    </div>
                `;

                testimonialList.prepend(card);
                testimonialForm.reset();
                if (successMsg) {
                    successMsg.style.display = 'block';
                    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
                }
            }
        });
    }
});
