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