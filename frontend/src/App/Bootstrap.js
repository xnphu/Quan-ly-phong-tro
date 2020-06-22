import { Navigation, Layout } from 'react-native-navigation';

import images from '../../assets/images';
import colors from '../themes/colors';
import light from '../themes/modes/light';

import { store } from './index';
import { sleep } from '../utils/trivia';

function startAppWithLoginScreen() {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
      backgroundColor: 'white'
    },
    statusBar: {
      visible: true,
      style: 'dark',
      backgroundColor: 'white'
    },
    topBar: {
      visible: false,
      height: 0
    }
  });
  Navigation.setRoot({
    root: {
      component: {
        name: 'Login'
      }
    }
  });
}

function startAppWithHomeScreen () {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
      backgroundColor: 'white'
    },
    statusBar: {
      visible: true,
      style: 'dark',
      backgroundColor: 'white'
    },
    bottomTab: {
      fontFamily: 'SFProText-Bold',
      selectedTextColor: colors.purple,
      selectedIconColor: colors.purple,
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
      preferLargeIcons: false,
    }
  });

  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home',
                    options: {
                      topBar: {
                        visible: false,
                        height: 0
                      },
                      bottomTab: {
                        text: 'Tab 1',
                        icon: images.home,
                      }
                    }
                  }
                }
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'ManageRoom',
                    options: {
                      bottomTab: {
                        text: 'Quản lý phòng',
                        icon: images.home,
                      }
                    }
                  }
                }
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'EmptyView',
                    options: {
                      bottomTab: {
                        text: 'Tab 3',
                        icon: images.home,
                      }
                    }
                  }
                }
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'UserProfile',
                    options: {
                      bottomTab: {
                        text: 'Tài khoản',
                        icon: images.personal,
                      }
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });
}

function setDefaultHeader (backgroundColor, titleColor) {
  return Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: backgroundColor
      },
      title: {
        color: titleColor
      }
    },
    statusBar: {
      visible: true,
      style: 'dark',
      backgroundColor: 'white'
    }
  });
}

class Bootstrap {
  static isInStartupScreen = false;

  static async startApp () {
    try {
      setDefaultHeader(light.primary, light.secondary);
      if (store?.getState()?.token?.token?.length > 0) {
        Bootstrap.isInStartupScreen = false;
        return startAppWithHomeScreen();
      }
      Bootstrap.isInStartupScreen = true;
      return startAppWithLoginScreen();
    } catch (error) {
      Bootstrap.isInStartupScreen = true;
      return startAppWithLoginScreen();
    }
  }

  static async push (componentId: String, layout: Layout) {
    return Navigation.push(componentId, layout);
  }

  static async pop (componentId: String) {
    return Navigation.pop(componentId);
  }

  static async popTo (componentId: String) {
    return Navigation.popTo(componentId);
  }

  static async popToRoot (componentId: String) {
    return Navigation.popToRoot(componentId);
  }

  static async showToast (layout: Layout, duration = 500) {
    const componentId = await Navigation.showOverlay(layout);
    await sleep(duration);
    return Navigation.dismissOverlay(componentId);
  }

  static async showLoadingOverlay (text: String) {
    return Navigation.showOverlay({
      component: {
        name: 'Loading',
        passProps: {
          text
        }
      }
    });
  }

  static async dismissLoadingOverlay (overlayId) {
    return Navigation.dismissOverlay(overlayId);
  }
}

export default Bootstrap;
