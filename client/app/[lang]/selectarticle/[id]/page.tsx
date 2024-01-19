import MiniArticles from '@/app/components/article/MiniArticles';
import { articleState } from '@/app/interfaces/articlesInterface';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary';
import React from 'react'
import "./Article.scss"
import Image from 'next/image';

export async function generateStaticParams(){
    const res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+'article/getArticlePosts',{next:{revalidate:60}});
    if(!res.ok)throw new Error("не вдалося получити список статей");
    const data=await res.json();
    if(data.status!=200)throw new Error("не вдалося получити список статей");
    return data.res;
}

async function getCategories(lang:Locale) {
  let res = (await fetch(process.env.NEXT_PUBLIC_API_SERVER+`categories/get?language=`+lang, { next: { revalidate: 3600*24 }}))
  if(!res.ok)throw new Error('Не вдалося отримати дані');
  const data=await res.json();
  if(data.status!=200)throw new Error('Не вдалося отримати дані');
  return data.res;
}

const getArticle=async(lang:Locale,id:string)=>{
  const res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+`article/getForId?language=${lang}&id=${id}`,{next:{revalidate:3600*24}});
  if(!res.ok)return false;
  const data=await res.json();
  if(data.status!=200)return false;
  return data.res;
}

const Article = async({params}:{params:{lang:Locale,id:string}}) => {
  const selectArticle:articleState=await getArticle(params.lang,params.id);
  if(!selectArticle){
    return <div className="error">error</div>
  }
  const categories:[{id:number,name:string,namePath:string}]|[]=await getCategories(params.lang)
  const {article}=await getDictionary(params.lang)

  function createMarkup(text: string) {
    return { __html: text };
  }
  
  return (
    <div className="article-main">
      <div className="title">
        <h1>{selectArticle.name}</h1>
      </div>
      <div className="image">
        {selectArticle.video !== "" ? (
          <video width={"100%"} controls>
            <source
              src={process.env.NEXT_PUBLIC_SERVER + selectArticle.video}
              type="video/mp4"
            />
            Ваш браузер не підтримує відео тег.
          </video>
        ) : (
          <Image
            src={process.env.NEXT_PUBLIC_SERVER + selectArticle.image}
            width={1920}
            height={1080}
            alt="articleImage"
            priority={false}

          />
        )}
        <div
          className="description"
          dangerouslySetInnerHTML={createMarkup(selectArticle.description)}
        />
      </div>
      <div className="neigbor-articles">
        <div className="neigbor-articles-title-container">
          <p>{article.neiborArticles}</p>

          <div className="line" />
        </div>
        <div className="list-neigbor-articles">
          <MiniArticles lang={params.lang} categories={categories} articles={selectArticle.neigborArticle} />
        </div>
      </div>
    </div>
  )
}

export default Article;