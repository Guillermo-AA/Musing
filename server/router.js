import express from 'express';
const router = express.Router();
import  { saveTrack, getTrack }  from './controller/controller.js';

router.get('/tracks', getTrack);
router.post('/tracks', saveTrack);

export default router;