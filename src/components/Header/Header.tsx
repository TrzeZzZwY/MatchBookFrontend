// Header.jsx or .tsx
import { useSpring, animated } from '@react-spring/web';
import './Header.scss';
import '../Section/Section.scss';
import '../_animations.scss';
import {
  ChevronDoubleDownIcon,
  DevicePhoneMobileIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

export default function Header() {
  // Animation for header
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

  return (
    <>
      <header className="fullScreenImg overflow-hidden" id="home">
        <div className="hero-img kenburns-top"> </div>
      </header>

      <div className="absolute left-0 top-0 flex h-screen w-full flex-row">
        <div className="w-full p-4 md:w-1/2">
          <div className="hero-text mt-5 p-2 sm:mt-0">
            <animated.h1
              style={headerAnimation}
              className="text-2xl lg:text-3xl xl:text-4xl text-sunflower-50 dark:text-sunflower-100"
            >
              Poznaj <span className="text-sunflower-500 dark:text-sunflower-600">niesamowitą</span>{' '}
              aplikację
            </animated.h1>
            <animated.p
              style={paragraphAnimation}
              className="text-base lg:text-lg xl:text-xl text-sunflower-200 dark:text-sunflower-300"
            >
              która pomoże Ci znaleźć idealną
              <br /> książkę dla Ciebie!
            </animated.p>
          </div>
        </div>
        <div className="hidden w-1/2 p-4 md:block">
          <div className="phoneContainer text-sunflower-50 dark:text-sunflower-150">
            <DevicePhoneMobileIcon className="mobilePhone" strokeWidth=".4" />
            <BookOpenIcon className="bookIcon" strokeWidth="1.4" />
            <h2 className="bookText text-2xl lg:text-3xl 2xl:text-4xl">
              Match<span className="text-sunflower-500 dark:text-sunflower-600">Book</span>
            </h2>
          </div>
        </div>
      </div>
      <a href="#action">
        <ChevronDoubleDownIcon className="fa-chevron-down bounce-top h-12 w-12 text-sunflower-900 dark:text-sunflower-50" />
      </a>
      <div className="white-block white-block-left dark:bg-slate-500"></div>
    </>
  );
}
