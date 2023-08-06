import connectDatabase from "../../database/dbConnect";
import Game from "../models/Game";

export const createGameService = async (data) => {
  try {
    await connectDatabase();
    const response = await Game.create(data);
    console.log(`Game created: ${response}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllGamesService = async () => {
  try {
    await connectDatabase();
    const response = await Game.find({}).populate("").exec();
    console.log(`Games found: ${response}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getGameByIdService = async (gameId) => {
  try {
    await connectDatabase();
    const response = await Game.findById(gameId).exec();
    console.log(`Game found: ${response}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteGameByIdService = async (gameId) => {
  try {
    await connectDatabase();
    const response = await Game.deleteOne({ _id: gameId });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
