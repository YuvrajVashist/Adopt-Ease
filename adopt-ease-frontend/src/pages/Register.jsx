import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ErrorMessage } from '../components/Status.jsx';

const initialForm = { username: '', email: '', password: '', phone: '', address: '' };

export default function Register() {
  const { user, loading: authLoading, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
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
      await register(form);
      navigate('/profile', { replace: true });
    } catch (err) {
      setError(err.message || 'Could not create your account.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section form-section auth-page">
      <div className="auth-heading">
        <p className="eyebrow">JOIN OUR COMMUNITY</p>
        <h1>Create Your Account</h1>
        <p>Join Adopt-Ease and help animals find their forever homes.</p>
      </div>

      <form className="dog-form auth-form" onSubmit={handleSubmit}>
        <ErrorMessage message={error} />
        <div className="form-grid">
          <div className="field">
            <label htmlFor="username">Full name</label>
            <input id="username" name="username" value={form.username} onChange={update} minLength="3" maxLength="80" autoComplete="name" placeholder="Enter your name" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" placeholder="you@example.com" required />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={update} maxLength="20" autoComplete="tel" required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={update} minLength="8" autoComplete="new-password" placeholder="At least 8 characters" required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" rows="3" value={form.address} onChange={update} maxLength="300" autoComplete="street-address" placeholder="Enter your city and address" required />
        </div>
        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create Account'}
        </button>
        <p className="auth-switch">Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </section>
  );
}
