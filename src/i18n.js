import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import en from './locales/en.json';
import ru from './locales/ru.json';
import fa from './locales/fa.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import uk from './locales/uk.json';
import zh from './locales/zh.json';

const resources = {
    en: { translation: en },
    ru: { translation: ru },
    fa: { translation: fa },
    de: { translation: de },
    fr: { translation: fr },
    es: { translation: es },
    pt: { translation: pt },
    uk: { translation: uk },
    zh: { translation: zh }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage', 'cookie']
        }
    });

export default i18n;
