import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GamePage from './pages/GamePage';
import HistoryPage from './pages/HistoryPage';
import './App.css';

function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;