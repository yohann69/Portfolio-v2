// localization.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../locales/en.json';
import frTranslation from '../locales/fr.json';

const supportedLanguages = ['en', 'fr'];

const userLanguage = navigator.language.split('-')[0];

const getDefaultLanguage = () => {
    return supportedLanguages.includes(userLanguage) ? userLanguage : 'en';
};

// Configure i18next
i18n.use(initReactI18next).init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: getDefaultLanguage(), // Set default language based on the browser
    resources: {
        en: { translation: enTranslation },
        fr: { translation: frTranslation },
    },
});

export default i18n;
