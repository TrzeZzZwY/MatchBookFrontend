import HamburgerMenu from './HamburgerMenu';
import Logo from './Logo';
import './Navbar.scss';

export default function Navbar() {
  return (
    <div className="skew-flex nav-skew">
      <Logo />
      <div className="skew-flex info-skew">
        <div className="skew-text">
          <a className="nav-text" href="#">
            Test
          </a>{' '}
          &nbsp;{' '}
          <a className="nav-text" href="#">
            Test2
          </a>
        </div>
      </div>

        <HamburgerMenu />
    </div>
  );
}
