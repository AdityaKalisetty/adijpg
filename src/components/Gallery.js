import '../styles/gallery.css';
import p1 from '../assets/images/photo1.jpg';
import p2 from '../assets/images/photo2.jpg';
import p3 from '../assets/images/photo3.jpg';
import p4 from '../assets/images/photo4.jpg';

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <h2>Portfolio</h2>
      <div className="grid">
        <img src={p1} alt="" />
        <img src={p2} alt="" />
        <img src={p3} alt="" />
        <img src={p4} alt="" />
      </div>
    </section>
  );
}
