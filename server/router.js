import express from 'express';
const router = express.Router();
import { saveTrack, getTrack }  from './controller/controller.js';
import { GET_FAVOURITE_ROUTE, getFavourite } from './controller/favourite/getFavourite.js';
import { GET_FAVOURITES_ROUTE, getFavourites } from './controller/favourite/getFavourites.js';
import { ADD_FAVOURITE_ROUTE, addFavourite } from './controller/favourite/addFavourite.js';
import { REMOVE_FAVOURITE_ROUTE, removeFavourite } from './controller/favourite/removeFavourite.js';

router.get('/tracks', getTrack);
router.post('/tracks', saveTrack);

router.get(GET_FAVOURITE_ROUTE, getFavourite);
router.get(GET_FAVOURITES_ROUTE, getFavourites);

router.post(ADD_FAVOURITE_ROUTE, addFavourite);
router.post(REMOVE_FAVOURITE_ROUTE, removeFavourite);


export default router;