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
 });