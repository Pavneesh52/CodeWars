# Multi-Language Code Execution Setup

## 📊 Current Status

### ✅ Fully Supported
- **JavaScript** - Works perfectly

### ⏳ Requires Setup
- Python
- C++
- Java
- C#
- TypeScript
- Go
- Rust

---

## 🚀 How to Enable Multi-Language Support

### Option 1: Use Judge0 API (Recommended)

Judge0 is a free API for code execution supporting 60+ languages.

#### Step 1: Get Free API Key
1. Go to https://judge0.com/
2. Sign up for free account
3. Get your API key from dashboard
4. Copy the API key

#### Step 2: Add to .env
```bash
# In /backend/.env
JUDGE0_API_KEY=your_api_key_here
```

#### Step 3: Restart Backend
```bash
npm start
```

#### Step 4: Test
- Select Python/C++/Java in editor
- Click "Run Code"
- Should work now!

---

## 📝 Current Behavior

### JavaScript
```
✅ Runs immediately
✅ Shows output
✅ Supports console.log()
```

### Other Languages (C++, Python, etc.)
```
Shows helpful message:
✅ Code structure is valid!

Note: C++ execution requires backend setup.
Currently, only JavaScript execution is fully supported.

To enable C++:
1. Set up Judge0 API (free tier available)
2. Add JUDGE0_API_KEY to .env
3. Backend will execute your code

For now, test your logic in JavaScript and adapt to C++ syntax.
```

---

## 🔧 Implementation Details

### Backend Code Flow

1. **User clicks "Run Code"**
   ↓
2. **Frontend sends code + language to backend**
   ↓
3. **Backend checks language:**
   - If JavaScript → Execute locally
   - If other → Show setup message (or call Judge0 if configured)
   ↓
4. **Return output to frontend**

---

## 📋 Judge0 Language IDs

```javascript
const languageMap = {
  'javascript': 63,
  'python': 71,
  'cpp': 54,
  'java': 62,
  'csharp': 51,
  'typescript': 74,
  'go': 60,
  'rust': 73,
};
```

---

## 💡 Workaround (Without Judge0)

### For Testing Other Languages:
1. **Write code in editor** (C++, Python, etc.)
2. **Copy the code**
3. **Test locally** on your machine
4. **Or use online compilers:**
   - https://www.ideone.com/
   - https://replit.com/
   - https://godbolt.org/

---

## ✅ What Works Now

### JavaScript
```javascript
var solution = function(nums, target) {
    let result = [];
    // Your code here
    console.log(result);
    return result;
};
```
✅ Click "Run Code" → Works immediately

### C++/Python/Java
```cpp
class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};
```
✅ Shows helpful setup message
⏳ Will work after Judge0 setup

---

## 🎯 Next Steps

1. **For JavaScript:** Works now! Start coding.
2. **For other languages:**
   - Option A: Set up Judge0 (5 minutes)
   - Option B: Test logic in JavaScript first
   - Option C: Use online compilers for testing

---

## 📞 Support

### If Judge0 Setup Doesn't Work:
1. Check API key is correct
2. Verify .env file is loaded
3. Restart backend: `npm start`
4. Check browser console for errors

### If Still Issues:
1. Test API key directly
2. Check Judge0 dashboard
3. Verify internet connection

---

**JavaScript is ready to use now!** 🎉

For multi-language support, set up Judge0 (free tier available). 🚀
