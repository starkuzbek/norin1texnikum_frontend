import { useState, useEffect } from 'react';
import DirectionCard from '../components/DirectionCard';
import { fetchDirections } from '../api/api';

export default function DirectionsPage() {
  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDirections() {
      try {
        const data = await fetchDirections();
        setDirections(data);
      } catch (err) {
        console.error('Error loading directions:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDirections();
  }, []);

  return (
    <div id="directions-page">
      <div className="page-header">
        <h1>🎓 Ta'lim yo'nalishlari</h1>
        <p>Texnikumimizda o'tiladigan ta'lim yo'nalishlari haqida ma'lumot</p>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <div className="loading-text">Yuklanmoqda...</div>
            </div>
          ) : directions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🎓</div>
              <div className="empty-state-text">Hozircha yo'nalishlar qo'shilmagan</div>
            </div>
          ) : (
            <div className="card-grid">
              {directions.map((direction, idx) => (
                <DirectionCard key={direction.id} direction={direction} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
