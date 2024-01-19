import "./BlockMain.scss";
import More from "./More";
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import MiniArticles from "./MiniArticles";
import { ArticlesGetInterface } from "@/app/interfaces/articlesInterface";

type Props={
  categories:[{id:number,name:string,namePath:string}]|[];
  lang:Locale;
  /*hot:ArticlesGetInterface[];
  latest:ArticlesGetInterface[];
  mostPopular:ArticlesGetInterface[];
  video:ArticlesGetInterface[];
  sport:ArticlesGetInterface[];
  science:ArticlesGetInterface[];*/
}


const getHot=async(lang:Locale)=>{
  let res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+`article/getHot?limit=3&language=${lang}`,{next:{revalidate:3600*24}});
  if(!res.ok)throw new Error('не вдалося отримати hot');
  const data=await res.json();
  if(data.status!==200)throw new Error('не вдалося отримати hot');
  return data.res;
}

const getArticleForCategory=async(lang:Locale,categoryId:number)=>{
  let res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+`article/GetForCategories?language=${lang}&limit=3&categoryId=${categoryId}&page=1&sortBy=date`,{next:{revalidate:3600*24}});
  if(!res.ok)throw new Error('не вдалося отримати статті');
  const data=await res.json();
  if(data.status!==200)throw new Error('не вдалося отримати статті');
  return data.res;
}

const BlockMain = async({categories,lang,/*hot,latest,mostPopular,video,sport,science*/}:Props) => {
  const {article}= await getDictionary(lang);

  const hot= await getHot(lang);
  const latest= await getArticleForCategory(lang,2);
  const mostPopular= await getArticleForCategory(lang,3);
  const video= await getArticleForCategory(lang,4)
  const sport= await getArticleForCategory(lang,5)
  const science= await getArticleForCategory(lang,9);
  return (
    
    <div className="block-main">
      <div className="line-container">
        <p>{article.hot}</p>
        <div className="line" />
      </div>
      <MiniArticles lang={lang} categories={categories} articles={hot}/>
      <More src="/article/hot" lang={lang}/>
      <div className="line-container">
        <p>{article.latest}</p>
        <div className="line" />
      </div>
      <div className="list-latest">
        <MiniArticles lang={lang} categories={categories} articles={latest}/>
      </div>
      <More src="/article/latest" lang={lang}/>
      <div className="line-container">
        <p>{article.mostPopular}</p>
        <div className="line" />
      </div>
      <div className="list-most-popular">
        <MiniArticles lang={lang} categories={categories} articles={mostPopular}/>
      </div>
      <More src="/article/most popular" lang={lang}/>
      <div className="line-container">
        <p>{article.video}</p>
        <div className="line" />
      </div>
      <div className="list-sport">
        <MiniArticles lang={lang} categories={categories} articles={video}/>
      </div>
      <More src="/article/video" lang={lang}/>
      <div className="line-container">
        <p>{article.sport}</p>
        <div className="line" />
      </div>
      <div className="list-sport">
        <MiniArticles lang={lang} categories={categories} articles={sport}/>
      </div>
      <More src="/article/sport" lang={lang}/>
      <div className="line-container">
        <p>{article.science}</p>
        <div className="line" />
      </div>
      <div className="list-science">
        <MiniArticles lang={lang} categories={categories} articles={science}/>
      </div>
      <More src="/article/science" lang={lang}/>
    </div>
  );
};

export default BlockMain;
