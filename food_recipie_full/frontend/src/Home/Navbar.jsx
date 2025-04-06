import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
          position: 'sticky',
          top: '0',
          zIndex: '1000',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div className="container-fluid">

          {/* Brand Logo + Name */}
          <Link to="/" className="navbar-brand d-flex align-items-center" style={{ fontWeight: 'bold', color: '#333' }}>
            <img
              src="/log.jpg"
              alt="Logo"
              width="45"
              height="45"
              className="d-inline-block align-top me-2 rounded-circle"
            />
            <div style={{ lineHeight: '1rem' }}>
              <div style={{ fontSize: '1.1rem' }}>Recipe</div>
              <div style={{ fontSize: '0.9rem' }}>Corner</div>
            </div>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link text-dark fw-semibold">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/my-recipes" className="nav-link text-dark fw-semibold">Your Recipes</Link>
              </li>
              <li className="nav-item">
                <Link to="/favorite" className="nav-link text-dark fw-semibold">Favourites</Link>
              </li>
            </ul>

            {/* Login / Logout Button */}
            {/* Authentication Buttons */}
<div className="d-flex gap-2">
  {isAuthenticated ? (
    <button
      className="btn btn-outline-danger rounded-pill px-4 fw-semibold"
      onClick={handleLogout}
    >
      Logout
    </button>
  ) : (
    <>
      <Link
        to="/login"
        className="btn btn-outline-primary rounded-pill px-4 fw-semibold"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="btn btn-outline-success rounded-pill px-4 fw-semibold"
      >
        Register
      </Link>
    </>
  )}
</div>

          </div>
        </div>
      </nav>
    </>
  );
};
