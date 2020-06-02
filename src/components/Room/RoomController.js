/* eslint-disable no-unused-vars */
import * as dbAccess from './RoomDAL';
import { ERRORS } from '../../constant';
import { hash } from '../../util/bcryptUtil';

export const getAllRoom = async (req, res) => {
  const rooms = await dbAccess.getAllRoom();
  res.send(rooms);
};

export const getRoomById = async (req, res) => {
  const { id } = req.params;
  const room = await dbAccess.getRoomById(id);
  res.send(room);
};

export const createRoom = async (req, res) => {
  const { id, monthlyRent, status } = req.body;
  const room = await dbAccess.createRoom({ id, monthlyRent, status });
  res.send(room);
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { monthlyRent, status } = req.body;
  const room = await dbAccess.updateRoom({ id, monthlyRent, status });
  res.send(room);
};