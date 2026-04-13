import { useEffect, useState } from 'react';
import '../styles/portfolio.css';

const importAll = (r) => r.keys().map((key) => ({
  key,
  src: r(key),
}));

const images = importAll(
  require.context('../assets/images', false, /\.(png|jpe?g|webp)$/)
);

const portfolioImages = images.filter(({ key }) => !key.toLowerCase().includes('hero'));

const getSizeClass = (index) => {
  if (index % 10 === 0) return 'size-big';
  if (index % 6 === 0) return 'size-wide';
  if (index % 4 === 0) return 'size-tall';
  return 'size-standard';
};

const toAlt = (key) =>
  key
    .replace('./', '')
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ');

export default function PortfolioPage() {
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActivePhoto(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section className="portfolio">
      <h2>Portfolio</h2>
      <p className="portfolio-intro">
        Events, people, nature, and more!
      </p>
      <div className="portfolio-grid">
        {portfolioImages.map(({ key, src }, index) => {
          const altText = toAlt(key);
          return (
            <button
              key={key}
              type="button"
              className={`photo-card ${getSizeClass(index)}`}
              onClick={() => setActivePhoto({ src, alt: altText })}
              onTouchStart={() => setActivePhoto({ src, alt: altText })}
              aria-label={`Expand ${altText}`}
            >
              <img src={src} alt={altText} loading="lazy" />
            </button>
          );
        })}
      </div>
      {activePhoto && (
        <div className="portfolio-modal" role="dialog" aria-modal="true" onClick={() => setActivePhoto(null)}>
          <button
            type="button"
            className="portfolio-modal-content"
            onClick={(event) => event.stopPropagation()}
            aria-label="Expanded photo"
          >
            <img src={activePhoto.src} alt={activePhoto.alt} />
          </button>
          <button
            type="button"
            className="portfolio-modal-close"
            onClick={() => setActivePhoto(null)}
            aria-label="Close photo"
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
}
