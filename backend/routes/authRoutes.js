import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  logout,
  getMe,
  googleAuthSuccess
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Local authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL}?error=auth_failed`,
    session: true
  }),
  googleAuthSuccess
);

// Check authentication status
router.get('/status', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      authenticated: true,
      user: req.user.getPublicProfile()
    });
  } else {
    res.json({
      success: true,
      authenticated: false
    });
  }
});

export default router;
