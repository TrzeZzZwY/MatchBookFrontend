// Header.jsx
import React from 'react';
import './Header.scss';
import '../_animations.scss';

export default function Header() {
  return (
    <>
      <header className="fullScreenImg " id="home">
        <div className="hero-img kenburns-top"> </div>
      </header>

      <div className="hero-text p-2">
        <h1 data-aos="fade-up" data-aos-delay="50">
          Poznaj Match<span className="blue-text">Book</span>
        </h1>
        <p data-aos="fade-up" data-aos-delay="150">
          Aplikację, która pomoże Ci znaleźć idealną książkę dla Ciebie
        </p>
        <a
          href="#aboutus"
          className={`custom-button mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800`}
          data-aos="fade-up"
          data-aos-delay="250"
        >
          Dowiedz się więcej
        </a>{' '}
        <a href="#aboutus">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="fa-chevron-down bounce-top h-16 w-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </a>
      </div>
    </>
  );
}
