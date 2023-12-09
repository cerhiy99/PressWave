import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { CircularProgress } from "@mui/material";
import "./Article.scss";
import i18n from "../../../utils/i18next";
import { useAction } from "../../../hoocks/useAction";
import { useParams } from "react-router-dom";
import MiniArticles from "./MiniArticles";
import { t } from "i18next";
import { setCategory, setViewedArticle } from "../../../utils/setLocalStorage";

const Article = () => {
  const { article } = useSelector((state: RootState) => state.articles);
  const { GetArticle, GetCategories } = useAction();
  const { id } = useParams();
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (categories.length === 0) {
      GetCategories(i18n.language);
    }
  }, [i18n.language]);

  useEffect(() => {
    if (id && parseInt(id)) {
      GetArticle(i18n.language, parseInt(id));
    }
  }, [i18n.language, id]);
  function createMarkup(text: string) {
    return { __html: text };
  }
  useEffect(() => {
    if (article) {
      if (article.id) {
        setViewedArticle(article.id);
        article.idCategories.forEach((x) => setCategory(x.categoryId));
      }
    }
  }, [article]);

  return (
    <div className="article-main">
      {article === null ? (
        <div className="loading">
          <CircularProgress color="success" size={"40%"} />
        </div>
      ) : (
        <>
          <div className="title">
            <h1>{article.name}</h1>
          </div>
          <div className="image">
            {article.video !== "" ? (
              <video width={"100%"} controls>
                <source
                  src={process.env.REACT_APP_SERVER_URL + article.video}
                  type="video/mp4"
                />
                Ваш браузер не підтримує відео тег.
              </video>
            ) : (
              <img
                src={process.env.REACT_APP_SERVER_URL + article.image}
                alt="articleImage"
              />
            )}
            <div
              className="description"
              dangerouslySetInnerHTML={createMarkup(article.description)}
            />
          </div>
          <div className="neigbor-articles">
            <div className="neigbor-articles-title-container">
              <p>{t("article.neiborArticles")}</p>

              <div className="line" />
            </div>
            <div className="list-neigbor-articles">
              <MiniArticles articles={article.neigborArticle} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Article;
