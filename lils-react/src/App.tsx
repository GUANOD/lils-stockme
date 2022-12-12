import { Suspense, useContext } from "react";
import { Spinner } from "./components/Spinner/Spinner";
// import NavBar from "./components/NavBar/NavBar";
// import ThemeContainer from "./components/ThemeContainer/ThemeContainer";
import { ThemeContext } from "./context/ThemeContext";
import AppProvider from "./providers/app";
// import { AppRoutes } from "./routes";
import { lazyImport } from "./utils";
import Loader from "./components/Loader/Loader";
import { ThemeContainer } from "./components/ThemeContainer/ThemeContainer";
const { AppRoutes } = lazyImport(() => import("./routes"), "AppRoutes");

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AppProvider>
        <ThemeContainer>
          <div className="NavLessContainer">
            <Suspense fallback={<Loader />}>
              {/* <NavBar /> */}
              <AppRoutes />
            </Suspense>
          </div>
          {/*Theme container injects every provider that depends on Mantine theme */}
        </ThemeContainer>
      </AppProvider>
    </Suspense>
  );
}

export default App;
