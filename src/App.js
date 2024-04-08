import React from "react";
import CommingSoon from "./pages/comming-soon";
import "./App.css";

function App() {
  const time = new Date();
  time.setHours(time.getHours() + 48); // Add 48 hours
  return (
    <div className="App">
      <CommingSoon expiryTimestamp={time} />
    </div>
  );
}

export default App;
