import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { API_URL } from '../../config';
import images from '../../../assets/images';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';

const AddBill = (props) => {
    const [contract, setContract] = useState([]);
    const [bill, setBill] = useState([]);
    const [addBillVisible, setAddBillVisible] = useState(false);
    const [roomID, setRoomID] = useState('');
    const [numberOfMonth, setNumberOfMonth] = useState('');
    const [sumOfMoney, setSumOfMoney] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [createdAtPickerVisible, setCreatedAtPickerVisible] = useState(false);
    const [roomPickerItem, setRoomPickerItem] = useState([]);

    const contractString = JSON.stringify(contract);

    const convertDateForApi = async (date) => {
        if (date) {
            let dayConverted = moment(date).format('YYYY-MM-DD');
            await setCreatedAt(dayConverted);
        }
    }

    const handleConfirm = async (time) => {
        setCreatedAtPickerVisible(false);
        convertDateForApi(time);
    };

    const setData = async (data) => {
        let arr = [];
        if (data.rooms) {
            for (let i = 0; i < data.rooms.length; i++) {
                let array = data.rooms[i];
                let item = { label: `P.${array.id}`, value: `${array.id}` };
                arr.push(item);
            }
        }
        await setRoomPickerItem(arr);
    }

    useEffect(() => {
        setData(props);
    }, [props]);

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...styles.label, marginTop: 10, }}>Thông tin hóa đơn</Text>
                <Text
                    style={{ ...styles.label, marginTop: 10, color: colors.blue4, }}
                    onPress={() => setAddBillVisible(true)}
                >
                    Thêm
                </Text>
            </View>
            <Modal
                visible={addBillVisible}
                transparent={true}
                onRequestClose={() => setAddBillVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(196, 196, 196, 0.5)', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ margin: 10 }}></View>
                    <View style={{ flex: 1, backgroundColor: colors.white, height: WINDOW_HEIGHT / 1.5, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ ...styles.label, fontWeight: 'bold' }}>Thêm hóa đơn</Text>
                            <AntDesignIcon style={{ paddingTop: 7 }} name='close' size={20} onPress={() => setAddBillVisible(false)} />
                        </View>
                        <ScrollView>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Phòng</Text>
                            <RNPickerSelect
                                style={{ ...pickerSelectStyles }}
                                onValueChange={(value) => setRoomID(value)}
                                items={roomPickerItem}
                                placeholder={{
                                    label: 'Chọn phòng',
                                    value: null,
                                }}
                                useNativeAndroidPickerStyle={false}
                            />
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Số tháng thanh toán</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập số tháng thanh toán'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setNumberOfMonth(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Tổng số tiền (VNĐ)</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập tổng số tiền'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setSumOfMoney(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Ngày thanh toán</Text>
                            <Text
                                style={styles.textInput}
                                onPress={() => setCreatedAtPickerVisible(true)}
                            >{createdAt}</Text>

                            <View style={{ margin: 10 }}></View>
                            <View style={{ height: WINDOW_HEIGHT / 17 }}>
                                <TouchableOpacity
                                    style={{ ...styles.button, backgroundColor: colors.blue4 }}
                                    onPress={() => {
                                        if (roomID != null && numberOfMonth != '' && sumOfMoney != '' && createdAt != '') {
                                            fetch(`${API_URL}/bills`, {
                                                method: 'POST',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    roomID, numberOfMonth, sumOfMoney, createdAt
                                                })
                                            })
                                                .then(async (response) => {
                                                    if (response) {
                                                        const responseJson = await response.json();
                                                        console.log('bbbbbbbb', responseJson);
                                                        const arr = props.bills.slice();
                                                        arr.push(responseJson);
                                                        setAddBillVisible(false)
                                                        props.getBillDatas(arr);
                                                    } else {
                                                        throw new Error();
                                                    }
                                                })
                                                .catch(err => {
                                                    console.log(err);
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
            <DateTimePickerModal
                isVisible={createdAtPickerVisible}
                mode='date'
                date={new Date()}
                onConfirm={handleConfirm}
                onCancel={() => setCreatedAtPickerVisible(false)}
            />
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


export default AddBill;