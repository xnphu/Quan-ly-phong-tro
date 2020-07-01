import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { API_URL } from '../../config';
import AddCustomer from './AddCustomer';

const ManageCustomer = (props) => {
    const [customers, setCustomers] = useState();
    const customerString = JSON.stringify(customers);

    useEffect(() => {
        fetch(`${API_URL}/customers`, {
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
                    setCustomers(responseJson);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <View style={{...styles.container, justifyContent: 'flex-start'}}>
            <AddCustomer />
            {/* {
                    customers != undefined
                    ? customers.map((customer, index) => (
                        <Text key={index}>{customer.id}</Text>
                    ))
                    : <Text style={styles.label}>Chưa có dữ liệu của khách hàng</Text>               
                } */}
            <Text style={styles.label}>{customerString}</Text>
        </View>
    );
}

ManageCustomer.options = () => ({
    topBar: {
        title: {
            text: 'Quản lý khách hàng',
            alignment: 'center'
        }
    },
});

export default ManageCustomer;