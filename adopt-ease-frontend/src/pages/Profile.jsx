import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();

  return (
    <section className="section page-section">
      <div className="page-heading">
        <p className="eyebrow">YOUR ACCOUNT</p>
        <h1>Welcome, {user?.displayName || user?.email}!</h1>
        <p>Manage your account and adoption activities.</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar" aria-hidden="true">🐾</div>
        <div className="profile-details">
          <h2>{user?.displayName || 'Adopt-Ease Member'}</h2>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
          <p>{user?.address}</p>
          <span className="role-badge">{user?.role}</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <Link to="/listings/my-listings" className="dashboard-card">
          <span>🏠</span><h3>My Listings</h3><p>Manage your pet listings.</p>
        </Link>
        <Link to="/adoptions/my-applications" className="dashboard-card">
          <span>📋</span><h3>My Applications</h3><p>Track your adoption applications.</p>
        </Link>
        <Link to="/adoptions/received" className="dashboard-card">
          <span>🐾</span><h3>Received Applications</h3><p>Review applications for your pets.</p>
        </Link>
        <Link to="/listings/new" className="dashboard-card">
          <span>➕</span><h3>Create Listing</h3><p>List a new pet for adoption.</p>
        </Link>
      </div>
    </section>
  );
}
