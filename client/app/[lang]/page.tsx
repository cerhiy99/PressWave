import { Locale } from '@/i18n.config'
import MiniArticles from '../components/article/MiniArticles'
import { getDictionary } from '@/lib/dictionary'
import More from '../components/article/More';
import "./Home.scss"

async function getData(lang:Locale) {
  let res = (await fetch(process.env.NEXT_PUBLIC_API_SERVER+`categories/get?language=`+lang, { next: { revalidate: 36 }}))
  if(!res.ok)throw new Error('Не вдалося отримати дані');
  const data=await res.json();
  if(data.status!=200)throw new Error('Не вдалося отримати дані');
  return data.res;
}

type Month = "month1" | "month2" | "month3" | "month4" | "month5" | "month6" | "month7" | "month8" | "month9" | "month10" | "month11" | "month12";

const getArticles=async(params:{lang:Locale,sortfor:string},categoryId:number,page:number)=>{
  const res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+`article/GetForCategories?language=${params.lang}&limit=12&categoryId=${categoryId}&page=${page}&sortBy=${params.sortfor}`,{next:{revalidate:3600*24}});
  if(!res.ok)throw new Error('Не вдалося отримати дані');
  const data=await res.json();
  if(data.status!=200)return false;
  return data.res;
}

const GetForYou=async(lang:string,limit:number)=>{
  const res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+`article/getForYou?language=${lang}&limit=${limit}`, { next: { revalidate: 3600*24 }})
  if(!res.ok)throw new Error("не вдалося отримати дані");
  const data=await res.json();
  if(data.status!=200)throw new Error("не вдалося отримати дані");
  return data.res;
}

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) { 
  const { home }=await getDictionary(lang)
  const categories=await getData(lang); 
  const latest=await getArticles({lang, sortfor:"date"},2,1);
  let month: Month = `month${new Date().getMonth() + 1}` as Month;
  const sport=await getArticles({lang,sortfor:"date"},4,1);
  const forYou=await GetForYou(lang,4);
  return (
    <div className="home">
      <div className="title">
        <div className="title-line">
            <p>{home.todayNews}</p>
            <div className="line" />
            <div className="sort-by1">
            <div className="text">
              &nbsp;
              {`${new Date().getDate().toString().padStart(2, "0")} ${
                home[month]
              } ${new Date().getFullYear()}`}
            </div>
        </div>
        </div>
        <div className="sort-by">
            <div className="text">
              &nbsp;
              {`${new Date().getDate().toString().padStart(2, "0")} ${
                home[month]
              } ${new Date().getFullYear()}`}
            </div>
        </div>
      </div>
      <div className="today-news">
        <MiniArticles categories={categories} articles={latest} lang={lang}/>
      </div>
      <div className="title">
        <div className="title-line">
          <p>{home.forYou}</p>
          <div className="line" />
        </div>
      </div>
      <div className="for-you">
        <MiniArticles lang={lang} categories={categories} articles={latest}/>
      </div>
      <div className="title">
        <div className="title-line">
          <p>{home.favoriteCategories}</p>
          <div className="line" />
        </div>
      </div>
      <div className="today-news">
        <MiniArticles categories={categories} articles={sport} lang={lang}/>
      </div>
      <div className="more">
        <More
          src={"article/video"} lang={lang}
        />
      </div>
    </div>
  )
}
