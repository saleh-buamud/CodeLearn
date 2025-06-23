// Mobile Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close mobile menu when clicking on overlay
    overlay.addEventListener('click', function() {
        closeMobileMenu();
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close mobile menu when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        navMenu.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('nav-open');
        
        // Add smooth entrance animation to menu items
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(20px)';
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 50 + 100);
        });
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('nav-open');
        
        // Reset nav link styles
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.style.opacity = '';
            link.style.transform = '';
            link.style.transition = '';
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        setupContactForm();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
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
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .course-card, .value-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact Form Setup and Validation
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const successMessage = document.getElementById('successMessage');

    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            errorMessages: {
                required: 'Name is required',
                minLength: 'Name must be at least 2 characters long',
                pattern: 'Name can only contain letters and spaces'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessages: {
                required: 'Email is required',
                pattern: 'Please enter a valid email address'
            }
        },
        topic: {
            required: true,
            errorMessages: {
                required: 'Please select a topic'
            }
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            errorMessages: {
                required: 'Message is required',
                minLength: 'Message must be at least 10 characters long',
                maxLength: 'Message cannot exceed 1000 characters'
            }
        }
    };

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');

        field.addEventListener('input', function() {
            validateField(fieldName, field.value, errorElement);
        });

        field.addEventListener('blur', function() {
            validateField(fieldName, field.value, errorElement);
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Field validation function
    function validateField(fieldName, value, errorElement) {
        const rules = validationRules[fieldName];
        const fieldContainer = errorElement.closest('.form-group');
        
        // Clear previous error state
        fieldContainer.classList.remove('error');
        errorElement.textContent = '';

        // Required validation
        if (rules.required && (!value || value.trim() === '')) {
            showFieldError(fieldContainer, errorElement, rules.errorMessages.required);
            return false;
        }

        // Skip other validations if field is empty and not required
        if (!value || value.trim() === '') {
            return true;
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value.trim())) {
            showFieldError(fieldContainer, errorElement, rules.errorMessages.pattern);
            return false;
        }

        // Length validations
        if (rules.minLength && value.trim().length < rules.minLength) {
            showFieldError(fieldContainer, errorElement, rules.errorMessages.minLength);
            return false;
        }

        if (rules.maxLength && value.trim().length > rules.maxLength) {
            showFieldError(fieldContainer, errorElement, rules.errorMessages.maxLength);
            return false;
        }

        return true;
    }

    // Show field error
    function showFieldError(fieldContainer, errorElement, message) {
        fieldContainer.classList.add('error');
        errorElement.textContent = message;
    }

    // Validate entire form
    function validateForm() {
        let isValid = true;

        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(fieldName + 'Error');
            
            if (!validateField(fieldName, field.value, errorElement)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Submit form
    function submitForm() {
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide loading state
            submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';

            // Hide form and show success message
            form.style.display = 'none';
            successMessage.classList.add('show');

            // Reset form after showing success (for demo purposes)
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMessage.classList.remove('show');
                
                // Clear any error states
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('error');
                });
                document.querySelectorAll('.error-message').forEach(error => {
                    error.textContent = '';
                });
            }, 3000);

        }, 2000); // Simulate 2 second processing time
    }
}

// Course enrollment button handlers
document.addEventListener('click', function(e) {
    if (e.target.matches('.course-card .btn-primary')) {
        e.preventDefault();
        
        // Get course title
        const courseCard = e.target.closest('.course-card');
        const courseTitle = courseCard.querySelector('.course-title').textContent;
        
        // Show enrollment confirmation (you can replace this with actual enrollment logic)
        if (confirm(`Would you like to enroll in "${courseTitle}"?\n\nThis will redirect you to the enrollment page.`)) {
            // Simulate enrollment redirect
            alert(`Redirecting to enrollment for "${courseTitle}"...\n\nThis is a demo - actual enrollment would happen here.`);
        }
    }
});

// Add smooth hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles if not already added
            if (!document.getElementById('ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    .btn {
                        position: relative;
                        overflow: hidden;
                    }
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.3);
                        transform: scale(0);
                        animation: ripple-animation 0.6s linear;
                        pointer-events: none;
                    }
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add loading states for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Only add loading state for different pages
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const targetPage = this.getAttribute('href');
        
        if (currentPage !== targetPage) {
            // Add a subtle loading indicator
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // Reset after a short delay (in case navigation is slow)
            setTimeout(() => {
                this.style.opacity = '';
                this.style.pointerEvents = '';
            }, 1000);
        }
    });
});

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #2563eb;
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        }
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        .scroll-to-top:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(scrollButton);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll-to-top when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollToTop);