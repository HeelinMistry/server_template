const usersService = require('../services/usersService');

const getUsers = (req, res) => {
    const users = usersService.getAllUsers();
    res.json({
        success: true,
        data: users,
    });
};

const createUser = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Name is required',
        });
    }
    const newUser = usersService.createUser(name);
    res.status(201).json({
        success: true,
        message: 'User created',
        data: newUser,
    });
};

module.exports = {
    getUsers,
    createUser,
};
