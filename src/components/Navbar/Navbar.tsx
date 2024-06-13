import HamburgerMenu from './HamburgerMenu';
import Logo from './Logo';
import './Navbar.scss';
import { BookOpenIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="nav">
       <div className="logoContainer">
        <a href="#home" className="navbar-brand">
          <BookOpenIcon className="logo-icon h-12 w-12" />
          <p>
            Match<span>book</span>
          </p>
        </a>
      </div>
      <div className="line"></div>
      <ul className="nav-list" id="navbar">
        <a href="#home" className="nav-item nav-item--active" data-id="home">
          <li className="nav-link">
            <span>00</span> Home
          </li>
        </a>
        <a href="#books" className="nav-item" data-id="books">
          <li className="nav-link">
            <span>01</span> Books
          </li>
        </a>
        <a href="#ratings" className="nav-item" data-id="ratings">
          <li className="nav-link">
            <span>02</span> Ratings
          </li>
        </a>
        <a href="#team" className="nav-item" data-id="team">
          <li className="nav-link">
            <span>03</span> Team
          </li>
        </a>
      </ul>
      <button className="hamburger hamburger--arrow" type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </nav>
  );
}
