import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import elTranslation from './locales/el.json';

i18n
  .use(Backend) // loads translations from your backend or static files
  .use(LanguageDetector) // detects the language
  .use(initReactI18next) // initializes react-i18next
  .init({
    fallbackLng: 'en', // fallback language if the language isn't detected
    debug: true, // Enable logging for development
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    react: {
      useSuspense: false, // Set this to false if you're not using Suspense
    },
    resources: {
      en: {
        translation: enTranslation
      },
      fr: {
        translation: frTranslation
      },
      el: {
        translation: elTranslation
      },
    },
  });

export default i18n;
