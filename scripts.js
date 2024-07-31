// Updated JavaScript for the website
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Page loaded');

    // Example function to load recent posts dynamically
    function loadRecentPosts() {
        // Fetch recent posts from the server and insert into the DOM
    }

    // Example function to load popular categories dynamically
    function loadPopularCategories() {
        // Fetch popular categories from the server and insert into the DOM
    }

    // Example function to initialize the map
    function initMap() {
        // Initialize and add the map
        const location = { lat: -34.397, lng: 150.644 };
        const map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 8
        });
        const marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }

    // Call functions to load dynamic content
    loadRecentPosts();
    loadPopularCategories();
});
