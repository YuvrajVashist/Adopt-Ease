import { useState } from 'react';
import { ErrorMessage } from './Status.jsx';

const emptyPet = {
  name: '', species: '', breed: '', age: '', gender: '', location: '',
  image: '', healthStatus: '', vaccinationStatus: 'false', description: '',
};

export default function PetForm({ initialValue = emptyPet, submitLabel, onSubmit }) {
  const [form, setForm] = useState(() => ({
    ...emptyPet,
    ...initialValue,
    age: initialValue.age ?? '',
    image: initialValue.image ?? initialValue.images?.[0] ?? '',
    vaccinationStatus: String(Boolean(initialValue.vaccinationStatus)),
  }));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSubmit({ ...form, age: Number(form.age) });
    } catch (err) {
      setError(err.message || 'Could not save the listing.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="dog-form pet-form" onSubmit={handleSubmit}>
      <ErrorMessage message={error} />

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Pet name</label>
          <input id="name" name="name" value={form.name} onChange={update} required />
        </div>

        <div className="field">
          <label htmlFor="species">Species</label>
          <select id="species" name="species" value={form.species} onChange={update} required>
            <option value="">Select species</option>
            {['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="breed">Breed</label>
          <input id="breed" name="breed" value={form.breed} onChange={update} required />
        </div>

        <div className="field">
          <label htmlFor="age">Age (years)</label>
          <input id="age" name="age" type="number" min="0" max="100" step="1" value={form.age} onChange={update} required />
        </div>

        <div className="field">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={form.gender} onChange={update} required>
            <option value="">Select gender</option>
            {['Male', 'Female', 'Unknown'].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <input id="location" name="location" value={form.location} onChange={update} required />
        </div>

        <div className="field">
          <label htmlFor="image">Image URL</label>
          <input id="image" name="image" type="url" value={form.image} onChange={update} placeholder="https://example.com/pet.jpg" />
        </div>

        <div className="field">
          <label htmlFor="healthStatus">Health status</label>
          <input id="healthStatus" name="healthStatus" value={form.healthStatus} onChange={update} placeholder="Healthy, recovering, etc." />
        </div>

        <div className="field">
          <label htmlFor="vaccinationStatus">Vaccinated?</label>
          <select id="vaccinationStatus" name="vaccinationStatus" value={form.vaccinationStatus} onChange={update}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" maxLength="2000" value={form.description} onChange={update} required placeholder="Tell potential adopters about this pet…" />
      </div>

      <div className="form-actions">
        <button className="primary-btn" type="submit" disabled={saving}>
          {saving ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
