import { Locale } from "@/i18n.config";
import "./ListArticles.scss";
import MiniArticles from "./MiniArticles";
import { ArticlesGetInterface } from "@/app/interfaces/articlesInterface";

type Props={
  articles:ArticlesGetInterface[],
  categories:[{id:number,name:string,namePath:string}]|[],
  lang:Locale
}

const ListArticles =async ({articles,categories,lang}:Props) => {

  return (
    <div className="list-articles-container">
      <div className="list-articles">
        <MiniArticles lang={lang} articles={articles} categories={categories}/>
      </div>
    </div>
  );
};

export default ListArticles;
