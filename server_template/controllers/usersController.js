const usersService = require('../services/usersService');

const getUsers = async (req, res, next) => {
    try {
        const users = await usersService.getAllUsers();
        res.json({
            success: true,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required',
            });
        }
        const newUser = await usersService.createUser(name);
        res.status(201).json({
            success: true,
            message: 'User created',
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    createUser,
};
