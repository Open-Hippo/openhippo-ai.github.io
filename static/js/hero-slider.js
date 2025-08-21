// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('heroSlider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-nav-prev');
    const nextBtn = document.querySelector('.hero-nav-next');
    const progressRing = document.querySelector('.progress-ring-progress');
    
    let currentSlide = 0;
    let autoSlideInterval;
    let progressInterval;
    let autoSlideEnabled = true;
    const autoSlideDelay = 6000; // 6 seconds
    const circumference = 2 * Math.PI * 16; // radius is 16
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
        resetProgress();
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    function startProgress() {
        if (progressRing && slides.length > 1) {
            progressRing.style.strokeDashoffset = circumference;
            progressRing.style.transition = `stroke-dashoffset ${autoSlideDelay}ms linear`;
            
            // Start animation after a small delay to ensure transition applies
            setTimeout(() => {
                progressRing.style.strokeDashoffset = 0;
            }, 50);
        }
    }
    
    function stopProgress() {
        if (progressRing) {
            progressRing.style.transition = 'none';
            progressRing.style.strokeDashoffset = circumference;
        }
    }
    
    function hideProgressCircle() {
        const progressCircle = document.querySelector('.hero-progress-circle');
        if (progressCircle) {
            progressCircle.style.opacity = '0';
            progressCircle.style.visibility = 'hidden';
        }
    }
    
    function resetProgress() {
        stopProgress();
        setTimeout(startProgress, 100);
    }
    
    function startAutoSlide() {
        if (slides.length > 1 && autoSlideEnabled) {
            autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
            startProgress();
        }
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
        stopProgress();
    }
    
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            autoSlideEnabled = false;
            stopAutoSlide();
            hideProgressCircle();
            nextSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            autoSlideEnabled = false;
            stopAutoSlide();
            hideProgressCircle();
            prevSlide();
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetAutoSlide();
        });
    });
    
    // Removed hover pause functionality - slider runs continuously
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            resetAutoSlide();
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });
    
    // Initialize progress circle
    if (progressRing) {
        progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
        progressRing.style.strokeDashoffset = circumference;
    }
    
    // Initialize auto-slide
    startAutoSlide();
    
    // Pause videos when not active
    function handleVideoPlayback() {
        slides.forEach((slide, index) => {
            const video = slide.querySelector('video');
            if (video) {
                if (index === currentSlide) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
    }
    
    // Observer to handle video playback
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                handleVideoPlayback();
            }
        });
    });
    
    slides.forEach(slide => {
        observer.observe(slide, { attributes: true });
    });
    
    // Initial video setup
    handleVideoPlayback();
});