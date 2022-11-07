import React, {
  Context,
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import storage from "../utils/storage";

export enum Theme {
  dark = "dark-theme",
  light = "default-theme",
}

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
} | null>(null);

export const ThemeProvider = (props: PropsWithChildren) => {
  let prefers: Theme | null = null;
  const storageTheme: Theme | null = storage.getTheme();
  if (storageTheme) {
    prefers = storageTheme;
  } else {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      prefers = Theme.dark;
    } else {
      prefers = Theme.light;
    }
  }

  const [theme, setTheme] = useState<Theme>(prefers);

  useEffect(() => {
    storage.setTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
