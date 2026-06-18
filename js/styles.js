/* ============================================
   SM LUXURY HAIR SALON - MAIN JAVASCRIPT (PART 3)
   ============================================
   FEATURES ADDED:
   - Mobile menu toggle
   - Working Slideshow (Auto-play, arrows, dots)
   - Lightbox gallery for service images
   - AJAX Form Submission (Required for Part 3)
   - Client-side form validation
   - Error handling and notifications
   - Service search filter
   - ADDED: FAQ accordion functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('SM Luxury Hair Salon - JavaScript Loaded');

    // ========================================
    // 1. MOBILE MENU TOGGLE
    // ========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // ========================================
    // 2. WORKING SLIDESHOW (Auto-play & Clickable)
    // ========================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slideshow-prev');
    const nextBtn = document.querySelector('.slideshow-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }
    function startSlideShow() { slideInterval = setInterval(nextSlide, 5000); } // Changes every 5 seconds
    function stopSlideShow() { clearInterval(slideInterval); }

    if (nextBtn) nextBtn.addEventListener('click', () => { stopSlideShow(); nextSlide(); startSlideShow(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { stopSlideShow(); prevSlide(); startSlideShow(); });
    dots.forEach((dot, index) => dot.addEventListener('click', () => { stopSlideShow(); showSlide(index); startSlideShow(); }));

    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopSlideShow);
        slideshowContainer.addEventListener('mouseleave', startSlideShow);
    }
    if (slides.length > 0) { showSlide(0); startSlideShow(); }

    // ========================================
    // 3. LIGHTBOX GALLERY
    // ========================================
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<span class="lightbox-close">&times;</span><img class="lightbox-img" src="" alt=""><div class="lightbox-caption"></div>';
    document.body.appendChild(lightbox);

    document.querySelectorAll('.service-card img, .extra-images img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            lightbox.querySelector('.lightbox-img').src = img.src;
            lightbox.querySelector('.lightbox-caption').textContent = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

      // ========================================
    // 4. AJAX FORM SUBMISSION (REQUIRED FOR PART 3)
    // ========================================
    // This submits forms without page reload using Fetch API
    // Provides better user experience as required by assignment

    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.querySelector('.contact-form form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Handle Booking Form Submission with AJAX
    async function handleBookingSubmit(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Validate first
        if (!validateForm(bookingForm)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Show loading state
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '⏳ Booking...';
            submitBtn.disabled = true;
            
            // SIMULATED AJAX REQUEST (Replace with actual endpoint when available)
            // In production, this would be: 
            // await fetch('BOOKING-Handler.php', { method: 'POST', body: formData })
            await simulateAJAXRequest();
            
            // Success
            showNotification('✅ Booking submitted successfully! We will confirm your appointment shortly.', 'success');
            bookingForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        } catch (error) {
            showNotification('❌ Error submitting booking. Please try again or call us.', 'error');
            console.error('Booking Error:', error);
        }
    }

    // Handle Contact Form Submission with AJAX
    async function handleContactSubmit(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Validate first
        if (!validateForm(contactForm)) {
            showNotification('Please fill in all fields correctly.', 'error');
            return;
        }
        
        const formData = new FormData(contactForm);
        
        try {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '⏳ Sending...';
            submitBtn.disabled = true;
            
            // SIMULATED AJAX REQUEST
            // In production: await fetch('/contact-handler.php', { method: 'POST', body: formData })
            await simulateAJAXRequest();
            
            // Success
            showNotification('✅ Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        } catch (error) {
            showNotification('❌ Error sending message. Please try again.', 'error');
            console.error('Contact Error:', error);
        }
    }

    // Helper function to validate forms
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
                field.classList.add('invalid');
                field.classList.remove('valid');
            } else {
                field.style.borderColor = '#e0e0e0';
                field.classList.remove('invalid');
                field.classList.add('valid');
                
                // Validate email format
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.style.borderColor = 'red';
                        field.classList.remove('valid');
                        field.classList.add('invalid');
                    }
                }
                
                // Validate phone (at least 10 digits)
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
        return new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Notification system for error handling
    function showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    // ========================================
    // 5. SERVICE SEARCH FILTER
    // ========================================
    const searchInput = document.getElementById('serviceSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('.service-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }
      // ========================================
    // 6. SCROLL ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .service-card, .team-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ========================================
    // 7. FAQ ACCORDION FUNCTIONALITY (NEW)
    // ========================================
    // Allows users to click FAQ questions to reveal answers
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
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

