# Restart Backend & Test Judge0

## 🚀 Complete Restart Guide

### Step 1: Stop Current Backend
```bash
# In terminal where backend is running:
Ctrl + C
```

You should see:
```
^C
```

### Step 2: Clear Node Cache (Important!)
```bash
# This ensures .env is reloaded
rm -rf node_modules/.cache
```

### Step 3: Restart Backend
```bash
npm start
```

### Step 4: Verify API Key is Loaded
Look for these messages in terminal:
```
✅ Judge0 API Key loaded successfully
✅ Judge0 API URL: https://judge0-ce.p.rapidapi.com
```

If you see these, Judge0 is ready! ✅

---

## 🧪 Test Each Language

### Test 1: JavaScript (Local)
1. Go to problem
2. Select **JavaScript**
3. Write code:
```javascript
var solution = function(nums, target) {
    return [0, 1];
};
```
4. Click **"Run Code"**
5. ✅ Should show output immediately

### Test 2: C++ (Judge0)
1. Go to problem
2. Select **C++**
3. Write code:
```cpp
class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        vector<int> result;
        result.push_back(0);
        result.push_back(1);
        return result;
    }
};
```
4. Click **"Run Code"**
5. ✅ Should compile and run (takes 1-2 seconds)

### Test 3: Python (Judge0)
1. Go to problem
2. Select **Python**
3. Write code:
```python
class Solution:
    def solution(self, nums: List[int], target: int) -> List[int]:
        return [0, 1]
```
4. Click **"Run Code"**
5. ✅ Should run (takes 1-2 seconds)

---

## ✅ What You Should See

### Successful JavaScript Execution
```
✅ Output:
Code executed successfully
```

### Successful C++ Execution
```
✅ Output:
[0, 1]
```

### Successful Python Execution
```
✅ Output:
[0, 1]
```

---

## ❌ Troubleshooting

### Issue: Still getting "API key not found" error

**Solution:**
1. **Stop backend:** Ctrl + C
2. **Check .env file:**
   ```bash
   cat backend/.env | grep JUDGE0
   ```
   Should show:
   ```
   JUDGE0_API_KEY=c035fcd240ma03a61dd19a4e82b2f04ecjda3a7ddf5869
   JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
   ```

3. **Restart backend:**
   ```bash
   npm start
   ```

4. **Look for confirmation:**
   ```
   ✅ Judge0 API Key loaded successfully
   ```

### Issue: Backend won't start

**Solution:**
1. Check if port 3001 is in use:
   ```bash
   lsof -i :3001
   ```
2. Kill the process:
   ```bash
   kill -9 <PID>
   ```
3. Restart:
   ```bash
   npm start
   ```

### Issue: Code runs but shows error

**Solution:**
1. Check browser console for errors
2. Check backend terminal for error messages
3. Verify API key is correct in .env

---

## 📊 Full Restart Checklist

- [ ] Stop backend (Ctrl + C)
- [ ] Verify .env has JUDGE0_API_KEY
- [ ] Restart backend (npm start)
- [ ] See "✅ Judge0 API Key loaded successfully"
- [ ] Test JavaScript code
- [ ] Test C++ code
- [ ] Test Python code
- [ ] All working! ✅

---

## 🎯 Expected Output After Restart

```
> codehub-backend@1.0.0 start
> node server.js

✓ Google OAuth configured with:
  Client ID: 424377260224-62iojeohqtm1gnh631048kd0q41h7nfa.apps.googleusercontent.com
  Callback URL: http://localhost:3001/api/auth/google/callback

✅ Judge0 API Key loaded successfully
✅ Judge0 API URL: https://judge0-ce.p.rapidapi.com

╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 CodeHub API Server Running                          ║
║                                                           ║
║   📡 Port: 3001                                        ║
║   🌍 Environment: development                              ║
║   🔗 URL: http://localhost:3001                        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

✅ MongoDB Connected: ac-mzuh2tl-shard-00-00.1wv0mvc.mongodb.net
```

---

## 🚀 Quick Commands

```bash
# Stop backend
Ctrl + C

# Restart backend
npm start

# Check if port is in use
lsof -i :3001

# Kill process on port 3001
kill -9 <PID>

# Check .env file
cat backend/.env | grep JUDGE0
```

---

## 🎉 You're Ready!

After restart, all languages should work perfectly! 🚀

Try running C++ or Python code now! ✅
