import React, {
  Context,
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

export enum Theme {
  dark = "dark-theme",
  light = "default-theme",
}

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
} | null>(null);

export const ThemeProvider = (props: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(Theme.light);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme(Theme.dark);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
