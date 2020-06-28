import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';

export const getAllRoom = async () => {
  const sql = 'SELECT id,monthlyRent,status FROM rooms';
  return dbUtil.query(sql, []);
};

export const createRoom = async ({ id, monthlyRent, status }) => {
  const check = await checkRoomExist(id);
  if (check) {
    return Promise.reject(ERRORS.ROOM_EXIST);
  }
  const sql = 'INSERT INTO rooms(id, monthlyRent, status) VALUES (?, ?, ?)';
  await dbUtil.query(sql, [id, monthlyRent, status]);
  const room = await getRoomById(id);
  return room;
};

export const updateRoom = async ({ id, monthlyRent, status }) => {
  const check = await checkRoomExist(id);
  if (check) {
    const roomData = { monthlyRent, status }
    const sql = 'UPDATE rooms SET ? WHERE id = ?';
    await dbUtil.query(sql, [roomData, id]);
    const room = await getRoomById(id);
    return room;
  } else {
    return Promise.reject(ERRORS.ROOM_NOT_EXIST);
  }
};

export const deleteRoom = async (id) => {
  const sql = 'DELETE FROM rooms WHERE id = ? LIMIT 1';
  const { affectedRows } = await dbUtil.query(sql, [id]);
  if (affectedRows === 0) {
    return Promise.reject(ERRORS.ROOM_NOT_EXIST);
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

export const getRoomById = async (id) => {
  const sql = 'SELECT id, monthlyRent, status FROM rooms WHERE id = ?';
  const room = await dbUtil.queryOne(sql, [id]);
  return room;
};