const db = require('../config/db.config');

const User = {
    getAll: async()=>{
        const [rows] = await db.query('SELECT * FROM USERS');
        return rows;
    },
    getById: async(id)=>{
        const [rows] = await db.query('SELECT * FROM USERS WHERE ID_ACCOUNT = ? ',id)
        return rows[0];
    },
    create: async (newUser)=>{
        const [result] = await db.query('INSERT INTO USERS SET ?', [newUser]);
        return result.insertId;
    },
    update: async(id,updateUser)=>{
        const [result] = await db.query('UPDATE USERS SET ? WHERE ID_ACCOUNT = ?',[updateUser,id]);
        return result.affectedRows > 0;
    },
    delete: async(id)=>{
        const [result] = await db.query('DELETE FROM USERS WHERE ID_ACCOUNT = ?',id);
        return result.affectedRows > 0;
    }
}

module.exports = User;


