# 🔧 Troubleshooting: "No Questions Found"

## Root Causes & Solutions

### Issue 1: Questions Not Seeded in Database

**Symptoms:**
- Modal opens but shows "No questions found"
- Backend running but no data

**Solution:**

1. **Verify MongoDB is running:**
   ```bash
   # Windows - Check if MongoDB service is running
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

2. **Run the seeding script with verbose output:**
   ```bash
   cd backend
   node scripts/seedQuestions.js
   ```

   **Expected output:**
   ```
   📡 Connecting to MongoDB: mongodb://localhost:27017/codewars
   ✅ Connected to MongoDB
   🗑️  Clearing existing questions...
   ✅ Cleared 0 existing questions
   📝 Inserting 6 sample questions...
   ✅ Successfully seeded 6 questions
   📊 Total questions in database: 6
   ✅ Database connection closed
   
   🎉 Seeding completed successfully!
   ```

3. **If seeding fails:**
   - Check MongoDB connection string in `.env`
   - Verify MongoDB is actually running
   - Check for error messages in console

---

### Issue 2: API Route Not Working

**Symptoms:**
- Browser console shows 404 error
- Network tab shows failed requests

**Solution:**

1. **Verify backend is running:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"success":true,"message":"Server is running"}`

2. **Test the questions endpoint directly:**
   ```bash
   curl http://localhost:5000/api/questions
   ```
   Should return: `{"success":true,"count":6,"data":[...]}`

3. **If getting 404:**
   - Verify routes are registered in `backend/server.js`
   - Check that `questionRoutes` is imported
   - Restart backend server

---

### Issue 3: CORS Error

**Symptoms:**
- Browser console shows CORS error
- Network tab shows blocked request

**Solution:**

1. **Verify CORS is configured in backend:**
   - Check `backend/server.js` has CORS middleware
   - Verify `FRONTEND_URL` in `.env` is correct

2. **Update `.env` if needed:**
   ```env
   FRONTEND_URL=http://localhost:5173
   ```

3. **Restart backend server**

---

### Issue 4: API URL Misconfigured

**Symptoms:**
- Questions load but from wrong endpoint
- Network requests go to wrong URL

**Solution:**

1. **Check frontend API config:**
   ```bash
   cat frontend/src/config/api.js
   ```

2. **Verify it shows:**
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
   ```

3. **Check frontend `.env`:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Restart frontend dev server**

---

### Issue 5: Route Order Problem (FIXED)

**What was wrong:**
- `/topics/all` route was after `/:id` route
- Express was treating "all" as an ID
- Route never matched

**What we fixed:**
- Moved `/topics/all` route BEFORE `/:id` route
- Now Express matches specific routes first

---

## Step-by-Step Debugging

### Step 1: Check Backend Logs
```bash
cd backend
npm run dev
```

Look for:
- ✅ "CodeHub API Server Running"
- ✅ "MongoDB Connected"
- ❌ Any error messages

### Step 2: Check Frontend Console
1. Open http://localhost:5173
2. Press F12 to open DevTools
3. Go to Console tab
4. Look for:
   - ✅ "Fetching from: http://localhost:5000/api/questions"
   - ✅ "Questions response: {success: true, count: 6, ...}"
   - ❌ Any error messages

### Step 3: Check Network Tab
1. Open DevTools → Network tab
2. Click "Create Room" button
3. Look for requests to:
   - `http://localhost:5000/api/questions/topics/all`
   - `http://localhost:5000/api/questions`
4. Check:
   - Status: 200 (not 404 or 500)
   - Response: Contains question data

### Step 4: Test API Directly
```bash
# Test health check
curl http://localhost:5000/api/health

# Test questions endpoint
curl http://localhost:5000/api/questions

# Test topics endpoint
curl http://localhost:5000/api/questions/topics/all

# Test specific question
curl http://localhost:5000/api/questions/{questionId}
```

---

## Complete Reset Procedure

If nothing works, do a complete reset:

### 1. Stop all servers
- Close backend terminal (Ctrl+C)
- Close frontend terminal (Ctrl+C)

### 2. Clear database
```bash
# Connect to MongoDB
mongo
# or
mongosh

# In MongoDB shell
use codewars
db.questions.deleteMany({})
exit
```

### 3. Reseed database
```bash
cd backend
node scripts/seedQuestions.js
```

### 4. Restart backend
```bash
cd backend
npm run dev
```

### 5. Restart frontend
```bash
cd frontend
npm run dev
```

### 6. Test again
- Open http://localhost:5173
- Click "Create Room"
- Should see questions now

---

## Verification Checklist

- [ ] MongoDB is running
- [ ] Backend server is running on port 5000
- [ ] Frontend dev server is running on port 5173
- [ ] Seeding script completed successfully
- [ ] Browser console shows no errors
- [ ] Network requests show 200 status
- [ ] Questions appear in modal
- [ ] Can select a question
- [ ] Coding platform loads

---

## Common Error Messages

### "Cannot GET /api/questions"
- **Cause:** Route not registered
- **Fix:** Restart backend server

### "CORS policy: No 'Access-Control-Allow-Origin' header"
- **Cause:** CORS not configured
- **Fix:** Check FRONTEND_URL in .env

### "MongoDB connection refused"
- **Cause:** MongoDB not running
- **Fix:** Start MongoDB service

### "Cannot find module 'Question'"
- **Cause:** Model import path wrong
- **Fix:** Check file exists at `backend/models/Question.js`

### "Unexpected token < in JSON at position 0"
- **Cause:** Getting HTML instead of JSON (404 page)
- **Fix:** Verify API endpoint is correct

---

## Quick Test Commands

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test questions with pretty print
curl http://localhost:5000/api/questions | jq

# Test with specific filter
curl "http://localhost:5000/api/questions?difficulty=Easy" | jq

# Test topics
curl http://localhost:5000/api/questions/topics/all | jq

# Count questions in database
mongo --eval "db.questions.count()" codewars
```

---

## Still Not Working?

1. **Check all error messages** in both backend and frontend console
2. **Verify MongoDB connection** - is it actually connected?
3. **Verify seeding completed** - did it show "6 questions"?
4. **Check network requests** - are they going to correct URL?
5. **Restart everything** - sometimes this fixes it
6. **Check file permissions** - can Node.js read the files?

---

**Need more help? Check the console output carefully - it usually tells you exactly what's wrong! 🔍**
