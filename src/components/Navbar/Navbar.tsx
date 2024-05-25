import HamburgerMenu from './HamburgerMenu';
import Logo from './Logo';
import './Navbar.scss';
//import sun from heroicons
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <div className="skew-flex nav-skew">
      <Logo />
      <div className="skew-flex info-skew">
        <div className="skew-text">
          <a className="nav-text" href="#">
            <SunIcon className="inline h-6 w-6" strokeWidth="2" />
          </a>{' '}
          &nbsp;{' '}
          <a className="nav-text" href="#">
            <MoonIcon className="inline h-6 w-6" strokeWidth="2" />
          </a>
        </div>
      </div>

      <HamburgerMenu />
    </div>
  );
}
