import { Link } from 'react-router-dom';

const FALLBACK_IMAGE = 'https://placehold.co/600x400?text=Pet+Image';

export default function PetCard({ pet, ownerView = false }) {
  const image = pet.images?.[0] || FALLBACK_IMAGE;

  return (
    <article className="dog-card">
      <img src={image} alt={pet.name} loading="lazy" />
      <div className="dog-card-content">
        <span className="pet-badge">{ownerView ? pet.adoptionStatus : pet.species}</span>
        <h3>{pet.name}</h3>
        <p>{pet.breed} · {pet.age} {pet.age === 1 ? 'year' : 'years'}</p>
        <p>{pet.location}</p>
        <div className="card-actions">
          <Link className="primary-btn" to={`/listings/${pet._id}`}>View Details</Link>
          {ownerView && (
            <Link className="secondary-btn" to={`/listings/${pet._id}/edit`}>Edit</Link>
          )}
        </div>
      </div>
    </article>
  );
}
