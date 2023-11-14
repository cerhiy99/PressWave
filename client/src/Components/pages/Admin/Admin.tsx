import React from "react";
import AdminCategories from "./AdminCategories";
import "./Admin.scss";
import Articles from "./Articles";

const Admin = () => {
  return (
    <div>
      <AdminCategories />
      <Articles/>
    </div>
  );
};

export default Admin;
