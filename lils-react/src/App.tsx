import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Notification } from "@mantine/core";
// import { Check, X } from "tabler-icons-react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <Notification title="Default notification">
                This is default notification with title and body
            </Notification>
        </div>
    );
}

export default App;
