/**
 * @flow
 */

import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Home from './Home';
import EmptyView from './EmptyView';
import NavigationContext from '../components/common/NavigationContext';
import Welcome from './Welcome';
import Login from './Login';
import ManageRoom from './ManageRoom/index';
import ManageBill from './ManageBill/index';
import ManageContract from './ManageContract/index';
import ManageCustomer from './ManageCustomer/index';
import ManageService from './ManageService/index';
import UserProfile from './UserProfile';
import DetailRoom from './ManageRoom/DetailRoom';
import DetailCustomer from './ManageCustomer/DetailCustomer';

type NavigationComponent = {
    name: string,
    component: React.Component | React.PureComponent
};

const registerNavigationComponents = (store, provider) => {
    withStatusBarScreens.forEach((screen: NavigationComponent) => {
        registerScreenWithStatusBar(screen, store, provider);
    });
    withoutStatusBarScreens.forEach((screen: NavigationComponent) => {
        registerScreenWithoutStatusBar(screen, store, provider);
    });
    standaloneComponents.forEach((component: NavigationComponent) => {
        registerStandaloneComponent(component);
    });
};

/**
 * Note that Navigation.registerComponentWithRedux is deprecated
 */

const registerScreenWithStatusBar = (
    { name, component }: NavigationComponent,
    store,
    provider
) => {
    Navigation.registerComponent(
        name,
        () => withComponentId(withStatusBar(component, store, provider)),
        () => component
    );
};

const registerScreenWithoutStatusBar = (
    { name, component }: NavigationComponent,
    store,
    provider
) => {
    Navigation.registerComponent(
        name,
        () => withComponentId(withoutStatusBar(component, store, provider)),
        () => component
    );
};

const registerStandaloneComponent = ({
    name,
    component
}: NavigationComponent) => {
    Navigation.registerComponent(name, () => component);
};

function withStatusBar (
    Component: React.Component | React.PureComponent,
    store,
    Provider
) {
    class WrappedScreen extends React.Component {
        render () {
            return (
                <Provider store={store}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Component {...this.props} />
                    </SafeAreaView>
                </Provider>
            );
        }
    }
    WrappedScreen.options = Component.options;
    return WrappedScreen;
}

function withoutStatusBar (
    Component: React.Component | React.PureComponent,
    store,
    Provider
) {
    class WrappedScreen extends React.Component {
        render () {
            return (
                <Provider store={store}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Component {...this.props} />
                    </SafeAreaView>
                </Provider>
            );
        }
    }
    WrappedScreen.options = Component.options;
    return WrappedScreen;
}

function withComponentId (Component: React.Component | React.PureComponent) {
    type Props = {
        componentId: String
    };

    class WrappedScreen extends React.Component<Props> {
        render () {
            const { componentId } = this.props;
            return (
                <NavigationContext.Provider value={{ componentId }}>
                    <Component {...this.props} />
                </NavigationContext.Provider>
            );
        }
    }
    WrappedScreen.options = Component.options;
    return WrappedScreen;
}

const withStatusBarScreens: [NavigationComponent] = [
    {
        name: 'Home',
        component: Home
    },
    {
        name: 'Welcome',
        component: Welcome
    },
    {
        name: 'Login',
        component: Login
    },
    {
        name: 'ManageRoom',
        component: ManageRoom
    },
    {
        name: 'DetailRoom',
        component: DetailRoom
    },
    {
        name: 'ManageBill',
        component: ManageBill
    },
    {
        name: 'ManageContract',
        component: ManageContract
    },
    {
        name: 'ManageCustomer',
        component: ManageCustomer
    },
    {
        name: 'DetailCustomer',
        component: DetailCustomer
    },
    {
        name: 'ManageService',
        component: ManageService
    },
    {
        name: 'UserProfile',
        component: UserProfile
    },
];

const withoutStatusBarScreens: [NavigationComponent] = [
    {
        name: 'EmptyView',
        component: EmptyView
    },
];

const standaloneComponents: [NavigationComponent] = [];

export default registerNavigationComponents;
