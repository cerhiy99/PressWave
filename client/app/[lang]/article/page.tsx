import React from "react";
import { Locale } from "@/i18n.config";
import BlockMain from "@/app/components/article/BlockMain";
import ListCategories from "@/app/components/article/ListCategories";



const getCategories=async(lang:Locale)=>{
  const res = (await fetch(process.env.NEXT_PUBLIC_API_SERVER+`categories/get?language=`+lang, { next: { revalidate: 3600*24 }}))
  if(!res.ok)throw new Error('Не вдалося отримати дані');
  const data=await res.json();
  if(data.status!=200)throw new Error('Не вдалося отримати дані');
  return data.res;
}



const Page = async({params:{lang}}:{params:{lang:Locale}}) => {
  const categories=await getCategories(lang);
    
  return (
    <div className="home">
      <ListCategories categories={categories}/>
      <BlockMain categories={categories} lang={lang}/>
    </div>
  );
};

export default Page;
