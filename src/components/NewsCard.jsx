import { Link } from 'react-router-dom';
import { getImageUrl } from '../api/api';

const categoryLabels = {
  texnikum_hayoti: 'Texnikum hayoti',
  oquvchilar_yutuqlari: "O'quvchilar yutuqlari",
  oqituvchilar_yutuqlari: "O'qituvchilar yutuqlari",
  fan: 'Fan',
  sport: 'Sport',
};

export default function NewsCard({ news, index = 0 }) {
  const imageUrl = getImageUrl(news.imageFileId);
  const categoryLabel = categoryLabels[news.category] || news.category;

  return (
    <article
      className={`news-card stagger-${(index % 6) + 1}`}
      id={`news-card-${news.id}`}
    >
      <div className="news-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={news.title} loading="lazy" />
        ) : (
          <div className="news-card-placeholder">📰</div>
        )}
        <div className="news-card-category">{categoryLabel}</div>
      </div>

      <div className="news-card-body">
        <div className="news-card-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {news.date}
        </div>
        <h3 className="news-card-title">{news.title}</h3>
        <p className="news-card-summary">{news.summary}</p>
        <Link to={`/yangiliklar/${news.id}`} className="news-card-link">
          To'liq o'qish
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </article>
  );
}
