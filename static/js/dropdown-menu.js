// Dropdown Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    function initializeDropdowns() {
        const dropdowns = document.querySelectorAll('[data-dropdown]');
        const isMobile = window.matchMedia('(max-width: 991px)').matches;
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('[data-dropdown-toggle]');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            // Remove any existing event listeners by cloning
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            // Click handler
            newToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('open');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('open');
            });
            
            // Desktop hover handlers
            if (!isMobile) {
                dropdown.addEventListener('mouseenter', function() {
                    dropdown.classList.add('open');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    dropdown.classList.remove('open');
                });
            }
        });
    }
    
    // Initialize dropdowns
    initializeDropdowns();
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('[data-dropdown]')) {
            document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close all dropdowns
            document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
            
            // Reinitialize dropdowns for new screen size
            initializeDropdowns();
        }, 250);
    });
});