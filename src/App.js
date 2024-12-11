// src/App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Scraper from './Scraper';
import ScrapeLink from './ScrapLink';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/scrape-link">Scrape Link</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Scraper />} />
          <Route path="/scrape-link" element={<ScrapeLink />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;