import * as usersService from '../services/usersService.js';

export async function getUsers(req, res, next) {
    try {
        const users = await usersService.getAllUsers();
        res.json({
            success: true,
            data: users,
        });
    } catch (error) {
        next(error);
    }
}

export async function registerUser (req, res, next) {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required',
            });
        }
        const newUser = await usersService.createUser(name);
        if (newUser.success) {
            res.status(201).json({
                        success: true,
                        message: 'User created',
                        data: newUser.user.id,
                    });
        } else {
            res.status(201).json({
                        success: false,
                        message: 'User not created',
                        data: null,
                    });
        }

    } catch (error) {
        next(error);
    }
}

export async function loginUser(req, res, next) {
     try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: 'Name is required',
                });
            }
            const result = await usersService.loginUser(name);
            if (result.success) {
                res.status(201).json({
                            success: true,
                            message: 'User logged in',
                            data: result.user.id,
                        });
            } else {
                res.status(201).json({
                            success: false,
                            message: 'User not logged in',
                            data: null,
                        });
            }

        } catch (error) {
            next(error);
        }
}