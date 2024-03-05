// App.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css'; // Import your global styles
import localization from './utils/localization';
import MouseGlow from "./components/MouseGlow";
import Cards from "./pages/Cards";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('fr')}>Français</button>

          <h1>{t('home')}</h1>
          <p>{t('about')}</p>
          <p>{t('contact')}</p>
            {/* Add more components and translations as needed */}
            {/*<MouseGlow />*/}
        </header>
        <Cards />

      </div>
  );
}

export default App;
