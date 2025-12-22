// routes/dbViewer.js
import express from 'express';
import { db, init } from '../services/usersDb.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        await init();
        res.json({
            success: true,
            data: db.data
        });
    } catch (err) {
        next(err);
    }
});

export default router;
