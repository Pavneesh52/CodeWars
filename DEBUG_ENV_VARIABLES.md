# Debug: Environment Variables Not Loading

## 🔍 Problem

Backend shows:
```
⚠️  WARNING: JUDGE0_API_KEY not found in .env file
```

But the key IS in the `.env` file!

---

## 🔧 How to Debug

### Step 1: Check .env File Exists
```bash
ls -la backend/.env
```

Should show:
```
-rw-r--r--  backend/.env
```

### Step 2: Check .env Content
```bash
cat backend/.env | grep JUDGE0
```

Should show:
```
JUDGE0_API_KEY=c035fcd240ma03a61dd19a4e82b2f04ecjda3a7ddf5869
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_HOST=judge0-ce.p.rapidapi.com
```

### Step 3: Restart Backend with Debug Output
```bash
npm start
```

Look for this output:
```
🔍 Debug - Environment Variables:
   JUDGE0_API_KEY: ✓ Set
   JUDGE0_API_URL: https://judge0-ce.p.rapidapi.com
   JUDGE0_HOST: judge0-ce.p.rapidapi.com

✅ Judge0 API Key loaded successfully
✅ Judge0 API URL: https://judge0-ce.p.rapidapi.com
✅ Judge0 Host: judge0-ce.p.rapidapi.com
```

---

## ❌ If Still Not Working

### Issue 1: .env File in Wrong Location
**Check:**
```bash
pwd
# Should be: /Users/adityasingh/CodeWars/CodeWars/backend
```

**Solution:**
Make sure you're in the `backend` folder when checking `.env`

### Issue 2: .env File Has Wrong Format
**Check:**
```bash
file backend/.env
# Should say: ASCII text
```

**Solution:**
Make sure there are no extra spaces or special characters

### Issue 3: Node Cache Issue
**Solution:**
```bash
# Clear cache
rm -rf backend/node_modules/.cache

# Restart
npm start
```

### Issue 4: Port Already in Use
**Check:**
```bash
lsof -i :3001
```

**Solution:**
```bash
# Kill process
kill -9 <PID>

# Restart
npm start
```

---

## ✅ What Should Happen

### Before Fix
```
⚠️  WARNING: JUDGE0_API_KEY not found in .env file
```

### After Fix
```
🔍 Debug - Environment Variables:
   JUDGE0_API_KEY: ✓ Set
   JUDGE0_API_URL: https://judge0-ce.p.rapidapi.com
   JUDGE0_HOST: judge0-ce.p.rapidapi.com

✅ Judge0 API Key loaded successfully
✅ Judge0 API URL: https://judge0-ce.p.rapidapi.com
✅ Judge0 Host: judge0-ce.p.rapidapi.com
```

---

## 🚀 Quick Fix Steps

1. **Stop backend:** Ctrl + C
2. **Verify .env:**
   ```bash
   cat backend/.env | grep JUDGE0
   ```
3. **Restart:**
   ```bash
   npm start
   ```
4. **Look for debug output** with ✓ marks

---

## 📝 .env File Should Look Like

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://...

# JWT Secret
JWT_SECRET=...

# Session Secret
SESSION_SECRET=...

# Google OAuth Credentials
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=...

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Cookie Settings
COOKIE_DOMAIN=localhost

# Judge0 API Configuration
JUDGE0_API_KEY=c035fcd240ma03a61dd19a4e82b2f04ecjda3a7ddf5869
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_HOST=judge0-ce.p.rapidapi.com
```

---

## 🎯 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| API key not found | Check .env file exists in `/backend/` |
| Wrong location | Make sure .env is in `/backend/` not root |
| Extra spaces | Remove spaces around `=` |
| Old cache | Delete `node_modules/.cache` |
| Port in use | Kill process on port 3001 |

---

## 💡 Pro Tips

1. **Always restart backend after changing .env**
2. **Check debug output in terminal**
3. **Use `cat` to verify .env content**
4. **Look for ✓ marks in debug output**

---

**After these steps, restart and check the debug output!** 🚀
