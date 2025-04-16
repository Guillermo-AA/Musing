import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  trackName: { type: String, required: true},
  artistName: {type: String, required: true}
});

const Event = mongoose.model('Event', eventSchema);

export default Event;