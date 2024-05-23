import { useSpring, animated } from '@react-spring/web';
import './Header.scss';
import '../_animations.scss';

export default function Header() {
  //animmation for header
  const [headerAnimation] = useSpring(() => ({
    from: { opacity: 0, translateY: -20 },
    to: { opacity: 1, translateY: 0 },
    delay: 100,
  }));

  const [paragraphAnimation] = useSpring(() => ({
    from: { opacity: 0, translateY: -20 },
    to: { opacity: 1, translateY: 0 },
    delay: 300,
  }));

  const [buttonAnimation] = useSpring(() => ({
    from: { opacity: 0, translateY: -20 },
    to: { opacity: 1, translateY: 0 },
    delay: 500,
  }));

  return (
    <>
      <header className="fullScreenImg " id="home">
        <div className="hero-img kenburns-top"> </div>
      </header>

      <div className="hero-text p-2">
        <animated.h1
          style={{
            ...headerAnimation,
          }}
        >
          Poznaj Match<span className="blue-text">Book</span>
        </animated.h1>
        <animated.p
          style={{
            ...paragraphAnimation,
          }}
        >
          Aplikację, która pomoże Ci znaleźć idealną książkę dla Ciebie
        </animated.p>
        <animated.a
          href="#aboutus"
          className={`custom-button mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800`}
          style={{
            ...buttonAnimation,
          }}
        >
          Dowiedz się więcej
        </animated.a>
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
