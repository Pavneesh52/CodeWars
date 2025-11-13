# 🚀 Quick Start - Problems Integration

## 3-Step Setup

### 1️⃣ Start Backend & Import Problems
```bash
# Terminal 1
cd backend
npm start

# Terminal 2 (after backend starts)
curl -X POST http://localhost:3001/api/problems/import
```

### 2️⃣ Start Frontend
```bash
# Terminal 3
cd frontend
npm run dev
```

### 3️⃣ View Problems
- Open `http://localhost:5173`
- Login with your account
- Click "Problems 📋"
- **Done!** 🎉

## What You Get

✅ All 40 DSA problems displayed
✅ Filter by difficulty (Easy/Medium/Hard)
✅ Filter by topic (Arrays)
✅ Search by title or description
✅ See problem metadata (ID, title, statement, test cases)

## API Endpoints

```
GET  http://localhost:3001/api/problems              # All problems
GET  http://localhost:3001/api/problems/1            # Problem #1
GET  http://localhost:3001/api/problems/difficulty/Easy
GET  http://localhost:3001/api/problems/topic/Arrays
GET  http://localhost:3001/api/problems/stats        # Statistics
POST http://localhost:3001/api/problems/import       # Import from JSON
```

## Test It

```bash
# Get all problems
curl http://localhost:3001/api/problems | jq '.count'

# Get problem #1
curl http://localhost:3001/api/problems/1 | jq '.data.title'

# Get Easy problems
curl http://localhost:3001/api/problems/difficulty/Easy | jq '.count'

# Get statistics
curl http://localhost:3001/api/problems/stats | jq '.data'
```

## Files Changed

- ✅ `backend/models/Problem.js` (NEW)
- ✅ `backend/controllers/problemController.js` (NEW)
- ✅ `backend/routes/problemRoutes.js` (NEW)
- ✅ `backend/server.js` (UPDATED)
- ✅ `frontend/src/components/ProblemsPage.jsx` (UPDATED)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Problems not showing | Run import: `curl -X POST http://localhost:3001/api/problems/import` |
| Backend error | Check MongoDB connection in `.env` |
| Frontend error | Check browser console, verify backend is running |
| Import failed | Verify `problems.json` exists at `/Users/adityasingh/Desktop/DSA-codewars/problems.json` |

## Next Steps

1. Click on a problem to open it
2. Update CodingPlatform to fetch problem details
3. Implement code execution with test cases
4. Track user submissions

---

**That's it! Your problems are now live!** 🎉
