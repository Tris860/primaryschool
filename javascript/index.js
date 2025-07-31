document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile navigation
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked (for smooth scrolling)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
            // Smooth scroll to section
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle smooth scrolling for hero button
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = heroButton.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Basic form submission (for demonstration, no actual backend)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            // In a real application, you would send this data to a server
            console.log('Form submitted!');
            console.log('Message sent! (This is a demo, no actual email was sent.)');
            contactForm.reset(); // Clear the form
        });
    }

    // Slideshow Logic
    let slideIndex = 1;
    const slides = document.querySelectorAll('.mySlides');
    const dotContainer = document.getElementById('dotContainer');
    let dots = []; // Initialize dots array

    // Function to create dots dynamically
    function createDots() {
        dotContainer.innerHTML = ''; // Clear existing dots
        dots = []; // Reset dots array
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-slide-index', i + 1); // Store slide index
            dot.addEventListener('click', () => currentSlide(i + 1));
            dotContainer.appendChild(dot);
            dots.push(dot); // Add to dots array
        }
    }

    function showSlides(n) {
        if (slides.length === 0) return;

        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        slides.forEach(slide => slide.style.display = "none");
        dots.forEach(dot => dot.classList.remove("active-dot"));

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("active-dot");
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // Auto-play slideshow
    let slideInterval;
    function startAutoPlay() {
        stopAutoPlay(); // Clear any existing interval
        slideInterval = setInterval(() => {
            plusSlides(1);
        }, 5000); // Change image every 5 seconds
    }

    function stopAutoPlay() {
        clearInterval(slideInterval);
    }

    // Removed event listeners for slideshow buttons
    // const prevButton = document.getElementById('prevSlideBtn');
    // const nextButton = document.getElementById('nextSlideBtn');
    // if (prevButton) { prevButton.addEventListener('click', () => plusSlides(-1)); }
    // if (nextButton) { nextButton.addEventListener('click', () => plusSlides(1)); }

    // Initialize slideshow, create dots, and start auto-play
    createDots(); // Create dots based on the number of slides
    showSlides(slideIndex);
    startAutoPlay();

    // Pause auto-play on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopAutoPlay);
        slideshowContainer.addEventListener('mouseleave', startAutoPlay);
    }
});
