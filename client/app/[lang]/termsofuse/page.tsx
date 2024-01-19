import "../AdditionalPages.scss";
import { getTermsOfUse } from "../../functions/additional";
import { Locale } from "@/i18n.config";

async function getData(lang:Locale) {
  let res = (await fetch(`http://localhost:4444/api/additionalPages/getTermsOfUse?language=`+lang, { next: { revalidate: 3600*24 }}));
  if(!res.ok)console.log('Не вдалося отримати дані2');
  const data=await res.json();
  return data.res;
}

const TermsOfUse = async({params}:{params:{lang:Locale}}) => {
  function createMarkup(text: string) {
    return { __html: text };
  }
  let termsOfUse=await getData(params.lang)

  return (
    <div className="main-additional-pages">
      <div dangerouslySetInnerHTML={createMarkup(termsOfUse)} className="text" />
    </div>
  );
};

export default TermsOfUse;