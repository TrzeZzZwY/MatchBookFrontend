import React, { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [navOpen, setNavOpen] = useState(false);
  const navBarRef = useRef<HTMLUListElement>(null);

  const handleNavItemClick = (id: string) => {
    setActiveItem(id);
    setNavOpen(false);
  };

  const handleLogoClick = () => {
    setActiveItem('home');
    setNavOpen(false);
  };

  const toggleHamburger = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    const closeNav = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-list') && !target.closest('.hamburger')) {
        setNavOpen(false);
      }
    };

    document.addEventListener('click', closeNav);
    return () => {
      document.removeEventListener('click', closeNav);
    };
  }, []);

  return (
    <nav className="nav">
      <Logo onLogoClick={handleLogoClick} />
      <div className="line"></div>
      <ul className={`nav-list ${navOpen ? 'nav-list--active' : ''}`} id="navbar" ref={navBarRef}>
        {['home', 'books', 'ratings', 'team'].map((id, index) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-item ${activeItem === id ? 'nav-item--active' : ''}`}
            data-id={id}
            onClick={() => handleNavItemClick(id)}
          >
            <li className="nav-link">
              <span>{`0${index}`}</span> {id.charAt(0).toUpperCase() + id.slice(1)}
            </li>
          </a>
        ))}
      </ul>
      <button
        className={`hamburger hamburger--arrow ${navOpen ? 'is-active' : ''}`}
        type="button"
        onClick={toggleHamburger}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
