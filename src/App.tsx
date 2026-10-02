import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Infrastructure from './pages/Infrastructure';
import Compute from './pages/Compute';
import Heptagon from './pages/Heptagon';
import Proof from './pages/Proof';
import Access from './pages/Access';
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
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/compute" element={<Compute />} />
          <Route path="/heptagon" element={<Heptagon />} />
          <Route path="/proof" element={<Proof />} />
          <Route path="/access" element={<Access />} />
          <Route path="/team" element={<Team />} />
          <Route path="/data-room" element={<DataRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
