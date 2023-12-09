import React, { useEffect } from "react";
import "./Footer.scss";
import { t } from "i18next";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useAction } from "../../../hoocks/useAction";
import i18n from "../../../utils/i18next";

const Footer = () => {
  const { categories } = useSelector((state: RootState) => state.categories);
  const { GetCategories } = useAction();
  useEffect(() => {
    GetCategories(i18n.language);
  }, [i18n.language]);
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="pages">
          <div className="logo">
            <img alt="logo" src="/images/Logo.png" />
          </div>
          <div className="title1">
            <div className="line-container">
              <p>{t("footer.aroundtheWave")}</p>
              <div className="line" />
            </div>
          </div>
          <ul className="list-pages">
            <li>
              <NavLink to="/">{t("Header.Home")}</NavLink>
            </li>
            <li>
              <NavLink to="/article">{t("Header.Main")}</NavLink>
            </li>
            <li>
              <NavLink to="/TV">{t("Header.TV")}</NavLink>
            </li>
            <li>
              <NavLink to="/article/all">{t("Header.Articles")}</NavLink>
            </li>
            <li>
              <NavLink to="/Listen">{t("Header.Listen")}</NavLink>
            </li>
          </ul>
        </div>
        <div className="categories">
          <div className="title1">
            <div className="line-container">
              <p>{t("footer.categories")}</p>
              <div className="line" />
            </div>
            <ul className="list-pages">
              {categories.map((x) => (
                <li key={x.id}>
                  <NavLink to={"/article/" + x.namePath}>{x.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rights-reserved">{t("footer.rightsReserved")}</div>
        <div className="additional-pages">
          <p>
            <NavLink to="/termsOfUse">{t("footer.termsUse")}</NavLink>
          </p>
          <p>
            <NavLink to="/privacyPolicy">{t("footer.privacyPolicy")}</NavLink>
          </p>
          <p>
            <NavLink to="/cookies">{t("footer.cookies")}</NavLink>
          </p>
          <p>
            <NavLink to="/contactUs">{t("footer.contactUs")}</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
