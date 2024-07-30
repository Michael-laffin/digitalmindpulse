document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Here you would typically send this to your server
            console.log('Newsletter signup:', email);
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Load featured content on home page
    const featuredGrid = document.getElementById('featuredGrid');
    if (featuredGrid) {
        loadFeaturedContent();
    }

    // Handle content grids on articles, podcasts, and videos pages
    const articlesGrid = document.getElementById('articlesGrid');
    const podcastsGrid = document.getElementById('podcastsGrid');
    const videosGrid = document.getElementById('videosGrid');

    if (articlesGrid) {
        loadArticles();
    }
    if (podcastsGrid) {
        loadPodcasts();
    }
    if (videosGrid) {
        loadVideos();
    }

    // Handle filter and sort changes
    const filterSelects = document.querySelectorAll('.filter-sort select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.id.includes('article')) {
                loadArticles();
            } else if (this.id.includes('podcast')) {
                loadPodcasts();
            } else if (this.id.includes('video')) {
                loadVideos();
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            // Here you would typically send this to your server
            console.log('Contact form submission:', Object.fromEntries(formData));
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }
});

function loadFeaturedContent() {
