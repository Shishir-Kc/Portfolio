// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeToggle();
        this.bindEvents();
    }

    bindEvents() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeToggle();
    }

    updateThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.setAttribute('aria-label', `Switch to ${this.theme === 'light' ? 'dark' : 'light'} theme`);
        }
    }
}

// Cursor Effects
class CursorEffects {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        this.init();
    }

    init() {
        if (!this.cursor || !this.cursorFollower) return;
        
        this.bindEvents();
        this.addHoverEffects();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
            this.cursorFollower.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        });

        document.addEventListener('mousedown', () => {
            this.cursor.style.transform += ' scale(0.8)';
            this.cursorFollower.style.transform += ' scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            this.cursor.style.transform = this.cursor.style.transform.replace(' scale(0.8)', '');
            this.cursorFollower.style.transform = this.cursorFollower.style.transform.replace(' scale(0.8)', '');
        });
    }

    addHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform += ' scale(1.5)';
                this.cursor.style.borderColor = 'var(--primary-color)';
                this.cursorFollower.style.transform += ' scale(2)';
                this.cursorFollower.style.opacity = '0.3';
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = this.cursor.style.transform.replace(' scale(1.5)', '');
                this.cursor.style.borderColor = 'var(--primary-color)';
                this.cursorFollower.style.transform = this.cursorFollower.style.transform.replace(' scale(2)', '');
                this.cursorFollower.style.opacity = '1';
            });
        });
    }
}

// Navigation Effects
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.setupSmoothScrolling();
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.handleScroll());
        
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !this.navMenu.contains(e.target) && 
                !this.hamburger.contains(e.target) &&
                this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    handleScroll() {
        // Navbar scroll effect
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Active navigation highlighting
        let current = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Scroll progress bar
        const scrollProgress = document.querySelector('.scroll-progress-bar');
        if (scrollProgress) {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = `${scrollPercent}%`;
        }
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Typing Animation
class TypingAnimation {
    constructor() {
        this.element = document.querySelector('.typing-text');
        this.texts = [
            'Backend Developer',
            'Python Enthusiast', 
            'IoT Explorer',
            'API Architect',
            'Django Developer'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (!this.element) return;
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Animations on Scroll
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkElements();
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.checkElements());
        window.addEventListener('resize', () => this.checkElements());
    }

    checkElements() {
        this.elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('aos-animate');
            }
        });
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number[data-count]');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            element.textContent = Math.floor(current);

            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
}

// Skill Level Animation
class SkillLevelAnimation {
    constructor() {
        this.skillLevels = document.querySelectorAll('.skill-level[data-level]');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillLevel(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        this.skillLevels.forEach(skill => {
            observer.observe(skill);
        });
    }

    animateSkillLevel(element) {
        const level = element.getAttribute('data-level');
        element.style.setProperty('--skill-width', `${level}%`);
        
        // Add CSS for the animation
        element.style.setProperty('--skill-level-width', `${level}%`);
        element.querySelector('::after').style.width = `${level}%`;
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (!this.form) return;
        this.bindEvents();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add floating label effects
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value) {
                    input.setAttribute('data-filled', 'true');
                } else {
                    input.removeAttribute('data-filled');
                }
            });
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.querySelector('.btn-text').textContent;
        
        // Show loading state
        submitButton.querySelector('.btn-text').textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showMessage('Thank you! Your message has been sent successfully.', 'success');
            this.form.reset();
            
        } catch (error) {
            this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            submitButton.querySelector('.btn-text').textContent = originalText;
            submitButton.disabled = false;
        }
    }

    showMessage(text, type) {
        // Create and show message
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
}

// Particle Background
class ParticleBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.init();
    }

    init() {
        this.createCanvas();
        this.bindEvents();
        this.createParticles();
        this.animate();
    }

    createCanvas() {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        particlesContainer.appendChild(this.canvas);
        
        this.resizeCanvas();
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor(window.innerWidth / 10);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    animate() {
        if (!this.ctx) return;
        
        this.ctx.fillStyle = 'rgba(102, 126, 234, 0.02)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.vy *= -1;
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();

            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.stroke();
                    }
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Preloader
class Preloader {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            this.hidePreloader();
        });
    }

    hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new CursorEffects();
    new Navigation();
    new TypingAnimation();
    new ScrollAnimations();
    new CounterAnimation();
    new SkillLevelAnimation();
    new ContactForm();
    new ParticleBackground();
    new Preloader();

    // Add smooth reveal animation to elements
    const revealElements = document.querySelectorAll('.hero-content > *');
    revealElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add('reveal-animation');
    });
});

// Add reveal animation CSS
const revealCSS = `
    .reveal-animation {
        opacity: 0;
        transform: translateY(30px);
        animation: revealUp 0.8s ease-out forwards;
    }
    
    @keyframes revealUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = revealCSS;
document.head.appendChild(style);

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll optimizations can be added here
}, 10));

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(el => {
    animationObserver.observe(el);
});