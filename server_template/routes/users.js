import express from 'express';
import { body } from 'express-validator';

import * as usersController from '../controllers/usersController.js';

import { validationErrorHandler } from '../middlewares/errorHandler.js';

const router = express.Router();
const validateCreateUser = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
];

router.get('/', usersController.getUsers);
router.post('/', validateCreateUser, validationErrorHandler, usersController.createUser);

export default router;
