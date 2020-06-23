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

const ManageBill = (props) => {
    const [bills, setBills] = useState();
    const dispatch = useDispatch();
    const billString = JSON.stringify(bills);

    useEffect(() => {
        fetch(`${API_URL}/bills`, {
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
                    setBills(responseJson);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <View style={styles.container}>
            {/* {
                    bills != undefined
                    ? bills.map((bill, index) => (
                        <Text key={index}>{bill.id}</Text>
                    ))
                    : <Text style={styles.label}>Chưa có dữ liệu của hóa đơn</Text>               
                } */}
            <Text style={styles.label}>{billString}</Text>
        </View>
    );
}

ManageBill.options = () => ({
    topBar: {
        title: {
            text: 'Quản lý hóa đơn',
            alignment: 'center'
        }
    },
});

export default ManageBill;