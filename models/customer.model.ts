import Customer from "../types/customer.type";
import { db } from "../database/db";


export const create = async (newCustomer: Customer) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO customers SET ?', newCustomer, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve({ id: result.insertId, ...newCustomer });
    });
  });
}

export const pagination = async (offset: number, limit: number) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM customers LIMIT ${offset} , ${limit}`, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
}

export const findById = async (customerId: number) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      if (!result.length) {
        resolve({ kind: 'not_found' });
      } else {
        resolve(result[0]);
      }
    });
  });
};

export const removeById = async (customerId: number) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM customers WHERE id = ${customerId}`, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      if (result.affectedRows == 0) {
        resolve({ kind: 'not_found' });
      } else {
        resolve(result);
      }
    });
  });
}

export const updateById = async (customerId: number, newCustomer: Customer) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE customers SET email = '${newCustomer.email}', name = '${newCustomer.name}', active = ${newCustomer.active} WHERE id = ${customerId}`,
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        if (result.affectedRows == 0) {
          resolve({ kind: 'not_found' });
        } else {
          resolve({ id: customerId, ...newCustomer });
        }
      });
  });
}