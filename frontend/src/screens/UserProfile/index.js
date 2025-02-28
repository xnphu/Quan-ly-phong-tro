import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { removeToken } from '../../store/actions/token';
import { useDispatch } from 'react-redux';

const UserProfile = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // fetch()
    }, []);
    return (
        <View style={{...styles.container, padding: 10}}>
            <Text style={styles.label}>Chào, admin</Text>
            <View style={{ marginVertical: 10 }}></View>
            <View style={{ height: WINDOW_HEIGHT / 15 }}>
                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: colors.red }}
                    onPress={() => {
                        dispatch(removeToken())
                        Bootstrap.startApp();
                    }}
                >
                    <Text style={{ ...styles.buttonContent }}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

UserProfile.options = () => ({
    topBar: {
        title: {
            text: 'Tài khoản',
            alignment: 'center'
        }
    },
});

export default UserProfile;