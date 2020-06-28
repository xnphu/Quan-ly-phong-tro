import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground, Modal } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { API_URL } from '../../config';
import images from '../../../assets/images';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

const ManageRoom = (props) => {
    const [rooms, setRooms] = useState([]);
    const [addRoomVisible, setAddRoomVisible] = useState(false);
    const [roomId, setRoomId] = useState(101);
    const [monthlyRent, setMonthlyRent] = useState(2000000);
    const [status, setStatus] = useState(0);
    const getRoomDatas = (data) => setRooms(data);

    useEffect(() => {
        fetch(`${API_URL}/rooms`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                if (response) {
                    const responseJson = await response.json();
                    setRooms(responseJson);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                Alert.alert(
                    'Thất bại',
                    `Lấy thông tin phòng không thành công`,
                    [
                        {
                            text: 'OK',
                        },
                    ],
                    { cancelable: false }
                );
            })
    }, []);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...styles.label, paddingHorizontal: 10, marginTop: 10, }}>Danh sách các phòng</Text>
                <Text
                    style={{ ...styles.label, paddingHorizontal: 10, marginTop: 10, color: colors.blue4 }}
                    onPress={() => setAddRoomVisible(true)}
                >
                    Tạo
                </Text>
            </View>
            <View style={{ borderWidth: 1, borderColor: colors.grey4, marginHorizontal: 10, marginBottom: 10, }}></View>
            <ScrollView style={{ paddingHorizontal: 10, }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {
                        rooms.length > 0
                            ? rooms.map((room, index) => (
                                <TouchableOpacity
                                    style={{ backgroundColor: colors.white, height: 200, width: WINDOW_WIDTH / 2.2, marginTop: 10, }}
                                    onPress={() => {
                                        Bootstrap.push(props.componentId, {
                                            component: {
                                                name: 'DetailRoom',
                                                passProps: {
                                                    id: room.id,
                                                    getRoomDatas: (data) => getRoomDatas(data),
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
                                    <ImageBackground source={images.empty} style={{ flex: 1, resizeMode: 'contain', justifyContent: 'center', height: 100, }}></ImageBackground>
                                    <Text style={{ ...styles.label, textAlign: 'center' }}>P.{room.id}</Text>
                                    <Text style={{ borderWidth: 1, borderColor: colors.grey5, paddingHorizontal: 5 }}><FontAwesomeIcon style={{ paddingTop: 7 }} name='dollar' size={15}/> {room.monthlyRent} VND</Text>
                                    {
                                        room.status == 0
                                            ? <Text style={{ borderWidth: 1, borderColor: colors.grey5, paddingHorizontal: 5, color: colors.green, }}>Còn trống</Text>
                                            : <Text style={{ borderWidth: 1, borderColor: colors.grey5, paddingHorizontal: 5, color: colors.red, }}>Đã thuê</Text>
                                    }
                                    <Text></Text>
                                </TouchableOpacity>
                            ))
                            : <Text style={{ ...styles.label, flex: 1, color: colors.red, textAlign: 'center' }}>Chưa có dữ liệu của các phòng</Text>
                    }
                </View>
                <View style={{ margin: 10 }}></View>
            </ScrollView>
            <Modal
                visible={addRoomVisible}
                transparent={true}
                onRequestClose={() => setAddRoomVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(196, 196, 196, 0.5)', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ margin: 10 }}></View>
                    <View style={{ flex: 1, backgroundColor: colors.white, height: WINDOW_HEIGHT / 1.5, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ ...styles.label, fontWeight: 'bold' }}>Tạo phòng</Text>
                            <AntDesignIcon style={{ paddingTop: 7 }} name='close' size={20} onPress={() => setAddRoomVisible(false)} />
                        </View>
                        <ScrollView>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Số phòng</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập số phòng'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={id => setRoomId(id)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Tiền thuê</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập số tiền thuê'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setMonthlyRent(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Trạng thái</Text>
                            <RNPickerSelect
                                style={{ ...pickerSelectStyles }}
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
                                        if (roomId != '' && monthlyRent != '' && status != null) {
                                            fetch(`${API_URL}/rooms`, {
                                                method: 'POST',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    id: roomId, monthlyRent, status
                                                })
                                            })
                                                .then(async (response) => {
                                                    if (response.status == 201) {
                                                        const responseJson = await response.json();
                                                        const arr = rooms.slice();
                                                        arr.push(responseJson);
                                                        setRooms(arr);
                                                        setAddRoomVisible(false)
                                                    } else {
                                                        throw new Error();
                                                    }
                                                })
                                                .catch(err => {
                                                    Alert.alert(
                                                        'Thất bại',
                                                        `Tạo phòng không thành công`,
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
                                    <Text style={{ ...styles.buttonContent }}>Tạo</Text>
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

ManageRoom.options = () => ({
    topBar: {
        title: {
            text: 'Quản lý phòng',
            alignment: 'center'
        }
    },
});

export default ManageRoom;