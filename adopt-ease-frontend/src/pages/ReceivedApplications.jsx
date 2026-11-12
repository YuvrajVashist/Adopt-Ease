import { useEffect, useState } from 'react';
import { get, put, getErrorMessage } from '../services/api.js';
import { EmptyState, ErrorMessage, Loading } from '../components/Status.jsx';

export default function ReceivedApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState('');

  async function loadApplications() {
    const result = await get('/adoptions/received');
    setApplications(result.data || []);
  }

  useEffect(() => {
    loadApplications()
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(applicationId, action) {
    setError('');
    setBusyId(applicationId);
    try {
      await put(`/adoptions/${applicationId}/${action}`, {});
      await loadApplications();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyId('');
    }
  }

  return (
    <section className="section page-section">
      <div className="page-heading">
        <p className="eyebrow">YOUR PET LISTINGS</p>
        <h1>Received Applications</h1>
        <p>Review applications for your pets.</p>
      </div>
      <ErrorMessage message={error} />
      {loading ? <Loading /> : applications.length === 0 ? (
        <EmptyState title="No applications received" message="Applications will appear here when someone applies to adopt one of your pets." />
      ) : (
        <div className="application-grid">
          {applications.map((application) => {
            const canReview = application.status === 'Pending' && application.pet?.adoptionStatus === 'Available';
            return (
              <article className="application-card" key={application._id}>
                <h2>{application.pet?.name || 'Pet Unavailable'}</h2>
                <p><strong>Applicant:</strong> {application.applicant?.displayName || 'Unknown'}</p>
                <p><strong>Email:</strong> {application.applicant?.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {application.applicant?.phone || 'N/A'}</p>
                <p><strong>Living situation:</strong> {application.livingSituation}</p>
                <p><strong>Reason:</strong> {application.reason}</p>
                <p><strong>Experience:</strong> {application.experience}</p>
                <p><strong>Status:</strong> <span className={`status-${application.status?.toLowerCase()}`}>{application.status}</span></p>
                {canReview && (
                  <div className="card-actions">
                    <button className="primary-btn" disabled={busyId === application._id} onClick={() => updateStatus(application._id, 'approve')}>
                      {busyId === application._id ? 'Updating…' : 'Approve'}
                    </button>
                    <button className="danger-btn" disabled={busyId === application._id} onClick={() => updateStatus(application._id, 'reject')}>Reject</button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
