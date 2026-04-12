import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/contact.css';

export default function ContactPage() {
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    if (service) {
      setMessage(`I'm interested in the ${service} session. My goals are:`);
    }
  }, [location.search]);

  return (
    <section className="contact">
      <h2>Book a Session</h2>
      <form action="https://formspree.io/f/yourFormID" method="POST">
        <input name="name" placeholder="Your Name" required />
        <input name="email" placeholder="Your Email" required />
        <textarea
          name="message"
          placeholder="Tell me about your event or vision"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
        <button type="submit">Send Inquiry</button>
      </form>
    </section>
  );
}
