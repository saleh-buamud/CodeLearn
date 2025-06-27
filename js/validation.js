// ========================================
// FORM VALIDATION - CODELearn WEBSITE
// ========================================

// ========================================
// CONTACT FORM FUNCTIONALITY
// ========================================

function setupContactForm() {
    // Get the contact form
    var contactForm = document.getElementById('contactForm');
    
    // If no contact form exists, exit
    if (!contactForm) {
        return;
    }
    
    // Get form elements
    var submitButton = document.getElementById('submitBtn');
    var buttonText = submitButton.querySelector('.btn-text');
    var buttonLoader = submitButton.querySelector('.btn-loader');
    var successMessage = document.getElementById('successMessage');
    
    // When form is submitted
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent normal form submission
        
        // Check if form is valid
        if (validateContactForm()) {
            submitContactForm();
        }
    });
    
    // Function to validate the contact form
    function validateContactForm() {
        var isValid = true;
        
        // Get all form fields
        var nameField = document.getElementById('name');
        var emailField = document.getElementById('email');
        var topicField = document.getElementById('topic');
        var messageField = document.getElementById('message');
        
        // Clear all previous error messages
        clearAllErrors();
        
        // Validate name field
        if (!nameField.value.trim()) {
            showError('name', 'Name is required');
            isValid = false;
        } else if (nameField.value.trim().length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email field
        if (!emailField.value.trim()) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailField.value)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate topic field
        if (!topicField.value) {
            showError('topic', 'Please select a topic');
            isValid = false;
        }
        
        // Validate message field
        if (!messageField.value.trim()) {
            showError('message', 'Message is required');
            isValid = false;
        } else if (messageField.value.trim().length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Function to show error message for a field
    function showError(fieldName, message) {
        var field = document.getElementById(fieldName);
        var errorElement = document.getElementById(fieldName + 'Error');
        var fieldContainer = field.closest('.form-group');
        
        // Add error class to field container
        fieldContainer.classList.add('error');
        
        // Show error message
        errorElement.textContent = message;
    }
    
    // Function to clear all error messages
    function clearAllErrors() {
        var errorElements = document.querySelectorAll('.error-message');
        var errorContainers = document.querySelectorAll('.form-group');
        
        // Clear all error messages
        for (var i = 0; i < errorElements.length; i++) {
            errorElements[i].textContent = '';
        }
        
        // Remove error classes
        for (var i = 0; i < errorContainers.length; i++) {
            errorContainers[i].classList.remove('error');
        }
    }
    
    // Function to check if email is valid (simple check)
    function isValidEmail(email) {
        // Simple email validation - checks for @ and .
        return email.includes('@') && email.includes('.');
    }
    
    // Function to submit the contact form
    function submitContactForm() {
        // Show loading state
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline-block';
        
        // Simulate form submission (2 seconds delay)
        setTimeout(function() {
            // Hide loading state
            submitButton.disabled = false;
            buttonText.style.display = 'inline-block';
            buttonLoader.style.display = 'none';
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.classList.add('show');
            
            // Reset form after 3 seconds
            setTimeout(function() {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.classList.remove('show');
                clearAllErrors();
            }, 3000);
            
        }, 2000);
    }
} 