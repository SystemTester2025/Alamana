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
    
    // Add close button to mobile navbar if it doesn't exist
    if ($('.navbar-close').length === 0) {
        $('.navbar-collapse').prepend('<div class="navbar-close"></div>');
    }
    
    // Modified mobile navbar handling
    $('.navbar-toggler').on('click', function() {
        // Hide navbar-toggler when menu is opened
        if (!$('.navbar-collapse').hasClass('show')) {
            $(this).fadeOut(300);
        }
    });
    
    // Handle close button inside the menu
    $(document).on('click', '.navbar-close', function() {
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-toggler').trigger('click');
            // Show navbar-toggler when menu is closed
            setTimeout(function() {
                $('.navbar-toggler').fadeIn(300);
            }, 300);
        }
    });
    
    // Close menu when clicking on a menu item only
    $(document).on('click', '.navbar-nav .nav-link', function() {
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-toggler').trigger('click');
            // Show navbar-toggler when menu is closed
            setTimeout(function() {
                $('.navbar-toggler').fadeIn(300);
            }, 300);
        }
    });
    
    // Bootstrap event for when collapse is hidden
    $('.navbar-collapse').on('hidden.bs.collapse', function () {
        // Show navbar-toggler when menu is closed
        $('.navbar-toggler').fadeIn(300);
    });
    
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
        if (!el.length) return false;
        const rect = el[0].getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    $(window).on('scroll', function() {
        if ($('.product-counter').length && isElementInViewport($('.product-counter')) && !$('.product-counter').hasClass('counted')) {
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
});