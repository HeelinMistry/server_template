import express from 'express';
import { body } from 'express-validator';

import * as accountsController from '../controllers/accountsController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validationErrorHandler } from '../middlewares/errorHandler.js';

const router = express.Router();

// Create Account
const validateCreateAccount = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required'),
    body('type')
        .trim()
        .notEmpty().withMessage('Type is required'),
];

router.post('/create', protect, validateCreateAccount, validationErrorHandler, accountsController.createAccount);

// Update Account
const validateAccountHistory = [
    body('accountId').notEmpty().withMessage('Account ID is required.'),
    body('monthKey').notEmpty().withMessage('Month key (YYYY-MM) is required.'),
    body('contribution').isNumeric().withMessage('Contribution must be a number.'),
    body('openingBalance').isNumeric().withMessage('OpeningBalance must be a number.'),
    body('closingBalance').isNumeric().withMessage('ClosingBalance must be a number.'),
];

router.put('/history', protect, validateAccountHistory, validationErrorHandler, accountsController.updateMonthlyHistory);

// Delete Account
router.delete('/:accountId', protect, accountsController.deleteAccount)

// List Accounts
const validateListAccounts = [];

router.get('/', protect, validateListAccounts, validationErrorHandler, accountsController.listUserAccounts);

export default router;
