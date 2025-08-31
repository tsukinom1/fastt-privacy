// Privacy Policy Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link, .toc-link, .footer-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (nav && nav.classList.contains('nav-open')) {
                        nav.classList.remove('nav-open');
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Active Navigation Highlighting
    const sections = document.querySelectorAll('.content-section');
    const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinksArray.forEach(link => {
                    link.classList.remove('nav-link-active');
                });
                
                // Add active class to current section's nav link
                const activeNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('nav-link-active');
                }
            }
        });
    }
    
    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Add scroll event listener with throttling
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    
    // Initial call to set active nav link
    updateActiveNavLink();
    
    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    `;
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', throttle(toggleBackToTopButton, 100));
    
    // Back to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe content sections for animation
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Contact form validation (if needed in future)
    const contactLinks = document.querySelectorAll('.contact-link[href^="mailto:"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add tracking or analytics here if needed
            console.log('Contact link clicked:', this.href);
        });
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape' && nav && nav.classList.contains('nav-open')) {
            nav.classList.remove('nav-open');
            mobileMenuToggle.classList.remove('active');
        }
        
        // Ctrl/Cmd + K to focus search (if implemented)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Focus search functionality could be added here
        }
    });
    
    // Add CSS for back to top button and active nav states
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-lg);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: var(--shadow-xl);
        }
        
        .nav-link-active {
            color: var(--primary-color) !important;
        }
        
        .nav-link-active::after {
            width: 100% !important;
        }
        
        .content-section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .content-section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-open {
            display: block !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--white);
            border-top: 1px solid var(--gray-200);
            box-shadow: var(--shadow-lg);
            padding: var(--spacing-4);
        }
        
        .nav-open .nav-list {
            flex-direction: column;
            gap: var(--spacing-3);
        }
        
        .nav-open .nav-link {
            padding: var(--spacing-3) 0;
            border-bottom: 1px solid var(--gray-100);
        }
        
        .nav-open .nav-link:last-child {
            border-bottom: none;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Lazy load images if any
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Service Worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    // Analytics tracking (placeholder)
    function trackEvent(eventName, eventData = {}) {
        // Implement your analytics tracking here
        console.log('Event tracked:', eventName, eventData);
    }
    
    // Track page views and interactions
    trackEvent('page_view', {
        page: 'privacy_policy',
        timestamp: new Date().toISOString()
    });
    
    // Track section visibility
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('section_view', {
                    section: entry.target.id,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    console.log('Privacy Policy page loaded successfully!');
});
