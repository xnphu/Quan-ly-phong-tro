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

const ManageService = (props) => {
    const [services, setServices] = useState([]);
    const dispatch = useDispatch();
    const serviceString = JSON.stringify(services);

    useEffect(() => {
        fetch(`${API_URL}/services`, {
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
                    setServices(responseJson);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <View style={{ ...styles.container, justifyContent: 'flex-start' }}>
            <ScrollView style={{ padding: 10 }}>
                <Text>Thông tin các dịch vụ</Text>
                {
                    services.length > 0
                        ? services.map((service, index) => (
                            <>
                                <Text key={index}>{service.id}. {service.name}</Text>
                                <Text>{'    '}Giá tiền mỗi đơn vị sử dụng: {service.pricePerUnit} VNĐ</Text>
                            </>
                        ))
                        : <Text style={styles.label}>Chưa có dữ liệu của dịch vụ</Text>
                }
            </ScrollView>
        </View>
    );
}

ManageService.options = () => ({
    topBar: {
        title: {
            text: 'Quản lý dịch vụ',
            alignment: 'center'
        }
    },
});

export default ManageService;