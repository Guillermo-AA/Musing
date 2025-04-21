import { response } from "express";
import Favourite from "../../models/favourite"

export const GET_FAVOURITE_ROUTE = '/favourites/:trackId'

export async function getFavourite (req, res) {
    
    const trackId = req.params.trackId;
    
    const favourites = await Favourite.find({trackId}).exec();

    const favourite = favourites[0] ?? null;
    
    res.json({favourite});
}