import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import RentSide from "./components/Rentside";

const App: React.FC = () => {
  const [isAuthen, setIsAuthen] = useState(false);

  const login = () => {
    setIsAuthen(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={login} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/rentside"
          element={isAuthen && <RentSide userName="John Doe" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
