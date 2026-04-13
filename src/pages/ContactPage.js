import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../styles/contact.css';

export default function ContactPage() {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    if (service) {
      setMessage(`I'm interested in the ${service} session. My goals are:`);
    }
  }, [location.search]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    const templateParams = {
      name,
      email,
      message,
    };

    try {
      await emailjs.send(
        'service_fbjgxf9',
        'template_eb7akz6',
        templateParams,
        'RWrJCtTEy9WqTS-pv'
      );
      await emailjs.send(
        'service_fbjgxf9',
        'template_u0hhq64',
        templateParams,
        'RWrJCtTEy9WqTS-pv'
      );
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="contact">
      <h2>Book a Session</h2>
      <p className="contact-alt">
        or dm me on instagram! <a href="https://www.instagram.com/adi_k.jpg/" target="_blank" rel="noreferrer">@adi_k.jpg</a>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <textarea
          name="message"
          placeholder="Tell me about your event or vision"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
        </button>
        {status === 'sent' && (
          <p className="contact-status">Thanks! Your message was sent.</p>
        )}
        {status === 'error' && (
          <p className="contact-status error">Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  );
}
