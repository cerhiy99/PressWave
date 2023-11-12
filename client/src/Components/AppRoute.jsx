import React from "react";
import { Route, Routes } from "react-router-dom";
import Latout from "./Latout";
import Home from "./pages/Home/Home";
import Page404 from "./pages/Page404/Page404";
import Admin from "./pages/Admin/Admin";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Latout />}>
        <Route index element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
