import 'react-i18next'; // Ensure we extend the react-i18next module
import { i18n } from 'i18next';

declare module 'react-i18next' {
  interface DefaultNamespace {
    translation: typeof import('./locales/en.json'); // Type the 'translation' key from your JSON files
  }

  // You can optionally specify the type for `i18n` as well
  interface i18n {
    changeLanguage(lang: string): void;
  }
}
