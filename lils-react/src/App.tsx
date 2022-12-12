import { Suspense, useContext } from "react";
import { Spinner } from "./components/Spinner/Spinner";
// import NavBar from "./components/NavBar/NavBar";
import ThemeContainer from "./components/ThemeContainer/ThemeContainer";
import { ThemeContext } from "./context/ThemeContext";
import AppProvider from "./providers/app";
// import { AppRoutes } from "./routes";
import { lazyImport } from "./utils";
const { AppRoutes } = lazyImport(() => import("./routes"), "AppRoutes");
const { NavBar } = lazyImport(
  () => import("./components/NavBar/NavBar"),
  "NavBar"
);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AppProvider>
        <ThemeContainer>
          <NavBar />
          <AppRoutes />
        </ThemeContainer>
      </AppProvider>
    </Suspense>
  );
}

export default App;
