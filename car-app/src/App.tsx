import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import RentSide from "./components/Rentside";
import CompanySide from "./components/CompanySide";

const App: React.FC = () => {
  const [isAuthen, setIsAuthen] = useState(false);

  //we can directly assign setIsAuthen to onLogin because there types are not same
  const login = () => {
    setIsAuthen(true);
  };

  return (
    <Router>
      <Routes>
        //path actually specifies the path that is to be added up on the link
        when routed to Login
        <Route path="/" element={<Login onLogin={login} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/rentside"
          element={isAuthen && <RentSide userName="John Doe" />}
        />
        <Route
          path="/companyside"
          element={isAuthen && <CompanySide userName="John Doe" />}
        />
      </Routes>
    </Router>
  );
};
/*So Mosh has quoted the similarity between a state and a prop both on changing will reset the dom*/
export default App;
