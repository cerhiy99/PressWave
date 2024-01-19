import React from "react";
import "./MiniArticle.scss";
import { LuClock8 } from "react-icons/lu";
import { FaPlay } from "react-icons/fa";
import { ArticlesGetInterface } from "@/app/interfaces/articlesInterface";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import Image from "next/image";

type Props = {
  articles: ArticlesGetInterface[],
  categories:[{id:number,name:string,namePath:string}]|[];
  lang:Locale;
};

const MiniArticles =async ({categories,articles,lang}: Props) => {
  function createMarkup(text: string) {
    return { __html: text };
  }
  return (
    <div className="list-mini-articles">
      {Array.isArray(articles) && articles.map((articles) => (
        <Link key={articles.id} href={`/${lang}/selectarticle/`+articles.id}>
          <div
            key={articles.id}
            className={`article${articles.video === "" ? "" : " video"}`}
          >
            {articles.isHot ? (
              <div className="is-hot-container">
                <div className="is-hot">HOT!</div>
              </div>
            ) : (
              <></>
            )}
            <div className="icon-video-play-and-img">
            <div className="icon-video-play">
              <div className="container">
                <div className="icon">
                  <FaPlay size={"50%"} />
                </div>
              </div>
            </div>
            <div className="img-container">
              <Image
                className="article__image"
                src={process.env.NEXT_PUBLIC_SERVER + articles.image}
                alt="Article"
                width={600} 
                height={300} 
                priority={true}
              />
            </div>
            <div className="article-text">
              <div className="title-and-description">
                <h1 className="article__title">{articles.name}</h1>
                <div
                  className="article__description"
                  dangerouslySetInnerHTML={createMarkup(articles.description)}
                />
              </div>
                <div className="article__info">
                  <div className="article__reading-time">
                    <LuClock8 size={20} /> &nbsp;&nbsp;{articles.timeReading}
                    &nbsp;|&nbsp;
                    {categories &&
                      articles.idCategories.map((idCategory:({categoryId:number})) =>
                        categories
                          .filter(
                            (category) => category.id === idCategory.categoryId
                          )
                          .map((category) => (
                            <div key={category.id} className="category-name">
                              {category.name}&nbsp;
                            </div>
                          ))
                      )}
                  </div>
                  <div className="article__views-count">
                    {articles.countWatch}K views
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MiniArticles;
