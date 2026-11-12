import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PetForm from '../components/PetForm.jsx';
import { get, put, getErrorMessage } from '../services/api.js';
import { ErrorMessage, Loading } from '../components/Status.jsx';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    get(`/listings/${id}`)
      .then((result) => { if (active) setListing(result.data); })
      .catch((err) => { if (active) setError(getErrorMessage(err)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  async function saveListing(values) {
    await put(`/listings/${id}`, values);
    navigate(`/listings/${id}`);
  }

  if (loading) return <Loading>Loading listing…</Loading>;
  if (error) return <section className="section"><ErrorMessage message={error} /></section>;
  if (!listing) return null;

  return (
    <section className="section form-section page-section">
      <div className="form-page-heading">
        <p className="eyebrow">KEEP THE DETAILS CURRENT</p>
        <h1>Edit Pet Listing</h1>
        <p>Update the information about {listing.name}.</p>
      </div>
      <PetForm key={listing._id} initialValue={listing} submitLabel="Save Changes" onSubmit={saveListing} />
      <p className="form-cancel"><Link className="secondary-btn" to={`/listings/${id}`}>Cancel</Link></p>
    </section>
  );
}
