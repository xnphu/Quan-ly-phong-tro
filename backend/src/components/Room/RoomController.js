/* eslint-disable no-unused-vars */
import * as dbAccess from './RoomDAL';

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
  res.status(201).json(room);
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { monthlyRent, status } = req.body;
  const room = await dbAccess.updateRoom({ id, monthlyRent, status });
  res.status(200).json(room);
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  const room = await dbAccess.deleteRoom(id);
  res.status(202).json({ success: 1 });
};