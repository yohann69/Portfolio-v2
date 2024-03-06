// App.js
import React from 'react';
import {useTranslation} from 'react-i18next';
import './App.css'; // Import your global styles
import localization from './utils/localization';
// import MouseGlow from "./components/MouseGlow";
import Cards from "./pages/Cards";
import ScrollProgressBar from 'react-scroll-progress-bar';
import MouseGlow from "./components/MouseGlow";


function App() {
    const {t, i18n} = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (<div className="App">
            <nav>
                <ScrollProgressBar/>
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('fr')}>Français</button>
            </nav>

            <header className="App-header">
                <MouseGlow/>
            </header>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>

        </div>);
}

export default App;
