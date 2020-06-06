/* eslint-disable no-unused-vars */
import * as dbAccess from './BillDAL';
import { v4 as uuidv4 } from 'uuid';

export const getAllBill = async (req, res) => {
    const bills = await dbAccess.getAllBill();
    res.send(bills);
};

export const getBillById = async (req, res) => {
    const { id } = req.params;
    const bill = await dbAccess.getBillById(id);
    res.send(bill);
};

export const createBill = async (req, res) => {
    const id = uuidv4();
    const { roomID, numberOfMonth, sumOfMoney } = req.body;
    const createdAt = new Date();
    const bill = await dbAccess.createBill({ id, roomID, numberOfMonth, sumOfMoney, createdAt });
    res.send(bill);
};

export const updateBill = async (req, res) => {
    const { id } = req.params;
    const { roomID, numberOfMonth, sumOfMoney } = req.body;
    const createdAt = new Date();
    const bill = await dbAccess.updateBill({ id, roomID, numberOfMonth, sumOfMoney, createdAt });
    res.send(bill);
};

export const deleteBill = async (req, res) => {
    const { id } = req.params;
    const bill = await dbAccess.deleteBill(id);
    res.send(bill);
};