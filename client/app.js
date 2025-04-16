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
          trackDiv.innerHTML = `
            <img src="${track.artworkUrl100}" alt="${track.trackName} artwork" />
            <id class="track-info">
              <h3>${track.artistName}</h3>
              <h3>${track.trackName}</h3>
              <p>${track.collectionName}</p> 
              <p>${track.releaseDate}</p>
              ${track.previewUrl ? `<audio controls src="${track.previewUrl}"></audio>` : ''}
            </id>
          `;
          resultsDiv.appendChild(trackDiv);
        });
      })
      .catch(err => {
        console.error('Error fetching tracks:', err);
      });
  });
