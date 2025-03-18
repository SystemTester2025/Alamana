$(document).ready(function() {
    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 800, 'swing');
    });
    
    // Change navbar background on scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });
    
    // Add animation to the scroll down button
    function animateScroll() {
        $('.scroll-circle').animate({
            bottom: '10px'
        }, 1000, function() {
            $('.scroll-circle').animate({
                bottom: '0px'
            }, 1000, animateScroll);
        });
    }
    
    // Start the animation
    animateScroll();
});