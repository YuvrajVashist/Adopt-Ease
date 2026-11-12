import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div>
          <strong>🐾 Adopt-Ease</strong>
          <p>Helping animals find loving homes, one adoption at a time.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/listings">Find a Pet</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
      <p>© {new Date().getFullYear()} AdoptEase. All rights reserved.</p>
    </footer>
  );
}
