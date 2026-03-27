import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Investors from './pages/Investors';
import Field from './pages/Field';
import TommyAI from './pages/TommyAI';
import HeptagonPage from './pages/Heptagon';
import RequestAccess from './pages/RequestAccess';
import Team from './pages/Team';
import DataRoom from './pages/DataRoom';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-obsidian-deep text-white overflow-x-hidden">
        {/* Obsidian Mesh Background - Global */}
        <div className="obsidian-mesh" />
        
        {/* Grid Overlay - Global */}
        <div className="grid-overlay" />
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/team" element={<Team />} />
          <Route path="/data-room" element={<DataRoom />} />
          <Route path="/field" element={<Field />} />
          {/* Labs/Advanced features - not linked from main nav */}
          <Route path="/labs/tommyai" element={<TommyAI />} />
          <Route path="/labs/heptagon" element={<HeptagonPage />} />
          <Route path="/acceso" element={<RequestAccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
