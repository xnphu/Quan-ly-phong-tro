import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { callSagaRequest, callSagaRequestWithErrorHandler } from '../../utils/RequestHandler';
import { login } from '../../store/actions/auth';
import { updateToken } from '../../store/actions/token';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../config';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tài khoản:</Text>
            <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={text => setUsername(text)}
            ></TextInput>
            <Text style={styles.label}>Mật khẩu:</Text>
            <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            ></TextInput>
            <View style={{ height: WINDOW_HEIGHT / 15 }}>
                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: colors.blue4 }}
                    onPress={() => {
                        // const token = callSagaRequest(login, {
                        //     username, password
                        // })
                        // if (token) {
                        //     console.log('token', token);
                        //     Alert.alert(
                        //         'Thành công',
                        //         `Đăng nhập thành công`,
                        //         [
                        //             {
                        //                 text: 'OK',
                        //                 onPress: async () => {
                        //                     dispatch(updateToken(''));
                        //                     Bootstrap.startApp();
                        //                 }
                        //             },
                        //         ],
                        //         { cancelable: false }
                        //     );
                        // }
                        fetch(`${API_URL}/auth/login`, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username, password
                            })
                        })
                            .then(response => response.json())
                            .then(responseJson => {
                                if (responseJson) {
                                    Alert.alert(
                                        'Thành công',
                                        `Đăng nhập thành công`,
                                        [
                                            {
                                                text: 'OK',
                                                onPress: async () => {
                                                    dispatch(updateToken(responseJson.token));
                                                    Bootstrap.startApp();
                                                }
                                            },
                                        ],
                                        { cancelable: false }
                                    );
                                }
                            })
                            .catch(err => console.log(err))
                    }}
                >
                    <Text style={{ ...styles.buttonContent }}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;