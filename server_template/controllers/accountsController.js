import * as accountsService from '../services/accountsService.js';

/**
 * Handles the GET /api/accounts request.
 * Returns a list of all the accounts in the database.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Response} 201 Created on success.
 */
export async function getAccounts(req, res, next) {
    try {
        const accounts = await accountsService.getAllAccounts();
        res.json({
            success: true,
            data: accounts,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Handles the POST /api/accounts/createAccount request.
 * Validates the request body and calls the account service to create a new account.
 * @param {object} req - The Express request object, expecting 'name', 'ownerId', and 'type' in the body.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Response} 201 Created on success, with a success, message and data.
 */
export async function createAccount (req, res, next) {
    try {
        const { ownerId, name, type } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required',
            });
        }
        if (!ownerId) {
            return res.status(400).json({
                success: false,
                message: 'ownerId is required',
            });
        }
        if (!type) {
            return res.status(400).json({
                success: false,
                message: 'ownerId is required',
            });
        }
        const newAccount = await accountsService.createAccount(ownerId, name, type);
        if (newAccount.success) {
            res.status(201).json({
                        success: true,
                        message: 'Account created',
                        data: newAccount.account.id,
                    });
        } else {
            res.status(201).json({
                        success: false,
                        message: newAccount.message,
                        data: null,
                    });
        }

    } catch (error) {
        next(error);
    }
}

/**
 * Handles the PUT /api/accounts/history request.
 * Validates the request body and calls the account service to create a new account.
 * @param {object} req - The Express request object, expecting 'accountId', 'monthKey', 'openingBalance', 'contribution', 'interestRate', 'termsLeft', 'closingBalance' and 'exchangeRate' in the body.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {Response} 201 Created on success, with a success, message and data.
 */
export async function updateMonthlyHistory (req, res, next) {
    try {
        const { accountId, monthKey, openingBalance, contribution, interestRate, termsLeft, closingBalance, exchangeRate } = req.body;
        if (!accountId) {
            return res.status(400).json({
                success: false,
                message: 'AccountId is required',
            });
        }
        if (!monthKey) {
            return res.status(400).json({
                success: false,
                message: 'MonthKey is required',
            });
        }
        const updatedAccount = await accountsService.updateMonthlyHistory(accountId, monthKey, openingBalance, contribution, interestRate, termsLeft, closingBalance, exchangeRate);
        if (updatedAccount.success) {
            res.status(201).json({
                        success: true,
                        message: 'Account history updated',
                        data: updatedAccount.record,
                    });
        } else {
            res.status(201).json({
                        success: false,
                        message: 'Account history not updated',
                        data: null,
                    });
        }

    } catch (error) {
        next(error);
    }
}

/**
 * Handles the GET request to retrieve all accounts for a specific user.
 * @param {object} req - The Express request object. Expects ownerId in req.params.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
export async function listUserAccounts(req, res, next) {
    try {
        // Retrieve ownerId from URL parameters
        // NOTE: If you are using JWTs, you would get this ID from req.user.id
        const ownerId = req.params.ownerId;

        if (!ownerId) {
            return res.status(400).json({ success: false, message: 'Owner ID is required.' });
        }

        // Call the new service function
        const result = await accountsService.getUserAccounts(ownerId);

        if (result.accounts.length > 0) {
            res.status(200).json({
                success: true,
                message: result.message,
                data: result.accounts,
            });
        } else {
            // Success, but empty list
            res.status(200).json({
                success: true,
                message: result.message,
                data: [],
            });
        }

    } catch (error) {
        next(error);
    }
}