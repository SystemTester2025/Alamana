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
    
    // Mobile menu toggle
    $('.navbar-toggler').on('click', function() {
        $('.navbar-container').toggleClass('mobile-expanded');
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
            transform: 'translateY(10px)',
            opacity: 0.7
        }, 1000, function() {
            $('.scroll-circle').animate({
                transform: 'translateY(0)',
                opacity: 1
            }, 1000, pulseAnimation);
        });
    }
    
    // Start the animation
    pulseAnimation();
    
    // Add a small delay to ensure all elements are loaded
    setTimeout(function() {
        // Trigger scroll to initialize elements
        $(window).trigger('scroll');
    }, 500);
});