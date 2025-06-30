// This file is intentionally minimal as the website uses vanilla HTML/CSS/JS
// All functionality is handled in script.js which is loaded by each HTML page


// Optional: Add any global initialization here if needed

// ========================================
// MAIN JAVASCRIPT FILE - CODELearn WEBSITE
// ========================================

// Wait for the page to fully load before running any code
document.addEventListener('DOMContentLoaded', function() {
    
    // Set up all the website features
    setupMobileMenu();
    setupContactForm();
    setupCourseButtons();
    setupScrollToTop();
    setupScrollToTop(); // هذه الوظيفة يجب أن تكون معرّفة مسبقاً
    setupNavbarScroll();
    setupSmoothScrolling();
});

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================

function setupSmoothScrolling() {
    // Set up smooth scrolling for links that start with #
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    for (var i = 0; i < anchorLinks.length; i++) {
        anchorLinks[i].addEventListener('click', function(event) {
            event.preventDefault();
            
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}