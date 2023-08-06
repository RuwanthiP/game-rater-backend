import connectDatabase from "../../database/dbConnect";
import getGeoLocation from "../GEO-API/geoReverseAPI";
import Review from "../models/Review";
import mongoose from "mongoose";

export const createReviewService = async (data) => {
  const { label } = await getGeoLocation(data.gps[0], data.gps[1]);
  data.location = label;
  try {
    await connectDatabase();
    const response = await Review.create(data);
    return response;
  } catch (error) {
    console.log(`Error in creating review: ${error}`);
    return error;
  }
};

/**
 * Get all reviews for a particular game
 * @param {String} gameId
 * @returns Object
 */
export const getAllReviewsService = async (gameId) => {
  try {
    await connectDatabase();
    console.log(gameId);
    const gameObjectId = new mongoose.Types.ObjectId(gameId);
    const response = await Review.find({ game: gameObjectId });
    console.log(response);
    return response;
  } catch (error) {
    console.log(`Error in getting reviews: ${error}`);
    return error;
  }
};

export const deleteReviewService = async (reviewId) => {
  try {
    connectDatabase();
    const response = await Review.deleteOne({ _id: reviewId });
    return response;
  } catch (error) {
    console.log(`Error in deleting review: ${error}`);
    return error;
  }
};
