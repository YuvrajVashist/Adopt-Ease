import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get, getErrorMessage } from '../services/api.js';
import { EmptyState, ErrorMessage, Loading } from '../components/Status.jsx';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    get('/adoptions/mine')
      .then((result) => setApplications(result.data || []))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section page-section">
      <div className="page-heading">
        <p className="eyebrow">YOUR ADOPTION JOURNEY</p>
        <h1>My Adoption Applications</h1>
        <p>Track the status of your applications.</p>
      </div>
      <ErrorMessage message={error} />
      {loading ? <Loading /> : applications.length === 0 ? (
        <EmptyState title="No applications yet" message="You haven't applied to adopt a pet." action={<Link to="/listings" className="primary-btn">Browse Pets</Link>} />
      ) : (
        <div className="application-grid">
          {applications.map((application) => (
            <article className="application-card" key={application._id}>
              <h2>{application.pet?.name || 'Pet Unavailable'}</h2>
              <p>Status: <strong className={`status-${application.status?.toLowerCase()}`}>{application.status}</strong></p>
              <p>Applied: {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'Date unavailable'}</p>
              <p>{application.reason}</p>
              {application.pet && <Link className="primary-btn" to={`/listings/${application.pet._id}`}>View Pet</Link>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
