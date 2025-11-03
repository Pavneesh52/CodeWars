# 🚀 Quick Start - DSA Question Platform

## ⚡ 5-Minute Setup

### Step 1: Seed Database with Questions
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

### Step 2: Start Backend Server
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

### Step 3: Start Frontend Server (in new terminal)
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Step 4: Test the Feature
1. Open http://localhost:5173 in browser
2. Login to your account
3. Click **"Create Room"** button
4. Select a DSA question from the modal
5. Start coding! 🎉

---

## 📋 What's New

### Dashboard Changes
- **Create Room Button** now opens a question selection modal
- Browse 6 sample DSA problems
- Filter by difficulty and topic

### New Pages
- **Question Selection Modal** - Browse and filter questions
- **Coding Platform** - Full LeetCode-like coding environment

### Sample Questions Included
1. Two Sum (Easy)
2. Reverse String (Easy)
3. Palindrome Number (Easy)
4. Longest Substring Without Repeating Characters (Medium)
5. Binary Tree Level Order Traversal (Medium)
6. Merge K Sorted Lists (Hard)

---

## 🔍 Verify Everything Works

### Check Backend
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Check Questions API
```bash
curl http://localhost:5000/api/questions
```

Should return list of questions

### Check Topics
```bash
curl http://localhost:5000/api/questions/topics/all
```

Should return array of topics

---

## 🎨 UI Features

### Question Selection Modal
- ✅ Search by title/description
- ✅ Filter by difficulty (Easy/Medium/Hard)
- ✅ Filter by topic (Array, String, Tree, etc.)
- ✅ View submission stats
- ✅ Click to select

### Coding Platform
- ✅ Problem description with examples
- ✅ Code editor with starter code
- ✅ Run code button
- ✅ Submit button
- ✅ Output console
- ✅ Back to dashboard button

---

## 🛠️ Troubleshooting

### "Questions not loading"
- ✅ Verify backend is running on port 5000
- ✅ Check MongoDB is connected
- ✅ Run seeding script again

### "Modal won't open"
- ✅ Check browser console for errors
- ✅ Verify React is loaded
- ✅ Check network tab for API calls

### "Can't connect to backend"
- ✅ Verify backend is running
- ✅ Check VITE_API_URL in frontend/.env
- ✅ Verify CORS is enabled

---

## 📚 Documentation

- **Full Setup Guide**: See `SETUP_GUIDE.md`
- **Feature Details**: See `DSA_FEATURE_GUIDE.md`
- **API Documentation**: See `DSA_FEATURE_GUIDE.md` → API Endpoints section

---

## 🎯 Next Steps

After verifying everything works:

1. **Add More Questions**
   - Edit `backend/utils/sampleQuestions.js`
   - Add new question objects
   - Run seeding script again

2. **Implement Real Code Execution**
   - Use Judge0 API or similar service
   - Update `CodingPlatform.jsx` → `executeCode()` function

3. **Add User Submissions**
   - Create Submission model
   - Track user solutions
   - Show submission history

4. **Enhance UI**
   - Add syntax highlighting
   - Add code formatting
   - Add language selection

---

## ✅ Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Questions seeded in database
- [ ] Can open question selection modal
- [ ] Can select a question
- [ ] Coding platform loads correctly
- [ ] Code editor is functional
- [ ] Run button works
- [ ] Can navigate back to dashboard

---

**You're all set! Happy coding! 🚀**
