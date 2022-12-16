import storage from "../../utils/storage";
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
      .then((data) => {
        console.log(data.ok);
        if (!data.ok) throw data;
        return data.json();
      })
      .then((res) => {
        if (res.access_token && res.role) {
          resolve({ accessToken: res.access_token, role: res.role });
        } else {
          throw res;
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const signUp = () => {};

export const validateAuthToken = (token: string) => {
  return new Promise((resolve, reject) => {
    fetch(authRoutes.validateToken, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        if (!data.ok) throw data;
        return data.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
