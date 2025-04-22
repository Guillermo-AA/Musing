// Cache DOM elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.querySelector('.results');

// Utility functions
function normalize(str) {
    return str.trim().toLowerCase();
}

function formatDate(isoString) {
    const releaseDate = new Date(isoString);
    return releaseDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function filterTracks(results, query) {
    return results.filter(track =>
        track.artistName.toLowerCase().includes(query) ||
        track.trackName.toLowerCase().includes(query)
    );
}

function clearResults() {
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
    }
}

function displayError(message) {
    clearResults();
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.className = 'error-message';
    resultsDiv.appendChild(errorDiv);
}

function renderTracks(tracks) {
    clearResults();
    tracks.forEach(track => {
        const trackDiv = document.createElement('div');
        trackDiv.className = "track-container";
        trackDiv.innerHTML = `
            <a href="${track.trackViewUrl}" target="_blank" rel="noopener noreferrer">
                <img src="${track.artworkUrl100}" alt="${track.trackName} artwork" />
            </a>
            <div class="track-info">
                <h2>${track.trackName}</h2>
                <h3>${track.artistName}</h3>
                <p><strong>${track.collectionName}</strong></p> 
                <p>Released on: ${formatDate(track.releaseDate)}</p>
                <p><i>${track.primaryGenreName}</i></p>
                ${track.previewUrl ? `<audio controls controlsList="nodownload noplaybackrate" src="${track.previewUrl}"></audio>` : ''}
            </div>
            <div class="favicon">
                <img src="assets/star_unfav.png" width="20px" alt="unfav" class="fav-icon" />
            </div>
        `;

        resultsDiv.appendChild(trackDiv);

        // Add event listener to toggle the favicon
        const favIcon = trackDiv.querySelector('.fav-icon');
        favIcon.addEventListener('click', () => {
            if (favIcon.src.includes('star_unfav.png')) {
                favIcon.src = 'assets/star_fav.png';
                favIcon.alt = 'fav';
            } else {
                favIcon.src = 'assets/star_unfav.png';
                favIcon.alt = 'unfav';
            }
        });
    });
}

// Fetch tracks from the iTunes API
async function fetchTracks(query) {
    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=20`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching tracks:', error);
        displayError('An error occurred while fetching tracks. Please try again later.');
        return [];
    }
}

// Event handler for form submission
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = normalize(searchInput.value);
    if (!query) {
        displayError('Please enter a search term.');
        return;
    }

    const results = await fetchTracks(query);
    const filteredResults = filterTracks(results, query);

    if (filteredResults.length === 0) {
        displayError('No tracks found.');
        return;
    }

    renderTracks(filteredResults);
});

// Add a "Go to Top" button dynamically
const goToTopButton = document.createElement('button');
goToTopButton.textContent = 'Go to Top';
goToTopButton.className = 'go-to-top'; 
document.body.appendChild(goToTopButton);

// Scroll event listener to detect when the user reaches the bottom
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
        goToTopButton.style.display = 'block'; 
    } else {
        goToTopButton.style.display = 'none'; 
    }
});

// Event listener for "Go to Top" button
goToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', 
    });
});


