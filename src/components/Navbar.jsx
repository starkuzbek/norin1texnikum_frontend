import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const links = [
    { path: '/', label: 'Bosh sahifa' },
    { path: '/yangiliklar', label: 'Yangiliklar' },
    { path: '/oqituvchilar', label: "O'qituvchilar" },
    { path: '/yonalishlar', label: "Yo'nalishlar" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="main-navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="Norin 1-Texnikum" className="navbar-logo-img" />
          <div>
            <div className="navbar-title">Norin tuman 1-son texnikumi</div>
            <div className="navbar-subtitle">Bilim maskani</div>
          </div>
        </Link>

        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
              id={`nav-link-${link.path.replace('/', '') || 'home'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="navbar-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
          id="mobile-menu-toggle"
        >
          <span></span>
        </button>
      </div>
    </nav>
  );
}
