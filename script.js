$(document).ready(function() {
    // Preloader
    setTimeout(function() {
        $('.preloader').addClass('fade-out');
        setTimeout(function() {
            $('.preloader').hide();
            $('body').css('overflow', 'visible'); // Ensure body scrolling is enabled
            // Reset animations for headings
            $('.main-heading, .sub-heading').css('width', '0');
            setTimeout(function() {
                $('.main-heading, .sub-heading').css('width', '100%');
            }, 100);

            // Start falling leaves animation after preloader
            createFallingLeaves();
        }, 600); // Match this with the transition time in CSS
    }, 600); // Time to display preloader (same as our animation duration)
    
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
    
    // Product Lightbox Functionality
    function createLightbox() {
        // Create lightbox elements if they don't exist
        if ($('.product-lightbox').length === 0) {
            $('body').append(`
                <div class="product-lightbox">
                    <div class="lightbox-content">
                        <img src="" alt="" class="lightbox-image">
                        <div class="lightbox-title"></div>
                    </div>
                    <div class="lightbox-close"></div>
                </div>
            `);
            
            // Handle closing the lightbox
            $('.lightbox-close').on('click', function() {
                closeLightbox();
            });
            
            // Close lightbox when clicking on the background
            $('.product-lightbox').on('click', function(e) {
                if ($(e.target).hasClass('product-lightbox')) {
                    closeLightbox();
                }
            });
            
            // Close lightbox on ESC key
            $(document).keydown(function(e) {
                if (e.keyCode === 27) { // ESC key
                    closeLightbox();
                }
            });
        }
    }
    
    function openLightbox(imgSrc, title) {
        $('.lightbox-image').attr('src', imgSrc);
        $('.lightbox-title').text(title);
        $('.product-lightbox').addClass('active');
        $('body').css('overflow', 'hidden'); // Prevent scrolling when lightbox is open
    }
    
    function closeLightbox() {
        $('.product-lightbox').removeClass('active');
        $('body').css('overflow', ''); // Restore scrolling
    }
    
    // Initialize lightbox
    createLightbox();
    
    // Handle product item clicks
    $(document).on('click', '.product-item', function() {
        const imgSrc = $(this).find('.product-image').attr('src');
        const title = $(this).find('.product-label').text();
        openLightbox(imgSrc, title);
    });

    // Falling Leaves Animation
    function createFallingLeaves() {
        const wrapper = $('.site-wrapper');
        const wrapperWidth = wrapper.width();
        const leafCount = 20; // Number of leaves
        const leafColors = ['#21602B', '#8BB729', '#5A8F29', '#3D7A1F']; // Different green shades
        const leafSizes = [15, 20, 25, 30]; // Different sizes in pixels
        const leafImages = ['public/images/leafs/leaf1.svg', 'public/images/leafs/leaf2.svg', 'public/images/leafs/leaf3.svg',
             'public/images/leafs/leaf4.svg'];
        
        // Create and position leaves
        for (let i = 0; i < leafCount; i++) {
            setTimeout(() => {
                // Create random attributes for each leaf
                const randomLeftPos = Math.floor(Math.random() * wrapperWidth);
                const randomSize = leafSizes[Math.floor(Math.random() * leafSizes.length)];
                const randomColor = leafColors[Math.floor(Math.random() * leafColors.length)];
                const randomRotation = Math.floor(Math.random() * 360);
                const randomDuration = 5 + Math.random() * 10; // Between 5-15 seconds
                const randomDelay = Math.random() * 5; // Random delay up to 5 seconds
                const animationName = `falling-leaf-${Math.floor(Math.random() * 3) + 1}`;
                const randomImg = leafImages[Math.floor(Math.random() * leafImages.length)];
                
                // Create leaf element with img inside
                const leaf = $('<div class="leaf"></div>');
                const leafImg = $(`<img src="${randomImg}" alt="leaf">`);
                leaf.append(leafImg);
                
                // Set styles for the leaf
                leaf.css({
                    left: randomLeftPos + 'px',
                    width: randomSize + 'px',
                    height: randomSize + 'px',
                    filter: `drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3)) hue-rotate(${Math.random() * 40 - 20}deg)`,
                    animation: `${animationName} ${randomDuration}s linear ${randomDelay}s infinite`,
                    transform: `rotate(${randomRotation}deg)`
                });
                
                // Add the leaf to the site wrapper
                wrapper.append(leaf);
                
                // Animate the leaf falling
                leaf.animate({
                    top: wrapper.height() + 100 + 'px'
                }, {
                    duration: randomDuration * 1000,
                    easing: 'linear',
                    complete: function() {
                        // Remove leaf after it falls out of view and create a new one
                        $(this).remove();
                        createNewLeaf();
                    }
                });
            }, i * 300); // Stagger the creation of leaves
        }
    }
    
    // Create a single new leaf to replace one that fell out of view
    function createNewLeaf() {
        const wrapper = $('.site-wrapper');
        const wrapperWidth = wrapper.width();
        const leafColors = ['#21602B', '#8BB729', '#5A8F29', '#3D7A1F'];
        const leafSizes = [15, 20, 25, 30];
        const leafImages = ['public/images/leafs/leaf1.svg', 'public/images/leafs/leaf2.svg', 'public/images/leafs/leaf3.svg', 'public/images/leafs/leaf4.svg'];
        
        // Random attributes
        const randomLeftPos = Math.floor(Math.random() * wrapperWidth);
        const randomSize = leafSizes[Math.floor(Math.random() * leafSizes.length)];
        const randomColor = leafColors[Math.floor(Math.random() * leafColors.length)];
        const randomRotation = Math.floor(Math.random() * 360);
        const randomDuration = 5 + Math.random() * 10;
        const animationName = `falling-leaf-${Math.floor(Math.random() * 3) + 1}`;
        const randomImg = leafImages[Math.floor(Math.random() * leafImages.length)];
        
        // Create leaf element with img inside
        const leaf = $('<div class="leaf"></div>');
        const leafImg = $(`<img src="${randomImg}" alt="leaf">`);
        leaf.append(leafImg);
        
        // Set styles
        leaf.css({
            left: randomLeftPos + 'px',
            width: randomSize + 'px',
            height: randomSize + 'px',
            top: '-50px',
            filter: `drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3)) hue-rotate(${Math.random() * 40 - 20}deg)`,
            animation: `${animationName} ${randomDuration}s linear infinite`,
            transform: `rotate(${randomRotation}deg)`
        });
        
        // Add to wrapper
        wrapper.append(leaf);
        
        // Animate falling
        leaf.animate({
            top: wrapper.height() + 100 + 'px'
        }, {
            duration: randomDuration * 1000,
            easing: 'linear',
            complete: function() {
                $(this).remove();
                createNewLeaf();
            }
        });
    }
});