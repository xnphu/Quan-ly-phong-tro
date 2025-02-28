import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

const translationGetters = {
    vi: () => require('../../assets/translations/vi.json')
    // en: () => require('../../assets/translations/en.json')
};

const t = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
    const fallback = {
        languageTag: 'vi',
        isRTL: false
    };

    const { languageTag, isRTL } =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
        fallback;

    t.cache.clear();

    I18nManager.forceRTL(isRTL);
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;

    require('moment/locale/vi');
};

export { t, setI18nConfig, RNLocalize };
