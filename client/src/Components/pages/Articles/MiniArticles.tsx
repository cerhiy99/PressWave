import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAction } from "../../../hoocks/useAction";
import { RootState } from "../../../store/reducers";
import i18n from "../../../utils/i18next";
import "./MiniArticle.scss";
import { LuClock8 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { ArticlesGetState } from "../../../store/reducers/articlesReducers";
import { FaPlay } from "react-icons/fa";

type Props = {
  articles: ArticlesGetState[] | [];
};

const MiniArticles = ({ articles }: Props) => {
  const { categories } = useSelector((state: RootState) => state.categories);
  const { GetCategories } = useAction();
  const navigate = useNavigate();
  function createMarkup(text: string) {
    return { __html: text };
  }
  useEffect(() => {
    GetCategories(i18n.language);
  }, [i18n.language]);
  return (
    <div className="list-mini-articles">
      {articles.map((articles) => (
        <div
          onClick={() => navigate("/article/selectArticle/" + articles.id)}
          key={articles.id}
          className={`article${articles.video === "" ? "" : " video"}`}
        >
          {articles.isHot ? (
            <div className="is-hot-container">
              <div className="is-hot">HOT!</div>
            </div>
          ) : (
            <></>
          )}
          <div className="icon-video-play">
            <div className="container">
              <div className="icon">
                <FaPlay size={"50%"} />
              </div>
            </div>
          </div>
          <div className="img-container">
            <img
              className="article__image"
              src={process.env.REACT_APP_SERVER_URL + articles.image}
              alt="Article"
            />
          </div>
          <div className="article-text">
            <div className="title-and-description">
              <h1 className="article__title">{articles.name}</h1>
              <div
                className="article__description"
                dangerouslySetInnerHTML={createMarkup(articles.description)}
              />
            </div>
            <div className="article__info">
              <div className="article__reading-time">
                <LuClock8 size={20} /> &nbsp;&nbsp;{articles.timeReading}
                &nbsp;|&nbsp;
                {categories &&
                  articles.idCategories.map((idCategory) =>
                    categories
                      .filter(
                        (category) => category.id === idCategory.categoryId
                      )
                      .map((category) => (
                        <div key={category.id} className="category-name">
                          {category.name}&nbsp;
                        </div>
                      ))
                  )}
              </div>
              <div className="article__views-count">
                {articles.countWatch}K views
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiniArticles;
