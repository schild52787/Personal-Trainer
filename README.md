# Personal Trainer - Workout Tracker PWA

A Progressive Web App for injury-aware workout programming with physical therapy protocols.

## 🎯 Tech Stack

### Frontend
- **React 18** with **TypeScript**
- **Vite** for build tooling
- **TanStack Query** for server state management
- **Zustand** for client state management
- **Firebase** (Firestore + Auth) with offline persistence
- **Vite PWA Plugin** with Workbox for service worker

### Backend
- **FastAPI** (Python)
- **Firebase Admin SDK** for authentication
- **Google Cloud Run** deployment ready
- **Pydantic** for data validation

## 📁 Project Structure

```
src/
├── app/                      # App configuration
├── components/               # Reusable UI components
├── features/                # Feature-based modules
│   ├── auth/
│   ├── workouts/
│   ├── exercises/
│   ├── injuries/
│   └── healthkit/
├── lib/                     # Third-party integrations
│   ├── firebase/            # Firebase config & utilities
│   └── api/                 # API client
├── stores/                  # Zustand stores
├── types/                   # TypeScript types
└── sw/                      # Service Worker

backend/
├── app/
│   ├── core/               # Config, security
│   ├── api/v1/             # API endpoints
│   ├── models/             # Pydantic models
│   ├── services/           # Business logic
│   └── schemas/            # Request/Response schemas
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Firebase project

### Frontend Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your Firebase config to .env
# VITE_FIREBASE_API_KEY=...
# VITE_FIREBASE_AUTH_DOMAIN=...
# etc.

# Start development server
npm run dev
```

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env

# Add your Firebase credentials
# FIREBASE_PROJECT_ID=...
# GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json

# Start development server
uvicorn app.main:app --reload
```

## 🏗️ Architecture Decisions

### State Management Strategy

**Hybrid Approach: TanStack Query + Zustand**

- **TanStack Query**: Server state (workouts, exercises, injuries)
  - Automatic caching and background updates
  - Offline mutation queuing
  - Request deduplication

- **Zustand**: Client state (UI state, preferences)
  - Lightweight and performant
  - Persistent storage support
  - No prop drilling

### Offline-First Architecture

**Multi-Layer Caching:**

1. **Service Worker** (Workbox): Static assets, API responses
2. **TanStack Query**: Data caching with automatic retry
3. **Firestore**: Built-in offline persistence
4. **IndexedDB**: Large data (videos, images)

**Caching Strategy:**
- Static assets: Cache-first
- API calls: Network-first, fallback to cache
- Firestore: Automatic offline sync
- Images/videos: Cache-first with expiration

### Firebase Integration

**Offline Persistence Pattern:**
```typescript
// Multi-tab support for PWA
enableMultiTabIndexedDbPersistence(db);

// TanStack Query as the query layer
// No direct Firestore subscriptions to avoid re-render issues
```

**Security:**
- Firebase Auth on frontend
- Firebase Admin SDK on backend for verification
- Secure API routes with token validation

## 📱 PWA Features

- ✅ Installable on mobile and desktop
- ✅ Offline-capable with service worker
- ✅ Background sync for failed mutations
- ✅ Push notifications ready
- ✅ App shell caching
- ✅ Safe area support for iOS

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```
FIREBASE_PROJECT_ID=
GOOGLE_APPLICATION_CREDENTIALS=
CORS_ORIGINS=http://localhost:5173
```

## 🚢 Deployment

### Frontend (Firebase Hosting / Vercel)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Google Cloud Run)
```bash
cd backend
gcloud run deploy personal-trainer-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 🧪 Testing
```bash
# Frontend
npm run test

# Backend
cd backend
pytest
```

## 📚 Key Features (Planned)

- [ ] User authentication with Firebase
- [ ] Workout creation and tracking
- [ ] Exercise library with videos
- [ ] Injury tracking and management
- [ ] PT protocol integration
- [ ] Readiness score calculation
- [ ] HealthKit integration (iOS)
- [ ] Progress analytics
- [ ] Social sharing

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

## 📄 License

MIT
