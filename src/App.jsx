import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import NewsDetail from './pages/NewsDetail';
import TeachersPage from './pages/TeachersPage';
import DirectionsPage from './pages/DirectionsPage';
import { fetchHome } from './api/api';

export default function App() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    fetchHome()
      .then(setHomeData)
      .catch(err => console.error('Error loading home data:', err));
  }, []);

  return (
    <Router>
      <div className="app" id="app-root">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/yangiliklar" element={<NewsPage />} />
            <Route path="/yangiliklar/:id" element={<NewsDetail />} />
            <Route path="/oqituvchilar" element={<TeachersPage />} />
            <Route path="/yonalishlar" element={<DirectionsPage />} />
          </Routes>
        </main>
        <Footer homeData={homeData} />
      </div>
    </Router>
  );
}
