import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import colors from '../../themes/colors';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';

const Home = (props) => {
    const [items, setItems] = useState([
        { name: 'Quản lý phòng', code: '#ff94e0' },
        { name: 'Quản lý khách hàng', code: '#2ecc71' },
        { name: 'Quản lý hợp đồng', code: '#3498db' },
        { name: 'Quản lý hóa đơn', code: '#9b59b6' },
        { name: 'Quản lý dịch vụ', code: '#34495e' },
    ]);

    return (
        <>
            <Text style={styles.header}>Trang chủ</Text>
            <FlatGrid
                itemDimension={130}
                data={items}
                style={styles.gridView}
                spacing={10}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemCode}></Text>
                    </View>
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 25,
        backgroundColor: colors.grey5,
    },
    header: {
        textAlign: 'center',
        backgroundColor: colors.white,
        fontFamily: 'SF Pro Text',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 40,
        color: colors.black2,
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});

export default Home;