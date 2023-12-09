import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import i18n from "../../../utils/i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useAction } from "../../../hoocks/useAction";
import Page404 from "../Page404/Page404";
import MiniArticles from "./MiniArticles";
import { CircularProgress, Pagination } from "@mui/material";
import { CategoryArticles } from "../../../store/reducers/articlesReducers";
import "./PageCategories.scss";
import { t } from "i18next";

const PageCategories = () => {
  const sortFor = ["Date", "Name", "Views"];
  const { nameCategories } = useParams();
  const { categories } = useSelector((state: RootState) => state.categories);
  const { GetArticleForCategory, GetCategories } = useAction();
  const [selectCategory, setSelectCategory] = useState<string>();
  const [idSelectCategories, setIdSelectCategories] = useState<
    number | boolean | null
  >(null);
  const [selectedArticle, setselectedArticle] =
    useState<null | CategoryArticles>(null);
  const [page, setPage] = useState<number>(1);
  const [indexSortBy, setIndexSortBy] = useState<number>(0);

  useEffect(() => {
    GetCategories(i18n.language);
  }, [i18n.language]);
  useEffect(() => {
    if (nameCategories === "all") {
      setSelectCategory("all");
      setIdSelectCategories(0);
    } else if (nameCategories === "Video") {
      setSelectCategory("Video");
      setIdSelectCategories(-1);
    } else if (categories.length !== 0) {
      const selectCategory = categories.find(
        (category) => category.namePath === nameCategories
      );
      if (selectCategory === undefined) setIdSelectCategories(false);
      else {
        setSelectCategory(selectCategory.name);
        setIdSelectCategories(selectCategory.id);
      }
    }
  }, [categories, nameCategories]);

  const { listCategoryArticles } = useSelector(
    (state: RootState) => state.articles
  );
  useEffect(() => {
    if (typeof idSelectCategories === "number") {
      GetArticleForCategory(
        i18n.language,
        12,
        page,
        idSelectCategories,
        sortFor[indexSortBy]
      );
    }
  }, [
    i18n.language,
    nameCategories,
    page,
    idSelectCategories,
    indexSortBy,
    nameCategories,
  ]);

  useEffect(() => {
    if (
      typeof idSelectCategories === "number" &&
      listCategoryArticles.some((x) => x.categoryId === idSelectCategories)
    ) {
      const selectedArticle = listCategoryArticles.find(
        (x) => x.categoryId === idSelectCategories
      );
      if (selectedArticle) {
        setselectedArticle(selectedArticle);
      }
    }
  }, [listCategoryArticles, idSelectCategories]);

  if (
    nameCategories !== "all" &&
    nameCategories !== "Video" &&
    idSelectCategories === false
  ) {
    return <Page404 />;
  }
  const changeSort = () => {
    if (indexSortBy + 1 === sortFor.length) {
      setIndexSortBy(0);
    } else setIndexSortBy(indexSortBy + 1);
  };

  return (
    <div className="page-categories">
      {selectedArticle && selectCategory ? (
        <>
          <div className="title">
            <div className="title-line">
              <p>{selectCategory}</p>

              <div className="line" />
              {nameCategories === "Most popular" ||
              nameCategories === "Latest" ? (
                <></>
              ) : (
                <div className="sort-by">
                  <div className="text">{t("article.sortBy")}</div>
                  <div className="value" onClick={changeSort}>
                    {sortFor[indexSortBy]}
                  </div>
                </div>
              )}
            </div>
          </div>
          <MiniArticles articles={selectedArticle.articles} />
          <div className="pagination">
            <Pagination
              page={
                listCategoryArticles.find(
                  (x) => x.categoryId === idSelectCategories
                )?.page || 12
              }
              count={Math.ceil(selectedArticle.count / 12)}
              onChange={(e, value) => setPage(value)}
            />
          </div>
        </>
      ) : (
        <div className="loading">
          <CircularProgress color="success" size={"40%"} />
        </div>
      )}
    </div>
  );
};

export default PageCategories;
