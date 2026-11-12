import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ErrorMessage } from '../components/Status.jsx';

export default function Login() {
  const { user, loading: authLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!authLoading && user) return <Navigate to="/profile" replace />;

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname || '/profile', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section form-section auth-page">
      <div className="auth-heading">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login to Adopt-Ease</h1>
        <p>Sign in to manage your listings and track your adoption applications.</p>
      </div>

      <form className="dog-form auth-form" onSubmit={handleSubmit}>
        <ErrorMessage message={error} />
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} placeholder="you@example.com" required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={update} placeholder="Enter your password" required />
        </div>
        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Login'}
        </button>
        <p className="auth-switch">Don't have an account? <Link to="/register">Create an account</Link></p>
      </form>
    </section>
  );
}
