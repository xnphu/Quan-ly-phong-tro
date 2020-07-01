/* eslint-disable no-unused-vars */
import * as dbAccess from './ContractDAL';
import { v4 as uuidv4 } from 'uuid';

export const getAllContract = async (req, res) => {
    const contracts = await dbAccess.getAllContract();
    res.send(contracts);
};

export const getContractById = async (req, res) => {
    const { id } = req.params;
    const contract = await dbAccess.getContractById(id);
    res.send(contract);
};

export const getContractByRoomId = async (req, res) => {
    const { id } = req.params;
    const contract = await dbAccess.getContractByRoomId(id);
    res.send(contract);
};

export const createContract = async (req, res) => {
    const id = uuidv4();
    const { customerID, dayStart, dayEnd, roomNumber, deposit, paidMoney, moreInformation } = req.body;
    const contract = await dbAccess.createContract({ id, customerID, dayStart, dayEnd, roomNumber, deposit, paidMoney, moreInformation });
    res.status(201).json(contract);
};

export const updateContract = async (req, res) => {
    const { id } = req.params;
    const { customerID, dayStart, dayEnd, roomNumber, deposit, paidMoney, moreInformation } = req.body;
    const contract = await dbAccess.updateContract({ id, customerID, dayStart, dayEnd, roomNumber, deposit, paidMoney, moreInformation });
    res.status(200).json(contract);
};

export const deleteContract = async (req, res) => {
    const { id } = req.params;
    const contract = await dbAccess.deleteContract(id);
    res.status(202).json({ success: 1 });
};