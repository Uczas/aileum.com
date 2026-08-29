// ========================================
// EVENTS PAGE ENHANCEMENTS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');

    // ========================================
    // NAVBAR BACKGROUND ON SCROLL
    // ========================================

    if (navbar) {
        const updateNavbar = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        };

        updateNavbar();
        window.addEventListener('scroll', updateNavbar);
    }

    // ========================================
    // SMOOTH SCROLLING FOR LOCAL EVENT LINKS
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // EVENTS SUBSCRIPTION FORM
    // ========================================

    const subscribeForm = document.querySelector(
        '.events-subscribe-form'
    );

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', event => {
            event.preventDefault();

            const button = subscribeForm.querySelector(
                'button[type="submit"]'
            );

            if (!button || button.disabled) {
                return;
            }

            const originalButtonContent = button.innerHTML;

            button.disabled = true;
            button.innerHTML =
                '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Submitting...';

            // Replace this simulated timeout with your actual form submission
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalButtonContent;
            }, 1500);
        });
    }
});
