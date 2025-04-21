import { response } from "express";
import Favourite from "../../models/favourite"

export const REMOVE_FAVOURITE_ROUTE = '/favourites/remove'

export async function removeFavourite (req, res) {
    
    const trackId = req.body.remove.trackId;
    
    await Favourite.deleteOne({trackId});

    res.json({favourite:null});
}