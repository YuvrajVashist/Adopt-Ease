import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, post, getErrorMessage } from '../services/api.js';
import { ErrorMessage, Loading } from '../components/Status.jsx';

export default function NewApplication() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ reason: '', livingSituation: '', experience: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    get(`/listings/${petId}`)
      .then((result) => { if (active) setPet(result.data); })
      .catch((err) => { if (active) setError(getErrorMessage(err)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [petId]);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await post(`/adoptions/${petId}`, form);
      navigate('/adoptions/my-applications', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Loading>Loading pet…</Loading>;
  if (!pet) return <section className="section"><ErrorMessage message={error || 'Pet not found.'} /></section>;

  return (
    <section className="section form-section page-section">
      <div className="form-page-heading">
        <p className="eyebrow">TAKE THE NEXT STEP</p>
        <h1>Apply to Adopt {pet.name}</h1>
        <p>Tell the owner why you would be a good match for {pet.name}.</p>
      </div>

      <form className="dog-form application-form" onSubmit={handleSubmit}>
        <ErrorMessage message={error} />
        <div className="field">
          <label htmlFor="reason">Why do you want to adopt this pet?</label>
          <textarea id="reason" name="reason" rows="5" maxLength="1000" value={form.reason} onChange={update} required />
        </div>
        <div className="field">
          <label htmlFor="livingSituation">Living situation</label>
          <select id="livingSituation" name="livingSituation" value={form.livingSituation} onChange={update} required>
            <option value="">Select</option>
            {['Apartment', 'Independent House', 'Farmhouse', 'Other'].map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="experience">Previous pet experience</label>
          <textarea id="experience" name="experience" rows="4" value={form.experience} onChange={update} required />
        </div>
        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit Application'}
        </button>
      </form>
    </section>
  );
}
