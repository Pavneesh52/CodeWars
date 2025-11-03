# 🏗️ DSA Platform Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                         │
│                    http://localhost:5173                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ App.jsx - Main Router                                    │  │
│  │ Routes:                                                  │  │
│  │ - / → LoginPage                                          │  │
│  │ - /dashboard → TargetPage                                │  │
│  │ - /coding/:questionId → CodingPlatform                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │ TargetPage       │  │ Question         │  │ Coding       │ │
│  │ - Dashboard      │→ │ Selection Modal  │→ │ Platform     │ │
│  │ - Create Room    │  │ - Browse         │  │ - Editor     │ │
│  │   button         │  │ - Filter         │  │ - Output     │ │
│  │                  │  │ - Search         │  │ - Run/Submit │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│                                                                 │
└────────────────────────────┬─────────────────────────────────────┘
                             │ HTTP Requests
                             │ (Fetch API)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (Express.js)                         │
│                    http://localhost:5000                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ server.js - Main Server                                  │  │
│  │ - CORS Configuration                                     │  │
│  │ - Middleware Setup                                       │  │
│  │ - Route Registration                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │ Auth Routes      │  │ Question Routes  │  │ Health Check │ │
│  │ - Register       │  │ - GET /          │  │ - GET /      │ │
│  │ - Login          │  │ - GET /:id       │  │   health     │ │
│  │ - Google OAuth   │  │ - GET /topics    │  │              │ │
│  │ - Logout         │  │ - POST /         │  │              │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Models                                                   │  │
│  │ - User.js (Authentication)                               │  │
│  │ - Question.js (DSA Problems)                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└────────────────────────────┬─────────────────────────────────────┘
                             │ Database Queries
                             │ (Mongoose)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MongoDB Database                            │
│                  (Local or MongoDB Atlas)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────────────────────┐   │
│  │ users collection │  │ questions collection             │   │
│  │ - _id            │  │ - _id                            │   │
│  │ - name           │  │ - title                          │   │
│  │ - email          │  │ - description                    │   │
│  │ - password       │  │ - difficulty                     │   │
│  │ - googleId       │  │ - topics                         │   │
│  │ - createdAt      │  │ - examples                       │   │
│  │                  │  │ - constraints                    │   │
│  │                  │  │ - starterCode                    │   │
│  │                  │  │ - solutionCode                   │   │
│  │                  │  │ - testCases                      │   │
│  │                  │  │ - acceptanceRate                 │   │
│  │                  │  │ - submissions                    │   │
│  │                  │  │ - createdAt                      │   │
│  └──────────────────┘  └──────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
App
├── LoginPage
│   └── Google OAuth / Email Login
│
├── TargetPage (Dashboard)
│   ├── Navigation Bar
│   ├── Hero Section
│   ├── Create Room Button
│   │   └── onClick → setShowQuestionModal(true)
│   │
│   └── QuestionSelectionModal
│       ├── Search Input
│       ├── Topic Filter
│       ├── Difficulty Filter
│       └── Question List
│           └── onClick → navigate(/coding/:questionId)
│
└── CodingPlatform
    ├── Header
    │   ├── Back Button
    │   ├── Question Title
    │   ├── Difficulty Badge
    │   ├── Run Button
    │   └── Submit Button
    │
    ├── Left Panel (Problem Description)
    │   ├── Description Tab
    │   │   ├── Problem Statement
    │   │   ├── Examples
    │   │   ├── Constraints
    │   │   └── Topics
    │   │
    │   └── Submissions Tab
    │       └── User Submissions History
    │
    └── Right Panel (Code Editor)
        ├── Editor Header
        ├── Code Editor (textarea)
        └── Output Console
```

---

## Data Flow Diagram

### Question Selection Flow

```
User clicks "Create Room"
        │
        ▼
QuestionSelectionModal opens
        │
        ├─→ fetchTopics() → GET /api/questions/topics/all
        │                   ↓
        │              MongoDB returns topics
        │
        └─→ fetchQuestions() → GET /api/questions?filters
                               ↓
                          MongoDB returns questions
                               ↓
                          Display in modal
                               │
                               ▼
                        User selects question
                               │
                               ▼
                    navigate(/coding/:questionId)
```

### Coding Platform Flow

```
CodingPlatform mounts
        │
        ├─→ fetchQuestion() → GET /api/questions/:id
        │                     ↓
        │                MongoDB returns question
        │                     ↓
        │                Display problem & starter code
        │
        └─→ User writes code
                │
                ├─→ Click "Run"
                │   │
                │   ├─→ executeCode(code, testCases)
                │   │   ↓
                │   │   Run tests locally
                │   │   ↓
                │   │   Display results
                │   │
                │   └─→ Show output in console
                │
                └─→ Click "Submit"
                    │
                    └─→ Save submission (future feature)
```

---

## API Request/Response Examples

### Get All Questions
```
REQUEST:
GET /api/questions
Accept: application/json

RESPONSE:
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Two Sum",
      "description": "Given an array...",
      "difficulty": "Easy",
      "topics": ["Array", "Hash Table"],
      "examples": [...],
      "constraints": "...",
      "acceptanceRate": 47.3,
      "submissions": 15000
    },
    ...
  ]
}
```

### Get Question by ID
```
REQUEST:
GET /api/questions/507f1f77bcf86cd799439011
Accept: application/json

RESPONSE:
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Two Sum",
    "description": "...",
    "difficulty": "Easy",
    "topics": ["Array", "Hash Table"],
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9..."
      }
    ],
    "constraints": "2 <= nums.length <= 10^4",
    "starterCode": "function twoSum(nums, target) { ... }",
    "solutionCode": "function twoSum(nums, target) { ... }",
    "testCases": [
      { "input": "[2,7,11,15],9", "output": "[0,1]" },
      ...
    ],
    "acceptanceRate": 47.3,
    "submissions": 15000
  }
}
```

### Get All Topics
```
REQUEST:
GET /api/questions/topics/all
Accept: application/json

RESPONSE:
{
  "success": true,
  "data": [
    "Array",
    "Hash Table",
    "String",
    "Tree",
    "BFS",
    "Queue",
    "Sliding Window",
    "Two Pointers",
    "Math",
    "Linked List",
    "Divide and Conquer",
    "Heap"
  ]
}
```

---

## State Management

### TargetPage State
```javascript
const [user, setUser] = useState(null);
const [difficulty, setDifficulty] = useState('Medium');
const [showQuestionModal, setShowQuestionModal] = useState(false);
```

### QuestionSelectionModal State
```javascript
const [questions, setQuestions] = useState([]);
const [topics, setTopics] = useState([]);
const [selectedTopic, setSelectedTopic] = useState('All');
const [selectedDifficulty, setSelectedDifficulty] = useState('All');
const [searchTerm, setSearchTerm] = useState('');
const [loading, setLoading] = useState(false);
```

### CodingPlatform State
```javascript
const [question, setQuestion] = useState(null);
const [code, setCode] = useState('');
const [output, setOutput] = useState('');
const [loading, setLoading] = useState(true);
const [running, setRunning] = useState(false);
const [activeTab, setActiveTab] = useState('description');
```

---

## File Structure

```
CodeWars/
│
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── passport.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Question.js ✨ NEW
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── questionRoutes.js ✨ NEW
│   │
│   ├── scripts/
│   │   └── seedQuestions.js ✨ NEW
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── sampleQuestions.js ✨ NEW
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js (MODIFIED)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── TargetPage.jsx (MODIFIED)
│   │   │   ├── QuestionSelectionModal.jsx ✨ NEW
│   │   │   └── CodingPlatform.jsx ✨ NEW
│   │   │
│   │   ├── config/
│   │   │   └── api.js (MODIFIED)
│   │   │
│   │   ├── App.jsx (MODIFIED)
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── SETUP_GUIDE.md
├── DSA_FEATURE_GUIDE.md ✨ NEW
├── QUICK_START_DSA.md ✨ NEW
├── IMPLEMENTATION_SUMMARY.md ✨ NEW
└── ARCHITECTURE.md ✨ NEW (this file)
```

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB with Mongoose 8.0.3
- **Authentication**: Passport.js 0.7.0
- **Security**: bcryptjs 2.4.3, JWT 9.0.2
- **Utilities**: dotenv, cors, cookie-parser

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **HTTP Client**: Fetch API

### Database
- **MongoDB Collections**:
  - `users` - User accounts and authentication
  - `questions` - DSA problems and metadata

---

## Performance Considerations

### Frontend
- ✅ Lazy loading of components
- ✅ Efficient state management
- ✅ Memoization for expensive operations
- ✅ Debounced search input

### Backend
- ✅ Database indexing on frequently queried fields
- ✅ Pagination support (can be added)
- ✅ Caching for topics list
- ✅ Efficient query filtering

### Database
- ✅ Indexed fields: `title`, `difficulty`, `topics`
- ✅ Lean queries (exclude unnecessary fields)
- ✅ Connection pooling

---

## Security Architecture

```
Frontend (React)
    ↓ HTTPS/CORS
Backend (Express)
    ├─ CORS Middleware (whitelist frontend origin)
    ├─ Input Validation (Mongoose schemas)
    ├─ JWT Authentication (protected routes)
    ├─ Rate Limiting (can be added)
    └─ Error Handling (generic messages)
    ↓
MongoDB
    ├─ Connection string in .env
    ├─ Mongoose injection prevention
    └─ Field-level access control
```

---

## Deployment Architecture

```
Production Environment:
├── Frontend
│   ├── Hosted on: Netlify / Vercel
│   ├── Build: npm run build
│   └── Environment: VITE_API_URL=https://api.yourdomain.com
│
├── Backend
│   ├── Hosted on: Heroku / Railway / AWS
│   ├── Environment: NODE_ENV=production
│   └── Database: MongoDB Atlas
│
└── Database
    └── MongoDB Atlas (Cloud)
```

---

## Scaling Considerations

### Current Limitations
- Single backend instance
- No caching layer
- No load balancing
- No CDN for static assets

### Future Scaling
- [ ] Add Redis for caching
- [ ] Implement pagination
- [ ] Add database indexing
- [ ] Use CDN for frontend
- [ ] Horizontal scaling with load balancer
- [ ] Microservices for code execution

---

**Architecture designed for clarity and extensibility! 🏗️**
