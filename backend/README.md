# CodeHub Backend API

A complete Node.js/Express backend with Google OAuth authentication, JWT tokens, and MongoDB.

## 🚀 Features

- ✅ **Google OAuth 2.0** authentication
- ✅ **Local authentication** (email/password)
- ✅ **JWT token-based** authentication
- ✅ **Passport.js** integration
- ✅ **MongoDB** with Mongoose
- ✅ **Secure password** hashing with bcrypt
- ✅ **Session management**
- ✅ **CORS** enabled
- ✅ **Environment variables** configuration

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── passport.js          # Passport strategies (Google & Local)
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   └── auth.js              # JWT verification middleware
├── models/
│   └── User.js              # User schema
├── routes/
│   └── authRoutes.js        # Authentication routes
├── utils/
│   └── generateToken.js     # JWT token generation
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── server.js                # Main server file
└── README.md
```

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/codehub

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Session Secret (generate a random string)
SESSION_SECRET=your_super_secret_session_key_here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
   - `http://localhost:3000/api/auth/google/callback` (if using different port)
7. Copy **Client ID** and **Client Secret** to your `.env` file

### 4. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 5. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes

#### Register (Local)
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "email": "john@example.com",
    "name": "John Doe",
    "authProvider": "local"
  },
  "token": "jwt_token_here"
}
```

#### Login (Local)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Google OAuth Login
```http
GET /api/auth/google
```
Redirects to Google OAuth consent screen. After successful authentication, redirects to:
```
http://localhost:5173/dashboard?token=jwt_token_here
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout
```http
POST /api/auth/logout
```

#### Check Auth Status
```http
GET /api/auth/status
```

#### Health Check
```http
GET /api/health
```

## 🔐 Authentication Flow

### Google OAuth Flow

1. Frontend redirects to: `http://localhost:5000/api/auth/google`
2. User authenticates with Google
3. Google redirects to callback: `/api/auth/google/callback`
4. Backend creates/updates user in database
5. Backend generates JWT token
6. Backend redirects to frontend: `http://localhost:5173/dashboard?token=<jwt_token>`
7. Frontend stores token and makes authenticated requests

### Local Authentication Flow

1. User submits registration/login form
2. Backend validates credentials
3. Backend generates JWT token
4. Frontend stores token in localStorage/cookies
5. Frontend includes token in subsequent requests

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token generation with expiration
- **HTTP-Only Cookies**: Prevents XSS attacks
- **CORS**: Configured for specific origins
- **Session Security**: Secure session configuration
- **Input Validation**: Email and password validation

## 🧪 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get User (with token):**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

1. Import the API endpoints
2. Set `Content-Type: application/json`
3. For protected routes, add `Authorization: Bearer <token>` header

## 🔧 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/codehub` |
| `JWT_SECRET` | Secret for JWT signing | Random string |
| `SESSION_SECRET` | Secret for session | Random string |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | From Google Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | From Google Console |
| `GOOGLE_CALLBACK_URL` | OAuth callback URL | `http://localhost:5000/api/auth/google/callback` |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:5173` |

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network connectivity

### Google OAuth Error
- Verify Google credentials in `.env`
- Check authorized redirect URIs in Google Console
- Ensure callback URL matches exactly

### CORS Error
- Verify `FRONTEND_URL` in `.env`
- Check CORS configuration in `server.js`

### Token Errors
- Ensure `JWT_SECRET` is set
- Check token expiration
- Verify Authorization header format

## 📝 Notes

- Tokens expire after 30 days by default
- Sessions expire after 24 hours
- Passwords must be at least 6 characters
- Google OAuth automatically verifies email

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use strong secrets for `JWT_SECRET` and `SESSION_SECRET`
3. Use MongoDB Atlas or managed MongoDB service
4. Update `GOOGLE_CALLBACK_URL` to production URL
5. Enable HTTPS
6. Configure proper CORS origins
7. Set up environment variables on hosting platform

## 📚 Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Passport.js** - Authentication middleware
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **Google OAuth 2.0** - Social authentication

## 📄 License

MIT
