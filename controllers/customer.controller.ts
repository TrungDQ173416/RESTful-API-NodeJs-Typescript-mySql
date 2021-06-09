import {Request, Response} from "express";
import * as customerModel from "../models/customer.model";
import Customer from "../types/customer.type";

export const create = async (req: Request, res: Response) => {
    if(!req.body) {
        res.status(400).json({
            message: 'Content can not be empty!'
        });
    }
  
    const newCustomer: Customer = req.body;

    try {
        const data = await customerModel.create(newCustomer);
        res.json(data);
    } catch(err) {
        res.status(500).json({
            message: err.message 
        });
    }
}

export const findOne = async (req: Request, res: Response) => {
    const customerId: number = Number(req.params.customerId);
    try {
        const data = await customerModel.findById(customerId);
        res.json(data);
    } catch(err) {
        res.status(500).json({
            message: `Error retrieving Customer with id ${req.params.customerId}.`
        });
    }
};

export const pagination =  async (req: Request, res: Response) => {
    const {page, size} = req.query;
    const limit = size ? +size : 10;
    const offset = page ? (+page - 1) * limit : 0;
    try {
        const data = await customerModel.pagination(offset, limit);
        res.json(data);
    } catch(err) {
        res.status(500).json({
            message: err.message
        });
    }
};

export const updateById  =  async (req: Request, res: Response) => {
    if(!req.body) {
        res.status(400).json({
            message: 'Content can not be empty!'
        });
    }

    const newCustomer: Customer = req.body;
    const customerId: number = Number(req.params.customerId);

    try {
        const data = await  customerModel.updateById(customerId, newCustomer);
        res.json(data);
    } catch(err) {
        res.status(500).json({
            message: `Error retrieving Customer with id ${req.params.customerId}.`
        });
    }
};

export const removeById =  async (req: Request, res: Response) => {
    const customerId: number = Number(req.params.customerId);
    try{
        const data = await customerModel.removeById(customerId);
        res.json(data);
    } catch(err) {
        res.status(404).json({
            message: `Not found Customer with id ${req.params.customerId}.`
        });
    }
};