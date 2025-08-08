import express from 'express';
import { db } from '../services/db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        await db.read();

        res.json({
            success: true,
            status: 'ok',
            uptime: process.uptime(),
            timestamp: new Date(),
            dbStatus: db.data ? 'connected' : 'not connected',
            summary: {
                users: db.data?.users?.length || 0
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
