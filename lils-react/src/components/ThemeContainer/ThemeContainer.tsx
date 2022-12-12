import { Button, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Theme, ThemeContext } from "../../context/ThemeContext";
import { NavBar } from "../NavBar/NavBar";
import "./themeContainer.scss";

type ThemeContainerProps = {
  children: React.ReactNode;
};

const ErrorFallback = () => {
  return (
    <div className="errorFallback" role="alert">
      <div>
        <h2 className="text-lg font-semibold">Ooops, something went wrong</h2>
        <Button
          className="btnPrimary"
          onClick={() => window.location.assign(window.location.origin)}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

export const ThemeContainer = ({ children }: ThemeContainerProps) => {
  const theme = useContext(ThemeContext);

  return (
    <MantineProvider
      theme={{ colorScheme: theme?.theme == Theme.dark ? "dark" : "light" }}
    >
      <div className={theme?.theme}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="themeContainer">
            <NotificationsProvider>
              <NavBar />
              {children}
            </NotificationsProvider>
          </div>
        </ErrorBoundary>
      </div>
    </MantineProvider>
  );
};

export default ThemeContainer;
