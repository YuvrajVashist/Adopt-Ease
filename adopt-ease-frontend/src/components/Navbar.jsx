import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo" aria-label="AdoptEase home">
        <span aria-hidden="true">🐾</span> Adopt-Ease
      </Link>

      <nav aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/listings">Animal Listings</NavLink>

        {!loading && user && (
          <>
            <NavLink to="/listings/new">List a Pet</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <button className="secondary-btn nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {!loading && !user && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink className="primary-btn nav-cta" to="/register">Sign Up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
