import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { CircularProgress } from "@mui/material";
import "./AdditionalPages.scss";
import { useAction } from "../../../hoocks/useAction";
import i18n from "../../../utils/i18next";

const TermsOfUse = () => {
  const { termsOfUse } = useSelector(
    (state: RootState) => state.additionalPages
  );
  const { GetTermsOfUse } = useAction();
  function createMarkup(text: string) {
    return { __html: text };
  }
  useEffect(() => {
    GetTermsOfUse(i18n.language);
  }, [i18n.language]);
  return (
    <div className="main-additional-pages">
      {termsOfUse === "" ? (
        <div className="loading">
          <CircularProgress color="success" size={"40%"} />
        </div>
      ) : (
        <div
          dangerouslySetInnerHTML={createMarkup(termsOfUse)}
          className="text"
        />
      )}
    </div>
  );
};

export default TermsOfUse;
