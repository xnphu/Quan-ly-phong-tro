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
                            .then(async (response) => {
                                if (response.status == 200) {
                                    const responseJson = await response.json();
                                    console.log(responseJson);
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
                                } else {
                                    throw new Error();
                                }
                            })                           
                            .catch(err => {
                                Alert.alert(
                                    'Thất bại',
                                    `Tài khoản hoặc mật khẩu không đúng`,
                                    [
                                        {
                                            text: 'OK',
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            })
                    }}
                >
                    <Text style={{ ...styles.buttonContent }}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;