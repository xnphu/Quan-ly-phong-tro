import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';

const ManageRoom = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Quản lý phòng</Text>
        </View>
    );
}

ManageRoom.options = () => ({
    topBar: {
        visible: false,
        height: 0
    },
});

export default ManageRoom;