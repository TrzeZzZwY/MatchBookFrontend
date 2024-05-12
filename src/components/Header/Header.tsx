// Header.jsx
import React from 'react';
import './Header.css';
import '../_animations.css';
import Tiles from './Tiles';

export default function Header() {
  return (
    <header className="fullScreenImg ">
      <img
        src="https://picsum.photos/2800/1500"
        className="kenburns-top"
        alt="randomImg"
      />
    </header>
  );
}
