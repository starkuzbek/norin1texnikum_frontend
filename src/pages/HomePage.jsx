import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import NewsCard from '../components/NewsCard';
import { fetchHome, fetchNews, fetchDirections, getImageUrl } from '../api/api';

export default function HomePage() {
  const [homeData, setHomeData] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Test uchun 3 soniya kutish
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const [home, news, dirs] = await Promise.all([
          fetchHome(),
          fetchNews(),
          fetchDirections()
        ]);
        setHomeData(home);
        setLatestNews(news.slice(0, 3));
        setDirections(dirs.slice(0, 4));
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <HeroSection loading={true} />
        <div className="loading">
          <div className="loading-spinner"></div>
          <div className="loading-text">Yuklanmoqda...</div>
        </div>
      </>
    );
  }

  return (
    <div id="home-page">
      {/* Hero */}
      <HeroSection homeData={homeData} loading={false} />

      {/* About */}
      <section className="section" id="about-section">
        <div className="container">
          <div className="about-section animate-fade-in-up">
            <div className="about-content">
              <h2>{homeData?.title || 'Texnikum haqida'}</h2>
              <p>{homeData?.description || "Norin tuman 1-son texnikumi — zamonaviy ta'lim muassasasi."}</p>

              <div className="about-details">
                <div className="about-detail-item">
                  <div className="about-detail-icon">📍</div>
                  <div className="about-detail-text">{homeData?.address || "Norin tumani, O'zbekiston"}</div>
                </div>
                <div className="about-detail-item">
                  <div className="about-detail-icon">📞</div>
                  <div className="about-detail-text">{homeData?.phone || '+998 90 000 00 00'}</div>
                </div>
                <div className="about-detail-item">
                  <div className="about-detail-icon">📧</div>
                  <div className="about-detail-text">{homeData?.email || 'norin1texnikum@edu.uz'}</div>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="about-image-card">
                {homeData?.imageFileId ? (
                  <img src={getImageUrl(homeData.imageFileId)} alt="Texnikum" className="about-image-real" />
                ) : (
                  <div className="about-image-card-inner">🏫</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="section section-alt" id="latest-news-section">
          <div className="container">
            <div className="section-header">
              <div className="section-overline">Eng so'nggi</div>
              <h2 className="section-title">Yangiliklar</h2>
              <p className="section-description">
                Texnikumimizdagi eng so'nggi yangiliklar va voqealar bilan tanishing
              </p>
            </div>

            <div className="card-grid">
              {latestNews.map((news, idx) => (
                <NewsCard key={news.id} news={news} index={idx} />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link to="/yangiliklar" className="btn btn-primary" id="view-all-news-btn">
                Barcha yangiliklar →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Directions Preview */}
      {directions.length > 0 && (
        <section className="section" id="directions-preview-section">
          <div className="container">
            <div className="section-header">
              <div className="section-overline">Bizda o'qing</div>
              <h2 className="section-title">Ta'lim yo'nalishlari</h2>
              <p className="section-description">
                Texnikumimizda quyidagi yo'nalishlar bo'yicha ta'lim olib boriladi
              </p>
            </div>

            <div className="card-grid">
              {directions.map((dir, idx) => (
                <div
                  key={dir.id}
                  className={`direction-card stagger-${(idx % 6) + 1}`}
                >
                  <div className="direction-card-icon">
                    {['🎓', '💻', '⚙️', '📐'][idx % 4]}
                  </div>
                  <h3 className="direction-card-name">{dir.name}</h3>
                  <p className="direction-card-description">
                    {dir.description?.substring(0, 150)}
                    {dir.description?.length > 150 ? '...' : ''}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link to="/yonalishlar" className="btn btn-secondary" id="view-all-directions-btn">
                Barcha yo'nalishlar →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Map / Address */}
      <section className="section section-alt" id="map-section">
        <div className="container">
          <div className="section-header">
            <div className="section-overline">Manzilimiz</div>
            <h2 className="section-title">Texnikum joylashuvi</h2>
          </div>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-placeholder-icon">📍</div>
              <div className="map-placeholder-text">
                {homeData?.address || "Norin tumani, O'zbekiston"}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
