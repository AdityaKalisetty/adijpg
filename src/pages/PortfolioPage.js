import { useEffect, useState } from 'react';
import '../styles/portfolio.css';

const importAll = (r) => r.keys().map((key) => ({
  key,
  src: r(key),
}));

const categoryImages = {
  people: importAll(
    require.context('../assets/images/people', false, /\.(png|jpe?g|webp)$/)
  ),
  nature: importAll(
    require.context('../assets/images/nature', false, /\.(png|jpe?g|webp)$/)
  ),
  abstract: importAll(
    require.context('../assets/images/abstract', false, /\.(png|jpe?g|webp)$/)
  ),
};

const filterOptions = [
  { id: 'everything', label: 'Everything' },
  { id: 'people', label: 'People' },
  { id: 'nature', label: 'Nature' },
  { id: 'abstract', label: 'Abstract' },
];

const portfolioImages = Object.entries(categoryImages)
  .flatMap(([category, images]) =>
    images.map((image) => ({
      ...image,
      category,
    }))
  )
  .filter(({ key }) => !key.toLowerCase().includes('hero'));

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
  const [activeFilter, setActiveFilter] = useState('everything');

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActivePhoto(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredImages = portfolioImages.filter(
    (image) => activeFilter === 'everything' || image.category === activeFilter
  );

  return (
    <section className="portfolio">
      <h2>Portfolio</h2>
      <p className="portfolio-intro">
        Browse the full collection or filter by people, nature, and abstract work.
      </p>
      <div className="portfolio-filters" aria-label="Portfolio filters">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`portfolio-filter ${activeFilter === option.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="portfolio-grid">
        {filteredImages.map(({ key, src }, index) => {
          const altText = toAlt(key);
          return (
            <button
              key={key}
              type="button"
              className={`photo-card ${getSizeClass(index)}`}
              onClick={() => setActivePhoto({ src, alt: altText })}
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
            ×
          </button>
        </div>
      )}
    </section>
  );
}
