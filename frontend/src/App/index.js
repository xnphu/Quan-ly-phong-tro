/**
 * @flow
 */
import { UIManager, AppState, Platform, Linking } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import registerNavigationComponents from '../screens';
import configStore from '../store/index';
import Bootstrap from './Bootstrap';

console.disableYellowBox = true;

let isFirstTime: boolean = true;
let store = null;

let currentAppState = AppState.currentState;

Navigation.events().registerAppLaunchedListener(async () => {
  if (isFirstTime) {
    isFirstTime = false;
    await init();
  }
  await Bootstrap.startApp();
});

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

function handleSubscribe() { }

async function init() {
  store = await configStore();

  store.subscribe(handleSubscribe);
  registerNavigationComponents(store, Provider);
}

export { store };
