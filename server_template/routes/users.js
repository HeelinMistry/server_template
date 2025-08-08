const express = require('express');
const router = express.Router();

// Example: GET /api/users
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
        ]
    });
});

// Example: POST /api/users
router.post('/', (req, res) => {
    const { name } = req.body;
    res.status(201).json({
        success: true,
        message: 'User created',
        data: { id: Date.now(), name }
    });
});

module.exports = router;
