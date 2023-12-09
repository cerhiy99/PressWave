import React from "react";
import { Route, Routes } from "react-router-dom";
import Latout from "./Latout";
import Main from "./pages/Articles/Main";
import Page404 from "./pages/Page404/Page404";
import Admin from "./pages/Admin/Admin";
import Article from "./pages/Articles/Article";
import PageCategories from "./pages/Articles/PageCategories";
import Cookies from "./pages/AdditionalPages/Cookies";
import TermsOfUse from "./pages/AdditionalPages/TermsOfUse";
import PrivacyPolicy from "./pages/AdditionalPages/PrivacyPolicy";
import Home from "./pages/Home/Home";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Latout />}>
        <Route index element={<Home/>}/>
        <Route path="/article" element={<Main />} />
        <Route path="/article/:nameCategories" element={<PageCategories />} />
        <Route path="/article/selectArticle/:id" element={<Article />} />
        <Route path="/termsOfUse" element={<TermsOfUse />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
