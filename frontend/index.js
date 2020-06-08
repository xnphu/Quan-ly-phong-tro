/**
 * @format
 */

import App from './App';
import EmptyView from './src/screens/EmptyView';
import Welcome from './src/screens/Welcome';

import { Navigation } from "react-native-navigation";
import images from './assets/images';
import colors from './src/themes/colors';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.registerComponent('EmptyView', () => EmptyView);
Navigation.registerComponent('Welcome', () => Welcome);
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
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
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
                                        name: 'Welcome',
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
                                        name: 'Welcome',
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
    });
});
