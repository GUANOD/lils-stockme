import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./main.scss";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@mantine/core";

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      // onReset={() => {
      //   // reset the state of your app so the error doesn't happen again
      // }}
    >
      <App />
    </ErrorBoundary>
  </ThemeProvider>
);
