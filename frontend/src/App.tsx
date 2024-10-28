import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Ramani from "./components/Ramani";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Login />} />
        <Route path = "/signup" element = {<SignUp />} />
        <Route path = "/Ramani" element = {<Ramani />}/>
      </Routes>
    </Router>
  );
}
