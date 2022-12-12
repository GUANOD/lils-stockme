import { Button } from "@mantine/core";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "../components/Spinner/Spinner";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

type AppProviderProps = {
  children: React.ReactNode;
};

function AppProvider({ children }: AppProviderProps) {
  // const theme = useContext(ThemeContext);

  // const [isAuthMounted, setIsAuthMounted] = useState(false);
  // const shouldRenderAuth = useDelayUnmount(isAuthMounted, 500);

  // const [isAdminMounted, setIsAdminMounted] = useState(true);
  // const shouldRenderAdmin = useDelayUnmount(isAdminMounted, 500);

  // const mountedStyle = { opacity: 1, transition: "opacity 500ms ease-in" };
  // const unmountedStyle = { opacity: 0, transition: "opacity 500ms ease-in" };

  return (
    // <Suspense
    //   fallback={
    //     <div className="flex items-center justify-center w-screen h-screen">
    //       <Spinner size="xl" />
    //     </div>
    //   }
    // >
    <ThemeProvider>
      <AuthProvider>
        <Router>{children}</Router>
      </AuthProvider>
      {/* <div className="App">
          <NavBar />
          <div
            style={{ zIndex: 10000 }}
            onClick={() => {
              setIsAuthMounted(!isAuthMounted);
              setIsAdminMounted(!isAdminMounted);
            }}
          >
            click me
          </div>
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
        </div> */}
    </ThemeProvider>
    // </Suspense>
  );
}

export default AppProvider;
