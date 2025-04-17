const Role = require('../models/role.model');

const roleController = {
    getAllRole: async(req, res) =>{
        try {
            const roles = await Role.getAll();
            res.json(roles);
        } catch (error) {
            console.error('Error: ',error);
            res.status(500).json({message: 'error'});
        }
    },
    getById: async(req,res) =>{
        try {
            const roles = await Role.getById(req.params.id);
            if(roles){
                res.json(roles);
            }else{
                res.status(404).json({message: 'Role error'});
            }
        } catch (error) {
            console.error('Error: ',error);
            res.status(500).json({message: 'error'});
        }
    },
    createRole: async(req, res)=>{
        try {
            const newRoleId = await Role.create(req.body);
            const newRole = await Role.getById(newRoleId);
            res.status(201).json(newRole);
        } catch (error) {
            console.log('error: ',error);
            res.status(500).json({messgae: 'error',error});
        }
    },
    updateRole: async(req, res)=>{
        console.log("value:" ,req.params.id," VL: ",req.body);
        try {
            const update = await Role.update(req.params.id,req.body);
            
            
            if(update){
                const updateRole = await Role.update(req.params.id,req.body);
                res.json(updateRole);
            }else{
                res.status(404).json({message: 'Not found role!'});
            }
        } catch (error) {
            console.error('Error: ',error);
            res.status(500).json({message: 'Error',error});
        }
    }
}


module.exports = roleController;