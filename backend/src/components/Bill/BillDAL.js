import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';

export const getAllBill = async () => {
    const sql = 'SELECT id, roomID, numberOfMonth, sumOfMoney, createdAt FROM bills';
    return dbUtil.query(sql, []);
};

export const getBillById = async (id) => {
    const sql = 'SELECT * FROM bills WHERE id = ?';
    const bill = await dbUtil.queryOne(sql, [id]);
    return bill;
};

export const getBillByRoomId = async (id) => {
    const sql = 'SELECT * FROM bills WHERE roomID = ?';
    const bill = await dbUtil.query(sql, [id]);
    return bill;
};

export const createBill = async ({ id, roomID, numberOfMonth, sumOfMoney, createdAt }) => {
    const check = await checkBillExist(id);
    const checkRoom = await checkRoomExist(roomID);
    if (check) {
        return Promise.reject(ERRORS.BILL_EXIST);
    }
    if (checkRoom) {
        const sql = 'INSERT INTO bills(id, roomID, numberOfMonth, sumOfMoney, createdAt) VALUES (?, ?, ?, ?, ?)';
        await dbUtil.query(sql, [id, roomID, numberOfMonth, sumOfMoney, createdAt]);
        const bill = await getBillById(id);
        return bill;
    } else {
        return Promise.reject(ERRORS.ROOM_NOT_EXIST);
    }
};

export const updateBill = async ({ id, roomID, numberOfMonth, sumOfMoney, createdAt }) => {
    const check = await checkBillExist(id);
    const checkRoom = await checkRoomExist(roomID);
    if (check) {
        if (checkRoom) {
            const billData = { roomID, numberOfMonth, sumOfMoney, createdAt };
            const sql = 'UPDATE bills SET ? WHERE id = ?';
            await dbUtil.query(sql, [billData, id]);
            const bill = await getBillById(id);
            return bill;
        } else {
            return Promise.reject(ERRORS.ROOM_NOT_EXIST);
        }
    } else {
        return Promise.reject(ERRORS.BILL_NOT_EXIST);
    }
};

export const deleteBill = async (id) => {
    const sql = 'DELETE FROM bills WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.BILL_NOT_EXIST);
    }
};

export const checkBillExist = async (id) => {
    const sql = 'SELECT * FROM bills WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const checkRoomExist = async (id) => {
    const sql = 'SELECT * FROM rooms WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};