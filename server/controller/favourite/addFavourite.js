import { response } from "express";
import Favourite from "../../models/favourite"

export const ADD_FAVOURITE_ROUTE = '/favourites/add'

export async function addFavourite (req, res) {
    
    const trackId = req.body.add.trackId;
    
    await Favourite.replaceOne({trackId}, {trackId}, {upsert:true});

    const favourites = await Favourite.find({trackId}).exec();

    const favourite = favourites[0] ?? null;

    res.json({favourite});
}