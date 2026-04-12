import { Link } from 'react-router-dom';
import '../styles/hero.css';
import heroImg from '../assets/images/hero.jpg';

export default function Home() {
  return (
    <header className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="overlay"></div>
      <h1>adi_k.jpg</h1>
      <p>events | sports | portraits | groups</p>
      <div className="hero-actions">
        <Link to="/services" className="btn">Book a Session</Link>
        <Link to="/portfolio" className="btn btn-secondary">My Portfolio</Link>
      </div>
    </header>
  );
}
