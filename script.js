$(document).ready(function() {
    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function(e) {
        if (this.hash !== '') {
            e.preventDefault();
            
            const hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, 'swing', function() {
                window.location.hash = hash;
            });
        }
    });
    
    // Simple accordion arrow rotation fix
    $('#managementAccordion').on('show.bs.collapse', function(e) {
        $(e.target).prev('.accordion-header').attr('aria-expanded', true);
    });

    $('#managementAccordion').on('hide.bs.collapse', function(e) {
        $(e.target).prev('.accordion-header').attr('aria-expanded', false);
    });

    // Initialize accordion headers on page load
    $('.accordion-collapse').each(function() {
        const isExpanded = $(this).hasClass('show');
        $(this).prev('.accordion-header').attr('aria-expanded', isExpanded);
    });
    
    // Change navbar background on scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });
    
    // Initialize navbar state on page load
    if ($(window).scrollTop() > 50) {
        $('.navbar').addClass('navbar-scrolled');
    }
    
    // Mobile menu toggle - only for tablet and mobile (below 768px)
    $('.navbar-toggler').on('click', function() {
        $('.navbar-collapse').toggleClass('show');
        
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-container').addClass('mobile-expanded');
        } else {
            $('.navbar-container').removeClass('mobile-expanded');
        }
    });
    
    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar-container').length && 
            $('.navbar-collapse').hasClass('show') && 
            !$(e.target).closest('.navbar-toggler').length) {
            $('.navbar-toggler').click();
        }
    });
    
    // Check for browser width changes to handle menu state
    function handleResponsiveMenu() {
        // Ensure menu is visible on desktop/larger screens
        if ($(window).width() >= 768) {
            // If screen is large enough to show normal menu, ensure collapse is visible
            if (!$('.navbar-collapse').hasClass('show') && !$('.navbar-collapse').is(':visible')) {
                $('.navbar-collapse').addClass('show');
            }
        } else {
            // On mobile, if menu is open, keep it open; if closed, keep it closed
            if (!$('.navbar-toggler').is(':visible')) {
                $('.navbar-collapse').removeClass('show');
                $('.navbar-container').removeClass('mobile-expanded');
            }
        }
    }
    
    // Run on resize and on page load
    $(window).on('resize', handleResponsiveMenu);
    
    // Animated counting for product counter
    const counterAnimation = () => {
        let count = 0;
        const target = 10;
        const counterElement = $('.counter-text');
        
        const interval = setInterval(() => {
            count++;
            counterElement.text(`+${count}`);
            
            if (count >= target) {
                clearInterval(interval);
            }
        }, 200);
    };
    
    // Start counter animation when visible
    const isElementInViewport = (el) => {
        const rect = el[0].getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    $(window).on('scroll', function() {
        if (isElementInViewport($('.product-counter')) && !$('.product-counter').hasClass('counted')) {
            $('.product-counter').addClass('counted');
            counterAnimation();
        }
    }).trigger('scroll');
    
    // Animate the scroll-down button
    function pulseAnimation() {
        $('.scroll-circle').animate({
            opacity: 0.7
        }, 1000, function() {
            $('.scroll-circle').animate({
                opacity: 1
            }, 1000, pulseAnimation);
        });
    }
    
    // Start the animation
    pulseAnimation();
    
    // Add a small delay to ensure all elements are loaded
    setTimeout(function() {
        // Trigger scroll and resize to initialize elements
        $(window).trigger('scroll');
        handleResponsiveMenu();
    }, 500);
});