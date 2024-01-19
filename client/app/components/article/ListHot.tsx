import { CircularProgress } from "@mui/material";
import "./ListHot.scss";
import MiniArticles from "./MiniArticles";
import { Locale } from "@/i18n.config";
import { ArticlesGetInterface } from "@/app/interfaces/articlesInterface";

const ListHot =({articlesHot,categories,lang}:{articlesHot:ArticlesGetInterface[],categories:[{id:number,name:string,namePath:string}]|[],lang:Locale}) => {
  
  return (
    <div className="list-hot">
      {articlesHot.length === 0 ? (
        <div className="loading">
          <CircularProgress color="success" size={"40%"} />
        </div>
      ) : (
        <div className="hot-article-main">
          <MiniArticles lang={lang} categories={categories} articles={articlesHot} />
        </div>
      )}
    </div>
  );
};

export default ListHot;
