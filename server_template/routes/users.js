import express from 'express';
import { body } from 'express-validator';

import * as usersController from '../controllers/usersController.js';

import { validationErrorHandler } from '../middlewares/errorHandler.js';

const router = express.Router();

// Get User
router.get('/', usersController.getUsers);

// Create User
const validateRegisterUser = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 6 }).withMessage('Name must be at least 6 characters'),
];

router.post('/register', validateRegisterUser, validationErrorHandler, usersController.registerUser);

// Login User
const loginValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 6 }).withMessage('Name must be at least 6 characters'),
];

// POST /api/login route definition
router.post('/login', loginValidation, validationErrorHandler, usersController.loginUser);

export default router;
