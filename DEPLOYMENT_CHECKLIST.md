# ✅ Deployment & Testing Checklist

## Pre-Deployment Verification

### Backend Setup
- [ ] MongoDB is running (local or Atlas)
- [ ] `backend/.env` file is configured
- [ ] All dependencies installed: `npm install`
- [ ] Database seeding script ready
- [ ] No console errors on startup

### Frontend Setup
- [ ] `frontend/.env` file is configured
- [ ] All dependencies installed: `npm install`
- [ ] API endpoints point to correct backend
- [ ] No build errors
- [ ] No console warnings

### Environment Variables

#### Backend `.env`
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/codewars
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

#### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Startup Sequence

### Step 1: Database
```bash
# Verify MongoDB is running
# Windows: net start MongoDB
# macOS/Linux: sudo systemctl start mongod

# Verify connection
mongo
# or
mongosh
```

### Step 2: Seed Questions
```bash
cd backend
node scripts/seedQuestions.js
```

**Expected Output:**
```
Connected to MongoDB
Cleared existing questions
✅ Successfully seeded 6 questions
Database connection closed
```

### Step 3: Start Backend
```bash
cd backend
npm run dev
```

**Expected Output:**
```
╔═══════════════════════════════════════════════════════════╗
║   🚀 CodeHub API Server Running                          ║
║   📡 Port: 5000                                           ║
║   🌍 Environment: development                             ║
╚═══════════════════════════════════════════════════════════╝
```

### Step 4: Start Frontend
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

---

## Functional Testing

### Test 1: Backend Health Check
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-11-03T..."
}
```

- [ ] Status: 200 OK
- [ ] Response contains success flag
- [ ] Timestamp is current

### Test 2: Questions API
```bash
curl http://localhost:5000/api/questions
```

**Expected Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [...]
}
```

- [ ] Status: 200 OK
- [ ] Count is 6
- [ ] Data array is populated
- [ ] Each question has required fields

### Test 3: Topics API
```bash
curl http://localhost:5000/api/questions/topics/all
```

**Expected Response:**
```json
{
  "success": true,
  "data": ["Array", "Hash Table", "String", ...]
}
```

- [ ] Status: 200 OK
- [ ] Data is array of strings
- [ ] Contains expected topics

### Test 4: Get Specific Question
```bash
curl http://localhost:5000/api/questions/{questionId}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Two Sum",
    "description": "...",
    ...
  }
}
```

- [ ] Status: 200 OK
- [ ] Contains all question fields
- [ ] Includes starter code
- [ ] Includes test cases

---

## Frontend Testing

### Test 1: Login Page
- [ ] Navigate to http://localhost:5173
- [ ] Login page displays
- [ ] Google OAuth button visible
- [ ] Email/password fields visible (if implemented)

### Test 2: Dashboard
- [ ] After login, redirected to /dashboard
- [ ] Dashboard loads without errors
- [ ] "Create Room" button visible
- [ ] Difficulty selector visible
- [ ] Hero section displays correctly

### Test 3: Question Selection Modal
- [ ] Click "Create Room" button
- [ ] Modal opens
- [ ] Modal has search input
- [ ] Modal has topic filter
- [ ] Modal has difficulty filter
- [ ] Questions list loads
- [ ] All 6 questions visible
- [ ] Can filter by difficulty
- [ ] Can filter by topic
- [ ] Can search by title
- [ ] Clicking question doesn't cause errors

### Test 4: Coding Platform
- [ ] Click on a question in modal
- [ ] Navigate to /coding/:questionId
- [ ] CodingPlatform loads
- [ ] Question title displays
- [ ] Difficulty badge shows
- [ ] Problem description visible
- [ ] Examples display correctly
- [ ] Code editor loads
- [ ] Starter code populated
- [ ] Can type in editor
- [ ] Run button clickable
- [ ] Submit button clickable
- [ ] Back button works
- [ ] Output console visible

### Test 5: Navigation
- [ ] Can go back from coding platform to dashboard
- [ ] Can select different questions
- [ ] Modal closes after selection
- [ ] No console errors during navigation

---

## Browser Console Testing

### Check for Errors
- [ ] No red errors in console
- [ ] No CORS errors
- [ ] No 404 errors
- [ ] No undefined variable errors
- [ ] No React warnings (optional)

### Network Tab Testing
- [ ] API requests show 200 status
- [ ] Response times are reasonable (<500ms)
- [ ] No failed requests
- [ ] Correct headers in requests
- [ ] CORS headers present in responses

---

## Performance Testing

### Load Time
- [ ] Dashboard loads in <2 seconds
- [ ] Modal opens in <1 second
- [ ] Coding platform loads in <2 seconds
- [ ] Questions list loads in <1 second

### Responsiveness
- [ ] UI responsive on different screen sizes
- [ ] No layout shifts
- [ ] Buttons clickable immediately
- [ ] Smooth transitions

### Memory Usage
- [ ] No memory leaks
- [ ] Smooth scrolling
- [ ] No lag when typing in editor

---

## Edge Case Testing

### Empty States
- [ ] Handle no questions found
- [ ] Handle search with no results
- [ ] Handle network errors gracefully

### Filter Combinations
- [ ] Easy + Array topic
- [ ] Medium + String topic
- [ ] Hard + All topics
- [ ] Search + Difficulty filter
- [ ] Search + Topic filter

### User Actions
- [ ] Rapid clicking on questions
- [ ] Switching between tabs
- [ ] Typing large code blocks
- [ ] Closing and reopening modal

---

## Security Testing

### Authentication
- [ ] Cannot access /dashboard without login
- [ ] Cannot access /coding without login
- [ ] Logout clears session
- [ ] Token stored securely

### API Security
- [ ] Cannot modify questions via API
- [ ] Cannot delete questions via API
- [ ] CORS properly configured
- [ ] No sensitive data in responses

### Input Validation
- [ ] Search input sanitized
- [ ] No XSS vulnerabilities
- [ ] Special characters handled

---

## Database Testing

### Data Integrity
- [ ] All 6 questions in database
- [ ] No duplicate questions
- [ ] All required fields present
- [ ] Data types correct

### Query Performance
- [ ] Questions query completes <100ms
- [ ] Topics query completes <50ms
- [ ] Search query completes <200ms
- [ ] Filters work correctly

---

## Deployment Checklist

### Before Production

#### Backend
- [ ] Set NODE_ENV=production
- [ ] Use strong JWT_SECRET
- [ ] Use strong SESSION_SECRET
- [ ] Enable HTTPS
- [ ] Set secure cookies
- [ ] Configure CORS for production domain
- [ ] Set up error logging
- [ ] Set up monitoring
- [ ] Database backups configured
- [ ] Environment variables secured

#### Frontend
- [ ] Run production build: `npm run build`
- [ ] Test production build locally
- [ ] Update API_BASE_URL for production
- [ ] Remove console.log statements
- [ ] Enable gzip compression
- [ ] Set up CDN
- [ ] Configure caching headers
- [ ] Set up error tracking

#### Database
- [ ] Use MongoDB Atlas (cloud)
- [ ] Enable authentication
- [ ] Set up backups
- [ ] Configure IP whitelist
- [ ] Monitor performance

---

## Post-Deployment Testing

### Smoke Tests
- [ ] Can access application
- [ ] Can login
- [ ] Can view dashboard
- [ ] Can open question modal
- [ ] Can select question
- [ ] Can view coding platform
- [ ] Can run code
- [ ] Can submit code

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Set up performance monitoring
- [ ] Set up uptime monitoring
- [ ] Set up log aggregation

---

## Rollback Plan

If issues occur in production:

1. **Immediate Actions**
   - [ ] Revert to previous version
   - [ ] Check error logs
   - [ ] Notify users if needed
   - [ ] Document issue

2. **Investigation**
   - [ ] Identify root cause
   - [ ] Check recent changes
   - [ ] Review error logs
   - [ ] Check database integrity

3. **Fix and Redeploy**
   - [ ] Fix the issue
   - [ ] Test thoroughly
   - [ ] Deploy to staging first
   - [ ] Monitor closely

---

## Maintenance Checklist

### Weekly
- [ ] Check error logs
- [ ] Monitor performance metrics
- [ ] Verify backups completed
- [ ] Check disk space

### Monthly
- [ ] Update dependencies
- [ ] Review security logs
- [ ] Analyze user feedback
- [ ] Plan improvements

### Quarterly
- [ ] Full security audit
- [ ] Performance optimization
- [ ] Database maintenance
- [ ] Capacity planning

---

## Support & Troubleshooting

### Common Issues

**Issue: "Cannot GET /api/questions"**
- [ ] Backend is running
- [ ] Routes are registered
- [ ] API URL is correct
- [ ] CORS is enabled

**Issue: "MongoDB connection failed"**
- [ ] MongoDB is running
- [ ] Connection string is correct
- [ ] Credentials are correct
- [ ] Network access allowed

**Issue: "Modal won't open"**
- [ ] React is loaded
- [ ] Component is imported
- [ ] State is updating
- [ ] No console errors

**Issue: "Code editor not working"**
- [ ] Component is mounted
- [ ] Textarea is rendering
- [ ] Event handlers attached
- [ ] No JavaScript errors

---

## Sign-Off

- [ ] All tests passed
- [ ] No critical issues
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Documentation complete
- [ ] Ready for deployment

---

**Deployment Ready! 🚀**
