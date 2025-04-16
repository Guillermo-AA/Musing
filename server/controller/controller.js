import Event from '../models/model.js'; 

export async function getEvent (req, res) {
  try {
    const eventList = await Event.find();
    if (eventList.length === 0) {
      return res.status(200).json([]); 
    }
    res.status(200).json(eventList);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to fetch events', err});
  }
}

export async function saveEvent (req, res) {
  const { trackName, artistName } = req.body;

 
  if (!trackName || !artistName) {
    return res.status(400).json({ error: 'Name of track and artist are required' });
  }

  try {
    const event = await Event.create({ trackName, artistName });
    res.status(201).json(event);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to save the event', err });
  }
}