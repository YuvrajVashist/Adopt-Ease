import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">PET ADOPTION, MADE SIMPLE</p>
        <h1>Find a friend.<span>Change a life.</span></h1>
        <p>
          Meet animals looking for a safe, caring home. Browse adoption listings,
          learn their stories, and take the first step towards a new friendship.
        </p>
        <div className="hero-actions">
          <Link to="/listings" className="primary-btn">Find a Pet</Link>
          <Link to="/register" className="secondary-btn">Join Adopt-Ease</Link>
        </div>
      </div>
    </section>
  );
}
