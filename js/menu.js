// ========================================
// MENU FUNCTIONALITY - CODELearn WEBSITE
// ========================================

// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================

function setupMobileMenu() {
    // Get the important elements we need
    var mobileMenuButton = document.getElementById('mobile-menu');
    var navigationMenu = document.querySelector('.nav-menu');
    var body = document.body;
    
    // Check if mobile menu button exists (only on mobile)
    if (!mobileMenuButton) {
        return; // Exit if no mobile menu button found
    }
    
    // Create a dark overlay that appears behind the mobile menu
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    
    // When mobile menu button is clicked
    mobileMenuButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent other clicks
        toggleMobileMenu();
    });
    
    // When overlay is clicked, close the menu
    overlay.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // When any navigation link is clicked, close the menu
    var navLinks = document.querySelectorAll('.nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            closeMobileMenu();
        });
    }
    
    // When Escape key is pressed, close the menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // When window is resized to desktop size, close mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Function to toggle mobile menu (open if closed, close if open)
    function toggleMobileMenu() {
        var isMenuOpen = navigationMenu.classList.contains('active');
        
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    // Function to open mobile menu
    function openMobileMenu() {
        mobileMenuButton.classList.add('active');
        navigationMenu.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('nav-open');
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        mobileMenuButton.classList.remove('active');
        navigationMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('nav-open');
    }
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

function setupNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    
    // When user scrolls
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            // Add blur effect when scrolled down
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            // Remove blur effect when at top
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    });
} 