import { Link } from 'react-router-dom';

export default function HeroSection({ homeData }) {
  return (
    <section className="hero" id="hero-section">
      <div className="container hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <div className="hero-badge-dot"></div>
            Rasmiy web sayt
          </div>
          <h1>
            {(homeData?.title || 'Norin tuman 1-son texnikumi').split(/(1-son texnikumi)/i).map((part, i) => 
              part.toLowerCase() === '1-son texnikumi' ? <span key={i}>{part}</span> : part
            )}
          </h1>
          <p className="hero-description">
            {homeData?.description ||
              "Norin tuman 1-son texnikumi — zamonaviy ta'lim muassasasi. Texnikumimizda yuqori malakali mutaxassislar tayyorlanadi va kelajak uchun kuchli kadrlar yetishtiriladi."}
          </p>
          <div className="hero-actions">
            <Link to="/yangiliklar" className="btn btn-primary" id="hero-news-btn">
              📰 Yangiliklar
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link to="/yonalishlar" className="btn btn-secondary" id="hero-directions-btn">
              🎓 Yo'nalishlar
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">{homeData?.students_count || '500+'}</div>
                <div className="hero-stat-label">O'quvchilar</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{homeData?.teachers_count || '50+'}</div>
                <div className="hero-stat-label">O'qituvchilar</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{homeData?.directions_count || '10+'}</div>
                <div className="hero-stat-label">Yo'nalishlar</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{homeData?.experience_years || '30+'}</div>
                <div className="hero-stat-label">Yillik tajriba</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
