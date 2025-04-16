document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    fetch(`http://localhost:3000/tracks?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; 
  
        if (data.length === 0 || !data[0].results || data[0].results.length === 0) {
          resultsDiv.textContent = 'No tracks found.';
          return;
        }

        // Filter the results based on the input query
        const filteredTracks = data[0].results.filter(track => 
          track.trackName.toLowerCase().includes(query) || 
          track.artistName.toLowerCase().includes(query)
        );

        if (filteredTracks.length === 0) {
          resultsDiv.textContent = 'No tracks found.';
          return;
        }

        // Render the filtered tracks
        filteredTracks.forEach(track => {
          const trackDiv = document.createElement('div');
          trackDiv.innerHTML = `
            <h3>${track.trackName} - ${track.artistName}</h3>
            ${track.previewUrl ? `<audio controls src="${track.previewUrl}"></audio>` : ''}
          `;
          resultsDiv.appendChild(trackDiv);
        });
      })
      .catch(err => {
        console.error('Error fetching tracks:', err);
      });
  });
