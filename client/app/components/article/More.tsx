import { getDictionary } from "@/lib/dictionary";
import "./More.scss";
import { FaAngleRight } from "react-icons/fa6";
import { Locale } from "@/i18n.config";
import Link from "next/link";

type Props = {
  lang: Locale;
  src:string
};

const More = async({ src, lang }: Props) => {
  const { article }=await getDictionary(lang);
  return (
    <Link href={`/${lang}/${src}/date/1`}>
      <div className="more-container">
        <div className="more">{article.more}</div>
        <div className="right">
          <FaAngleRight size={35} />
        </div>
      </div>
    </Link>
  );
};

export default More;
