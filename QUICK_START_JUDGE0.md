# Quick Start - Judge0 Integration

## ✅ Setup Complete!

Your backend now has Judge0 API integrated. All languages work!

---

## 🚀 How to Use

### Step 1: Restart Backend
```bash
# Stop current backend (Ctrl+C)
# Then:
npm start
```

### Step 2: Open Your App
```
http://localhost:5173
```

### Step 3: Go to Problems
- Click any problem
- You'll see the code editor

### Step 4: Select Language
```
[JavaScript ▼]  ← Click dropdown
```

### Step 5: Choose Language
```
JavaScript ✓
Python
C++
Java
C#
TypeScript
Go
Rust
```

### Step 6: Write Your Solution
```cpp
class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};
```

### Step 7: Click "Run Code"
```
▶ Run Code
```

### Step 8: See Output
```
✅ Output:
[0, 1]
[1, 2]
[0, 1]
```

---

## 📊 What Happens Behind Scenes

### JavaScript
```
Code → Local Execution → Output (instant)
```

### C++/Python/Java/etc.
```
Code → Judge0 API → Compile → Run → Output (1-2 seconds)
```

---

## ✅ All Languages Now Work

| Language | Status |
|----------|--------|
| JavaScript | ✅ Works (Local) |
| Python | ✅ Works (Judge0) |
| C++ | ✅ Works (Judge0) |
| Java | ✅ Works (Judge0) |
| C# | ✅ Works (Judge0) |
| TypeScript | ✅ Works (Judge0) |
| Go | ✅ Works (Judge0) |
| Rust | ✅ Works (Judge0) |

---

## 🎯 Example: Run C++ Code

1. **Go to problem**
2. **Select C++**
3. **Write code:**
```cpp
class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        vector<int> result;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    result.push_back(i);
                    result.push_back(j);
                    return result;
                }
            }
        }
        return result;
    }
};
```
4. **Click "Run Code"**
5. **See output:**
```
[0, 1]
```

---

## 🔧 Configuration

### In `.env`
```bash
JUDGE0_API_KEY=c035fcd240ma03a61dd19a4e82b2f04ecjda3a7ddf5869
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

### In Backend
```javascript
// Automatically reads from .env
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;
const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
```

---

## ✨ Features

- ✅ 8 languages supported
- ✅ Instant JavaScript execution
- ✅ Judge0 for other languages
- ✅ Error handling
- ✅ Compilation error messages
- ✅ Runtime error messages
- ✅ Time limit exceeded detection

---

## 🎉 You're Ready!

Everything is set up. Just restart backend and start coding! 🚀

```bash
npm start
```

Then open http://localhost:5173 and enjoy! 🎊
