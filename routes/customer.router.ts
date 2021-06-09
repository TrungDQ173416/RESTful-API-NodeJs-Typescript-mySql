import express from "express";
import * as customerController from'../controllers/customer.controller';

export const router = express.Router();

router.post('/', customerController.create);
router.get('/', customerController.pagination);
router.get('/:customerId', customerController.findOne);
router.put('/:customerId', customerController.updateById);
router.delete('/:customerId', customerController.removeById);