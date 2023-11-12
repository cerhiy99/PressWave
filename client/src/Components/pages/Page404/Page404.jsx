import React from "react";
import "./Page404.scss";
import { t } from "i18next";
import { NavLink } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="page-404">
      <div className="container">
        <div className="div-404">404</div>
        <div className="title">{t("page404.title")}</div>
        <div className="description">
          {t("page404.description")}
          <NavLink to="/">{t("page404.description_a")}</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Page404;
