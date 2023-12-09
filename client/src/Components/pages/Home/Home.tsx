import React, { useEffect, useState } from "react";
import "./Home.scss";
import Latest from "../Articles/Latest";
import { t } from "i18next";
import {
  getTopCategories,
  getTopViewedArticles,
} from "../../../utils/setLocalStorage";
import { useAction } from "../../../hoocks/useAction";
import i18n from "../../../utils/i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import MiniArticles from "../Articles/MiniArticles";
import ListArticles from "../Articles/ListArticles";
import More from "../Articles/More";

const limit = 6;

const Home = () => {
  const { forYou } = useSelector((state: RootState) => state.articles);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { GetForYou } = useAction();
  const [favoriteCategories, setFavoriteCategories] = useState<number[]>([]);
  useEffect(() => {
    const topArticles = getTopViewedArticles(limit);
    if (Array.isArray(topArticles))
      GetForYou(i18n.language, limit, topArticles);
    else GetForYou(i18n.language, limit, []);
    const topCategories = getTopCategories(2);
    if (Array.isArray(topCategories)) setFavoriteCategories(topCategories);
    else setFavoriteCategories([5, 6]);
  }, []);

  return (
    <div className="home">
      <div className="title">
        <div className="title-line">
          <p>{t("home.todayNews")}</p>
          <div className="line" />
          <div className="sort-by">
            <div className="text">
              &nbsp;
              {`${new Date().getDate().toString().padStart(2, "0")} ${t(
                `home.month${[new Date().getMonth()]}`
              )} ${new Date().getFullYear()}`}
            </div>
          </div>
        </div>
      </div>
      <div className="today-news">
        <Latest />
      </div>
      <div className="title">
        <div className="title-line">
          <p>{t("home.forYou")}</p>
          <div className="line" />
        </div>
      </div>
      <div className="for-you">
        <MiniArticles articles={forYou} />
      </div>
      <div className="title">
        <div className="title-line">
          <p>{t("home.favoriteCategories")}</p>
          <div className="line" />
        </div>
      </div>
      {favoriteCategories.map((id, idx) => (
        <div key={id} className="favorite-categories">
          <div className="mini-title">
            <div className="mini-title-line">
              <p>{categories.find((x) => x.id === id)?.name}</p>
              <div className="mini-line" />
            </div>
          </div>
          <ListArticles limit={3} idCategories={id} />

          <More
            src={`/article/${categories.find((x) => x.id === id)?.namePath}`}
          />
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Home;
