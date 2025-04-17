const UserModel = require('../models/user.model');

const userController = {
    getAll: async (req, res) => {
        try {
            const users = await UserModel.getAll();
            res.json(users);
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ message: 'error' });
        }
    },
    getById: async (req, res) => {
        const users = await UserModel.gteById(req.params.id);
        try {
            if (users) {
                res.json(users);
            } else {
                res.status(404).json({ message: 'Role error' });
            }
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ message: 'error' });
        }
    },
    createUser: async (req, res) => {
        try {
            const newUsereId = await UserModel.create(req.body);
            const newUser = await UserModel.getById(newUsereId);
            res.status(201).json(newUser);
        } catch (error) {
            console.log('error: ', error);
            res.status(500).json({ messgae: 'error', error });
        }
    },
    updateUser: async (req, res) => {
        // console.log("value:" ,req.params.id," VL: ",req.body);
        try {
            const update = await UserModel.update(req.params.id, req.body);

            if (update) {
                const updateUser = await UserModel.update(req.params.id, req.body);
                res.json(updateUser);
            } else {
                res.status(404).json({ message: 'Not found role!' });
            }
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ message: 'Error', error });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const deleteuser = await UserModel.delete(req.params.id);
            res.json(deleteuser);
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ message: 'Error', error });
        }
    },
};

module.exports = userController;
