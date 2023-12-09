import React from "react";
import AdminCategories from "./AdminCategories";
import "./Admin.scss";
import Articles from "./Articles";
import Addhastag from "./Addhastag";
import AddCookies from "./AddCookies";
import AddPrivacyPolicy from "./AddPrivacyPolicy";
import AddTermsOfUse from "./AddTermsOfUse";

const Admin = () => {
  return (
    <div>
      <AdminCategories />
      <Articles />
      <Addhastag />
      <AddCookies />
      <AddTermsOfUse />
      <AddPrivacyPolicy />
    </div>
  );
};

export default Admin;
