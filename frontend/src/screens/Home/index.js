import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import Bootstrap from '../../App/Bootstrap';
import { Navigation } from 'react-native-navigation';

const Home = (props) => {
    const [items, setItems] = useState([
        { name: 'Quản lý phòng', code: '#ff94e0', componentId: 'ManageRoom' },
        // { name: 'Quản lý khách hàng', code: '#2ecc71', componentId: 'ManageCustomer' },
        // { name: 'Quản lý hợp đồng', code: '#3498db', componentId: 'ManageContract' },
        { name: 'Quản lý hóa đơn', code: '#2ecc71', componentId: 'ManageBill' },
        { name: 'Quản lý dịch vụ', code: '#3498db', componentId: 'ManageService' },
    ]);

    return (
        <>
            <FlatGrid
                itemDimension={130}
                data={items}
                style={styles.gridView}
                spacing={10}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                        <TouchableOpacity
                            onPress={() => {
                                Navigation.push(props.componentId, {
                                    component: {
                                        name: item.componentId,
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
                            }}>
                            <Text style={styles.itemName}>{item.name}</Text>
                        </TouchableOpacity>
                        <Text style={styles.itemCode}></Text>
                    </View>
                )}
            />
        </>
    );
}

Home.options = () => ({
    topBar: {
        title: {
            text: 'Trang chủ',
            alignment: 'center'
        }
    },
});

export default Home;