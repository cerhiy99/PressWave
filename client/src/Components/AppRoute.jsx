import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Latout from "./Latout";
import Home from "./pages/Home/Home";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Latout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
