// ========================================
// PRELOADER
// ========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 800);
});

// ========================================
// FALLING LINES BACKGROUND EFFECT
// ========================================
const canvas = document.getElementById('fallingLines');
const ctx = canvas.getContext('2d');

let lines = [];
let animationId;
let isRunning = true;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createLines() {
    const lineCount = Math.min(60, Math.floor(window.innerWidth / 20));
    lines = [];
    
    for (let i = 0; i < lineCount; i++) {
        lines.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 100 + 50,
            speed: Math.random() * 2 + 0.8,
            opacity: Math.random() * 0.5 + 0.2,
            width: Math.random() * 2 + 0.5
        });
    }
}

function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    
    lines.forEach(line => {
        const color = isLight 
            ? `rgba(37, 99, 235, ${line.opacity * 0.6})` 
            : `rgba(96, 165, 250, ${line.opacity})`;
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = line.width;
        ctx.lineCap = 'round';
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x, line.y + line.length);
        ctx.stroke();
        
        // Move line down
        line.y += line.speed;
        
        // Reset when line goes off screen
        if (line.y > canvas.height + line.length) {
            line.y = -line.length;
            line.x = Math.random() * canvas.width;
            line.speed = Math.random() * 2 + 0.8;
            line.length = Math.random() * 100 + 50;
        }
    });
    
    if (isRunning) {
        animationId = requestAnimationFrame(drawLines);
    }
}

function startFallingLines() {
    resizeCanvas();
    createLines();
    drawLines();
}

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    createLines();
});

// Start the effect
startFallingLines();

// Pause when page is not visible (performance)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationId);
    } else {
        isRunning = true;
        drawLines();
    }
});

console.log('✅ Falling lines effect started');

// ========================================
// THEME TOGGLE (Dark/Light Mode)
// ========================================
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('aileum-theme');
if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('aileum-theme', newTheme);
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// MOBILE HAMBURGER MENU
// ========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHT
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// AOS ANIMATION INIT
// ========================================
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// ========================================
// COUNTER ANIMATION (About Stats)
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / 60));
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = current + (target > 10 ? '+' : '');
    }, duration / 60);
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            if (!el.dataset.animated) {
                el.dataset.animated = 'true';
                animateCounter(el);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ========================================
// ABOUT IMAGE SLIDER
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!sliderTrack || slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    const totalSlides = slides.length;
    const intervalTime = 4000; // 4 seconds

    // Function to go to a specific slide
    const goToSlide = (index) => {
        // Remove active class from all slides and dots
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        // Update current slide index
        currentSlide = (index + totalSlides) % totalSlides;
        
        // Move the track
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    // Go to next slide
    const nextSlide = () => {
        goToSlide(currentSlide + 1);
    };

    // Go to previous slide
    const prevSlide = () => {
        goToSlide(currentSlide - 1);
    };

    // Start automatic sliding
    const startAutoSlide = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    };

    // Stop automatic sliding
    const stopAutoSlide = () => {
        clearInterval(slideInterval);
    };

    // Event listeners for dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Event listeners for arrow buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Pause when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });

    sliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoSlide();
    }, { passive: true });

    // Keyboard support for accessibility
    document.addEventListener('keydown', (e) => {
        const isAboutSlider = document.querySelector('.about-slider')?.contains(document.activeElement);
        if (!isAboutSlider) return;
        
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        }
    });

    // Initialize the slider
    goToSlide(0);
    startAutoSlide();

    console.log('✅ About slider initialized');
});

// ========================================
// TESTIMONIAL SLIDER
// Manual drag, wheel, touch, keyboard + auto-scroll
// ========================================
const testimonialsScroll =
    document.getElementById('testimonialsScroll');

if (testimonialsScroll) {
    const cards =
        testimonialsScroll.querySelectorAll('.testimonial-card');

    let testimonialTimer;
    let interactionTimer;
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    const getScrollAmount = () => {
        const card = testimonialsScroll.querySelector(
            '.testimonial-card'
        );

        if (!card) return 0;

        const styles = getComputedStyle(testimonialsScroll);
        const gap = parseFloat(styles.columnGap || styles.gap) || 0;

        return card.offsetWidth + gap;
    };

    const pauseTemporarily = () => {
        clearInterval(testimonialTimer);
        clearTimeout(interactionTimer);

        interactionTimer = setTimeout(() => {
            startAutomaticScroll();
        }, 5000);
    };

    const moveToNextCard = () => {
        const amount = getScrollAmount();
        const maxScroll =
            testimonialsScroll.scrollWidth -
            testimonialsScroll.clientWidth;

        if (!amount || maxScroll <= 0) return;

        const nextPosition =
            testimonialsScroll.scrollLeft + amount;

        if (nextPosition >= maxScroll - 8) {
            testimonialsScroll.scrollTo({
                left: 0,
                behavior: reducedMotion ? 'auto' : 'smooth'
            });
        } else {
            testimonialsScroll.scrollBy({
                left: amount,
                behavior: reducedMotion ? 'auto' : 'smooth'
            });
        }
    };

    const startAutomaticScroll = () => {
        clearInterval(testimonialTimer);

        if (!reducedMotion && !document.hidden) {
            testimonialTimer = setInterval(
                moveToNextCard,
                4500
            );
        }
    };

    // Convert vertical mouse-wheel movement into horizontal scrolling
    testimonialsScroll.addEventListener(
        'wheel',
        (event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                event.preventDefault();
                testimonialsScroll.scrollLeft += event.deltaY;
            }

            pauseTemporarily();
        },
        { passive: false }
    );

    // Desktop click-and-drag support
    testimonialsScroll.addEventListener('pointerdown', (event) => {
        isDragging = true;
        startX = event.clientX;
        startScrollLeft = testimonialsScroll.scrollLeft;

        testimonialsScroll.setPointerCapture(event.pointerId);
        testimonialsScroll.classList.add('is-dragging');
        pauseTemporarily();
    });

    testimonialsScroll.addEventListener('pointermove', (event) => {
        if (!isDragging) return;

        event.preventDefault();

        const distance = event.clientX - startX;
        testimonialsScroll.scrollLeft =
            startScrollLeft - distance;
    });

    const stopDragging = () => {
        isDragging = false;
        testimonialsScroll.classList.remove('is-dragging');
        startAutomaticScroll();
    };

    testimonialsScroll.addEventListener(
        'pointerup',
        stopDragging
    );

    testimonialsScroll.addEventListener(
        'pointercancel',
        stopDragging
    );

    testimonialsScroll.addEventListener(
        'pointerleave',
        () => {
            if (isDragging) stopDragging();
        }
    );

    // Keyboard navigation
    testimonialsScroll.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            testimonialsScroll.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
            pauseTemporarily();
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            testimonialsScroll.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
            pauseTemporarily();
        }
    });

    // Pause while hovering, resume after leaving
    testimonialsScroll.addEventListener('mouseenter', () => {
        clearInterval(testimonialTimer);
    });

    testimonialsScroll.addEventListener('mouseleave', () => {
        startAutomaticScroll();
    });

    // Pause when the page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(testimonialTimer);
        } else {
            startAutomaticScroll();
        }
    });

    // Prevent accidental text selection while dragging
    testimonialsScroll.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });

    startAutomaticScroll();
}

// ========================================
// CONTACT FORM HANDLING — FORMSPREE
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.btn-primary');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (response.ok) {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.style.background = '#10b981';

                contactForm.reset();

                showNotification(
                    "Thank you! We'll get back to you within 24 hours.",
                    'success'
                );

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 2500);
            } else {
                throw new Error('Formspree submission failed');
            }
        } catch (error) {
            console.error('Contact form error:', error);

            btn.innerHTML = originalText;
            btn.disabled = false;

            showNotification(
                'Unable to send your message. Please try again.',
                'error'
            );
        }
    });
}

// ========================================
// NEWSLETTER FORM HANDLING — FORMSPREE
// ========================================

const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const button = newsletterForm.querySelector(
            'button[type="submit"]'
        );

        const status = document.getElementById('newsletterStatus');

        if (!button) {
            console.error('Newsletter submit button was not found.');
            return;
        }

        button.disabled = true;
        button.classList.add('is-loading');

        if (status) {
            status.textContent = 'Subscribing...';
            status.className = '';
        }

        try {
            const response = await fetch(newsletterForm.action, {
                method: 'POST',
                body: new FormData(newsletterForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Newsletter submission failed');
            }

            newsletterForm.reset();

            if (status) {
                status.textContent = 'Successfully subscribed!';
                status.className = 'success';
            }

            if (typeof showNotification === 'function') {
                showNotification(
                    'Thank you for subscribing to our newsletter!',
                    'success'
                );
            }

        } catch (error) {
            console.error('Newsletter error:', error);

            if (status) {
                status.textContent =
                    'Subscription failed. Please try again.';
                status.className = 'error';
            }

            if (typeof showNotification === 'function') {
                showNotification(
                    'Subscription failed. Please try again.',
                    'error'
                );
            }

        } finally {
            button.disabled = false;
            button.classList.remove('is-loading');
        }
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        padding: 16px 24px;
        border-radius: 12px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        z-index: 9999;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// KEYBOARD ACCESSIBILITY
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navLinks.classList.contains('open')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        }
    }
});

console.log('🚀 Aileum Technologies — Turning Data & Ideas into Solutions');
