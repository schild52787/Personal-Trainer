import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <h1>Personal Trainer - Workout Tracker</h1>
      <p>PWA Setup Complete!</p>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as you build features */}
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to Your Workout Tracker</h2>
      <ul>
        <li>✅ React + TypeScript</li>
        <li>✅ PWA with offline support</li>
        <li>✅ Firebase integration ready</li>
        <li>✅ TanStack Query for data fetching</li>
        <li>✅ FastAPI backend structure</li>
      </ul>
    </div>
  );
}

export default App;
