import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';

export const getAllService = async () => {
    const sql = 'SELECT id, name, pricePerUnit FROM services';
    return dbUtil.query(sql, []);
};

export const getServiceById = async (id) => {
    const sql = 'SELECT * FROM services WHERE id = ?';
    const service = await dbUtil.queryOne(sql, [id]);
    return service;
};

export const createService = async ({ id, name, pricePerUnit }) => {
    const check = await checkServiceExist(id);
    if (check) {
        return Promise.reject(ERRORS.SERVICE_EXIST);
    }
    const sql = 'INSERT INTO services(id, name, pricePerUnit) VALUES (?, ?, ?)';
    await dbUtil.query(sql, [id, name, pricePerUnit]);
};

export const updateService = async ({ id, name, pricePerUnit }) => {
    const check = await checkServiceExist(id);
    if (check) {
        const serviceData = { name, pricePerUnit };
        const sql = 'UPDATE services SET ? WHERE id = ?';
        await dbUtil.query(sql, [serviceData, id]);
    } else {
        return Promise.reject(ERRORS.SERVICE_NOT_EXIST);
    }
};

export const deleteService = async (id) => {
    const sql = 'DELETE FROM services WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.SERVICE_NOT_EXIST);
    }
};

//Service Use By Room
export const getAllUseService = async () => {
    const sql = 'SELECT id, serviceID, roomID, dayUseService, unit FROM use_services';
    return dbUtil.query(sql, []);
};

export const getUseServiceById = async (id) => {
    const sql = 'SELECT * FROM use_services WHERE id = ?';
    const service = await dbUtil.queryOne(sql, [id]);
    return service;
};

export const getUseServiceByRoomId = async (id) => {
    const sql = 'SELECT * FROM use_services WHERE roomID = ?';
    const service = await dbUtil.queryOne(sql, [id]);
    return service;
};

export const createUseService = async ({ id, serviceID, roomID, dayUseService, unit }) => {
    const check = await checkUseServiceExist(id);
    const checkService = await checkServiceExist(serviceID);
    const checkRoom = await checkRoomExist(roomID);
    if (check) {
        return Promise.reject(ERRORS.SERVICE_EXIST);
    }
    if (checkService) {
        if (checkRoom) {
            const sql = 'INSERT INTO use_services(id, serviceID, roomID, dayUseService, unit) VALUES (?, ?, ?, ?, ?)';
            await dbUtil.query(sql, [id, serviceID, roomID, dayUseService, unit]);
        } else {
            return Promise.reject(ERRORS.ROOM_NOT_EXIST);
        }
    } else {
        return Promise.reject(ERRORS.SERVICE_NOT_EXIST);
    }
};

export const updateUseService = async ({ id, serviceID, roomID, dayUseService, unit }) => {
    const check = await checkServiceExist(id);
    const checkService = await checkServiceExist(serviceID);
    const checkRoom = await checkRoomExist(roomID);
    if (check) {
        if (checkService) {
            if (checkRoom) {
                const serviceData = { serviceID, roomID, dayUseService, unit };
                const sql = 'UPDATE use_services SET ? WHERE id = ?';
                await dbUtil.query(sql, [serviceData, id]);
            } else {
                return Promise.reject(ERRORS.ROOM_NOT_EXIST);
            }
        } else {
            return Promise.reject(ERRORS.SERVICE_NOT_EXIST);
        }
    } else {
        return Promise.reject(ERRORS.SERVICE_NOT_EXIST);
    }
};

export const deleteUseService = async (id) => {
    const sql = 'DELETE FROM use_services WHERE id = ? LIMIT 1';
    const { affectedRows } = await dbUtil.query(sql, [id]);
    if (affectedRows === 0) {
        return Promise.reject(ERRORS.SERVICE_NOT_EXIST);
    }
};

export const checkServiceExist = async (id) => {
    const sql = 'SELECT * FROM services WHERE id = ?';
    const result = await dbUtil.query(sql, [id]);
    if (result.length > 0) {
        return true;
    }
    return false;
};

export const checkUseServiceExist = async (id) => {
    const sql = 'SELECT * FROM use_services WHERE id = ?';
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