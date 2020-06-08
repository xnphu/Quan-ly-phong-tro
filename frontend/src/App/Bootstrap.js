import { Navigation, Layout } from 'react-native-navigation';

import images from '../../assets/images';
import colors from '../themes/colors';
//import light from '../themes/modes/light';

import { store } from './index';
//import { sleep } from '../utils/trivia';

const ROOT_STACK_ID = 'root_stack';

function startAppWithHomeScreen () {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
      backgroundColor: 'white',
    },
    statusBar: {
      visible: true,
      style: 'dark',
      backgroundColor: colors.white,
    },
    bottomTab: {
      textColor: '#737373',
      fontFamily: 'SFProText',
      selectedTextColor: colors.blue4,
      fontSize: 11,
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
      preferLargeIcons: false,
    }
  });

  Navigation.setRoot({
    root: {
      stack: {
        id: ROOT_STACK_ID,
        children: [
          {
            bottomTabs: {
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'Welcome',
                          options: {
                            topBar: {
                              visible: false,
                              height: 0
                            },
                            bottomTab: {
                              text: 'Xu hướng',
                              icon: images.home,
                              selectedIcon: images.homeSelected,
                            },
                            // statusBar: {
                            //   visible: true,
                            //   style: 'light',
                            //   backgroundColor: colors.blue4,
                            // },
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
                            topBar: {
                              visible: false,
                              height: 0
                            },
                            bottomTab: {
                              text: 'Cảnh báo',
                              icon: images.manageAlert,
                              selectedIcon: images.manageAlertSelected,
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
                            topBar: {
                              visible: false,
                              height: 0
                            },
                            bottomTab: {
                              // text: 'Tạo Alert',
                              icon: images.createAlert,
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
                            topBar: {
                              visible: false,
                              height: 0
                            },
                            bottomTab: {
                              text: 'Lưu trữ',
                              icon: images.manageBookmark,
                              selectedIcon: images.bookmark,
                            },
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'EmptyView',
                          options: {
                            topBar: {
                              visible: false,
                              height: 0
                            },
                            bottomTab: {
                              text: 'Cá nhân',
                              icon: images.personal,
                              selectedIcon: images.personalSelected,
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
}

// function setDefaultHeader (backgroundColor, titleColor) {
//   return Navigation.setDefaultOptions({
//     topBar: {
//       background: {
//         color: backgroundColor,
//       },
//       title: {
//         color: titleColor,
//       },
//     },
//     statusBar: {
//       visible: true,
//       style: 'dark',
//       backgroundColor: 'white',
//     },
//   });
// }

class Bootstrap {
  static isInStartupScreen = false;

  static async startApp () {
    //setDefaultHeader(light.primary, light.secondary);
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
          text,
        },
      },
    });
  }

  static async dismissLoadingOverlay (overlayId) {
    return Navigation.dismissOverlay(overlayId);
  }
}

export default Bootstrap;
