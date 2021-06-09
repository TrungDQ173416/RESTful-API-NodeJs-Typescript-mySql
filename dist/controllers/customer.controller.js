"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeById = exports.updateById = exports.pagination = exports.findOne = exports.create = void 0;
const customerModel = __importStar(require("../models/customer.model"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).json({
            message: 'Content can not be empty!'
        });
    }
    const newCustomer = req.body;
    try {
        const data = yield customerModel.create(newCustomer);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
exports.create = create;
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = Number(req.params.customerId);
    try {
        const data = yield customerModel.findById(customerId);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({
            message: `Error retrieving Customer with id ${req.params.customerId}.`
        });
    }
});
exports.findOne = findOne;
const pagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    const limit = size ? +size : 10;
    const offset = page ? (+page - 1) * limit : 0;
    try {
        const data = yield customerModel.pagination(offset, limit);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
exports.pagination = pagination;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).json({
            message: 'Content can not be empty!'
        });
    }
    const newCustomer = req.body;
    const customerId = Number(req.params.customerId);
    try {
        const data = yield customerModel.updateById(customerId, newCustomer);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({
            message: `Error retrieving Customer with id ${req.params.customerId}.`
        });
    }
});
exports.updateById = updateById;
const removeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = Number(req.params.customerId);
    try {
        const data = yield customerModel.removeById(customerId);
        res.json(data);
    }
    catch (err) {
        res.status(404).json({
            message: `Not found Customer with id ${req.params.customerId}.`
        });
    }
});
exports.removeById = removeById;
