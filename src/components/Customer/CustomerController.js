/* eslint-disable no-unused-vars */
import * as dbAccess from './CustomerDAL';
import { v4 as uuidv4 } from 'uuid';

export const getAllCustomer = async (req, res) => {
    const customers = await dbAccess.getAllCustomer();
    res.send(customers);
};

export const getCustomerByRoomId = async (req, res) => {
    const { id } = req.params;
    const customer = await dbAccess.getCustomerByRoomId(id);
    res.send(customer);
};

export const createCustomer = async (req, res) => {
    const id = uuidv4();
    const { roomID, fullName, dateOfBirth, idNumber, address, job, phone } = req.body;
    const customer = await dbAccess.createCustomer({ id, roomID, fullName, dateOfBirth, idNumber, address, job, phone });
    res.send(customer);
};

export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { monthlyRent, status } = req.body;
    const customer = await dbAccess.updateCustomer({ id, monthlyRent, status });
    res.send(customer);
};

export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    const customer = await dbAccess.deleteCustomer(id);
    res.send(customer);
};