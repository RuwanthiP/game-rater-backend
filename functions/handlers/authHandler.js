import { internalServerError, success } from "../../lib/response";
import { loginService, signupService } from "../services/authService";

export const loginHandler = async (event) => {
  const data = JSON.parse(event.body);
  const { email, password } = data;
  try {
    const response = await loginService(email, password);
    return success(response);
  } catch (e) {
    return internalServerError({ message: "Error in loging in" });
  }
};

export const signupHandler = async (event) => {
  const data = JSON.parse(event.body);
  const { firstName, lastName, email, password, userType } = data;
  try {
    const response = await signupService(
      firstName,
      lastName,
      email,
      password,
      userType
    );
    return success(response);
  } catch (e) {
    return internalServerError({ message: e.message });
  }
};
