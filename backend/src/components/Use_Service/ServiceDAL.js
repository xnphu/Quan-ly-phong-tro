import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';

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
    const sql = `SELECT us.id, us.serviceID, us.roomID, us.dayUseService, us.unit,
    s.name "serviceName", s.pricePerUnit
    FROM use_services us 
    INNER JOIN services s ON us.serviceID = s.id
    WHERE us.roomID = ?
    `;
    const service = await dbUtil.query(sql, [id]);
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
            const service = await getUseServiceById(id);
            return service;
        } else {
            return Promise.reject(ERRORS.ROOM_NOT_EXIST);
        }
    } else {
        return Promise.reject(ERRORS.SERVICE_NOT_EXIST);
    }
};

export const updateUseService = async ({ id, serviceID, roomID, dayUseService, unit }) => {
    const check = await checkUseServiceExist(id);
    const checkService = await checkServiceExist(serviceID);
    const checkRoom = await checkRoomExist(roomID);
    if (check) {
        if (checkService) {
            if (checkRoom) {
                const serviceData = { serviceID, roomID, dayUseService, unit };
                const sql = 'UPDATE use_services SET ? WHERE id = ?';
                await dbUtil.query(sql, [serviceData, id]);
                const service = await getUseServiceById(id);
                return service;
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