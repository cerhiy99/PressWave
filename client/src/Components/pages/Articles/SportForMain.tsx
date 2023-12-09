import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useAction } from "../../../hoocks/useAction";
import i18n from "../../../utils/i18next";
import MiniArticles from "./MiniArticles";
import { CircularProgress } from "@mui/material";
import "./ListHot.scss";

const ListMostPopular = () => {
  const { articlesMostPopular } = useSelector(
    (state: RootState) => state.articles
  );
  const { GetArticleMostPopular } = useAction();

  useEffect(() => {
    GetArticleMostPopular(i18n.language, 6);
  }, [i18n.language]);

  return (
    <div className="list-hot">
      {articlesMostPopular.length === 0 ? (
        <div className="loading">
          <CircularProgress color="success" size={"40%"} />
        </div>
      ) : (
        <div className="hot-article-main">
          <MiniArticles articles={articlesMostPopular} />
        </div>
      )}
    </div>
  );
};

export default ListMostPopular;
