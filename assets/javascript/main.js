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
// CONTACT FORM HANDLING
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Basic email validation
    if (!email.includes('@') || !email.includes('.')) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate sending
    const btn = contactForm.querySelector('.btn-primary');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
            showNotification('Thank you! We\'ll get back to you within 24 hours.', 'success');
        }, 2500);
    }, 2000);
});

// ========================================
// NEWSLETTER FORM HANDLING
// ========================================
const newsletterForm = document.querySelector('#newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const email = input.value.trim();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    const btn = newsletterForm.querySelector('button');
    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.background = '#10b981';
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-arrow-right"></i>';
        btn.style.background = '';
        input.value = '';
        showNotification('Subscribed successfully! Welcome to Aileum.', 'success');
    }, 2000);
});

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

console.log('🚀 Aileum Technologies — Engineering Intelligent Software');
