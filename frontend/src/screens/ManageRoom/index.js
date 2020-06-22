import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { useDispatch } from 'react-redux';
import { callSagaRequest, callSagaRequestWithErrorHandler } from '../../utils/RequestHandler';
import { login } from '../../store/actions/auth';
import { API_URL } from '../../config';

const ManageRoom = (props) => {
    const [rooms, setRooms] = useState();
    const dispatch = useDispatch();
    const roomString = JSON.stringify(rooms);

    useEffect(() => {
        fetch(`${API_URL}/rooms`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                if (response.status == 200) {
                    const responseJson = await response.json();
                    console.log(responseJson);
                    setRooms(responseJson);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                Alert.alert(
                    'Thất bại',
                    `Lấy thông tin phòng không thành công`,
                    [
                        {
                            text: 'OK',
                        },
                    ],
                    { cancelable: false }
                );
            })
    }, []);
    return (
        <>
            <Text style={styles.header}>Quản lý phòng</Text>
            <View style={styles.container}>
                {/* {
                    rooms != undefined
                    ? rooms.map((room, index) => (
                        <Text key={index}>{room.id}</Text>
                    ))
                    : <Text style={styles.label}>Chưa có dữ liệu của phòng</Text>               
                } */}
                <Text style={styles.label}>{roomString}</Text>
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