document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    // Fetch data from the iTunes Search API
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=50`)
      .then(res => res.json())
      .then(data => {
        
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; 

        if (!data.results || data.results.length === 0) {
          resultsDiv.textContent = 'No tracks found.';
          return;
        }

        // Filter results to match either artistName or trackName
        const filteredResults = data.results.filter(track => 
          track.artistName.toLowerCase().includes(query) || 
          track.trackName.toLowerCase().includes(query)
        );

        if (filteredResults.length === 0) {
          resultsDiv.textContent = 'No tracks found.';
          return;
        }

        // Render the filtered track info
        filteredResults.forEach(track => {
            const trackDiv = document.createElement('div');

            // Format the release date
            const releaseDate = new Date(track.releaseDate);
            const formattedDate = releaseDate.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            trackDiv.innerHTML = `
                <img src="${track.artworkUrl100}" alt="${track.trackName} artwork" />
                <id class="track-info">
                    <h2>${track.trackName}</h2>
                    <h3>${track.artistName}</h3>
                    <p><strong>${track.collectionName}</strong></p> 
                    <p>Released on: ${formattedDate}</p>
                    <p><i>${track.primaryGenreName}</i></p>
                    ${track.previewUrl ? `<audio controls controlsList="nodownload noplaybackrate" src="${track.previewUrl}"></audio>` : ''}
                </id>
                <id class="favicon">
                    <img src="assets/star_unfav.png" width="20px" alt="unfav" class="fav-icon" />
                </id>
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
      })
      .catch(err => {
        console.error('Error fetching tracks:', err);
      });
  });
