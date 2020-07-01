import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import Bootstrap from '../../App/Bootstrap';
import colors from '../../themes/colors';
import styles from '../../themes/styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/trivia';
import { API_URL } from '../../config';
import BasicInfo from './BasicInfo';
import AddCustomer from '../ManageCustomer/AddCustomer';
import AddContract from '../ManageContract/AddContract';
import moment from 'moment';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DetailRoom = (props) => {
    const [room, setRoom] = useState({});
    const [customers, setCustomers] = useState([]);
    const [roomID, setRoomID] = useState('');
    const [customerID, setCustomerId] = useState('');
    const [contract, setContract] = useState({});
    const [useService, setUseService] = useState([]);
    const [dayStart, setDayStart] = useState('');
    const [dayEnd, setDayEnd] = useState('');
    const [deposit, setDeposit] = useState('');
    const [paidMoney, setPaidMoney] = useState('');
    const [moreInformation, setMoreInformation] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMenuVisible, setModalMenuVisible] = useState(false);
    const [dateStartPickerVisible, setDateStartPickerVisible] = useState(false);
    const [dateEndPickerVisible, setDateEndPickerVisible] = useState(false);
    // const roomtring = JSON.stringify(useService);
    const getCustomerDatas = (data) => setCustomers(data);
    const getContractDatas = (data) => setContract(data);
    // console.log('props', props)

    const convertDateContract = async (dayStart, dayEnd) => {
        if (dayStart != '') {
            let dateConverted = moment(dayStart).format('YYYY-MM-DD');
            await setDayStart(dateConverted);
        }
        if (dayEnd != '') {
            let dateConverted = moment(dayEnd).format('YYYY-MM-DD');
            await setDayEnd(dateConverted);
        }
    }

    const convertDate = (date) => {
        if (date) {
            let dateConverted = moment(date).format('YYYY-MM-DD');
            return dateConverted;
        }
    }

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
        convertDateContract(data.dayStart, data.dayEnd);
        await setDeposit(data.deposit);
        await setPaidMoney(data.paidMoney);
        await setMoreInformation(data.moreInformation);
    }

    const getContractFromAPI = () => {
        fetch(`${API_URL}/contracts/${props.id}/room`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                if (response) {
                    const responseJson = await response.json();
                    setContract(responseJson);
                    setCustomerId(responseJson.customerID);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        setRoomID(props.id);
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

        getContractFromAPI();

        fetch(`${API_URL}/use_services/${props.id}/room`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
                if (response) {
                    const responseJson = await response.json();
                    setUseService(responseJson);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        setData(contract);
    }, [contract]);

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
                {/* list khach tro */}
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
                <View style={{ borderBottomWidth: 1, borderColor: colors.grey4, marginVertical: 5 }}></View>
                {/* hop dong thue phong */}
                {
                    // check hop dong co hay ko
                    Object.keys(contract).length === 0 && contract.constructor === Object
                        ?
                        <>
                            <AddContract
                                contract={contract}
                                customers={customers}
                                roomID={props.id}
                                getContractDatas={(data) => getContractDatas(data)}
                            />
                            <Text style={styles.label}>Chưa có dữ liệu của hợp đồng</Text>
                        </>
                        :
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.label, marginTop: 10, }}>Thông tin hợp đồng</Text>
                                <AntDesignIcon style={{ paddingTop: 7 }} name='ellipsis1' size={20} onPress={() => setModalMenuVisible(true)} />
                            </View>
                            <Text>Ngày bắt đầu: {dayStart}</Text>
                            <Text>Ngày kết thúc: {dayEnd}</Text>
                            <Text>Số tiền đặt cọc: {deposit}</Text>
                            <Text>Số tiền đặt cọc thiếu: {paidMoney}</Text>
                            <Text>Thông tin thêm: {moreInformation}</Text>
                        </>
                }
                <View style={{ borderBottomWidth: 1, borderColor: colors.grey4, marginVertical: 5 }}></View>
                {/* dich vu su dung */}
                <Text style={{ ...styles.label, marginTop: 10, }}>Thông tin dịch vụ đã sử dụng</Text>
                {
                    useService.length > 0
                        ? useService.map((usedService, index) => (
                            <>
                                <Text>{index + 1}. Tên dịch vụ: {usedService.serviceName}</Text>
                                <Text>{'    '}Số lượng: {usedService.unit}</Text>
                                <Text>{'    '}Ngày bắt đầu sử dụng: {convertDate(usedService.dayUseService)}</Text>
                            </>
                        ))
                        : <Text style={styles.label}>Chưa có dữ liệu của dịch vụ</Text>
                }
                <View style={{ borderBottomWidth: 1, borderColor: colors.grey4, marginVertical: 5 }}></View>
                <View style={{ margin: 20 }}></View>
            </ScrollView>
            <Modal
                visible={modalMenuVisible}
                transparent={true}
                onRequestClose={() => setModalMenuVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(196, 196, 196, 0.5)', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: colors.white, height: WINDOW_HEIGHT / 3, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ ...styles.label, fontWeight: 'bold' }}>{`Hợp đồng phòng ${props.id}`}</Text>
                            <AntDesignIcon style={{ paddingTop: 7 }} name='close' size={20} onPress={() => setModalMenuVisible(false)} />
                        </View>
                        <Text
                            style={{ ...styles.label, color: colors.grey2, paddingBottom: 5, borderBottomWidth: 1, borderColor: colors.grey2 }}
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >Chỉnh sửa hợp đồng</Text>
                        <Text
                            style={{ ...styles.label, color: colors.red, }}
                            onPress={() => {
                                fetch(`${API_URL}/contracts/${contract.id}`, {
                                    method: 'DELETE', headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
                                })
                                    .then(async (response) => {
                                        if (response) {
                                            const responseJson = await response.json();
                                            if (responseJson.success == 1) setModalMenuVisible(false);
                                            getContractFromAPI();
                                        } else {
                                            throw new Error();
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            }}
                        >Xóa hợp đồng</Text>
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
                    <View style={{ flex: 1, backgroundColor: colors.white, height: WINDOW_HEIGHT / 2, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ ...styles.label, fontWeight: 'bold' }}>Chỉnh sửa phòng</Text>
                            <AntDesignIcon style={{ paddingTop: 7 }} name='close' size={20} onPress={() => setModalVisible(false)} />
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
                            {/* <Text style={{ ...styles.label, color: colors.grey2 }}>Người đứng tên</Text>
                            <RNPickerSelect
                                style={{ ...pickerSelectStyles }}
                                onValueChange={(value) => setCustomerID(value)}
                                items={customerPickerItem}
                                placeholder={{
                                    label: 'Chọn người đứng tên',
                                    value: null,
                                }}
                                useNativeAndroidPickerStyle={false}
                            /> */}
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Số tiền đặt cọc (VNĐ)</Text>
                            <TextInput
                                style={styles.textInput}
                                defaultValue={`${deposit}`}
                                placeholder={'Nhập số tiền đặt cọc'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setDeposit(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Số tiền cọc còn thiếu (VNĐ)</Text>
                            <TextInput
                                style={styles.textInput}
                                defaultValue={`${paidMoney}`}
                                placeholder={'Nhập số tiền cọc còn thiếu'}
                                placeholderTextColor={colors.grey4}
                                onChangeText={value => setPaidMoney(value)}
                                keyboardType={'numeric'}
                            ></TextInput>
                            <Text style={{ ...styles.label, color: colors.grey2 }}>Thông tin thêm</Text>
                            <TextInput
                                style={styles.textInput}
                                defaultValue={`${moreInformation}`}
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
                                            fetch(`${API_URL}/contracts/${contract.id}`, {
                                                method: 'PUT',
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
                                                        getContractFromAPI();
                                                        await setModalVisible(false);
                                                        await setModalMenuVisible(false);                    
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
                                    <Text style={{ ...styles.buttonContent }}>Lưu</Text>
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


DetailRoom.options = (props) => ({
    topBar: {
        title: {
            text: `Chi tiết phòng ${props.id}`,
            alignment: 'center'
        }
    },
});

export default DetailRoom;