const db = require('../config/db.config');

const Product = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM PRODUCT');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM PRODUCT WHERE SHOESID = ?', id);
        return rows[0];
    },
    create: async (newProduct) => {
        const [result] = await db.query('INSERT INTO PRODUCT SET ?', [newProduct]);
        return result.insertId;
    },
    update: async (id, updateProduct) => {
        const [result] = await db.query('UPDATE PRODUCT SET ? WHERE SHOESID = ?', [updateProduct], id);
        return result.affectedRows > 0;
    },
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM PRODUCT WHERE SHOESID = ?', id);
        return result.affectedRows > 0;
    },
};

module.exports = Product;