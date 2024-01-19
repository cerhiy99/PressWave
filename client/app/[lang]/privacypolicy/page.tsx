import "../AdditionalPages.scss";
import { getPrivacyPolicy } from "../../functions/additional";
import { Locale } from "@/i18n.config";

async function getData(lang:Locale) {
  let res = (await fetch(`http://localhost:4444/api/additionalPages/getPrivacyPolicy?language=`+lang, { next: { revalidate: 3600*24 }}));
  if(!res.ok)console.log('Не вдалося отримати дані2');
  const data=await res.json();
  return data.res;
}
const PrivacyPolicy = async({params}: {params: { lang: Locale }}) => {
  function createMarkup(text: string) {
    return { __html: text };
  }
  const privacyPolicy=await getData(params.lang);

  return (
    <div className="main-additional-pages">
      <div dangerouslySetInnerHTML={createMarkup(privacyPolicy)} className="text" />
    </div>
  );
};

export default PrivacyPolicy;
