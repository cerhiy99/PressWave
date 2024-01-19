import React from 'react'
import { Locale } from "@/i18n.config";
import MiniArticles from '../../../../../components/article/MiniArticles';
import Pagination from '@/app/components/utils/Pagination';
import "./page.scss"
import SortOption from '@/app/components/article/SortOption';

export async function generateStaticParams({params}:{params:{lang:Locale,category:string,sortfor:string}}) {
   let res = (await fetch(process.env.NEXT_PUBLIC_API_SERVER+`article/getPages?category=${params.category}&limit=12`, { next: { revalidate: 3600*24 }}))
  if(!res.ok)throw new Error('Не вдалося отримати дані');
  const data=await res.json();
  if(data.status!=200)throw new Error('Не вдалося отримати дані');
  return data.res;
}

const getCategories=async(lang:Locale)=>{
  let res = (await fetch(process.env.NEXT_PUBLIC_API_SERVER+`categories/get?language=`+lang, { next: { revalidate: 3600*24 }}))
  if(!res.ok)throw new Error('Не вдалося отримати дані');
  const data=await res.json();
  if(data.status!=200)throw new Error('Не вдалося отримати дані');
  return data.res;
}

const getArticles=async(params:{lang:Locale,sortfor:string},categoryId:number,page:number)=>{
  const res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+`article/GetForCategories?language=${params.lang}&limit=12&categoryId=${categoryId}&page=${page}&sortBy=${params.sortfor}`,{next:{revalidate:3600*24}});
  if(!res.ok)throw new Error('Не вдалося отримати дані');
  const data=await res.json();
  if(data.status!=200)return false;
  return data;
}  

const getCategoriesId=(category:string,categories:[{id:number,name:string,namePath:string}]|[]):number=>{
  const categoryDecoded = decodeURIComponent(category);
  if(categoryDecoded==="all")return 0;
  const categoryId=categories.find(x=>x.namePath==categoryDecoded)?.id;
  return categoryId||-1;
}


const Page = async({params}:{params:{lang:Locale,category:string,sortfor:string,page:number}}) => {
  const page=params.page;
  const categories:[{id:number,name:string,namePath:string}]|[]=await getCategories(params.lang);
  let categoryId=getCategoriesId(params.category,categories);
  let articles=await getArticles(params,categoryId,page);
  if(!articles||categoryId==-1){
    return <div className="ds">error</div>
  }
  return (
    <div className='list-articles'>
      <div className="title">
        <div className="title-line">
          <p>{params.category}</p>
          <div className="line" />
          <div className="sort-by1">
            {params.category==="most popular"||params.category==="latest"||params.category==="all"?<></>:
              <div className="text">
                
                <SortOption lang={params.lang} sortfor={params.sortfor} category={params.category} page={page.toString()} />
              </div>}
          </div>
        </div>
        {params.category==="most popular"||params.category==="latest"||params.category==="all"?<></>:
          <div className="sort-by">
              <div className="text">
                <SortOption lang={params.lang} sortfor={params.sortfor} category={params.category} page={page.toString()} />
              </div>
          </div>}
      </div>
      <MiniArticles lang={params.lang} categories={categories} articles={articles.res}/>
      <Pagination currentPage={page} showPages={4} totalPages={Math.floor(articles.count/12)} url={`/${params.lang}/article/${params.category}/${params.sortfor}/`} />

    </div>
  )
}

export default Page;