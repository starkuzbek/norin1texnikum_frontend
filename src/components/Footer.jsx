import { Link } from 'react-router-dom';

export default function Footer({ homeData }) {
  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>🏫 {homeData?.title || 'Norin tuman 1-son texnikumi'}</h3>
            <p>
              {homeData?.description?.substring(0, 200) ||
                "Norin tuman 1-son texnikumi — zamonaviy ta'lim muassasasi. Texnikumimizda yuqori malakali mutaxassislar tayyorlanadi."}
            </p>
          </div>

          <div className="footer-col">
            <h4>Sahifalar</h4>
            <Link to="/">Bosh sahifa</Link>
            <Link to="/yangiliklar">Yangiliklar</Link>
            <Link to="/oqituvchilar">O'qituvchilar</Link>
            <Link to="/yonalishlar">Yo'nalishlar</Link>
          </div>

          <div className="footer-col">
            <h4>Bog'lanish</h4>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📍</div>
              <span>{homeData?.address || "Norin tumani, O'zbekiston"}</span>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📞</div>
              <span>{homeData?.phone || '+998 90 000 00 00'}</span>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📧</div>
              <span>{homeData?.email || 'norin1texnikum@edu.uz'}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Norin tuman 1-son texnikumi. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
}
