import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { useDispatch } from 'react-redux';
import { callSagaRequest, callSagaRequestWithErrorHandler } from '../../utils/RequestHandler';
import { login } from '../../store/actions/auth';

const ManageRoom = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // fetch()
    }, []);
    return (
        <>
            <Text style={styles.header}>Quản lý phòng</Text>
            <View style={styles.container}>
                <TouchableOpacity
                onPress={() => {
                    callSagaRequest(login, {
                        username: 'admin',
                        password: '123456'
                    })
                }}>
                    <Text>login</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

ManageRoom.options = () => ({
    topBar: {
        visible: false,
        height: 0
    },
});

export default ManageRoom;