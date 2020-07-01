import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { API_URL } from '../../config';
import moment from 'moment';
import AddBill from './AddBill';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const ManageBill = (props) => {
    const [bills, setBills] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomID, setRoomID] = useState('');
    const [numberOfMonth, setNumberOfMonth] = useState('');
    const [sumOfMoney, setSumOfMoney] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const getBillDatas = (data) => setBills(data);
    const billString = JSON.stringify(bills);
    const roomString = JSON.stringify(rooms);

    const convertDate = (date) => {
        if (date) {
            let dateConverted = moment(date).format('YYYY-MM-DD');
            return dateConverted;
        }
    }

    const handleDeleteBill = (id) => {
        Alert.alert(
            'Xác nhận xóa hóa đơn',
            'Mọi dữ liệu sẽ bị mất',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Xóa',
                    onPress: () => {
                        try {
                            fetch(`${API_URL}/bills/${id}`, {
                                method: 'DELETE', headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
                            })
                                .then(async (response) => {
                                    if (response) {
                                        const responseJson = await response.json();
                                        if (responseJson.success == 1) getBillFromAPI();
                                    } else {
                                        throw new Error();
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
            ],
            { cancelable: false }
        );
    }

    // const setData = async (data) => {
    //     await setCreatedAt(convertDate(data.createdAt));
    //     await setRoomID(data.roomID);
    //     await setNumberOfMonth(data.numberOfMonth);
    //     await setSumOfMoney(data.sumOfMoney);
    // }

    const getBillFromAPI = () => {
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
                    setBills(responseJson);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

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
                    setBills(responseJson);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                console.log(err);
            })

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
                    setRooms(responseJson);
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
            <View style={{ paddingHorizontal: 10 }}>
                <AddBill
                    rooms={rooms}
                    bills={bills}
                    getBillDatas={(data) => getBillDatas(data)}
                />
            </View>
            <ScrollView style={{ padding: 10 }}>
                {
                    bills.length > 0
                        ? bills.map((bill, index) => (
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text key={index}>{index + 1}. P.{bill.roomID}</Text>
                                    <AntDesignIcon name='delete' color={colors.red} size={15} onPress={() => handleDeleteBill(bill.id)} />
                                </View>
                                <Text>Số tháng thanh toán: {bill.numberOfMonth}</Text>
                                <Text>Tổng số tiền: {bill.sumOfMoney} VNĐ</Text>
                                <Text>Ngày thanh toán: {convertDate(bill.createdAt)}</Text>
                                <View style={{ borderBottomWidth: 1, borderColor: colors.grey4, marginVertical: 5 }}></View>
                            </>
                        ))
                        : <Text style={styles.label}>Chưa có dữ liệu của hóa đơn</Text>
                }
                <View style={{ margin: 20 }}></View>
            </ScrollView>
        </View >
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