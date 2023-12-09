import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useAction } from "../../../hoocks/useAction";
import i18n from "../../../utils/i18next";
import { CircularProgress } from "@mui/material";
import MiniArticles from "./MiniArticles";

interface Props {
  limit: number;
}

const MiniVideo = ({ limit }: Props) => {
  const { miniVideo } = useSelector((state: RootState) => state.articles);
  const { GetMiniVideo } = useAction();

  useEffect(() => {
    GetMiniVideo(i18n.language, 1, limit, "Views");
  }, [i18n.language]);

  return (
    <div className="list-hot">
      {miniVideo.length === 0 ? (
        <div className="loading">
          <CircularProgress color="success" size={"40%"} />
        </div>
      ) : (
        <div className="hot-article-main">
          <MiniArticles articles={miniVideo} />
        </div>
      )}
    </div>
  );
};

export default MiniVideo;
