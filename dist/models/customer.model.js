"use strict";
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
exports.updateById = exports.removeById = exports.findById = exports.pagination = exports.create = void 0;
const db_1 = require("../database/db");
const create = (newCustomer) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db_1.db.query('INSERT INTO customers SET ?', newCustomer, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(Object.assign({ id: result.insertId }, newCustomer));
        });
    });
});
exports.create = create;
const pagination = (offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db_1.db.query(`SELECT * FROM customers LIMIT ${offset} , ${limit}`, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(result);
        });
    });
});
exports.pagination = pagination;
const findById = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db_1.db.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (!result.length) {
                resolve({ kind: 'not_found' });
            }
            else {
                resolve(result[0]);
            }
        });
    });
});
exports.findById = findById;
const removeById = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db_1.db.query(`DELETE FROM customers WHERE id = ${customerId}`, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (result.affectedRows == 0) {
                resolve({ kind: 'not_found' });
            }
            else {
                resolve(result);
            }
        });
    });
});
exports.removeById = removeById;
const updateById = (customerId, newCustomer) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db_1.db.query(`UPDATE customers SET email = '${newCustomer.email}', name = '${newCustomer.name}', active = ${newCustomer.active} WHERE id = ${customerId}`, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (result.affectedRows == 0) {
                resolve({ kind: 'not_found' });
            }
            else {
                resolve(Object.assign({ id: customerId }, newCustomer));
            }
        });
    });
});
exports.updateById = updateById;
