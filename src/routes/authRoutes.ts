// src/routes/authRoutes.ts

import { Router } from 'express';
import { register, login, refreshAccessToken } from '../controllers/authController';
import { authenticateToken, authenticateRefreshToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', authenticateRefreshToken, refreshAccessToken);
router.get('/profile', authenticateToken, (req, res) => {
  res.json(req.body.user);
});

export default router;
