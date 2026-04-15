import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/services.css';

const importAll = (r) => r.keys().map((key) => r(key));

const soloImages = importAll(
  require.context('../assets/portfolio-web/solo', false, /\.(png|jpe?g|webp)$/)
);

const groupImages = importAll(
  require.context('../assets/portfolio-web/group', false, /\.(png|jpe?g|webp)$/)
);

const eventImages = importAll(
  require.context('../assets/portfolio-web/events', false, /\.(png|jpe?g|webp)$/)
);

export default function ServicesPage() {
  const services = useMemo(
    () => [
      {
        id: 'solo',
        label: 'Solo',
        price: '$30 / hour',
        meta: '15 edited photos, up to 2 outfits in the hour.',
        images: soloImages,
      },
      {
        id: 'group',
        label: 'Group',
        price: '$50 / hour',
        meta: '20 edited photos with flexible groupings.',
        images: groupImages,
      },
      {
        id: 'events',
        label: 'Events',
        price: '$70 / hour',
        meta: 'Photo count tailored to event length and pace.',
        images: eventImages,
      },
    ],
    []
  );

  const [indices, setIndices] = useState({ solo: 0, group: 0, events: 0 });
  const [activeCarousel, setActiveCarousel] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) => ({
        solo: (prev.solo + 1) % Math.max(soloImages.length, 1),
        group: (prev.group + 1) % Math.max(groupImages.length, 1),
        events: (prev.events + 1) % Math.max(eventImages.length, 1),
      }));
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!activeCarousel) return;
      if (event.key === 'Escape') {
        setActiveCarousel(null);
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => {
          const images = activeCarousel.images;
          return (prev + 1) % Math.max(images.length, 1);
        });
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => {
          const images = activeCarousel.images;
          return (prev - 1 + images.length) % Math.max(images.length, 1);
        });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCarousel]);

  const openCarousel = (service) => {
    setActiveCarousel(service);
    setActiveIndex(indices[service.id] ?? 0);
  };

  const cycleCarousel = (direction) => {
    if (!activeCarousel) return;
    setActiveIndex((prev) => {
      const total = Math.max(activeCarousel.images.length, 1);
      return direction === 'next' ? (prev + 1) % total : (prev - 1 + total) % total;
    });
  };

  return (
    <section className="services">
      <h2>Services + Pricing</h2>
      <div className="service-grid">
        {services.map((service) => {
          const activeIndex = indices[service.id] ?? 0;
          const activeImage = service.images[activeIndex];
          return (
            <div key={service.id} className="service service-link">
              <button
                type="button"
                className="service-media"
                onClick={() => openCarousel(service)}
                aria-label={`Open ${service.label} carousel`}
              >
                <span className="service-media-icon" aria-hidden="true">+</span>
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={`${service.label} featured`}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                ) : (
                  <div className="service-media-fallback">Featured photos coming soon</div>
                )}
              </button>
              <h3>{service.label}</h3>
              <p className="service-price">{service.price}</p>
              <p className="service-meta">{service.meta}</p>
              <Link className="service-cta" to={`/contact?service=${service.label}`}>
                Book this session
              </Link>
            </div>
          );
        })}
      </div>
      <p className="service-footnote">
        Need a custom package? I'm happy to build a session around your goals.
      </p>
      {activeCarousel && (
        <div
          className="service-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveCarousel(null)}
        >
          <div
            className="service-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="service-modal-nav prev"
              onClick={() => cycleCarousel('prev')}
              aria-label="Previous photo"
            >
              Prev
            </button>
            <div className="service-modal-frame">
              <img
                src={activeCarousel.images[activeIndex]}
                alt={`${activeCarousel.label} carousel`}
                decoding="async"
              />
            </div>
            <button
              type="button"
              className="service-modal-nav next"
              onClick={() => cycleCarousel('next')}
              aria-label="Next photo"
            >
              Next
            </button>
          </div>
          <button
            type="button"
            className="service-modal-close"
            onClick={() => setActiveCarousel(null)}
            aria-label="Close carousel"
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
}
