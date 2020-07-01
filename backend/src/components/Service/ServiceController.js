/* eslint-disable no-unused-vars */
import * as dbAccess from './ServiceDAL';
import { v4 as uuidv4 } from 'uuid';

export const getAllService = async (req, res) => {
    const services = await dbAccess.getAllService();
    res.send(services);
};

export const getServiceById = async (req, res) => {
    const { id } = req.params;
    const service = await dbAccess.getServiceById(id);
    res.send(service);
};

export const createService = async (req, res) => {
    const { id, name, pricePerUnit } = req.body;
    const service = await dbAccess.createService({ id, name, pricePerUnit });
    res.status(201).json(service);
};

export const updateService = async (req, res) => {
    const { id } = req.params;
    const { name, pricePerUnit } = req.body;
    const service = await dbAccess.updateService({ id, name, pricePerUnit });
    res.status(200).json(service);
};

export const deleteService = async (req, res) => {
    const { id } = req.params;
    const service = await dbAccess.deleteService(id);
    res.status(202).json({ success: 1 });
};