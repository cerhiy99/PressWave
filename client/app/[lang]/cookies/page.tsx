import "../AdditionalPages.scss";
import { Locale } from "@/i18n.config";

const getData=async(lang:Locale)=>{
  const res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+'additionalPages/getCookies?language='+lang,{next:{revalidate:3600*24}})
  if(!res.ok)throw new Error('Не вдалося отримати дані');
  const data=await res.json();
  if(data.status!=200)throw new Error('Не вдалося отримати дані');
  return data.res;
}

const Cookies = async({params}:{params:{lang:Locale}}) => {
  function createMarkup(text: string) {
    return { __html: text };
  }  
  const cookies=await getData(params.lang);
  return (
    <div className="main-additional-pages">
      <div dangerouslySetInnerHTML={createMarkup(cookies)} className="text" />
    </div>
  );
};

export default Cookies;
