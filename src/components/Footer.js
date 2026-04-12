import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} adi_k.jpg. All rights reserved.</p>
      <p>
        Follow me on <a href="https://www.instagram.com/adi_k.jpg/" target="_blank" rel="noreferrer">Instagram</a>
      </p>
    </footer>
  );
}
