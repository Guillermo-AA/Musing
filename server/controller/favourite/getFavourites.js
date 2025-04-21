import { response } from "express";
import Favourite from "../../models/favourite"

export const GET_FAVOURITES_ROUTE = '/favourites'

export async function getFavourites (req, res) {
    const favourites = await Favourite.find({}).exec();

    res.json({favourites});
}