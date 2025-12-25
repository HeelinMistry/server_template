import * as usersService from '../services/usersService.js';

/**
 * Handles the GET /api/users request.
 * Returns a list of all the users in the database.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Response} 201 Created on success.
 */
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

/**
 * Handles the POST /api/users/registerUser request.
 * Validates the request body and calls the user service to create a new user.
 * @param {object} req - The Express request object, expecting 'name', 'username', and 'secret' in the body.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Response} 201 Created on success, with a success, message and data.
 */
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

/**
 * Handles the DELETE /api/users/:ownerId request.
 * @param {object} req - The Express request object, expecting 'name' in the body.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Response} 201 Created on success, with a success, message and data.
 */
export async function deleteUser(req, res, next) {
    try {
        const ownerId = req.params.ownerId;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required',
            });
        }
        if (!ownerId) {
            return res.status(401).json({ success: false, message: 'Owner verification ID is required.' });
        }
        const result = await usersService.deleteUser(Number(ownerId), name);

        if (result.success) {
            // 204 No Content: Standard response for a successful deletion
            res.status(204).end();
        } else {
            // 404 Not Found if the account was missing, or 403 Forbidden for auth failure
            const statusCode = result.message.includes("Authorization failed") ? 403 : 404;
            res.status(statusCode).json({
                success: false,
                message: result.message,
            });
        }
    } catch (error) {
        next(error);
    }
}

/**
 * Handles the POST /api/users/LoginUser request.
 * Validates the request body and calls the user service to create a new user.
 * @param {object} req - The Express request object, expecting 'name' in the body.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Response} 201 Created on success, with a success, message and data.
 */
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
                            data: {
                                token: result.token,
                            }
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