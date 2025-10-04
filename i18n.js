import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "Welcome": "Welcome to my app"
    }
  },
  hi: {
    translation: {
      "Welcome": "मेरे ऐप में आपका स्वागत है"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: { escapeValue: false }
  });

export default i18n;
