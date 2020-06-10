import React from 'react';
import { View } from 'react-native';

const EmptyView = () => <View />;

EmptyView.options = () => ({
    topBar: {
        title: {
            text: 'Empty View'
        },
        backButton: {
            title: 'Back',
        }
    }
});

export default EmptyView;