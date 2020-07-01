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

const AddContract = (props) => {
    const [contract, setContract] = useState([]);
    const [addContractVisible, setAddContractVisible] = useState(false);
    const [roomID, setRoomID] = useState('');
    const [customerID, setCustomerID] = useState('');
    const [dayStart, setDayStart] = useState('');
    const [dayEnd, setDayEnd] = useState('');
    const [deposit, setDeposit] = useState('');
    const [paidMoney, setPaidMoney] = useState('');
    const [moreInformation, setMoreInformation] = useState('');
    const [address, setAddress] = useState('');
    const [dateStartPickerVisible, setDateStartPickerVisible] = useState(false);
    const [dateEndPickerVisible, setDateEndPickerVisible] = useState(false);
    const contractString = JSON.stringify(contract);
    const [customerPickerItem, setCustomerPickerItem] = useState([]);

    const convertDateStartForApi = async (dayStart) => {
        if (dayStart) {
            let dayConverted = moment(dayStart).format('YYYY-MM-DD');
            await setDayStart(dayConverted);
        }
    }

    const convertDateEndForApi = async (dayEnd) => {
        if (dayEnd) {
            let dayConverted = moment(dayEnd).format('YYYY-MM-DD');
            await setDayEnd(dayConverted);
        }
    }

    const handleConfirm = async (time) => {
        setDateStartPickerVisible(false);
        convertDateStartForApi(time);
    };

    const handleConfirm2 = async (time) => {
        setDateEndPickerVisible(false);
        convertDateEndForApi(time);
    };

    const setData = async (data) => {
        await setRoomID(data.roomID);
        await setContract(data.contract);
        let arr = [];
        if (data.customers) {
            for (let i = 0; i < data.customers.length; i++) {
                let array = data.customers[i];
                let item = { label: array.fullName, value: `${array.id}` };
                arr.push(item);
            }
        }
        await setCustomerPickerItem(arr);
    }

    useEffect(() => {
        setData(props);
    }, [props]);

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...styles.label, marginTop: 10, }}>Thông tin hợp đồng</Text>
                <Text
                    style={{ ...styles.label, marginTop: 10, color: colors.blue4, }}
                    onPress={() => setAddContractVisible(true)}
                >
                    Thêm
                </Text>
            </View>
            <Modal
                visible={addContractVisible}
                transparent={true}
                onRequestClose={() => setAddContractVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(196, 196, 196, 0.5)', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ margin: 10 }}></View>
                    <View style={{ flex: 1, backgroundColor: colors.white, height: WINDOW_HEIGHT / 1.5, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ ...styles.label, fontWeight: 'bold' }}>Thêm hợp đồng</Text>
                            <AntDesignIcon style={{ paddingTop: 7 }} name='close' size={20} onPress={() => setAddContractVisible(false)} />
                        </View>
                        <ScrollView>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Ngày bắt đầu</Text>
                            <Text
                                style={styles.textInput}
                                onPress={() => setDateStartPickerVisible(true)}
                            >{dayStart}</Text>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Ngày kết thúc</Text>
                            <Text
                                style={styles.textInput}
                                onPress={() => setDateEndPickerVisible(true)}
                            >{dayEnd}</Text>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Người đứng tên</Text>
                            <RNPickerSelect
                                style={{ ...pickerSelectStyles }}
                                onValueChange={(value) => setCustomerID(value)}
                                items={customerPickerItem}
                                placeholder={{
                                    label: 'Chọn người đứng tên',
                                    value: null,
                                }}
                                useNativeAndroidPickerStyle={false}
                            />
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Số tiền đặt cọc (VNĐ)</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập số tiền đặt cọc'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setDeposit(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Số tiền cọc còn thiếu (VNĐ)</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập số tiền cọc còn thiếu'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setPaidMoney(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Thông tin thêm</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập thông tin thêm'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setMoreInformation(value)}
                                multiline={true}
                            ></TextInput>

                            <View style={{ margin: 10 }}></View>
                            <View style={{ height: WINDOW_HEIGHT / 17 }}>
                                <TouchableOpacity
                                    style={{ ...styles.button, backgroundColor: colors.blue4 }}
                                    onPress={() => {
                                        if (dayStart != '' && dayEnd != '' && deposit != '' && paidMoney != '' && customerID != null) {
                                            setRoomID(props.roomID);
                                            fetch(`${API_URL}/contracts`, {
                                                method: 'POST',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    roomNumber: roomID, dayStart, dayEnd, deposit, paidMoney, moreInformation, customerID
                                                })
                                            })
                                                .then(async (response) => {
                                                    if (response) {
                                                        const responseJson = await response.json();
                                                        // console.log('bbbbbbbb', responseJson);
                                                        setAddContractVisible(false)
                                                        props.getContractDatas(responseJson);
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
                isVisible={dateStartPickerVisible}
                mode='date'
                date={new Date()}
                onConfirm={handleConfirm}
                onCancel={() => setDateStartPickerVisible(false)}
            />
            <DateTimePickerModal
                isVisible={dateEndPickerVisible}
                mode='date'
                date={new Date()}
                onConfirm={handleConfirm2}
                onCancel={() => setDateEndPickerVisible(false)}
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


export default AddContract;