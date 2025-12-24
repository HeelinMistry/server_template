import express from 'express';
import { body } from 'express-validator';

import * as accountsController from '../controllers/accountsController.js';

import { validationErrorHandler } from '../middlewares/errorHandler.js';

const router = express.Router();

// Get Accounts
router.get('/', accountsController.getAccounts);

// Create Account
const validateCreateAccount = [
    body('ownerId')
        .trim()
        .notEmpty().withMessage('OwnerId is required'),
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 6 }).withMessage('Name must be at least 6 characters'),
];

router.post('/create', validateCreateAccount, validationErrorHandler, accountsController.createAccount);

// Update Account
const validateAccountHistory = [
    body('accountId').notEmpty().withMessage('Account ID is required.'),
        body('monthKey').notEmpty().withMessage('Month key (YYYY-MM) is required.'),
        body('contribution').isNumeric().withMessage('Contribution must be a number.'),
        body('openingBalance').isNumeric().withMessage('OpeningBalance must be a number.'),
        body('closingBalance').isNumeric().withMessage('ClosingBalance must be a number.'),
];

router.put('/history', validateAccountHistory, validationErrorHandler, accountsController.updateMonthlyHistory);

// Delete Account
router.delete('/:accountId', accountsController.deleteAccount)

// List Accounts
const validateListAccounts = [
];

router.get('/:ownerId', validateListAccounts, validationErrorHandler, accountsController.listUserAccounts);

export default router;
