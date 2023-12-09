import React from "react";
import ListHot from "./ListHot";
import { t } from "i18next";
import "./BlockMain.scss";
import Latest from "./Latest";
import ListMostPopular from "./MostPopular";
import More from "./More";
import ListArticles from "./ListArticles";
import MiniVideo from "./MiniVideo";

const BlockMain = () => {
  return (
    <div className="block-main">
      <div className="line-container">
        <p>{t("article.hot")}</p>
        <div className="line" />
      </div>
      <ListHot />
      <More src="/article/hot" />
      <div className="line-container">
        <p>{t("article.latest")}</p>
        <div className="line" />
      </div>
      <div className="list-latest">
        <Latest />
      </div>
      <More src="/article/Latest" />
      <div className="line-container">
        <p>{t("article.mostPopular")}</p>
        <div className="line" />
      </div>
      <div className="list-most-popular">
        <ListMostPopular />
      </div>
      <More src="/article/MostPopular" />
      <div className="line-container">
        <p>{t("article.video")}</p>
        <div className="line" />
      </div>
      <div className="list-sport">
        <MiniVideo limit={3} />
      </div>
      <More src="/article/Video" />
      <div className="line-container">
        <p>{t("article.sport")}</p>
        <div className="line" />
      </div>
      <div className="list-sport">
        <ListArticles limit={3} idCategories={5} />
      </div>
      <More src="/article/Sport" />
      <div className="line-container">
        <p>{t("article.science")}</p>
        <div className="line" />
      </div>
      <div className="list-science">
        <ListArticles limit={3} idCategories={6} />
      </div>
      <More src="/article/Science" />
    </div>
  );
};

export default BlockMain;
