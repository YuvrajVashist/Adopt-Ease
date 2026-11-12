import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { del, get, getErrorMessage } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { ErrorMessage, Loading } from '../components/Status.jsx';

const FALLBACK_IMAGE = 'https://placehold.co/800x600?text=Pet+Image';

export default function ListingDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    get(`/listings/${id}`)
      .then((result) => { if (active) setListing(result.data); })
      .catch((err) => { if (active) setError(getErrorMessage(err)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <Loading>Loading pet details…</Loading>;
  if (error) return <section className="section"><ErrorMessage message={error} /><Link to="/listings" className="secondary-btn">Back to listings</Link></section>;
  if (!listing) return null;

  const ownerId = listing.owner?._id || listing.owner;
  const isOwner = user && ownerId && String(ownerId) === String(user._id);

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    setDeleting(true);
    try {
      await del(`/listings/${id}`);
      navigate('/listings/my-listings', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
      setDeleting(false);
    }
  }

  return (
    <section className="section page-section">
      <div className="pet-detail-layout">
        <div className="pet-detail-image">
          <img src={listing.images?.[0] || FALLBACK_IMAGE} alt={listing.name} />
        </div>

        <div className="pet-detail-content">
          <span className="pet-badge">{listing.species}</span>
          <h1>{listing.name}</h1>
          <p className="pet-subtitle">{listing.breed}</p>

          <div className="pet-facts">
            <p><strong>Age:</strong> {listing.age} years</p>
            <p><strong>Gender:</strong> {listing.gender}</p>
            <p><strong>Location:</strong> {listing.location}</p>
            <p><strong>Health:</strong> {listing.healthStatus || 'Not specified'}</p>
            <p><strong>Vaccinated:</strong> {listing.vaccinationStatus ? 'Yes' : 'No'}</p>
            <p><strong>Status:</strong> {listing.adoptionStatus}</p>
          </div>

          <h2>About {listing.name}</h2>
          <p className="pet-description">{listing.description}</p>

          <div className="owner-information">
            <h3>Listed By</h3>
            <p>{listing.owner?.displayName || listing.owner?.email || 'Pet Owner'}</p>
          </div>

          <ErrorMessage message={error} />
          <div className="pet-actions">
            {isOwner ? (
              <>
                <Link to={`/listings/${id}/edit`} className="primary-btn">Edit Listing</Link>
                <button className="danger-btn" onClick={handleDelete} disabled={deleting}>
                  {deleting ? 'Deleting…' : 'Delete Listing'}
                </button>
              </>
            ) : listing.adoptionStatus === 'Available' ? (
              <Link to={`/adoptions/new/${id}`} className="primary-btn">Apply for Adoption</Link>
            ) : (
              <p>This pet is no longer available for adoption.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
