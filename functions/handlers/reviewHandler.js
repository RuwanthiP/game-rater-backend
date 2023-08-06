import {
  badRequest,
  created,
  internalServerError,
  success,
} from "../../lib/response";
import {
  createReviewService,
  deleteReviewService,
  getAllReviewsService,
} from "../services/reviewService";

export const createReviewHandler = async (event) => {
  const { _id } = event.requestContext.authorizer;
  const data = JSON.parse(event.body);
  const { gameId } = event.pathParameters;
  data.user = _id;
  data.game = gameId;

  try {
    const response = await createReviewService(data);
    if (!response) {
      return badRequest(response);
    }
    return created(response);
  } catch (e) {
    console.log(`error occurred while creating reviews. ${e}`);
    return internalServerError({ message: e.message });
  }
};

export const getAllReviewsHandler = async (event) => {
  const { gameId } = event.pathParameters;

  try {
    const response = await getAllReviewsService(gameId);
    console.log(response);
    if (!response) {
      return badRequest(response);
    }
    return success(response);
  } catch (e) {
    console.log(`error occurred while getting review. ${e}`);
    return internalServerError({ message: e.message });
  }
};

export const deleteReviewHandler = async (event) => {
  const { reviewId } = event.pathParameters;

  try {
    const response = await deleteReviewService(reviewId);
    if (!response) {
      return badRequest(response);
    }
    return success(response);
  } catch (e) {
    console.log(`error occurred while deleting review. ${e}`);
    return internalServerError({ message: e.message });
  }
};
