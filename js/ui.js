// ========================================
// UI INTERACTIONS - CODELearn WEBSITE
// ========================================

// ========================================
// COURSE ENROLLMENT BUTTONS
// ========================================

function setupCourseButtons() {
    // Listen for clicks on course enrollment buttons
    document.addEventListener('click', function(event) {
        // Check if the clicked element is a course enrollment button
        if (event.target.matches('.course-card .btn-primary')) {
            event.preventDefault();
            
            // Get the course card that was clicked
            var courseCard = event.target.closest('.course-card');
            var courseTitle = courseCard.querySelector('.course-title').textContent;
            
            // Ask user for confirmation
            var userConfirmed = confirm('Would you like to enroll in "' + courseTitle + '"?\n\nThis will redirect you to the enrollment page.');
            
            if (userConfirmed) {
                // Show enrollment message (this would normally redirect to enrollment page)
                alert('Redirecting to enrollment for "' + courseTitle + '"...\n\nThis is a demo - actual enrollment would happen here.');
            }
        }
    });
}

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