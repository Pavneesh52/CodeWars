# Problems Integration Setup Guide

## Overview
This guide explains how to integrate all 40 DSA problems from `problems.json` into MongoDB and serve them via API.

## What Was Done

### 1. **Backend Changes**

#### Created Problem Model (`backend/models/Problem.js`)
- Defines MongoDB schema for problems
- Fields: `problemId`, `title`, `difficulty`, `topic`, `statement`, `inputFormat`, `outputFormat`, `constraints`, `examples`, `testCases`

#### Created Problem Controller (`backend/controllers/problemController.js`)
- `getAllProblems()` - Fetch all problems
- `getProblemById(id)` - Fetch single problem
- `getProblemsByDifficulty(difficulty)` - Filter by difficulty
- `getProblemsByTopic(topic)` - Filter by topic
- `importProblemsFromJSON()` - Import from `problems.json`
- `getProblemStats()` - Get statistics

#### Created Problem Routes (`backend/routes/problemRoutes.js`)
- `GET /api/problems` - Get all problems
- `GET /api/problems/stats` - Get statistics
- `GET /api/problems/difficulty/:difficulty` - Filter by difficulty
- `GET /api/problems/topic/:topic` - Filter by topic
- `GET /api/problems/:id` - Get single problem
- `POST /api/problems/import` - Import from JSON

#### Updated Server (`backend/server.js`)
- Added import for `problemRoutes`
- Registered routes at `/api/problems`

### 2. **Frontend Changes**

#### Updated ProblemsPage (`frontend/src/components/ProblemsPage.jsx`)
- Fetches all problems from `http://localhost:3001/api/problems`
- Extracts topics dynamically from problems
- Filters problems client-side by:
  - Topic
  - Difficulty
  - Search term (title or statement)
- Displays problem metadata:
  - Problem ID
  - Title
  - Statement
  - Difficulty
  - Topic
  - Number of test cases

## Setup Instructions

### Step 1: Start Backend Server
```bash
cd backend
npm install  # if not already done
npm start
```

### Step 2: Import Problems into MongoDB
Make a POST request to import problems:

```bash
curl -X POST http://localhost:3001/api/problems/import
```

Or use the browser/Postman:
- URL: `http://localhost:3001/api/problems/import`
- Method: `POST`

**Expected Response:**
```json
{
  "success": true,
  "message": "Successfully imported 40 problems",
  "count": 40
}
```

### Step 3: Verify Import
Check if problems were imported:

```bash
curl http://localhost:3001/api/problems
```

**Expected Response:**
```json
{
  "success": true,
  "count": 40,
  "data": [
    {
      "_id": "...",
      "problemId": 1,
      "title": "Find the Largest Element in an Array",
      "difficulty": "Easy",
      "topic": "Arrays",
      "statement": "Given an array of integers, return the largest element.",
      "inputFormat": "n\narray elements",
      "outputFormat": "Largest element",
      "constraints": "1 <= n <= 10^5",
      "examples": [...],
      "testCases": [...]
    },
    ...
  ]
}
```

### Step 4: Start Frontend
```bash
cd frontend
npm install  # if not already done
npm run dev
```

### Step 5: Navigate to Problems Page
- Go to `http://localhost:5173`
- Login with your account
- Click "Problems 📋" in navigation
- You should see all 40 problems!

## API Endpoints

### Get All Problems
```
GET /api/problems
```

**Response:**
```json
{
  "success": true,
  "count": 40,
  "data": [...]
}
```

### Get Problem by ID
```
GET /api/problems/:id
```

**Example:**
```
GET /api/problems/1
```

### Get Problems by Difficulty
```
GET /api/problems/difficulty/:difficulty
```

**Example:**
```
GET /api/problems/difficulty/Easy
GET /api/problems/difficulty/Medium
GET /api/problems/difficulty/Hard
```

### Get Problems by Topic
```
GET /api/problems/topic/:topic
```

**Example:**
```
GET /api/problems/topic/Arrays
```

### Get Statistics
```
GET /api/problems/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalProblems": 40,
    "byDifficulty": [
      { "_id": "Easy", "count": 20 },
      { "_id": "Medium", "count": 20 }
    ],
    "byTopic": [
      { "_id": "Arrays", "count": 40 }
    ]
  }
}
```

### Import Problems from JSON
```
POST /api/problems/import
```

**Note:** This endpoint reads from `/Users/adityasingh/Desktop/DSA-codewars/problems.json`

## Features

### ✅ Dynamic Problem Fetching
- All 40 problems are fetched from MongoDB
- No hardcoding of problems
- Easy to add more problems

### ✅ Filtering
- Filter by difficulty (Easy, Medium, Hard)
- Filter by topic (Arrays, etc.)
- Search by title or statement

### ✅ Problem Metadata
- Problem ID
- Title
- Statement
- Input/Output format
- Constraints
- Examples
- Test cases

### ✅ Scalability
- Can easily add more problems
- Can add more topics
- Can add more difficulties
- Can add more fields to problems

## File Structure

```
backend/
├── models/
│   └── Problem.js              # Problem schema
├── controllers/
│   └── problemController.js    # Problem logic
├── routes/
│   └── problemRoutes.js        # Problem routes
└── server.js                   # Updated with problem routes

frontend/
└── src/components/
    └── ProblemsPage.jsx        # Updated to fetch from API
```

## Next Steps

1. ✅ Problems are now in MongoDB
2. ✅ ProblemsPage fetches all problems
3. Next: Update CodingPlatform to fetch problem details when clicked
4. Next: Add user progress tracking
5. Next: Add problem submission tracking

## Troubleshooting

### Problems not showing?
1. Check if backend is running: `http://localhost:3001/api/health`
2. Check if problems were imported: `http://localhost:3001/api/problems`
3. Check browser console for errors
4. Check backend logs for errors

### Import failed?
1. Verify `problems.json` exists at `/Users/adityasingh/Desktop/DSA-codewars/problems.json`
2. Verify JSON is valid (run `npm run validate` in DSA-codewars folder)
3. Check MongoDB connection
4. Check backend logs

### Filters not working?
1. Verify problems have correct `difficulty` and `topic` fields
2. Check browser console for errors
3. Verify API is returning correct data

## Summary

You now have:
- ✅ All 40 problems in MongoDB
- ✅ API to fetch problems dynamically
- ✅ ProblemsPage showing all problems
- ✅ Filtering by difficulty, topic, and search
- ✅ Scalable system for adding more problems

**Status: READY TO USE** ✅
