const db = require('../config/db.config');

const Role = {
    getAll: async()=>{
        const [rows] = await db.query('SELECT * FROM ROLE');
        return rows;
    },
    getById: async(id)=>{
        const [rows] = await db.query('SELECT * FROM ROLE WHERE ID_ROLE = ?',id);
        return rows[0];
    },
    create: async(newRole)=>{
        const [result] = await db.query('INSERT INTO ROLE SET ?',[newRole]);
        return result.insertId;
    },
    update: async(id,updateRole)=>{
        console.log('EEEEEE: UPDATE ROLE SET ? WHERE ID_ROLE = ?',[updateRole], id);
        
        const [result] = await db.query('UPDATE ROLE SET ? WHERE ID_ROLE = ?', [updateRole, id]);
        
        return result.affectedRows >0;
    },
    delete: async(id) =>{
        const [result] = await db.query('DELETE FROM ROLE WHERE ID_ROLE = ?',id);
        return result.affectedRows > 0;
    }
}


module.exports = Role;