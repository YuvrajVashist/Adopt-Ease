import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard.jsx';
import { EmptyState, ErrorMessage, Loading } from '../components/Status.jsx';
import { get, getErrorMessage } from '../services/api.js';

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    get('/listings/mine')
      .then((result) => setListings(result.data || []))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section page-section">
      <div className="page-heading">
        <p className="eyebrow">YOUR PETS</p>
        <h1>My Pet Listings</h1>
        <p>Manage the pets you have listed for adoption.</p>
      </div>
      <div className="section-action"><Link to="/listings/new" className="primary-btn">+ Add New Listing</Link></div>
      <ErrorMessage message={error} />
      {loading ? <Loading /> : listings.length === 0 ? (
        <EmptyState
          title="You haven't listed any pets yet."
          message="Give a pet the opportunity to find its forever home."
          action={<Link to="/listings/new" className="primary-btn">Create Your First Listing</Link>}
        />
      ) : (
        <div className="dog-grid">
          {listings.map((pet) => <PetCard key={pet._id} pet={pet} ownerView />)}
        </div>
      )}
    </section>
  );
}
