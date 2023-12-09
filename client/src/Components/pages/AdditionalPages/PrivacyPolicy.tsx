import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { CircularProgress } from "@mui/material";
import "./AdditionalPages.scss";
import { useAction } from "../../../hoocks/useAction";
import i18n from "../../../utils/i18next";

const PrivacyPolicy = () => {
  const { privacyPolicy } = useSelector(
    (state: RootState) => state.additionalPages
  );
  const { GetPrivacyPolicy } = useAction();
  function createMarkup(text: string) {
    return { __html: text };
  }
  useEffect(() => {
    GetPrivacyPolicy(i18n.language);
  }, [i18n.language]);
  return (
    <div className="main-additional-pages">
      {privacyPolicy === "" ? (
        <div className="loading">
          <CircularProgress color="success" size={"40%"} />
        </div>
      ) : (
        <div
          dangerouslySetInnerHTML={createMarkup(privacyPolicy)}
          className="text"
        />
      )}
    </div>
  );
};

export default PrivacyPolicy;
