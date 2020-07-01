/* eslint-disable no-unused-vars */
import * as dbAccess from './ServiceDAL';
import { v4 as uuidv4 } from 'uuid';

export const getAllUseService = async (req, res) => {
    const services = await dbAccess.getAllUseService();
    res.send(services);
};

export const getUseServiceById = async (req, res) => {
    const { id } = req.params;
    const service = await dbAccess.getUseServiceById(id);
    res.send(service);
};

export const getUseServiceByRoomId = async (req, res) => {
    const { roomID } = req.params;
    const service = await dbAccess.getUseServiceByRoomId(roomID);
    res.send(service);
};

export const createUseService = async (req, res) => {
    const id = uuidv4();
    const { serviceID, roomID, dayUseService, unit } = req.body;
    const service = await dbAccess.createUseService({ id, serviceID, roomID, dayUseService, unit });
    res.status(201).json(service);
};

export const updateUseService = async (req, res) => {
    const { id } = req.params;
    const { serviceID, roomID, dayUseService, unit } = req.body;
    const service = await dbAccess.updateUseService({ id, serviceID, roomID, dayUseService, unit });
    res.status(200).json(service);
};

export const deleteUseService = async (req, res) => {
    const { id } = req.params;
    const service = await dbAccess.deleteUseService(id);
    res.status(202).json({ success: 1 });
};