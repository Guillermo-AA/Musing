import Track from '../models/track.js'; 

export async function getTrack (req, res) {
  try {
    const trackList = await Track.find();
    if (trackList.length === 0) {
      return res.status(200).json([]); 
    }
    res.status(200).json(trackList);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to fetch tracks', err});
  }
}

export async function saveTrack (req, res) {
  /* const { trackName, artistName } = req.body;

 
  if (!trackName || !artistName) {
    return res.status(400).json({ error: 'Name of track and artist are required' });
  }

  try {
    const track = await Track.create({ trackName, artistName });
    res.status(201).json(track);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to save the track', err });
  } */

  const { trackId } = req.body;

  if (!trackId) {
    return res.status(400).json({ error: 'Track ID is required' });
  }

  try {
    const track = await Track.findById(trackId);
    if (track) {
      return res.status(200).json({ message: 'Track already in favorites' });
    }
    const favorite = new Track({ trackId });
    await favorite.save();
    res.status(201).json(favorite);
     
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to fetch the track', err });
  }
  
}
