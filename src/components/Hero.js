import '../styles/hero.css';
import heroImg from '../assets/images/hero.jpg';

export default function Hero() {
  return (
    <header className="hero" id="home" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="overlay"></div>
      <h1>Aditya Photography</h1>
      <p>Commissions for Events | Sports | Portraits | Seniors</p>
      <a href="#contact" className="btn">Book a Session</a>
    </header>
  );
}
