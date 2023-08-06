import {
  badRequest,
  created,
  internalServerError,
  success,
} from "../../lib/response";
import {
  createGameService,
  deleteGameByIdService,
  getAllGamesService,
  getGameByIdService,
} from "../services/gameService";

export const createGameHandler = async (event) => {
  const data = JSON.parse(event.body);

  try {
    const response = await createGameService(data);
    if (!response) {
      return badRequest(response);
    }
    return created(response);
  } catch (e) {
    console.log(`error occurred while creating game. ${e}`);
    return internalServerError({ message: e.message });
  }
};

export const getAllGamesHandler = async (event) => {
  try {
    const response = await getAllGamesService();
    if (!response) {
      return badRequest(response);
    }
    return success(response);
  } catch (e) {
    console.log(`error occurred while getting games. ${e}`);
    return internalServerError({ message: e.message });
  }
};

export const getGameByIdHandler = async (event) => {
  const { gameId } = event.pathParameters;

  try {
    const response = await getGameByIdService(gameId);
    if (!response) {
      return badRequest(response);
    }
    return success(response);
  } catch (e) {
    console.log(`error occurred while getting game. ${e}`);
    return internalServerError({ message: e.message });
  }
};

export const deleteGameByIdHandler = async (event) => {
  const { gameId } = event.pathParameters;

  try {
    const response = await deleteGameByIdService(gameId);
    if (!response) {
      return badRequest(response);
    }
    return success(response);
  } catch (e) {
    console.log(`error occurred while getting game. ${e}`);
    return internalServerError({ message: e.message });
  }
};
