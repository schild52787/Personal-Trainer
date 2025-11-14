import { Routes, Route } from 'react-router-dom';
import TodayScreen from '@/screens/TodayScreen';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<TodayScreen />} />
        <Route path="/today" element={<TodayScreen />} />
        {/* Add more routes as you build features */}
      </Routes>
    </div>
  );
}

export default App;
