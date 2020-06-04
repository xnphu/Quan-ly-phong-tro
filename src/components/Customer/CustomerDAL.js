import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';

export const getAllCustomer = async () => {
    const sql = 'SELECT id, roomID, fullName, dateOfBirth, idNumber, address, job, phone FROM customers';
    return dbUtil.query(sql, []);
};

export const createCustomer = async ({ id, roomID, fullName, dateOfBirth, idNumber, address, job, phone }) => {
    const check = await checkRoomExist(id);
    if (check) {
        return Promise.reject(ERRORS.ROOM_EXIST);
    }
    const sql = 'INSERT INTO customers(id, roomID, fullName, dateOfBirth, idNumber, address, job, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    await dbUtil.query(sql, [id, roomID, fullName, dateOfBirth, idNumber, address, job, phone]);
};

export const updateCustomer = async ({ id, roomID, fullName, dateOfBirth, idNumber, address, job, phone }) => {
    const check = await checkRoomExist(roomID);
    if (check) {
        const customerData = { roomID, fullName, dateOfBirth, idNumber, address, job, phone };
        const sql = 'UPDATE rooms SET ? WHERE id = ?';
        await dbUtil.query(sql, [customerData, id]);
    } else {
        return Promise.reject(ERRORS.ROOM_NOT_EXIST);
    }
};

export const deleteCustomer = async (id) => {
    const sql = 'DELETE FROM customers WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.CUSTOMER_NOT_EXIST);
    }
};

export const checkRoomExist = async (id) => {
    const sql = 'SELECT * FROM rooms WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const getCustomerByRoomId = async (id) => {
    const sql = 'SELECT id, monthlyRent, status FROM rooms WHERE id = ?';
    const room = await dbUtil.queryOne(sql, [id]);
    return room;
};