# Quick Start Guide

## ✅ Verification Complete

Both frontend and backend are running successfully!

### Test Results

**Frontend (Vite + React):** ✅
- URL: http://localhost:5173/
- Status: Running
- PWA manifest: Configured
- Service worker: Ready

**Backend (FastAPI):** ✅
- URL: http://localhost:8000/
- Health endpoint: http://localhost:8000/health → `{"status":"healthy"}`
- API root: http://localhost:8000/ → `{"message":"Personal Trainer API","version":"v1","status":"healthy"}`
- CORS: Configured for http://localhost:5173

---

## 🚀 Running the Project

### Frontend

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev

# Visit http://localhost:5173/
```

### Backend

```bash
cd backend

# Create virtual environment (already done)
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies (already done)
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env

# Start development server
uvicorn app.main:app --reload

# Visit http://localhost:8000/docs for API documentation
```

---

## 📦 What's Included

### Frontend Structure
```
src/
├── app/                      ✅ App configuration
├── components/               ✅ Reusable components
├── features/                 ✅ Feature modules (workouts, exercises, injuries, etc.)
├── lib/
│   ├── firebase/            ✅ Firebase config with offline persistence
│   ├── api/                 ✅ Axios client with auth
│   └── react-query.ts       ✅ TanStack Query config
├── stores/                   ✅ Zustand stores
├── types/                    ✅ TypeScript types
└── main.tsx                  ✅ Entry point with PWA
```

### Backend Structure
```
backend/app/
├── core/
│   ├── config.py            ✅ Environment config
│   └── security.py          ✅ Firebase Admin auth
├── api/v1/
│   ├── endpoints/           ✅ API routes
│   └── router.py            ✅ Router config
├── models/                   ✅ Data models
├── services/                 ✅ Business logic
└── main.py                   ✅ FastAPI app
```

---

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Get your web app credentials
3. Update `.env`:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Download service account key for backend
5. Update `backend/.env`:

```bash
FIREBASE_PROJECT_ID=your_project_id
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
```

---

## 📱 PWA Features

- ✅ Installable on mobile and desktop
- ✅ Offline-first architecture
- ✅ Service worker with Workbox
- ✅ Multi-tab offline persistence (Firestore)
- ✅ Background sync ready
- ✅ Push notifications ready

---

## 🎯 Tech Stack

### State Management
- **TanStack Query** for server state (workouts, exercises, injuries)
- **Zustand** for client state (UI, preferences)

### Why this combination?
- TanStack Query: Auto-caching, offline mutations, request deduplication
- Zustand: Lightweight, no prop drilling, persistent storage
- Together: Best of both worlds - server and client state handled optimally

### Offline Architecture
1. **Service Worker** - Static asset caching
2. **TanStack Query** - API response caching + offline mutations
3. **Firestore** - Built-in offline persistence
4. **IndexedDB** - Large data storage

---

## 🧪 Next Steps

1. **Configure Firebase** (see above)
2. **Build features** using the provided patterns:
   - `src/features/workouts/queries.ts` - TanStack Query example
   - `src/stores/uiStore.ts` - Zustand example
   - `backend/app/api/v1/endpoints/workouts.py` - API endpoint example
3. **Test offline** - Disconnect network and verify app still works
4. **Deploy**:
   - Frontend: Firebase Hosting or Vercel
   - Backend: Google Cloud Run

---

## 📚 Documentation

- Full setup guide: See `README.md`
- API docs (when backend running): http://localhost:8000/docs
- TanStack Query: https://tanstack.com/query/latest
- Zustand: https://docs.pmnd.rs/zustand
- Firebase: https://firebase.google.com/docs
- FastAPI: https://fastapi.tiangolo.com/

---

## 🐛 Troubleshooting

**Frontend won't start:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Backend won't start:**
```bash
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Firebase errors:**
- Check `.env` file has correct credentials
- Verify Firebase project is set up
- Enable Firestore in Firebase Console

---

## ✨ Current Status

✅ Project structure created
✅ Dependencies installed
✅ Frontend running on port 5173
✅ Backend running on port 8000
✅ Health endpoint verified
✅ PWA configuration complete
✅ TypeScript strict mode enabled
✅ ESLint configured
✅ Git repository initialized
✅ Committed and pushed to branch

**You're ready to start building! 🎉**
