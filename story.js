// Sample story data (in a real app, this would come from a backend)
const storiesData = {
    1: {
        title: "രണ്ടാമൂഴം",
        coverImage: "https://storage.googleapis.com/a1aa/image/0XCuGsXiatbgzFY0Bx8JfT7jdg_Jn7Zgf4JcQTM_xg4.jpg",
        rating: "4.9",
        readers: "2L+",
        parts: 40,
        synopsis: "A compelling story that follows the journey of... [Story synopsis here]",
        chapters: [
            { number: 1, title: "The Beginning", readTime: "10 mins" },
            { number: 2, title: "New Horizons", readTime: "12 mins" },
            // Add more chapters...
        ]
    },

    
    // Add more stories...
};

function getStoryIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function loadStoryDetails() {
    const storyId = getStoryIdFromUrl();
    const story = storiesData[storyId];

    if (!story) {
        window.location.href = 'index.html'; // Redirect if story not found
        return;
    }

    // Update page title
    document.title = `${story.title} - Pratilipi`;

    // Update story details
    document.getElementById('story-cover').src = story.coverImage;
    document.getElementById('story-title').textContent = story.title;
    document.getElementById('story-rating').innerHTML = `<i class="fas fa-star"></i> ${story.rating}`;
    document.getElementById('story-readers').innerHTML = `<i class="fas fa-users"></i> ${story.readers}`;
    document.getElementById('story-parts').innerHTML = `<i class="fas fa-book-open"></i> ${story.parts} parts`;
    document.getElementById('story-synopsis').textContent = story.synopsis;

    // Load chapters
    const chaptersContainer = document.getElementById('chapters-list');
    story.chapters.forEach(chapter => {
        const chapterElement = document.createElement('div');
        chapterElement.className = 'chapter-item';
        chapterElement.innerHTML = `
            <div>
                <strong>Chapter ${chapter.number}:</strong> ${chapter.title}
            </div>
            <div>${chapter.readTime}</div>
        `;
        chapterElement.onclick = () => openChapter(storyId, chapter.number);
        chaptersContainer.appendChild(chapterElement);
    });
}

function openChapter(storyId, chapterNumber) {
    window.location.href = `reader.html?storyId=${storyId}&chapter=${chapterNumber}`;
}

// Update the Read Now button click handler
document.querySelector('.btn-primary').onclick = () => {
    const storyId = getStoryIdFromUrl();
    openChapter(storyId, 1); // Start from chapter 1
};

// Load story details when the page loads
document.addEventListener('DOMContentLoaded', loadStoryDetails); 