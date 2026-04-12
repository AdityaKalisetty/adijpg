import '../styles/contact.css';

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <h2>Book a Session</h2>
      <form action="https://formspree.io/f/yourFormID" method="POST">
        <input name="name" placeholder="Your Name" required />
        <input name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Message" required />
        <button type="submit">Send Inquiry</button>
      </form>
    </section>
  );
}
