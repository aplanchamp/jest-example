import React from "react";
import Onboarding from "./Onboarding/Onboarding";
import { startupNotification } from "./Onboarding/mocks";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Onboarding startupNotification={startupNotification} />
    </div>
  );
}

export default App;
