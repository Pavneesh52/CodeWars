import express from 'express';
import { getUserStats, getMyStats, getUserSubmissions, getUserSolvedProblems, getLeaderboard } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/leaderboard', getLeaderboard);
router.get('/:userId/stats', getUserStats);
router.get('/:userId/submissions', getUserSubmissions);
router.get('/:userId/solved', getUserSolvedProblems);

// Protected routes
router.get('/me/stats', protect, getMyStats);

export default router;
