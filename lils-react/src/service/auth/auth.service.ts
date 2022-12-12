import { authRoutes } from "./routes";

export const signIn = async (signInDto: signInDto): Promise<string | any> => {
  return new Promise((resolve, reject) => {
    fetch(authRoutes.SignIn, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInDto),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.access_token && data.role) {
          resolve({ accessToken: data.access_token, role: data.role });
        } else {
          throw data;
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const signUp = () => {};
