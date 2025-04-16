document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    fetch(`http://localhost:3000/tracks?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; 
  
        if (data.length === 0) {
          resultsDiv.textContent = 'No tracks found.';
          return;
        }
  
        data.forEach(track => {
          const trackDiv = document.createElement('div');
          trackDiv.innerHTML = `
            <h3>${track.title} - ${track.artist}</h3>
            <p><strong>Album:</strong> ${track.album}</p>
            ${track.previewUrl ? `<audio controls src="${track.previewUrl}"></audio>` : ''}
          `;
          resultsDiv.appendChild(trackDiv);
        });
      })
      .catch(err => {
        console.error('Error fetching tracks:', err);
      });
  });
