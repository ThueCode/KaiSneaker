const db = require('../config/db.config');

const Brand = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM brand');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM BRAND WHERE IDBRAND = ?', [id]);
        return rows[0];
    },
    create: async (newBrand) => {
        const [result] = await db.query('INSERT INTO BRAND(shoes_name, shoes_description, shoes_price,idbrand) SET ?', [newBrand]);
        console.log('SQLLL: ',newBrand);
        
        return result.insertId;
    },
    update: async (id, updateBrand) => {
        const [result] = await db.query('UPDATE BRAND SET ? WHERE IDBRAND ?', [updateBrand], id);
        return result.affectedRows > 0;
    },
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM BRAND WHERE IDBRAND ?');
        return result.affectedRows > 0;
    },
};

module.exports = Brand;
