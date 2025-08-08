const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usersController = require('../controllers/usersController');
const { validationErrorHandler } = require('../middlewares/errorHandler');

const validateCreateUser = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
];

router.get('/', usersController.getUsers);
router.post('/', validateCreateUser, validationErrorHandler, usersController.createUser);

module.exports = router;
