// Sample chapter data (in a real app, this would come from a backend)
const chaptersData = {
    1: {
        storyId: 1,
        chapterNumber: 1,
        title: "The Beginning",
        content: `
            <h2>Chapter 1: The Beginning</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <!-- Add more paragraphs -->
        `
    },
    // Add more chapters...
};

let currentFontSize = 18;
const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 24;

function loadChapter() {
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('storyId');
    const chapterNumber = urlParams.get('chapter');

    const chapter = chaptersData[chapterNumber];
    if (!chapter) {
        window.location.href = `story.html?id=${storyId}`;
        return;
    }

    document.getElementById('story-title').textContent = `Chapter ${chapter.chapterNumber}`;
    document.getElementById('chapter-info').textContent = `Chapter ${chapter.chapterNumber}`;
    document.getElementById('chapter-content').innerHTML = chapter.content;

    // Update navigation buttons
    document.getElementById('prev-chapter').disabled = chapter.chapterNumber <= 1;
    document.getElementById('next-chapter').disabled = !chaptersData[chapter.chapterNumber + 1];
    document.getElementById('prev-chapter-bottom').disabled = chapter.chapterNumber <= 1;
    document.getElementById('next-chapter-bottom').disabled = !chaptersData[chapter.chapterNumber + 1];
}

function toggleSettings() {
    const settingsPanel = document.getElementById('settings-panel');
    settingsPanel.classList.toggle('active');
}

function changeFontSize(action) {
    if (action === 'increase' && currentFontSize < MAX_FONT_SIZE) {
        currentFontSize += 2;
    } else if (action === 'decrease' && currentFontSize > MIN_FONT_SIZE) {
        currentFontSize -= 2;
    }
    document.documentElement.style.setProperty('--font-size', `${currentFontSize}px`);
}

function changeTheme(theme) {
    document.body.className = `${theme}-theme`;
    localStorage.setItem('reader-theme', theme);
}

function navigateChapter(direction) {
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('storyId');
    const currentChapter = parseInt(urlParams.get('chapter'));
    
    let newChapter = direction === 'next' ? currentChapter + 1 : currentChapter - 1;
    
    if (chaptersData[newChapter]) {
        window.location.href = `reader.html?storyId=${storyId}&chapter=${newChapter}`;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadChapter();
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('reader-theme') || 'light';
    changeTheme(savedTheme);
}); 