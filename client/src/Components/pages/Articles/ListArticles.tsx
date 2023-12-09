import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useAction } from "../../../hoocks/useAction";
import i18n from "../../../utils/i18next";
import "./ListArticles.scss";
import { CircularProgress } from "@mui/material";
import MiniArticles from "./MiniArticles";

type Props = {
  limit: number;
  idCategories: number;
};

const ListArticles = ({ limit, idCategories }: Props) => {
  const { listCategoryArticles } = useSelector(
    (state: RootState) => state.articles
  );
  const [page, setPage] = useState<number>(1);
  const { GetArticleForCategory } = useAction();
  useEffect(() => {
    GetArticleForCategory(i18n.language, limit, page, idCategories);
  }, [i18n.language]);
  useEffect(() => {
    setCategoryArticles(
      listCategoryArticles.find((x) => x.categoryId === idCategories)
    );
    setLoading(listCategoryArticles.some((x) => x.categoryId === idCategories));
  }, [listCategoryArticles]);
  const [categoryArticles, setCategoryArticles] = useState<any>(
    listCategoryArticles.find((x) => x.categoryId === idCategories)
  );
  const [loading, setLoading] = useState<boolean>(
    listCategoryArticles.some((x) => x.categoryId === idCategories)
  );

  return (
    <div className="list-articles-container">
      {!loading ? (
        <div className="loading">
          <CircularProgress color="success" size={"40%"} />
        </div>
      ) : (
        <div className="list-articles">
          {categoryArticles && (
            <MiniArticles articles={categoryArticles.articles} />
          )}
        </div>
      )}
    </div>
  );
};

export default ListArticles;
