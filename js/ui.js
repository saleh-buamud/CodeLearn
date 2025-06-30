// ========================================
// UI INTERACTIONS - CODELearn WEBSITE
// ========================================

// ========================================
// COURSE ENROLLMENT BUTTONS
// ========================================


// ========================================
// SCROLL TO TOP BUTTON
// ========================================

function setupScrollToTop() {
    // Create scroll to top button
    var scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    
    // Add the button to the page
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // When button is clicked, scroll to top
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} 