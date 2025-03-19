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
    
    // Handle fixed navbar on scroll with throttling for better performance
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.navbar').outerHeight();
    
    $(window).scroll(function() {
        didScroll = true;
    });
    
    // Run hasScrolled() and update active links at max every 250ms
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            updateActiveNavLinks();
            didScroll = false;
        }
    }, 250);
    
    function hasScrolled() {
        var scrollTop = $(window).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - scrollTop) <= delta)
            return;
        
        // Scroll position where navbar becomes fixed
        var scrollTrigger = 100;
        
        // If the user scrolled down and past the navbar, add class .fixed-navbar
        if (scrollTop > scrollTrigger) {
            // Scroll Down
            $('.navbar').addClass('fixed-navbar');
            
            // If they scrolled down and past the threshold, hide the navbar
            if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
                // Scrolling Down - Hide navbar
                $('.navbar.fixed-navbar').css('transform', 'translateY(-100%)');
            } else {
                // Scrolling Up - Show navbar
                $('.navbar.fixed-navbar').css('transform', 'translateY(0)');
            }
        } else {
            // At the top
            $('.navbar').removeClass('fixed-navbar');
            $('.navbar').css('transform', '');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Function to update active navigation links based on scroll position
    function updateActiveNavLinks() {
        var scrollPosition = $(window).scrollTop() + 200; // Adding offset for better detection
        var currentSection = '';
        
        // Loop through each section with an ID
        $('section[id]').each(function() {
            var target = $(this);
            var id = target.attr('id');
            var targetTop = target.offset().top;
            var targetHeight = target.outerHeight();
            
            // Check if the scroll position is within the section
            if (scrollPosition >= targetTop && scrollPosition <= targetTop + targetHeight) {
                currentSection = id;
            }
        });
        
        // Only update if we found a section
        if (currentSection !== '') {
            // Remove active class from all links
            $('.navbar-nav .nav-link').removeClass('active');
            
            // Add active class to corresponding nav link
            $('.navbar-nav .nav-link[href="#' + currentSection + '"]').addClass('active');
        } else if (scrollPosition < $('#content').offset().top) {
            // If at the top of the page, set home link as active
            $('.navbar-nav .nav-link').removeClass('active');
            $('.navbar-nav .nav-link:first').addClass('active');
        }
    }
    
    // Smooth scrolling for anchor links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-bs-toggle]').click(function(event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            
            if (target.length) {
                event.preventDefault();
                
                // Close mobile menu if open
                if ($('.navbar-collapse').hasClass('show')) {
                    $('.navbar-toggler').trigger('click');
                }
                
                // Calculate offset based on navbar height
                var navbarHeight = $('.navbar').outerHeight();
                var offset = target.offset().top - navbarHeight - 20; // 20px extra padding
                
                // Highlight active nav item
                $('.navbar-nav .nav-link').removeClass('active');
                $(this).addClass('active');
            
            $('html, body').animate({
                    scrollTop: offset
            }, 800, 'swing', function() {
                    // Add hash to URL after scrolling (optional)
                    if (history.pushState) {
                        history.pushState(null, null, target.selector);
                    } else {
                        location.hash = target.selector;
                    }
                });
            }
        }
    });
    
    // Update active menu item on scroll
    $(window).scroll(function() {
        var scrollPosition = $(this).scrollTop();
        
        // Get navbar height for offset calculation
        var navbarHeight = $('.navbar').outerHeight();
        
        // Check each section and update menu accordingly
        $('section').each(function() {
            var sectionTop = $(this).offset().top - navbarHeight - 100;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var sectionId = $(this).attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.navbar-nav .nav-link').removeClass('active');
                $('.navbar-nav .nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
        
        // Keep Home active when at the top
        if (scrollPosition < 100) {
            $('.navbar-nav .nav-link').removeClass('active');
            $('.navbar-nav .nav-link:first').addClass('active');
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

    // Initialize active nav state on page load
    setTimeout(function() {
        updateActiveNavLinks();
    }, 1000);

    // Add debounced resize handler to recalculate heights on window resize
    var resizeTimeout;
    $(window).on('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            navbarHeight = $('.navbar').outerHeight();
            updateActiveNavLinks();
        }, 250);
    });
});