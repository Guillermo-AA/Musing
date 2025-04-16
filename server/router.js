import express from 'express';
const router = express.Router();
import  { saveEvent, getEvent }  from './controller/controller.js';

router.get('/events', getEvent);
router.post('/events', saveEvent);

export default router;