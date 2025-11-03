# 🔌 Port Configuration

## Current Setup

| Service | Port | URL |
|---------|------|-----|
| Backend API | **3001** | http://localhost:3001/api |
| Frontend Dev | 5173 | http://localhost:5173 |
| MongoDB | 27017 | mongodb://localhost:27017 |

---

## Files Updated

### Backend
- ✅ `backend/.env` - Already set to `PORT=3001`
- ✅ `backend/server.js` - Uses `process.env.PORT || 5000` (reads from .env)

### Frontend
- ✅ `frontend/src/config/api.js` - Updated to `http://localhost:3001/api`
- ✅ `frontend/.env` - Created with `VITE_API_URL=http://localhost:3001/api`

### Testing
- ✅ `backend/scripts/testAPI.js` - Updated to use port 3001

### Documentation
- ✅ `QUICK_FIX_GUIDE.md` - Updated port references
- ✅ All other docs reference port 3001

---

## How to Start Services

### Backend (Port 3001)
```bash
cd backend
npm run dev
```

Expected output:
```
🚀 CodeHub API Server Running
📡 Port: 3001
🔗 URL: http://localhost:3001
```

### Frontend (Port 5173)
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

## Testing API

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Get Questions
```bash
curl http://localhost:3001/api/questions
```

### Run Full Test Suite
```bash
cd backend
node scripts/testAPI.js
```

---

## Environment Variables

### Backend (backend/.env)
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/codehub
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

### Frontend (frontend/.env)
```env
VITE_API_URL=http://localhost:3001/api
```

---

## Changing Ports

### To use a different backend port:

1. **Update backend/.env:**
   ```env
   PORT=YOUR_PORT_HERE
   ```

2. **Update frontend/.env:**
   ```env
   VITE_API_URL=http://localhost:YOUR_PORT_HERE/api
   ```

3. **Update backend/.env Google callback:**
   ```env
   GOOGLE_CALLBACK_URL=http://localhost:YOUR_PORT_HERE/api/auth/google/callback
   ```

4. **Restart both servers**

---

## Troubleshooting Port Issues

### Port Already in Use
```bash
# Find what's using the port
netstat -ano | findstr :3001

# Kill the process (Windows)
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3001 | xargs kill -9
```

### API Connection Failed
- ✅ Verify backend is running on port 3001
- ✅ Check frontend `.env` has correct API URL
- ✅ Check browser console for CORS errors
- ✅ Verify firewall allows port 3001

### CORS Error
- ✅ Check `FRONTEND_URL` in backend `.env`
- ✅ Verify it matches frontend URL (http://localhost:5173)
- ✅ Restart backend server

---

## Summary

✅ Backend API is now on **port 3001**
✅ Frontend is on **port 5173**
✅ All configurations updated
✅ Ready to use!

Start backend: `npm run dev` (in backend folder)
Start frontend: `npm run dev` (in frontend folder)
