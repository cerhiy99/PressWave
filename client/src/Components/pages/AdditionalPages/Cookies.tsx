import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { CircularProgress } from "@mui/material";
import "./AdditionalPages.scss";
import { useAction } from "../../../hoocks/useAction";
import i18n from "../../../utils/i18next";

const Cookies = () => {
  const { cookies } = useSelector((state: RootState) => state.additionalPages);
  const { GetCookies } = useAction();
  function createMarkup(text: string) {
    return { __html: text };
  }
  useEffect(() => {
    GetCookies(i18n.language);
  }, [i18n.language]);
  return (
    <div className="main-additional-pages">
      {cookies === "" ? (
        <div className="loading">
          <CircularProgress color="success" size={"40%"} />
        </div>
      ) : (
        <div dangerouslySetInnerHTML={createMarkup(cookies)} className="text" />
      )}
    </div>
  );
};

export default Cookies;
