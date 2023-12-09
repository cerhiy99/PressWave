import React, { useEffect } from "react";
import "./MiniArticle.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useAction } from "../../../hoocks/useAction";
import i18n from "../../../utils/i18next";
import { useNavigate } from "react-router-dom";
import MiniArticles from "./MiniArticles";

const Latest = () => {
  const navigate = useNavigate();
  const { articlesLatest } = useSelector((state: RootState) => state.articles);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { GetLatestArticles, GetCategories } = useAction();

  useEffect(() => {
    GetCategories(i18n.language);
    GetLatestArticles(i18n.language, 6);
  }, [i18n.language]);

  function createMarkup(text: string) {
    return { __html: text };
  }
  return (
    <div className="latest">
      <MiniArticles articles={articlesLatest} />
    </div>
  );
};

export default Latest;
