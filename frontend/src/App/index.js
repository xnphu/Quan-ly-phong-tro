/**
 * @flow
 */
import { UIManager, AppState, Platform, Linking } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { extractURLSchemeLink } from '../utils/trivia';
import registerNavigationComponents from '../screens';
import { setI18nConfig, RNLocalize } from '../utils/LocalizationUtils';
import configStore from '../store/index';
import Bootstrap from './Bootstrap';

console.disableYellowBox = true;

let isFirstTime: boolean = true;
let store = null;

let currentAppState = AppState.currentState;

Navigation.events().registerAppLaunchedListener(async () => {
    // if (isFirstTime) {
    //     isFirstTime = false;
        await init();
    // }
    await Bootstrap.startApp();
});

UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true);

function handleSubscribe () {

}

async function handleAppStateChanged (nextAppState) {
    console.log(`handleAppStateChanged ${currentAppState} -> ${nextAppState}`);
    if (
        currentAppState.match(/inactive|background/)
        && nextAppState === 'active'
    ) {
        if (Platform.OS === 'ios') {
            appsFlyer.trackAppLaunch();
        } else {
            const url = await Linking.getInitialURL();
            if (url) {
                appsFlyer.sendDeepLinkData(url);
            }
        }
    }

    currentAppState = nextAppState;
}

async function init () {

    const store = await configStore();
    store.subscribe(handleSubscribe);
    registerNavigationComponents(store, Provider);
    setI18nConfig();
    RNLocalize.addEventListener('change', () => {
        setI18nConfig();
    });
}

export { store };
