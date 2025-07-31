// JavaScript for interactivity (common to all pages)
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
                item.addEventListener('click', (event) => {
                    // Check if the link is an internal anchor
                    const href = item.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        event.preventDefault(); // Prevent default jump for smooth scroll

                        if (navLinks.classList.contains('active')) {
                            hamburgerMenu.classList.remove('active');
                            navLinks.classList.remove('active');
                        }

                        const targetId = href.substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - document.querySelector('header').offsetHeight, // Adjust for sticky header
                                behavior: 'smooth'
                            });
                        } else if (targetId === 'top') { // Handle "Home" link if it points to top of this page
                             window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }
                    // If it's an external link (e.g., to index.html or another canvas), let default behavior happen
                });
            });

            // Basic form submission (for demonstration, no actual backend)
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', (event) => {
                    event.preventDefault(); // Prevent default form submission
                    // In a real application, you would send this data to a server
                    console.log('Contact form submitted!');
                    console.log('Message sent! (This is a demo, no actual email was sent.)');
                    contactForm.reset(); // Clear the form
                });
            }

            // Pop-up Modal Logic for News Articles
            const storyModal = document.getElementById('storyModal');
            const modalCloseButton = document.querySelector('.modal-close-button');
            const modalImage = document.getElementById('modalImage');
            const modalDate = document.getElementById('modalDate');
            const modalTitle = document.getElementById('modalTitle');
            const modalText = document.getElementById('modalText');
            const readMoreButtons = document.querySelectorAll('.news-card .read-more');

            readMoreButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent default link behavior

                    const newsCard = button.closest('.news-card'); // Get the parent news-card
                    if (newsCard) {
                        const title = newsCard.dataset.newsTitle;
                        const date = newsCard.dataset.newsDate;
                        const image = newsCard.dataset.newsImage;
                        const fullStory = newsCard.dataset.fullStory;

                        modalTitle.textContent = title;
                        modalDate.textContent = date;
                        modalImage.src = image;
                        modalImage.alt = title; // Set alt text for accessibility
                        modalText.textContent = fullStory;

                        storyModal.style.display = 'flex'; // Show the modal (using flex for centering)
                    }
                });
            });

            // When the user clicks on <span> (x), close the modal
            modalCloseButton.addEventListener('click', () => {
                storyModal.style.display = 'none';
            });

            // When the user clicks anywhere outside of the modal content, close it
            window.addEventListener('click', (event) => {
                if (event.target == storyModal) {
                    storyModal.style.display = 'none';
                }
            });

            // Example: Show emergency alert after a delay (for demonstration)
            // setTimeout(() => {
            //     const alertBanner = document.getElementById('emergencyAlert');
            //     if (alertBanner) {
            //         alertBanner.style.display = 'block';
            //     }
            // }, 3000); // Show alert after 3 seconds
        });
document.addEventListener('DOMContentLoaded', () => {
            // Modal Logic for Policies and PTA Updates
            const infoModal = document.getElementById('infoModal');
            const modalCloseButton = document.querySelector('.modal-close-button');
            const modalTitle = document.getElementById('modalTitle');
            const modalDate = document.getElementById('modalDate'); // For PTA updates
            const modalText = document.getElementById('modalText');
            const modalGallery = document.getElementById('modalGallery'); // For gallery images
            const readMoreButtons = document.querySelectorAll('.policy-card .read-more, .pta-card .read-more');

            readMoreButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent default link behavior

                    const parentCard = button.closest('.policy-card, .pta-card');
                    if (parentCard) {
                        const type = parentCard.dataset.type;
                        const title = parentCard.dataset.title;
                        const fullText = parentCard.dataset.fullText;
                        const date = parentCard.dataset.date; // Will be undefined for policy cards

                        // Clear previous content
                        modalGallery.innerHTML = '';
                        modalGallery.style.display = 'none';
                        modalDate.textContent = ''; // Clear date for policy cards

                        modalTitle.textContent = title;
                        modalText.textContent = fullText;

                        if (type === 'pta-update' && date) {
                            modalDate.textContent = date;
                        } else if (type === 'gallery') {
                            modalDate.textContent = date; // Gallery also has a date
                            const imagesJson = parentCard.dataset.images;
                            if (imagesJson) {
                                try {
                                    const images = JSON.parse(imagesJson);
                                    images.forEach(imageUrl => {
                                        const imgElement = document.createElement('img');
                                        imgElement.src = imageUrl;
                                        imgElement.alt = title + " image"; // Add alt text
                                        modalGallery.appendChild(imgElement);
                                    });
                                    modalGallery.style.display = 'grid'; // Show the gallery grid
                                } catch (e) {
                                    console.error("Error parsing gallery images JSON:", e);
                                }
                            }
                        }

                        infoModal.classList.add('active'); // Show the modal using the 'active' class
                    }
                });
            });
 
        });
         

           
    