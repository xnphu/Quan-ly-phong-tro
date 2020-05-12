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
};

export const checkRoomExist = async (id) => {
  const sql = 'SELECT * FROM rooms WHERE id = ?';
  const result = await dbUtil.query(sql, [id]);
  if (result.length > 0) {
    return true;
  }
  return false;
};

export const getRoomById = async (roomId) => {
  const sql = 'SELECT id, monthlyRent, status FROM rooms WHERE id = ?';
  const room = await dbUtil.queryOne(sql, [roomId]);
  return room;
};