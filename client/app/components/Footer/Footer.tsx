import React from "react";
import Link from "next/link";
import "./Footer.scss"
import { getDictionary } from "@/lib/dictionary";
import { Locale } from '@/i18n.config'

interface FooterProps {
  categories: any;
  lang:Locale
}


const Footer: React.FC<FooterProps> = async ({categories,lang}) => {
  const { footer,Header } = await getDictionary(lang)
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="pages">
          <div className="logo">
            <img alt="logo" src="/images/Logo.png" />
          </div>
          <div className="title1">
            <div className="line-container">
              <p>{footer.aroundtheWave}</p>
              <div className="line" />
            </div>
          </div>
          <ul className="list-pages">
            <li>
              <Link href={`/${lang}`}>
                {Header.Home}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/article`}>
                {Header.Main}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/tv`}>
                {Header.TV}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/article/all/date/1`}>
                {Header.Articles}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/listen/music`}>
                {Header.Listen}
              </Link>
            </li>
          </ul>
        </div>
        <div className="categories">
          <div className="title1">
            <div className="line-container">
              <p>{footer.categories}</p>
              <div className="line" />
            </div>
            <ul className="list-pages">
              {Array.isArray(categories) && categories.map((x) => (
                <li key={x.id}>
                  <Link href={`/${lang}/article/${x.namePath}/${x.namePath=="most popular"?"views":"date"}/1`}>
                    {x.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rights-reserved">{footer.rightsReserved}</div>
        <div className="additional-pages">
          <p>
            <Link href={`/${lang}/termsofuse`}>
              {footer.termsUse}
            </Link>
          </p>
          <p>
            <Link href={`/${lang}/privacypolicy`}>
              {footer.privacyPolicy}
            </Link>
          </p>
          <p>
            <Link href={`/${lang}/cookies`}>
              {footer.cookies}
            </Link>
          </p>
          <p>
            <Link href={`/${lang}/contactus`}>
              {footer.contactUs}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Footer;
