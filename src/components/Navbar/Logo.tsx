import React from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';

interface LogoProps {
  onLogoClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ onLogoClick }) => {
  return (
    <div className="logoContainer" onClick={onLogoClick}>
      <a href="#home" className="navbar-brand">
        <BookOpenIcon className="logo-icon h-12 w-12 text-sunflower-50" />
        <p className='text-sunflower-50'>
          Match<span className='text-sunflower-500'>book</span>
        </p>
      </a>
    </div>
  );
};

export default Logo;
