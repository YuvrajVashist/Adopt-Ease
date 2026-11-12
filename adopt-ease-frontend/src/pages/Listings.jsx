import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { get, getErrorMessage } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import PetCard from '../components/PetCard.jsx';
import { EmptyState, ErrorMessage, Loading } from '../components/Status.jsx';

const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [species, setSpecies] = useState(searchParams.get('species') || '');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setSpecies(searchParams.get('species') || '');
    setLoading(true);
    setError('');

    const query = searchParams.toString();
    get(`/listings${query ? `?${query}` : ''}`)
      .then((result) => setListings(result.data || []))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [searchParams]);

  function handleSearch(event) {
    event.preventDefault();
    const params = {};
    if (search.trim()) params.search = search.trim();
    if (species) params.species = species;
    setSearchParams(params);
  }

  return (
    <section className="section page-section">
      <div className="page-heading">
        <p className="eyebrow">MEET YOUR NEW COMPANION</p>
        <h1>Find Your New Best Friend</h1>
        <p>Every pet deserves a loving home. Find yours today.</p>
      </div>

      <form className="toolbar listing-toolbar" onSubmit={handleSearch}>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, breed or location…"
          aria-label="Search pets"
        />
        <select value={species} onChange={(event) => setSpecies(event.target.value)} aria-label="Filter by species">
          <option value="">All Animals</option>
          {speciesOptions.map((item) => <option key={item} value={item}>{item}s</option>)}
        </select>
        <button className="primary-btn" type="submit">Search</button>
        {(searchParams.has('search') || searchParams.has('species')) && (
          <button className="secondary-btn" type="button" onClick={() => { setSearch(''); setSpecies(''); setSearchParams({}); }}>
            Clear
          </button>
        )}
      </form>

      {user && <div className="section-action"><Link to="/listings/new" className="primary-btn">+ List a Pet</Link></div>}

      <ErrorMessage message={error} />
      {loading ? <Loading>Finding pets…</Loading> : listings.length === 0 ? (
        <EmptyState title="No pets found" message="Try changing your search or filters." />
      ) : (
        <div className="dog-grid">
          {listings.map((pet) => <PetCard key={pet._id} pet={pet} />)}
        </div>
      )}
    </section>
  );
}
