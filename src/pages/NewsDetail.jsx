import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsById, getImageUrl } from '../api/api';

const categoryLabels = {
  texnikum_hayoti: 'Texnikum hayoti',
  oquvchilar_yutuqlari: "O'quvchilar yutuqlari",
  oqituvchilar_yutuqlari: "O'qituvchilar yutuqlari",
  fan: 'Fan',
  sport: 'Sport',
};

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      try {
        const data = await fetchNewsById(id);
        setNews(data);
      } catch (err) {
        setError('Yangilik topilmadi');
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, [id]);

  if (loading) {
    return (
      <div className="news-detail">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <div className="loading-text">Yuklanmoqda...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="news-detail">
        <div className="container news-detail-container">
          <Link to="/yangiliklar" className="news-detail-back">
            ← Yangiliklarga qaytish
          </Link>
          <div className="empty-state">
            <div className="empty-state-icon">😔</div>
            <div className="empty-state-text">{error || 'Yangilik topilmadi'}</div>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(news.imageFileId);
  const categoryLabel = categoryLabels[news.category] || news.category;

  return (
    <div className="news-detail animate-fade-in" id="news-detail-page">
      <div className="container news-detail-container">
        <Link to="/yangiliklar" className="news-detail-back" id="news-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Yangiliklarga qaytish
        </Link>

        {imageUrl && (
          <div className="news-detail-image">
            <img src={imageUrl} alt={news.title} />
          </div>
        )}

        <div className="news-detail-meta">
          <span className="news-detail-category">{categoryLabel}</span>
          <span className="news-detail-date">📅 {news.date}</span>
        </div>

        <h1 className="news-detail-title">{news.title}</h1>

        <div className="news-detail-content">
          {news.content || news.summary}
        </div>
      </div>
    </div>
  );
}
