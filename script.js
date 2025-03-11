document.addEventListener('DOMContentLoaded', function() {
    // Language selector functionality
    const languageButton = document.querySelector('.language-button');
    if (languageButton) {
        languageButton.addEventListener('click', function() {
            alert('Language selection clicked');
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            console.log('Searching for:', e.target.value);
        });
    }

    // Story card hover effects
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers for navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.textContent.trim();
            console.log('Navigating to:', page);
            // Add navigation functionality here
        });
    });
});

// Sample story data - in a real application, this would likely come from an API
const stories = [
    {
        id: 1,
        coverImage: "https://storage.googleapis.com/a1aa/image/0XCuGsXiatbgzFY0Bx8JfT7jdg_Jn7Zgf4JcQTM_xg4.jpg",
        rank: 1,
        rating: 4.9,
        title: "രണ്ടാമൂഴം",
        hours: 7,
        readers: "2L+",
        parts: 40
    },
    {
        id: 2,
        coverImage: "https://storage.googleapis.com/a1aa/image/F9KYGlpmfy8hHMASkW_WX3u6Ou-isgjqH_s8xTwjYEE.jpg",
        rank: 2,
        rating: 4.9,
        title: "शातजन्च शोधाना...",
        hours: 4,
        readers: "74K+",
        parts: 34
    },
    // Add the rest of your stories here...
];

function createStoryCard(story) {
    return `
        <div class="story-card" onclick="openStoryPage(${story.id})">
            <img alt="Story cover image ${story.rank}"
                src="${story.coverImage}" />
            <div class="card-content">
                <div class="card-badges">
                    <span class="rank-badge">#${story.rank}</span>
                    <span class="rating-badge">${story.rating}</span>
                </div>
                <h3 class="story-title">${story.title}</h3>
                <p class="story-info">${story.hours} hours</p>
                <p class="story-info">${story.readers} Total Readers</p>
                <p class="story-info">${story.parts} parts</p>
            </div>
        </div>
    `;
}

function loadStories() {
    const storiesGrid = document.querySelector('.stories-grid');
    const storiesHTML = stories.map(story => createStoryCard(story)).join('');
    storiesGrid.innerHTML = storiesHTML;
}

function openStoryPage(storyId) {
    window.location.href = `story.html?id=${storyId}`;
}

// Load stories when the page loads
document.addEventListener('DOMContentLoaded', loadStories); 