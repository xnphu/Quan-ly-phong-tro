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

const ManageContract = (props) => {
    const [contracts, setContracts] = useState();
    const dispatch = useDispatch();
    const contractString = JSON.stringify(contracts);

    useEffect(() => {
        fetch(`${API_URL}/contracts`, {
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
                    setContracts(responseJson);
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
                    contracts != undefined
                    ? contracts.map((contract, index) => (
                        <Text key={index}>{contract.id}</Text>
                    ))
                    : <Text style={styles.label}>Chưa có dữ liệu của hợp đồng</Text>               
                } */}
            <Text style={styles.label}>{contractString}</Text>
        </View>
    );
}

ManageContract.options = () => ({
    topBar: {
        title: {
            text: 'Quản lý hợp đồng',
            alignment: 'center'
        }
    },
});

export default ManageContract;