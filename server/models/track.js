import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  trackName: {type: String, required: true},
  artistName: {type: String, required: true},

 /*  
  primaryGenreName: {type: String, required: true},
  previewUrl: {type: String, required: true},
  artworkUrl100: {type: String, required: true},
  releaseDate: {type: Date, required: true},
  trackTimeMillis: {type: Number, required: true},
   */
});

const Track = mongoose.model('Track', trackSchema);

export default Track;