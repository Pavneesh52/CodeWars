# CodeHub - Complete Setup Guide

This guide will walk you through setting up the complete CodeHub application with Google OAuth authentication.

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Google Cloud Console** account (for OAuth credentials)
- **Git** (optional)

## 🚀 Quick Start

### Step 1: Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### Step 2: Set Up MongoDB

**Option A: Local MongoDB**
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string

### Step 3: Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     ```
     http://localhost:5000/api/auth/google/callback
     ```
   - Click "Create"
5. Copy the **Client ID** and **Client Secret**

### Step 4: Configure Environment Variables

#### Backend Environment

Create `backend/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/codehub
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codehub

# JWT Secret (generate random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Session Secret (generate random string)
SESSION_SECRET=your_super_secret_session_key_change_this_in_production

# Google OAuth Credentials (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Generate Secure Secrets:**
```bash
# In Node.js console
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Frontend Environment

Create `frontend/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Start the Application

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 CodeHub API Server Running
📡 Port: 5000
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Step 6: Test the Application

1. Open browser: http://localhost:5173
2. Click "Continue with Google"
3. Authenticate with Google
4. You should be redirected to the dashboard

## 🧪 Testing Authentication

### Test Google OAuth
1. Click "Continue with Google" button
2. Select Google account
3. Grant permissions
4. Should redirect to dashboard

### Test Local Authentication (Email/Password)

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 📁 Project Structure

```
CodeWars/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── passport.js          # Passport strategies
│   ├── controllers/
│   │   └── authController.js    # Auth logic
│   ├── middleware/
│   │   └── auth.js              # JWT middleware
│   ├── models/
│   │   └── User.js              # User model
│   ├── routes/
│   │   └── authRoutes.js        # Auth routes
│   ├── utils/
│   │   └── generateToken.js     # JWT utilities
│   ├── .env                     # Environment variables
│   ├── .env.example             # Template
│   ├── package.json
│   ├── server.js                # Main server
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginPage.jsx    # Login component
│   │   │   └── TargetPage.jsx   # Dashboard
│   │   ├── config/
│   │   │   └── api.js           # API endpoints
│   │   ├── App.jsx              # Main app with routes
│   │   └── main.jsx
│   ├── .env                     # Environment variables
│   ├── .env.example             # Template
│   └── package.json
│
└── SETUP_GUIDE.md               # This file
```

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login with email/password | No |
| GET | `/api/auth/google` | Initiate Google OAuth | No |
| GET | `/api/auth/google/callback` | Google OAuth callback | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/logout` | Logout user | No |
| GET | `/api/auth/status` | Check auth status | No |
| GET | `/api/health` | Health check | No |

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### Google OAuth Error: "redirect_uri_mismatch"
**Solution:** 
1. Check `GOOGLE_CALLBACK_URL` in `.env` matches Google Console
2. Ensure redirect URI is added in Google Cloud Console
3. Must be exact match including protocol (http/https)

### CORS Error
```
Access to fetch at 'http://localhost:5000' has been blocked by CORS policy
```
**Solution:**
1. Verify `FRONTEND_URL` in backend `.env`
2. Check CORS configuration in `backend/server.js`

### Token Not Found
**Solution:**
1. Check browser localStorage for `token`
2. Verify token is being set after login
3. Check browser console for errors

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

## 🌐 Environment-Specific Configuration

### Development
- Uses `http://localhost`
- Cookies: `secure: false`
- Detailed error messages

### Production
- Uses `https://yourdomain.com`
- Cookies: `secure: true`
- Generic error messages
- Set `NODE_ENV=production`

## 📦 Additional Features to Implement

- [ ] Email verification
- [ ] Password reset
- [ ] Refresh tokens
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] GitHub OAuth
- [ ] GitLab OAuth
- [ ] User profile management
- [ ] Protected routes on frontend

## 🔒 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use strong secrets** for JWT and sessions
3. **Enable HTTPS** in production
4. **Implement rate limiting** to prevent brute force
5. **Validate all inputs** on backend
6. **Use secure cookies** in production
7. **Regularly update dependencies**

## 📚 Resources

- [Passport.js Documentation](http://www.passportjs.org/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Router](https://reactrouter.com/)

## 🆘 Getting Help

If you encounter issues:
1. Check the troubleshooting section
2. Review backend logs in terminal
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
5. Ensure all services (MongoDB, backend, frontend) are running

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] Backend `.env` file is configured
- [ ] Frontend `.env` file is configured
- [ ] Google OAuth credentials are set up
- [ ] Backend server starts without errors
- [ ] Frontend dev server starts without errors
- [ ] Can access login page at http://localhost:5173
- [ ] Google OAuth button redirects to Google
- [ ] After Google auth, redirects to dashboard
- [ ] Can logout successfully

---

**Happy Coding! 🚀**
