import { Modal } from "@mantine/core";
import {
  cleanNotifications,
  cleanNotificationsQueue,
  showNotification,
} from "@mantine/notifications";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import storage from "../utils/storage";

type formattedError = {
  message?: string;
  icon?: React.ReactNode;
};

export const ErrorContext = createContext<{
  error: formattedError | null;
  setError: React.Dispatch<React.SetStateAction<formattedError | null>>;
  resetError: () => void;
} | null>(null);

export const ErrorProvider = (props: PropsWithChildren) => {
  const [error, setError] = useState<formattedError | null>(null);

  const resetError = () => {
    cleanNotifications();
    cleanNotificationsQueue();
    setError(null);
  };

  useEffect(() => {
    if (error && error?.message && error.message.length) {
      showNotification({
        // title: {error},
        message: `${error.message}`,
        autoClose: false,
        color: "red",
        onClose: resetError,
        icon: error.icon,
      });
    }
  }, [error]);

  return (
    <ErrorContext.Provider value={{ error, setError, resetError }}>
      {/* <Modal opened={!!error && !!error.length} onClose={resetError}></Modal> */}
      {props.children}
    </ErrorContext.Provider>
  );
};
