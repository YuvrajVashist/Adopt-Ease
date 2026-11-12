import { useNavigate, Link } from 'react-router-dom';
import PetForm from '../components/PetForm.jsx';
import { post } from '../services/api.js';

export default function NewListing() {
  const navigate = useNavigate();

  async function createListing(values) {
    const result = await post('/listings', values);
    navigate(`/listings/${result.data._id}`);
  }

  return (
    <section className="section form-section page-section">
      <div className="form-page-heading">
        <p className="eyebrow">GIVE AN ANIMAL A HOME</p>
        <h1>List a Pet for Adoption</h1>
        <p>Help your pet find a loving forever home.</p>
      </div>
      <PetForm submitLabel="Publish Listing" onSubmit={createListing} />
      <p className="form-cancel"><Link className="secondary-btn" to="/listings">Cancel</Link></p>
    </section>
  );
}
