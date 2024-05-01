// App.js
import React from 'react';
import {useTranslation} from 'react-i18next';
import './App.css';
import localization from './utils/localization';
import ScrollProgressBar from 'react-scroll-progress-bar';
import Languages from "./components/Languages";
import Photos from "./components/Photos";


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
            {/*<MouseGlow/>*/}
        </header>

        <main>
            <Languages/>
            <Photos/>
        </main>

    </div>);
}

export default App;
