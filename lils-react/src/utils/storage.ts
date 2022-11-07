import { Theme } from "../context/ThemeContext";

const storagePrefix = "stockme_app_";

const storage = {
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  getTheme: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}theme`) as string
    );
  },
  setTheme: (theme: Theme) => {
    window.localStorage.setItem(`${storagePrefix}theme`, JSON.stringify(theme));
  },
  clearTheme: () => {
    window.localStorage.removeItem(`${storagePrefix}theme`);
  },
};

export default storage;