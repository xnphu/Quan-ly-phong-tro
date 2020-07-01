import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';

export const getAllContract = async () => {
    const sql = 'SELECT id, customerID, dayStart, dayEnd, roomNumber, deposit, paidMoney, moreInformation FROM contracts';
    return dbUtil.query(sql, []);
};

export const getContractById = async (id) => {
    const sql = 'SELECT * FROM contracts WHERE id = ?';
    const contract = await dbUtil.queryOne(sql, [id]);
    return contract;
};

export const getContractByRoomId = async (id) => {
    const sql = 'SELECT * FROM contracts WHERE roomNumber = ?';
    const contract = await dbUtil.queryOne(sql, [id]);
    if (contract == undefined) {
        return {};
    }
    else return contract;
};

export const createContract = async ({ id, customerID, dayStart, dayEnd, roomNumber, deposit, paidMoney, moreInformation }) => {
    const check = await checkContractExist(id);
    const checkCustomer = await checkCustomerExist(customerID);
    if (check) {
        return Promise.reject(ERRORS.CONTRACT_EXIST);
    }
    if (checkCustomer) {
        const sql = 'INSERT INTO contracts(id, customerID, dayStart, dayEnd, roomNumber, deposit, paidMoney, moreInformation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await dbUtil.query(sql, [id, customerID, dayStart, dayEnd, roomNumber, deposit, paidMoney, moreInformation]);
        const contract = await getContractById(id);
        return contract;
    } else {
        return Promise.reject(ERRORS.CUSTOMER_NOT_EXIST);
    }
};

export const updateContract = async ({ id, customerID, dayStart, dayEnd, roomNumber, deposit, paidMoney, moreInformation }) => {
    const check = await checkContractExist(id);
    const checkCustomer = await checkCustomerExist(customerID);
    if (check) {
        if (checkCustomer) {
            const contractData = { customerID, dayStart, dayEnd, roomNumber, deposit, paidMoney, moreInformation };
            const sql = 'UPDATE contracts SET ? WHERE id = ?';
            await dbUtil.query(sql, [contractData, id]);
            const contract = await getContractById(id);
            return contract;
        } else {
            return Promise.reject(ERRORS.CUSTOMER_NOT_EXIST);
        }
    } else {
        return Promise.reject(ERRORS.CONTRACT_NOT_EXIST);
    }
};

export const deleteContract = async (id) => {
    const sql = 'DELETE FROM contracts WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.CONTRACT_NOT_EXIST);
    }
};

export const checkContractExist = async (id) => {
    const sql = 'SELECT * FROM contracts WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const checkCustomerExist = async (id) => {
    const sql = 'SELECT * FROM customers WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};