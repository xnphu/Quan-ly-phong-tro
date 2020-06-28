import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { API_URL } from '../../config';
import BasicInfo from './BasicInfo';
import AddCustomer from '../ManageCustomer/AddCustomer';

const DetailRoom = (props) => {
    const [room, setRoom] = useState({});
    const [customers, setCustomers] = useState([]);
    const roomtring = JSON.stringify(customers);
    const getCustomerDatas = (data) => setCustomers(data);
    // console.log('props', props)
    useEffect(() => {
        fetch(`${API_URL}/rooms/${props.id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                if (response) {
                    const responseJson = await response.json();
                    setRoom(responseJson);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                console.log(err);
            })

        fetch(`${API_URL}/customers/${props.id}/room`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                if (response) {
                    const responseJson = await response.json();
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
        <View style={styles.container}>
            <ScrollView style={{ padding: 10 }}>
                {
                    room
                        ?
                        <>
                            <BasicInfo
                                room={room}
                                getRoomDatas={(data) => props.getRoomDatas(data)}
                                componentId={props.componentId}
                            />
                        </>
                        : <Text style={styles.label}>Chưa có dữ liệu của phòng</Text>
                }
                <AddCustomer
                    customers={customers}
                    roomID={props.id}
                    getCustomerDatas={(data) => getCustomerDatas(data)}
                />
                {
                    customers.length > 0
                        ? customers.map((customer, index) => (
                            <TouchableOpacity
                                onPress={() => {
                                    Bootstrap.push(props.componentId, {
                                        component: {
                                            name: 'DetailCustomer',
                                            passProps: {
                                                id: customer.id,
                                                getCustomerDatas: (data) => getCustomerDatas(data),
                                            },
                                            options: {
                                                topBar: {
                                                    visible: true,
                                                },
                                                bottomTabs: {
                                                    visible: false,
                                                }
                                            }
                                        }
                                    });
                                }}
                            >
                                <Text>{index + 1}. {customer.fullName}</Text>
                            </TouchableOpacity>
                        ))
                        : <Text style={styles.label}>Chưa có dữ liệu của khách trọ</Text>
                }
                <Text style={styles.label}>{roomtring}</Text>
            </ScrollView>
        </View>
    );
}

DetailRoom.options = (props) => ({
    topBar: {
        title: {
            text: `Chi tiết phòng ${props.id}`,
            alignment: 'center'
        }
    },
});

export default DetailRoom;