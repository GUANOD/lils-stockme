import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Divider, MantineProvider, Notification } from "@mantine/core";
import Form from "./components/Form/Form";
import Auth from "./components/Auth/Auth";
// import { Check, X } from "tabler-icons-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <div className="App">
        {/* <Notification title="Default notification">Hello</Notification> */}
        <Auth />
      </div>
    </MantineProvider>
  );
}

export default App;
