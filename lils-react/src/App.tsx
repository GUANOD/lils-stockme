import { useContext, useState } from "react";
import Auth from "./components/Auth/Auth";
import "./main.scss";
import { Theme, ThemeContext, ThemeProvider } from "./context/ThemeContext";
import NavBar from "./components/NavBar/NavBar";
import { MantineProvider } from "@mantine/core";
import SideBar from "./components/SideBar/Sidebar";
import { useDelayUnmount } from "./hooks";

function App() {
  const theme = useContext(ThemeContext);

  const [isAuthMounted, setIsAuthMounted] = useState(true);
  const shouldRenderAuth = useDelayUnmount(isAuthMounted, 500);

  const [isAdminMounted, setIsAdminMounted] = useState(false);
  const shouldRenderAdmin = useDelayUnmount(isAdminMounted, 500);

  const mountedStyle = { opacity: 1, transition: "opacity 500ms ease-in" };
  const unmountedStyle = { opacity: 0, transition: "opacity 500ms ease-in" };

  return (
    <MantineProvider
      theme={{ colorScheme: theme?.theme == Theme.dark ? "dark" : "light" }}
    >
      <div className={theme?.theme}>
        <div className="App">
          <NavBar />
          {(shouldRenderAuth || isAuthMounted) && (
            <div
              style={
                isAuthMounted && shouldRenderAuth
                  ? mountedStyle
                  : unmountedStyle
              }
            >
              <Auth />
            </div>
          )}
          {(shouldRenderAdmin || isAdminMounted) && (
            <div
              style={
                isAdminMounted && shouldRenderAdmin
                  ? mountedStyle
                  : unmountedStyle
              }
            >
              <SideBar />
            </div>
          )}
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
