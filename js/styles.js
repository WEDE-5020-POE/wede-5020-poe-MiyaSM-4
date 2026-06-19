/* ============================================
   SM LUXURY HAIR SALON - MAIN JAVASCRIPT (PART 3)
   ============================================
   SOURCES USED:
   - W3Schools (2026)
   - Coyier (2026) - Modern JavaScript patterns
   
   FEATURES ADDED:
   - Mobile menu toggle
   - Working Slideshow (Auto-play, arrows, dots)
   - Lightbox gallery for service images
   - AJAX Form Submission (Required for Part 3)
   - Client-side form validation
   - Error handling and notifications
   - Service search filter
   - FAQ accordion functionality
   - NEW: Cost and availability response for booking form
   - NEW: Email compilation and sending for contact form
   ============================================ */

// Wait for HTML document to be fully loaded before running JavaScript
// Source: W3Schools (2026) - DOM Events
document.addEventListener('DOMContentLoaded', function() {
    console.log('SM Luxury Hair Salon - JavaScript Loaded');

    // ========================================
    // 1. MOBILE MENU TOGGLE
    // ========================================
    // Source: W3Schools (2026) - JavaScript Event Listeners
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            // Toggle 'active' class to show/hide menu
            navMenu.classList.toggle('active');
            
            // Change icon from ☰ to  and back
            if (navMenu.classList.contains('active')) {
                navToggle.innerHTML = '✕';
            } else {
                navToggle.innerHTML = '☰';
            }
        });
    }

    // ========================================
    // 2. WORKING SLIDESHOW
    // ========================================
    // Source: W3Schools (2026) - How To Slideshow
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slideshow-prev');
    const nextBtn = document.querySelector('.slideshow-next');
    let currentSlide = 0;
    let slideInterval;

    // Function to display specific slide
    function showSlide(index) {
        // Remove 'active' class from all slides and dots
        slides.forEach(function(slide) {
            slide.classList.remove('active');
        });
        dots.forEach(function(dot) {
            dot.classList.remove('active');
        });
        
        // Handle wrap-around (go to first slide if at end, and vice versa)
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Add 'active' class to current slide and dot
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    // Next slide function
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Previous slide function
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Start slideshow - change slide every 5 seconds
    // Source: W3Schools (2026) - JavaScript setInterval
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Stop slideshow
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners for next/previous buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopSlideShow();
            nextSlide();
            startSlideShow();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopSlideShow();
            prevSlide();
            startSlideShow();
        });
    }

    // Event listeners for dots
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });

    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopSlideShow);
        slideshowContainer.addEventListener('mouseleave', startSlideShow);
    }

    // Initialize first slide and start slideshow
    if (slides.length > 0) {
        showSlide(0);
        startSlideShow();
    }

    // ========================================
    // 3. LIGHTBOX GALLERY
    // ========================================
    // Source: W3Schools (2026) - How To Lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<span class="lightbox-close">&times;</span><img class="lightbox-img" src="" alt=""><div class="lightbox-caption"></div>';
    document.body.appendChild(lightbox);

    // Make all service images clickable
    const galleryImages = document.querySelectorAll('.service-card img, .extra-images img');
    galleryImages.forEach(function(img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            // Set lightbox image source and caption
            lightbox.querySelector('.lightbox-img').src = img.src;
            lightbox.querySelector('.lightbox-caption').textContent = img.alt;
            // Show lightbox
            lightbox.classList.add('active');
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox when clicking X button
    lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close lightbox on Escape key press
    // 
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ========================================
    // 4. AJAX FORM SUBMISSION
    // ========================================
    // Source: W3Schools (2026) - Fetch API / AJAX
    // This submits forms without page reload using Fetch API
    // Provides better user experience as required by assignment

    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.querySelector('.contact-form form');

    // Add submit event listener to booking form
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Add submit event listener to contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Handle Booking Form Submission with AJAX
    async function handleBookingSubmit(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Validate form first
        if (!validateForm(bookingForm)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Get form data
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Show loading state on button
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '⏳ Booking...';
            submitBtn.disabled = true;
            
            // SIMULATED AJAX REQUEST
            // In production, replace with:
            // await fetch('BOOKING-Handler.php', { method: 'POST', body: formData })
            await simulateAJAXRequest();
            
            // ========================================
            // NEW: Generate cost and availability response
            // ========================================
            // Source: W3Schools (2026) - JavaScript Objects and Arrays
            // This provides the user with a response related to cost and availability
            // as required by the assignment
            
            const serviceType = document.getElementById('Service-type').value;
            const preferredTime = document.getElementById('prefered_time').value;
            
            // Price list for different services
            const servicePrices = {
                'haircut': { price: 'R150 - R250', duration: '1 - 1.5 hours' },
                'box-braids': { price: 'R100 - R250', duration: '3 - 5 hours' },
                'cornrows': { price: 'R100 - R150', duration: '1 - 2 hours' },
                'twists': { price: 'R180 - R250', duration: '2 - 4 hours' },
                'crochet': { price: 'R250 - R320', duration: '2 - 3 hours' },
                'faux-locs': { price: 'R250 - R300', duration: '3 - 5 hours' },
                'natural-care': { price: 'R150 - R250', duration: '1 - 2 hours' }
            };
            
            // Check if service exists in price list
            let serviceInfo = '';
            if (servicePrices[serviceType]) {
                const service = servicePrices[serviceType];
                serviceInfo = '<br><br>';
                serviceInfo += '💰 <strong>Estimated Cost:</strong> ' + service.price + '<br>';
                serviceInfo += '⏰ <strong>Availability:</strong> ' + preferredTime + ' slot is available!<br>';
                serviceInfo += '⏱️ <strong>Estimated Duration:</strong> ' + service.duration + '<br>';
                serviceInfo += '📞 <strong>Confirmation:</strong> We will call you within 24 hours to confirm.';
            } else {
                serviceInfo = '<br><br>';
                serviceInfo += '💰 <strong>Cost:</strong> To be discussed during consultation<br>';
                serviceInfo += '⏰ <strong>Availability:</strong> ' + preferredTime + ' slot is available!<br>';
                serviceInfo += '📞 <strong>Confirmation:</strong> We will call you within 24 hours to confirm.';
            }
            
            // Show success message with cost and availability information
            showNotification('✅ Booking submitted successfully!' + serviceInfo, 'success');
            bookingForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        } catch (error) {
            // Show error message
            showNotification('❌ Error submitting booking. Please try again or call us.', 'error');
            console.error('Booking Error:', error);
        }
    }

    // Handle Contact Form Submission with AJAX
    async function handleContactSubmit(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Validate form first
        if (!validateForm(contactForm)) {
            showNotification('Please fill in all fields correctly.', 'error');
            return;
        }
        
        const formData = new FormData(contactForm);
        
        try {
            // Show loading state on button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '⏳ Sending...';
            submitBtn.disabled = true;
            
            // SIMULATED AJAX REQUEST
            // In production: await fetch('/contact-handler.php', { method: 'POST', body: formData })
            await simulateAJAXRequest();
            
            // ========================================
            // NEW: Compile form data into email
            // ========================================
            // Source: W3Schools (2026) - JavaScript String Methods
            // This compiles the validated information into an email
            // and allows the customer to send it to the recipient
            // as required by the assignment
            
            const name = document.getElementById('Name').value;
            const surname = document.getElementById('Surname').value;
            const email = document.getElementById('Email').value;
            const phone = document.getElementById('Phone-Number').value;
            const message = document.getElementById('Message').value;
            
            // Compile email subject
            const emailSubject = 'Contact Form: ' + name + ' ' + surname;
            
            // Compile email body with all form information
            const emailBody = 'Name: ' + name + ' ' + surname + '%0D%0A' +
                             'Email: ' + email + '%0D%0A' +
                             'Phone: ' + phone + '%0D%0A' +
                             '%0D%0A' +
                             'Message:%0D%0A' + message;
            
            // Create mailto link to send email to salon
            // Source: W3Schools (2026) - HTML Links
            const mailtoLink = 'mailto:info@smLuxuryHairSalon.com?subject=' + 
                              encodeURIComponent(emailSubject) + '&body=' + emailBody;
            
            // Show success message with email compilation and send link
            const successMessage = '✅ Message compiled successfully!<br><br>' +
                                  '📧 <strong>Recipient:</strong> info@smLuxuryHairSalon.com<br>' +
                                  '👤 <strong>From:</strong> ' + name + ' ' + surname + '<br><br>' +
                                  '<a href="' + mailtoLink + '" style="color: #ffd700; text-decoration: underline; font-weight: bold;">' +
                                  '📤 Click here to send email now</a>';
            
            showNotification(successMessage, 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        } catch (error) {
            // Show error message
            showNotification('❌ Error sending message. Please try again.', 'error');
            console.error('Contact Error:', error);
        }
    }

    // Helper function to validate forms
    // Source: W3Schools (2026) - Form Validation
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                // Field is empty
                isValid = false;
                field.style.borderColor = 'red';
                field.classList.add('invalid');
                field.classList.remove('valid');
            } else {
                // Field has value
                field.style.borderColor = '#e0e0e0';
                field.classList.remove('invalid');
                field.classList.add('valid');
                
                // Validate email format
                // Source: W3Schools (2026) - JavaScript String Methods
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.style.borderColor = 'red';
                        field.classList.remove('valid');
                        field.classList.add('invalid');
                    }
                }
                
                // Validate phone number (at least 10 digits)
                if (field.type === 'tel') {
                    const phoneDigits = field.value.replace(/\D/g, '');
                    if (phoneDigits.length < 10) {
                        isValid = false;
                        field.style.borderColor = 'red';
                        field.classList.remove('valid');
                        field.classList.add('invalid');
                    }
                }
            }
        });
        
        return isValid;
    }

    // Simulate AJAX request (REMOVE THIS when you have a real backend)
    function simulateAJAXRequest() {
        return new Promise(function(resolve) {
            setTimeout(resolve, 1500);
        });
    }

    // Notification system for error handling
    // Source: W3Schools (2026) - JavaScript DOM Manipulation
    function showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        // Create new notification element
        const notification = document.createElement('div');
        notification.className = 'notification ' + type;
        notification.innerHTML = message; // Changed from textContent to innerHTML to support HTML links
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(function() {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(function() {
                notification.remove();
            }, 500);
        }, 5000);
    }

    // ========================================
    // 5. SERVICE SEARCH FILTER
    // ========================================
    // Source: W3Schools (2026) - JavaScript String Search
    const searchInput = document.getElementById('serviceSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const serviceCards = document.querySelectorAll('.service-card');
            
            serviceCards.forEach(function(card) {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ========================================
    // 6. SCROLL ANIMATIONS
    // ========================================
    // Source: W3Schools (2026) - Intersection Observer API
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .service-card, .team-card').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ========================================
    // 7. FAQ ACCORDION FUNCTIONALITY
    // ========================================
    // Source: W3Schools (2026) - JavaScript Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(function(item) {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    console.log('All JavaScript features initialized successfully!');
});