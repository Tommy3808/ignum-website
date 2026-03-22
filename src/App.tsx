import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Investors from './pages/Investors';
import Field from './pages/Field';
import TommyAI from './pages/TommyAI';

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
          <Route path="/field" element={<Field />} />
          <Route path="/tommyai" element={<TommyAI />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
