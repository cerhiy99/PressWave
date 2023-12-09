import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      UA: {
        translation:{
          Header:{
            Home:"Головна"
          }
        }
      },
      EN: {
        translation:{
          Header:{
            Home:"Home",
            Main:"Main",
            TV:"TV",
            Articles:"Articles",
            Listen:"Listen"
          },
          page404:{
            title:`Page not found`,
            description:"You can try go ",
            description_a:"backto homepage.", 
          },
          article:{
            neiborArticles:"Similar articles",
            hot:"Hot",
            latest:"Latest",
            mostPopular:"Most popular",
            more:"More",
            sport:"Sport",
            science:"Science",
            sortBy:"Sort by:",
            video:"Video",
          },
          footer:{
            aroundtheWave:"Around the Wave",
            categories:"Categories",
            rightsReserved:"Press Wave - All rights reserved",
            termsUse:"Terms of Use",
            privacyPolicy:"Privacy Policy",
            cookies:"Cookies",
            contactUs:"Contact us"
          },
          home:{
            todayNews:"Today’s news",
            month1:"January",
            month2:"February",
            month3:"March",
            month4:"April",
            month5:"May",
            month6:"June",
            month7:"July",
            month8:"August",
            month9:"September",
            month10:"October",
            month11:"November",
            month12:"December",
            forYou:"For you",
            favoriteCategories:"Favorite categories"
          }
        }
    }
  },
    lng: "EN",
    fallbackLng: "EN",
    interpolation: {
      escapeValue: false
    }
});

export default i18n;