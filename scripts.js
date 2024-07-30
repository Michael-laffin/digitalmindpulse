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
    // Simulated featured content data
    const featuredContent = [
        { type: 'article', title: 'The Future of AI in Healthcare', image: 'path/to/ai-healthcare.jpg' },
        { type: 'podcast', title: 'Cybersecurity Trends for 2024', image: 'path/to/cybersecurity-podcast.jpg' },
        { type: 'video', title: 'Hands-on with the Latest VR Tech', image: 'path/to/vr-tech-video.jpg' },
        { type: 'article', title: '5G: Revolutionizing Connectivity', image: 'path/to/5g-article.jpg' }
    ];

    const featuredGrid = document.getElementById('featuredGrid');
    featuredGrid.innerHTML = '';

    featuredContent.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'content-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <span class="content-type">${item.type}</span>
        `;
        featuredGrid.appendChild(itemElement);
    });
}

function loadArticles() {
    // Simulated articles data
    const articles = [
        { title: 'The Rise of Edge Computing', category: 'iot', date: '2024-07-15', image: 'path/to/edge-computing.jpg' },
        { title: 'Blockchain in Supply Chain Management', category: 'blockchain', date: '2024-07-10', image: 'path/to/blockchain-supply-chain.jpg' },
        { title: 'AI Ethics: Challenges and Solutions', category: 'ai', date: '2024-07-05', image: 'path/to/ai-ethics.jpg' },
        { title: 'Quantum Computing Breakthroughs', category: 'ai', date: '2024-07-01', image: 'path/to/quantum-computing.jpg' },
        // Add more articles...
    ];

    const articlesGrid = document.getElementById('articlesGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortOrder = document.getElementById('sortOrder');

    let filteredArticles = articles;

    // Apply category filter
    if (categoryFilter.value) {
        filteredArticles = filteredArticles.filter(article => article.category === categoryFilter.value);
    }

    // Apply sorting
    filteredArticles.sort((a, b) => {
        if (sortOrder.value === 'newest') {
            return new Date(b.date) - new Date(a.date);
        } else if (sortOrder.value === 'oldest') {
            return new Date(a.date) - new Date(b.date);
        }
        // Add logic for 'popular' if you have that data
    });

    articlesGrid.innerHTML = '';

    filteredArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'content-item';
        articleElement.innerHTML = `
            <img src="${article.image}" alt="${article.title}">
            <h3>${article.title}</h3>
            <span class="category">${article.category}</span>
            <span class="date">${new Date(article.date).toLocaleDateString()}</span>
        `;
        articlesGrid.appendChild(articleElement);
    });

    updatePagination(filteredArticles.length, 'articlesPagination');
}

function loadPodcasts() {
    // Simulated podcasts data
    const podcasts = [
        { title: 'AI Insights: Machine Learning Explained', series: 'ai-insights', date: '2024-07-20', image: 'path/to/ai-insights-podcast.jpg' },
        { title: 'Tech Talk: The Future of Smartphones', series: 'tech-talk', date: '2024-07-18', image: 'path/to/tech-talk-podcast.jpg' },
        { title: 'Future Cast: Predicting Tech Trends', series: 'future-cast', date: '2024-07-16', image: 'path/to/future-cast-podcast.jpg' },
        // Add more podcasts...
    ];

    const podcastsGrid = document.getElementById('podcastsGrid');
    const podcastFilter = document.getElementById('podcastFilter');
    const podcastSort = document.getElementById('podcastSort');

    let filteredPodcasts = podcasts;

    // Apply series filter
    if (podcastFilter.value) {
        filteredPodcasts = filteredPodcasts.filter(podcast => podcast.series === podcastFilter.value);
    }

    // Apply sorting
    filteredPodcasts.sort((a, b) => {
        if (podcastSort.value === 'newest') {
            return new Date(b.date) - new Date(a.date);
        } else if (podcastSort.value === 'oldest') {
            return new Date(a.date) - new Date(b.date);
        }
        // Add logic for 'popular' if you have that data
    });

    podcastsGrid.innerHTML = '';

    filteredPodcasts.forEach(podcast => {
        const podcastElement = document.createElement('div');
        podcastElement.className = 'content-item';
        podcastElement.innerHTML = `
            <img src="${podcast.image}" alt="${podcast.title}">
            <h3>${podcast.title}</h3>
            <span class="series">${podcast.series}</span>
            <span class="date">${new Date(podcast.date).toLocaleDateString()}</span>
        `;
        podcastsGrid.appendChild(podcastElement);
    });

    updatePagination(filteredPodcasts.length, 'podcastsPagination');
}

function loadVideos() {
    // Simulated videos data
    const videos = [
        { title: 'Unboxing the Latest Smartphone', category: 'tech-reviews', date: '2024-07-25', image: 'path/to/smartphone-unboxing.jpg' },
        { title: 'How to Build a PC: Step-by-Step Guide', category: 'tutorials', date: '2024-07-22', image: 'path/to/pc-building-tutorial.jpg' },
        { title: 'Interview with Tech Innovator', category: 'interviews', date: '2024-07-19', image: 'path/to/tech-innovator-interview.jpg' },
        // Add more videos...
    ];

    const videosGrid = document.getElementById('videosGrid');
    const videoFilter = document.getElementById('videoFilter');
    const videoSort = document.getElementById('videoSort');

    let filteredVideos = videos;

    // Apply category filter
    if (videoFilter.value) {
        filteredVideos = filteredVideos.filter(video => video.category === videoFilter.value);
    }

    // Apply sorting
    filteredVideos.sort((a, b) => {
        if (videoSort.value === 'newest') {
            return new Date(b.date) - new Date(a.date);
        } else if (videoSort.value === 'oldest') {
            return new Date(a.date) - new Date(b.date);
        }
        // Add logic for 'popular' if you have that data
    });

    videosGrid.innerHTML = '';

    filteredVideos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'content-item';
        videoElement.innerHTML = `
            <img src="${video.image}" alt="${video.title}">
            <h3>${video.title}</h3>
            <span class="category">${video.category}</span>
            <span class="date">${new Date(video.date).toLocaleDateString()}</span>
        `;
        videosGrid.appendChild(videoElement);
    });

    updatePagination(filteredVideos.length, 'videosPagination');
}

function updatePagination(totalItems, paginationId) {
    const itemsPerPage = 12; // Adjust as needed
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginationElement = document.getElementById(paginationId);
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Here you would typically load the corresponding page of content
            console.log(`Load page ${i}`);
        });
        paginationElement.appendChild(pageLink);
    }
}
