import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

interface LanguageSwitcherProps {
  visible: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ visible }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={`language-switcher ${visible ? 'visible' : ''}`}>
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('fr')}>FR</button>
      <button onClick={() => changeLanguage('el')}>EL</button>
    </div>
  );
};

export default LanguageSwitcher;
