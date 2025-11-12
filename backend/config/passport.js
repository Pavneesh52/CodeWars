import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Configure strategies
const configureStrategies = () => {
  // Google OAuth Strategy
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    // Avoid throwing an exception when these env vars are not set (e.g. local dev without Google OAuth)
    // Log a helpful warning so the server can still start.
    // To enable Google OAuth, set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment or .env file.
    // Example .env entries:
    // GOOGLE_CLIENT_ID=your-client-id
    // GOOGLE_CLIENT_SECRET=your-client-secret
    // GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
    console.warn('Warning: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set. Skipping GoogleStrategy configuration. Google OAuth will be disabled.');
  } else {
    console.log('✓ Google OAuth configured with:');
    console.log('  Client ID:', GOOGLE_CLIENT_ID);
    console.log('  Callback URL:', GOOGLE_CALLBACK_URL);
    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: GOOGLE_CALLBACK_URL,
          scope: ['profile', 'email']
        },
      async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // Update last login
          user.lastLogin = Date.now();
          await user.save();
          return done(null, user);
        }

        // Check if user exists with this email (from local auth)
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link Google account to existing user
          user.googleId = profile.id;
          user.authProvider = 'google';
          user.avatar = profile.photos[0]?.value || user.avatar;
          user.isVerified = true;
          user.lastLogin = Date.now();
          await user.save();
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0]?.value,
          authProvider: 'google',
          isVerified: true,
          lastLogin: Date.now()
        });

        done(null, user);
      } catch (error) {
        console.error('Error in Google Strategy:', error);
        done(error, null);
      }
    }
      )
    );
  }

  // Local Strategy for email/password authentication
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          // Find user by email
          const user = await User.findOne({ email }).select('+password');

          if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          // Check if user signed up with Google
          if (user.authProvider === 'google') {
            return done(null, false, { 
              message: 'This account uses Google Sign-In. Please use Google to log in.' 
            });
          }

          // Verify password
          const isMatch = await user.comparePassword(password);

          if (!isMatch) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          // Update last login
          user.lastLogin = Date.now();
          await user.save();

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};

export { configureStrategies };
export default passport;
