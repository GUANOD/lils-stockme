import config from "../../config/config";

export const authRoutes = {
  SignUp: config.baseApiUrl + "auth/signup",
  SignIn: config.baseApiUrl + "auth/signin",
  validateToken: config.baseApiUrl + "auth/validate",
};
