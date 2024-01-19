import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import LocaleSwitcher from './locale-switcher'
import { ImSearch } from "react-icons/im";
import "./Header.scss"
import SetLanguage from './setLanguage/SetLanguage';
import { GiHamburgerMenu } from "react-icons/gi";



export default async function Header({ lang }: { lang: Locale }) {
  const { Header } = await getDictionary(lang)
  return (
    <div className="main">
      <div className="container-with-language">
        <div className="container">
          <div className="logo-and-other">
            <div className="logo">
              <img alt="logo" src="/images/Logo.png" />
            </div>
            <div className="mini-logo">
              <img alt='logo' src="/images/miniLogo.svg"/>
            </div>
            <div className="other">
              <ul className="list-pages">
                <li>
                  <Link href={`/${lang}`} passHref>
                    <div>{Header.Home}</div>
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/article`} passHref>
                    <div>{Header.Main}</div>
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/tv`} passHref>
                    <div>{Header.TV}</div>
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/article/all/date/1`} passHref>
                    <div>{Header.Articles}</div>
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/listen/music`} passHref>
                    <div>{Header.Listen}</div>
                  </Link>
                </li>
              </ul>
              <div className="search">
                <ImSearch size={"25px"} />
              </div>
            </div>
          </div>

        </div>
        <div className="set-language">
          <SetLanguage/>
        </div>

        <div className="burger">
          <GiHamburgerMenu size={20} color="white"/>
        </div>
      </div>
    </div>
  )
}
