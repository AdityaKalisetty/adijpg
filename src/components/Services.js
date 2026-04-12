import '../styles/services.css';

export default function Services() {
  return (
    <section className="services" id="services">
      <h2>Services</h2>
      <div className="service-grid">
        <div className="service">
          <h3>Events</h3>
          <p>
            Capture the magic of your special events, from weddings and birthdays to corporate gatherings.
            I provide comprehensive event photography to document every moment.
          </p>
        </div>
        <div className="service">
          <h3>Sports</h3>
          <p>
            Action-packed sports photography for games, tournaments, and individual athletes.
            Fast-paced and dynamic shots that highlight performance and emotion.
          </p>
        </div>
        <div className="service">
          <h3>Portraits</h3>
          <p>
            Professional portrait sessions for individuals, families, and couples.
            Studio or on-location options to suit your style and needs.
          </p>
        </div>
        <div className="service">
          <h3>Seniors</h3>
          <p>
            Celebrate the milestone of graduation with senior portraits.
            Creative and personalized sessions to capture your unique personality.
          </p>
        </div>
      </div>
    </section>
  );
}