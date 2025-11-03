# DSA Question Platform - Feature Guide

## 🎯 Overview

The DSA Question Platform is a LeetCode-like coding environment integrated into CodeWars. Users can select DSA problems by topic, difficulty level, and solve them in an interactive code editor.

## ✨ Features Implemented

### 1. **Question Selection Modal**
- Browse all available DSA questions
- Filter by:
  - **Topic** (Array, Hash Table, String, Tree, etc.)
  - **Difficulty** (Easy, Medium, Hard)
  - **Search** (by title or description)
- View question statistics (submissions, acceptance rate)
- Click to select and start coding

### 2. **Coding Platform**
- **Problem Description Panel**
  - Full problem statement
  - Multiple examples with explanations
  - Constraints and requirements
  - Topic tags
  
- **Code Editor Panel**
  - Syntax-highlighted code editor
  - Pre-filled starter code
  - Real-time code editing
  - Run and Submit buttons

- **Output Console**
  - Display test case results
  - Show compilation errors
  - Display execution output

### 3. **Navigation Flow**
```
Dashboard → Create Room Button → Question Selection Modal → Select Question → Coding Platform
```

## 📁 New Files Created

### Backend
```
backend/
├── models/
│   └── Question.js                 # Question schema
├── routes/
│   └── questionRoutes.js           # Question API endpoints
├── utils/
│   └── sampleQuestions.js          # Sample DSA questions data
└── scripts/
    └── seedQuestions.js            # Database seeding script
```

### Frontend
```
frontend/src/components/
├── QuestionSelectionModal.jsx      # Question selection UI
└── CodingPlatform.jsx              # Coding environment
```

## 🚀 Setup Instructions

### Step 1: Seed the Database with Questions

```bash
cd backend
node scripts/seedQuestions.js
```

This will populate your MongoDB with 6 sample DSA questions across different difficulty levels and topics.

### Step 2: Start Backend Server

```bash
cd backend
npm run dev
```

The server will run on `http://localhost:5000`

### Step 3: Start Frontend Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Step 4: Test the Feature

1. Navigate to the dashboard
2. Click "Create Room" button
3. The Question Selection Modal will open
4. Select a question to start coding
5. You'll be taken to the Coding Platform

## 📊 Sample Questions Included

1. **Two Sum** (Easy) - Array, Hash Table
2. **Reverse String** (Easy) - String, Two Pointers
3. **Palindrome Number** (Easy) - Math
4. **Longest Substring Without Repeating Characters** (Medium) - String, Sliding Window, Hash Table
5. **Binary Tree Level Order Traversal** (Medium) - Tree, BFS, Queue
6. **Merge K Sorted Lists** (Hard) - Linked List, Divide and Conquer, Heap

## 🔌 API Endpoints

### Questions API

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/api/questions` | Get all questions | `difficulty`, `topic`, `search` |
| GET | `/api/questions/topics/all` | Get all available topics | - |
| GET | `/api/questions/:id` | Get question by ID | - |
| POST | `/api/questions` | Create new question | - |

### Example Requests

**Get all Medium difficulty questions:**
```bash
GET /api/questions?difficulty=Medium
```

**Get questions by topic:**
```bash
GET /api/questions?topic=Array
```

**Search questions:**
```bash
GET /api/questions?search=two
```

**Get all topics:**
```bash
GET /api/questions/topics/all
```

## 🎨 UI Components

### QuestionSelectionModal
- Responsive modal overlay
- Real-time filtering
- Search functionality
- Difficulty color coding
- Topic badges
- Acceptance rate display

### CodingPlatform
- Split-pane layout (Problem | Code Editor)
- Tabbed interface (Description | Submissions)
- Syntax-highlighted code editor
- Output console
- Back button to dashboard
- Run and Submit buttons

## 🔧 Configuration

### API Base URL
Update in `frontend/src/config/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Backend Port
Update in `backend/.env`:
```env
PORT=5000
```

### Frontend API URL
Update in `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🛠️ Extending the Platform

### Adding More Questions

Edit `backend/utils/sampleQuestions.js` and add new question objects:

```javascript
{
  title: "Your Question Title",
  description: "Problem description...",
  difficulty: "Easy|Medium|Hard",
  topics: ["Topic1", "Topic2"],
  examples: [
    {
      input: "...",
      output: "...",
      explanation: "..."
    }
  ],
  constraints: "...",
  starterCode: "function solution() { ... }",
  solutionCode: "function solution() { ... }",
  testCases: [
    { input: "...", output: "..." }
  ],
  acceptanceRate: 45.5,
  submissions: 10000
}
```

Then reseed the database:
```bash
node scripts/seedQuestions.js
```

### Implementing Code Execution

The current implementation has a placeholder for code execution. To implement real execution:

1. **Option A: Use a backend service**
   - Create an endpoint that executes code safely
   - Use sandboxed environments (Docker, etc.)

2. **Option B: Use a third-party API**
   - Judge0 API
   - Piston API
   - CodeSignal API

### Adding User Submissions

Create a new model for tracking submissions:

```javascript
// backend/models/Submission.js
const submissionSchema = new mongoose.Schema({
  userId: ObjectId,
  questionId: ObjectId,
  code: String,
  language: String,
  status: String, // "Accepted", "Wrong Answer", "Runtime Error"
  runtime: Number,
  memory: Number,
  createdAt: Date
});
```

## 📈 Future Enhancements

- [ ] Real code execution with sandboxing
- [ ] User submission history
- [ ] Leaderboard by problem
- [ ] Discussion forum per problem
- [ ] Solution sharing
- [ ] Difficulty rating system
- [ ] Hint system
- [ ] Multiple language support (Python, Java, C++, etc.)
- [ ] Collaborative coding
- [ ] Time-based challenges
- [ ] Problem difficulty recommendations
- [ ] User statistics and analytics

## 🐛 Troubleshooting

### Questions not loading
- Check if backend is running on port 5000
- Verify MongoDB connection
- Check browser console for errors
- Ensure questions are seeded in database

### Modal not opening
- Check if `showQuestionModal` state is being set
- Verify QuestionSelectionModal component is imported
- Check browser console for React errors

### Code editor not working
- Verify textarea is rendering
- Check for JavaScript errors in console
- Ensure CodingPlatform component is mounted

### API errors
- Check CORS configuration in backend
- Verify API endpoints in frontend config
- Check network tab in browser DevTools

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review component code comments
3. Check browser console for errors
4. Verify all services are running

---

**Happy Coding! 🚀**
