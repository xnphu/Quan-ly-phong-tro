import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { API_URL } from '../../config';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const DetailCustomer = (props) => {
    const [customer, setCustomer] = useState({});
    const [customerId, setCustomerId] = useState('');
    const [roomID, setRoomID] = useState('');
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDOB] = useState('');
    const [dateOfBirthAPI, setDOB_API] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [job, setJob] = useState('');
    const [address, setAddress] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMenuVisible, setModalMenuVisible] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const roomtring = JSON.stringify(customer);
    // console.log('props', customer)

    const convertDOB = async (dob) => {
        if (dob) {
            let dobConverted = moment(dob).format('DD/MM/YYYY');
            await setDOB(dobConverted);
        }
    }

    const convertDOBForApi = async (dob) => {
        if (dob) {
            let dobConverted = moment(dob).format('YYYY-MM-DD');
            await setDOB_API(dobConverted);
        }
    }

    const setData = async (data) => {
        await setCustomerId(data.id);
        await setRoomID(data.roomID);
        await setFullName(data.fullName);
        convertDOB(data.dateOfBirth);
        convertDOBForApi(data.dateOfBirth);
        await setIdNumber(data.idNumber);
        await setPhone(data.phone);
        await setJob(data.job);
        await setAddress(data.address);
    }

    const getCustomerFromAPI = () => {
        fetch(`${API_URL}/customers/${props.id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                if (response) {
                    const responseJson = await response.json();
                    setCustomer(responseJson);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getCustomerFromAPI();
    }, []);

    useEffect(() => {
        setData(customer);
    }, [customer]);

    const handleConfirm = async (time) => {
        setDatePickerVisible(false);
        convertDOB(time);
        convertDOBForApi(time); 
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Thông tin chi tiết khách trọ</Text>
                    <AntDesignIcon name='ellipsis1' size={20} onPress={() => setModalMenuVisible(true)} />
                </View>
                <Text>Họ và tên: {fullName}</Text>
                <Text>Ngày tháng sinh: {dateOfBirth}</Text>
                <Text>Số CMND: {idNumber}</Text>
                <Text>Số điện thoại: {phone}</Text>
                <Text>Nghề nghiệp: {job}</Text>
                <Text>Địa chỉ hộ khẩu: {address}</Text>
            </ScrollView>
            <Modal
                visible={modalMenuVisible}
                transparent={true}
                onRequestClose={() => setModalMenuVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(196, 196, 196, 0.5)', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: colors.white, height: WINDOW_HEIGHT / 3, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ ...styles.label, fontWeight: 'bold' }}>{`Khách hàng ${fullName}`}</Text>
                            <AntDesignIcon style={{ paddingTop: 7 }} name='close' size={20} onPress={() => setModalMenuVisible(false)} />
                        </View>
                        <Text
                            style={{ ...styles.label, color: colors.grey2, paddingBottom: 5, borderBottomWidth: 1, borderColor: colors.grey2 }}
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >Chỉnh sửa thông tin</Text>
                        <Text
                            style={{ ...styles.label, color: colors.red, }}
                            onPress={() => {
                                fetch(`${API_URL}/customers/${customerId}`, {
                                    method: 'DELETE', headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
                                })
                                    .then(async (response) => {
                                        if (response) {
                                            const responseJson = await response.json();
                                            if (responseJson.success == 1) setModalMenuVisible(false);
                                            fetch(`${API_URL}/customers`, {
                                                method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
                                            })
                                                .then(async (response) => {
                                                    if (response) {
                                                        const responseJson = await response.json();
                                                        props.getCustomerDatas(responseJson);
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
                        >Xóa thông tin</Text>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(196, 196, 196, 0.5)', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ margin: 10 }}></View>
                    <View style={{ flex: 1, backgroundColor: colors.white, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ ...styles.label, fontWeight: 'bold' }}>Chỉnh sửa thông tin</Text>
                            <AntDesignIcon style={{ paddingTop: 7 }} name='close' size={20}
                                onPress={() => {
                                    getCustomerFromAPI();
                                    setModalVisible(false);
                                }} />
                        </View>
                        <ScrollView>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Họ và tên</Text>
                            <TextInput
                                style={styles.textInput}
                                defaultValue={`${fullName}`}
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
                                defaultValue={`${idNumber}`}
                                placeholder={'Nhập số CMND'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setIdNumber(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Số điện thoại</Text>
                            <TextInput
                                style={styles.textInput}
                                defaultValue={`${phone}`}
                                placeholder={'Nhập số điện thoại'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setPhone(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Nghề nghiệp</Text>
                            <TextInput
                                style={styles.textInput}
                                defaultValue={`${job}`}
                                placeholder={'Nhập nghề nghiệp'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setJob(value)}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Địa chỉ hộ khẩu</Text>
                            <TextInput
                                style={styles.textInput}
                                defaultValue={`${address}`}
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
                                            fetch(`${API_URL}/customers/${customerId}`, {
                                                method: 'PUT',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    roomID, fullName, dateOfBirth: dateOfBirthAPI, idNumber, phone, job, address
                                                })
                                            })
                                                .then(async (response) => {
                                                    if (response) {
                                                        const responseJson = await response.json();
                                                        console.log('bbbbrrrr', responseJson);
                                                        setModalVisible(false);
                                                        setModalMenuVisible(false);
                                                        fetch(`${API_URL}/customers`, {
                                                            method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
                                                        })
                                                            .then(async (response) => {
                                                                if (response) {
                                                                    const responseJson = await response.json();
                                                                    props.getCustomerDatas(responseJson);
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
                                                        `Chỉnh sửa thông tin không thành công`,
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

DetailCustomer.options = (props) => ({
    topBar: {
        title: {
            text: `Chi tiết`,
            alignment: 'center'
        }
    },
});

export default DetailCustomer;