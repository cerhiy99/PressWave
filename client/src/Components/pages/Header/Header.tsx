import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { t } from "i18next";
import { ImSearch } from "react-icons/im";
import SetLanguage from "./SetLanguage";
import Rs from "./Rs";

const Header = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="logo-and-other">
          <div className="logo">
            <img alt="logo" src="/images/Logo.png" />
          </div>
          <div className="other">
            <ul className="list-pages">
              <li>
                <NavLink to="/">{t("Header.Home")}</NavLink>
              </li>
              <li>
                <NavLink to="/Main">{t("Header.Main")}</NavLink>
              </li>
              <li>
                <NavLink to="/TV">{t("Header.TV")}</NavLink>
              </li>
              <li>
                <NavLink to="/Articles">{t("Header.Articles")}</NavLink>
              </li>
              <li>
                <NavLink to="/Listen">{t("Header.Listen")}</NavLink>
              </li>
            </ul>
            <div className="search">
              <ImSearch size={"25px"} />
            </div>
            <div className="set-language">
              <Rs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
