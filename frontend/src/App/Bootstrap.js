import { Navigation, Layout } from 'react-native-navigation';

import images from '../../assets/images';
import colors from '../themes/colors';
import light from '../themes/modes/light';

import { store } from './index';
import { sleep } from '../utils/trivia';

const ROOT_STACK_ID = 'root_stack';


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
                    name: 'EmptyView',
                    options: {
                      bottomTab: {
                        text: 'Tab 2',
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
                    name: 'Welcome',
                    options: {
                      bottomTab: {
                        text: 'Tab 4',
                        icon: images.home,
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
    setDefaultHeader(light.primary, light.secondary);
    return startAppWithHomeScreen();
  }

  static async push (layout: Layout) {
    return Navigation.push(ROOT_STACK_ID, layout);
  }

  static async pop () {
    return Navigation.pop(ROOT_STACK_ID);
  }

  static async popTo (componentId: String) {
    return Navigation.popTo(componentId);
  }

  static async popToRoot () {
    return Navigation.popToRoot(ROOT_STACK_ID);
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
