// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-icon')) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top button behavior
    const backToTopButton = document.getElementById('backToTop');
    
    // Header scroll behavior
    const header = document.querySelector('header');
    
    // Floating CTA
    const floatingCta = document.querySelector('.floating-cta');
    
    // Combined scroll event listener for multiple elements
    window.addEventListener('scroll', function() {
        // Back to top button visibility
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        }
        
        // Header scroll behavior
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Floating CTA visibility
        if (floatingCta) {
            const heroSection = document.querySelector('#hero');
            const footerSection = document.querySelector('footer');
            
            if (heroSection && footerSection) {
                const scrollPosition = window.scrollY + window.innerHeight;
                const footerPosition = footerSection.offsetTop;
                
                if (window.scrollY > heroSection.offsetHeight && scrollPosition < footerPosition) {
                    floatingCta.classList.add('visible');
                } else {
                    floatingCta.classList.remove('visible');
                }
            }
        }
    });
    
    // Active menu item based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // AOS (Animate on Scroll) implementation
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementPosition.top < windowHeight * 0.85 && elementPosition.bottom >= 0) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Check elements on load
    checkIfInView();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Add animation delays to elements with data-aos-delay
    animatedElements.forEach(element => {
        const delay = element.getAttribute('data-aos-delay');
        if (delay) {
            element.style.transitionDelay = `${delay}ms`;
        }
    });
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else if (input.type === 'email' && input.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value)) {
                        valid = false;
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (valid) {
                // Simulate form submission (in a real app, you'd send data to server)
                const formData = new FormData(contactForm);
                let formValues = {};
                
                for (let [key, value] of formData.entries()) {
                    formValues[key] = value;
                }
                
                // Here you would normally send the form data to your server
                console.log('Form submitted with values:', formValues);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                successMessage.style.backgroundColor = 'rgba(0, 186, 255, 0.1)';
                successMessage.style.color = '#0090c5';
                successMessage.style.padding = '15px';
                successMessage.style.borderRadius = '5px';
                successMessage.style.marginTop = '20px';
                successMessage.style.textAlign = 'center';
                
                // Insert success message and reset form
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        // Clear error class on input focus
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailPattern.test(email)) {
                    // Here you would normally send the email to your server
                    console.log('Newsletter subscription:', email);
                    
                    // Show success message
                    const footerNewsletter = document.querySelector('.footer-newsletter');
                    const successMessage = document.createElement('p');
                    successMessage.className = 'newsletter-success';
                    successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                    
                    // Use a direct color instead of CSS variable for better compatibility
                    successMessage.style.color = '#0090c5'; // Replace with your accent color
                    successMessage.style.marginTop = '10px';
                    
                    if (footerNewsletter) {
                        footerNewsletter.appendChild(successMessage);
                    } else {
                        newsletterForm.after(successMessage);
                    }
                    
                    newsletterForm.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                } else {
                    emailInput.classList.add('error');
                }
            }
        });
    }
    
    // Service card hover effect refinement
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Gallery image lightbox effect (complete implementation)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.querySelector('img').getAttribute('src');
            const caption = this.querySelector('.overlay-content h3').textContent;
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.flexDirection = 'column';
            lightbox.style.zIndex = '9999';
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = imageSrc;
            lightboxImg.style.maxWidth = '90%';
            lightboxImg.style.maxHeight = '80%';
            lightboxImg.style.borderRadius = '5px';
            
            const lightboxCaption = document.createElement('p');
            lightboxCaption.textContent = caption;
            lightboxCaption.style.color = 'white';
            lightboxCaption.style.marginTop = '15px';
            lightboxCaption.style.fontSize = '18px';
            
            const closeButton = document.createElement('span');
            closeButton.innerHTML = '&times;';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '20px';
            closeButton.style.right = '30px';
            closeButton.style.color = 'white';
            closeButton.style.fontSize = '40px';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.cursor = 'pointer';
            
            // Add elements to lightbox
            lightbox.appendChild(lightboxImg);
            lightbox.appendChild(lightboxCaption);
            lightbox.appendChild(closeButton);
            
            // Add lightbox to body
            document.body.appendChild(lightbox);
            
            // Prevent scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Close lightbox when clicking close button or anywhere on the lightbox
            closeButton.addEventListener('click', function() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
    
    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonialSlider && testimonials.length > 1) {
        let currentSlide = 0;
        const totalSlides = testimonials.length;
        let slideInterval;
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        dotsContainer.style.display = 'flex';
        dotsContainer.style.justifyContent = 'center';
        dotsContainer.style.marginTop = '20px';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'slider-dot';
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = i === 0 ? '#0090c5' : '#ccc'; // Use direct color instead of CSS variable
            dot.style.margin = '0 5px';
            dot.style.cursor = 'pointer';
            dot.style.transition = 'background-color 0.3s ease';
            
            dot.addEventListener('click', function() {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        testimonialSlider.after(dotsContainer);
        
        // Set initial position
        testimonials.forEach((testimonial, index) => {
            testimonial.style.left = `${index * 100}%`;
        });
        
        // Create slide functions
        function goToSlide(slideIndex) {
            if (slideIndex < 0) {
                slideIndex = totalSlides - 1;
            } else if (slideIndex >= totalSlides) {
                slideIndex = 0;
            }
            
            testimonialSlider.style.transform = `translateX(-${slideIndex * 100}%)`;
            
            // Update dots
            document.querySelectorAll('.slider-dot').forEach((dot, index) => {
                dot.style.backgroundColor = index === slideIndex ? '#0090c5' : '#ccc'; // Use direct color
            });
            
            currentSlide = slideIndex;
        }
        
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        // Auto-advance slides every 5 seconds
        slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto-advance on hover
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        // Add swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide(); // Swipe left
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide(); // Swipe right
            }
        }
    }
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    function loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        }
    }
    
    // Use Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '50px' });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        lazyImages.forEach(function(img) {
            loadImage(img);
        });
    }
    
    // Accordion functionality for FAQ section
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (header && content) {
            header.addEventListener('click', function() {
                // Close all other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.querySelector('.accordion-content');
                        if (otherContent) {
                            otherContent.style.maxHeight = null;
                        }
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
            });
        }
    });
    
    // Implementing dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        // Check for saved user preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Initialize counters animation on scroll
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const interval = Math.floor(duration / target);
                    
                    const counterInterval = setInterval(function() {
                        count++;
                        counter.textContent = count;
                        
                        if (count >= target) {
                            clearInterval(counterInterval);
                        }
                    }, Math.max(interval, 10)); // Ensure interval is at least 10ms
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.8 });
        
        counters.forEach(function(counter) {
            counterObserver.observe(counter);
        });
    }
    
    // Initialize custom select elements
    const customSelects = document.querySelectorAll('.custom-select');
    
    customSelects.forEach(select => {
        const selectField = select.querySelector('.select-field');
        const selectOptions = select.querySelector('.select-options');
        const options = select.querySelectorAll('.select-option');
        const hiddenInput = select.querySelector('input[type="hidden"]');
        
        if (selectField && selectOptions) {
            selectField.addEventListener('click', function() {
                selectOptions.style.display = selectOptions.style.display === 'block' ? 'none' : 'block';
                select.classList.toggle('active');
            });
            
            options.forEach(option => {
                option.addEventListener('click', function() {
                    const value = this.getAttribute('data-value');
                    const text = this.textContent;
                    
                    selectField.textContent = text;
                    if (hiddenInput) {
                        hiddenInput.value = value;
                        
                        // Trigger change event on the hidden input
                        const event = new Event('change', { bubbles: true });
                        hiddenInput.dispatchEvent(event);
                    }
                    
                    selectOptions.style.display = 'none';
                    select.classList.remove('active');
                    
                    options.forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    this.classList.add('selected');
                });
            });
            
            // Close select dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!select.contains(e.target)) {
                    selectOptions.style.display = 'none';
                    select.classList.remove('active');
                }
            });
        }
    });
    
    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '14px';
            tooltip.style.zIndex = '1000';
            tooltip.style.pointerEvents = 'none';
            
            document.body.appendChild(tooltip);
            
            const elementRect = this.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            // Position tooltip above the element
            const top = elementRect.top + window.scrollY - tooltipRect.height - 10;
            const left = elementRect.left + window.scrollX + (elementRect.width / 2) - (tooltipRect.width / 2);
            
            tooltip.style.top = `${top}px`;
            tooltip.style.left = `${left}px`;
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                document.body.removeChild(tooltip);
            }
        });
    });
});