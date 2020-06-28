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

const AddCustomer = (props) => {
    const [customers, setCustomers] = useState([]);
    const [addCustomerVisible, setAddCustomerVisible] = useState(false);
    const [roomID, setRoomID] = useState('');
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDOB] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [job, setJob] = useState('');
    const [address, setAddress] = useState('');
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const customerString = JSON.stringify(customers);

    const convertDOBForApi = async (dob) => {
        if (dob) {
            let dobConverted = moment(dob).format('YYYY-MM-DD');
            await setDOB(dobConverted);
        }
    }

    const handleConfirm = async (time) => {
        setDatePickerVisible(false);
        convertDOBForApi(time); 
    };

    const setData = async (data) => {
        await setRoomID(data.roomID);
        await setCustomers(data.customers);
    }

    useEffect(() => {
        setData(props);
    }, [props]);

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...styles.label, marginTop: 10, }}>Thông tin khách trọ</Text>
                <Text
                    style={{ ...styles.label, marginTop: 10, color: colors.blue4 }}
                    onPress={() => setAddCustomerVisible(true)}
                >
                    Thêm
                </Text>

            </View>
            <Modal
                visible={addCustomerVisible}
                transparent={true}
                onRequestClose={() => setAddCustomerVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(196, 196, 196, 0.5)', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ margin: 10 }}></View>
                    <View style={{ flex: 1, backgroundColor: colors.white, height: WINDOW_HEIGHT / 1.5, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ ...styles.label, fontWeight: 'bold' }}>Thêm khách trọ</Text>
                            <AntDesignIcon style={{ paddingTop: 7 }} name='close' size={20} onPress={() => setAddCustomerVisible(false)} />
                        </View>
                        <ScrollView>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Họ và tên</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập họ và tên'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setFullName(value)}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Ngày tháng sinh</Text>
                            <Text
                                style={styles.textInput}
                                onPress={() => setDatePickerVisible(true)}
                            >{dateOfBirth}</Text>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Số CMND</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập số CMND'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setIdNumber(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Số điện thoại</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập số điện thoại'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setPhone(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Nghề nghiệp</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập nghề nghiệp'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setJob(value)}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Địa chỉ hộ khẩu</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nhập địa chỉ hộ khẩu'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setAddress(value)}
                            ></TextInput>
                            <View style={{ margin: 10 }}></View>
                            <View style={{ height: WINDOW_HEIGHT / 17 }}>
                                <TouchableOpacity
                                    style={{ ...styles.button, backgroundColor: colors.blue4 }}
                                    onPress={() => {
                                        if (fullName != '' && dateOfBirth != '' && idNumber != '' && phone != '' && job != '' && address != '') {
                                            setRoomID(props.roomID);
                                            fetch(`${API_URL}/customers`, {
                                                method: 'POST',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    roomID, fullName, dateOfBirth, idNumber, phone, job, address
                                                })
                                            })
                                                .then(async (response) => {
                                                    if (response) {
                                                        const responseJson = await response.json();
                                                        console.log('bbbbbbbb', responseJson);
                                                        const arr = customers.slice();
                                                        arr.push(responseJson);
                                                        setAddCustomerVisible(false)
                                                        props.getCustomerDatas(arr);                       
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
                isVisible={datePickerVisible}
                mode='date'
                date={new Date()}
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisible(false)}
            />
        </View>
    );
}

export default AddCustomer;