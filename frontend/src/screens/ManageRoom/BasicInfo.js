import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { API_URL } from '../../config';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';

const BasicInfo = (props) => {
    const [roomId, setRoomId] = useState('');
    const [monthlyRent, setMonthlyRent] = useState('');
    const [status, setStatus] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMenuVisible, setModalMenuVisible] = useState(false);

    const setData = async (data) => {
        await setRoomId(data.room.id);
        await setMonthlyRent(data.room.monthlyRent);
        await setStatus(data.room.status);
    }

    useEffect(() => {
        setData(props);
    }, [props]);

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.label}>Thông tin cơ bản</Text>
                <AntDesignIcon style={{ paddingTop: 7 }} name='ellipsis1' size={20} onPress={() => setModalMenuVisible(true)} />
            </View>
            <Text>Phòng: {roomId}</Text>
            <Text>Giá thuê: {monthlyRent} VNĐ</Text>
            <Text>
                Trạng thái:{' '}
                {
                    status == 0
                        ? <Text style={{ color: colors.green, }}>Còn trống</Text>
                        : <Text style={{ color: colors.red, }}>Đã thuê</Text>
                }
            </Text>
            <View style={{ borderBottomWidth: 1, borderColor: colors.grey4, marginVertical: 5 }}></View>
            <Modal
                visible={modalMenuVisible}
                transparent={true}
                onRequestClose={() => setModalMenuVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(196, 196, 196, 0.5)', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: colors.white, height: WINDOW_HEIGHT / 3, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ ...styles.label, fontWeight: 'bold' }}>{`Phòng ${roomId}`}</Text>
                            <AntDesignIcon style={{ paddingTop: 7 }} name='close' size={20} onPress={() => setModalMenuVisible(false)} />
                        </View>
                        <Text
                            style={{ ...styles.label, color: colors.grey2, paddingBottom: 5, borderBottomWidth: 1, borderColor: colors.grey2 }}
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >Chỉnh sửa phòng</Text>
                        <Text
                            style={{ ...styles.label, color: colors.red, }}
                            onPress={() => {
                                fetch(`${API_URL}/rooms/${roomId}`, {
                                    method: 'DELETE', headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
                                })
                                    .then(async (response) => {
                                        if (response) {
                                            const responseJson = await response.json();
                                            if (responseJson.success == 1) setModalMenuVisible(false);
                                            fetch(`${API_URL}/rooms`, {
                                                method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
                                            })
                                                .then(async (response) => {
                                                    if (response) {
                                                        const responseJson = await response.json();
                                                        props.getRoomDatas(responseJson);
                                                        Bootstrap.pop(props.componentId);
                                                    } else {
                                                        throw new Error();
                                                    }
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                })
                                        } else {
                                            throw new Error();
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            }}
                        >Xóa phòng</Text>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(196, 196, 196, 0.5)', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: colors.white, height: WINDOW_HEIGHT / 2, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ ...styles.label, fontWeight: 'bold' }}>Chỉnh sửa phòng</Text>
                            <AntDesignIcon style={{ paddingTop: 7 }} name='close' size={20} onPress={() => setModalVisible(false)} />
                        </View>
                        <ScrollView>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Tiền thuê</Text>
                            <TextInput
                                style={styles.textInput}
                                defaultValue={`${monthlyRent}`}
                                placeholder={'Nhập số tiền thuê'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setMonthlyRent(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Trạng thái</Text>
                            <RNPickerSelect
                                style={{ ...pickerSelectStyles }}
                                value={status}
                                onValueChange={(value) => setStatus(value)}
                                items={[
                                    { label: 'Còn trống', value: 0 },
                                    { label: 'Đã thuê', value: 1 },
                                ]}
                                placeholder={{
                                    label: 'Chọn trạng thái',
                                    value: null,
                                }}
                                useNativeAndroidPickerStyle={false}
                            />
                            <View style={{ margin: 10 }}></View>
                            <View style={{ height: WINDOW_HEIGHT / 17 }}>
                                <TouchableOpacity
                                    style={{ ...styles.button, backgroundColor: colors.blue4 }}
                                    onPress={() => {
                                        if (monthlyRent != '' && status != null) {
                                            fetch(`${API_URL}/rooms/${roomId}`, {
                                                method: 'PUT',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    monthlyRent, status
                                                })
                                            })
                                                .then(async (response) => {
                                                    if (response) {
                                                        const responseJson = await response.json();
                                                        console.log('bbbbrrrr', responseJson);
                                                        setMonthlyRent(responseJson.monthlyRent);
                                                        setStatus(responseJson.status);
                                                        setModalVisible(false);
                                                        fetch(`${API_URL}/rooms`, {
                                                            method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
                                                        })
                                                            .then(async (response) => {
                                                                if (response) {
                                                                    const responseJson = await response.json();
                                                                    props.getRoomDatas(responseJson);
                                                                } else {
                                                                    throw new Error();
                                                                }
                                                            })
                                                            .catch(err => {
                                                                console.log(err);
                                                            })
                                                    } else {
                                                        throw new Error();
                                                    }
                                                })
                                                .catch(err => {
                                                    Alert.alert(
                                                        'Thất bại',
                                                        `Chỉnh sửa phòng không thành công`,
                                                        [
                                                            {
                                                                text: 'OK',
                                                            },
                                                        ],
                                                        { cancelable: false }
                                                    );
                                                })
                                        }
                                    }}
                                >
                                    <Text style={{ ...styles.buttonContent }}>Lưu</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        ...styles.textInput
    },
    inputIOS: {
        ...styles.textInput
    }
});

export default BasicInfo;