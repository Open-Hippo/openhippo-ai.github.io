// Legal Pages Table of Contents JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const tocNav = document.querySelector('.toc-nav');
    if (!tocNav) return;

    // Mobile collapsible TOC
    if (window.innerWidth <= 768) {
        const tocHeading = tocNav.querySelector('h4');
        if (tocHeading) {
            tocHeading.addEventListener('click', function() {
                tocNav.classList.toggle('collapsed');
            });
            // Start collapsed on mobile
            tocNav.classList.add('collapsed');
        }
    }

    // Optional: Highlight current section in TOC
    const tocLinks = tocNav.querySelectorAll('a');
    const headings = document.querySelectorAll('.main-paragraph h2, .main-paragraph h3, .main-paragraph h4');
    
    function highlightCurrentSection() {
        let currentSection = null;
        const scrollPosition = window.scrollY + 100; // Offset for better detection

        headings.forEach(heading => {
            if (heading.offsetTop <= scrollPosition) {
                currentSection = heading;
            }
        });

        if (currentSection && currentSection.id) {
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSection.id) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Run on scroll with throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(highlightCurrentSection);
    });

    // Run once on load
    highlightCurrentSection();
});