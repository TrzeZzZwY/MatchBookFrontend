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

  return (
    <>
      <header className="fullScreenImg overflow-hidden" id="home">
        <div className="hero-img kenburns-top"> </div>
      </header>

      <div className="absolute left-0 top-0 flex h-screen w-full flex-row">
        <div className="w-full p-4 md:w-1/2">
          <div className="hero-text mt-5 p-2 sm:mt-0">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl">
              Poznaj <span className="text-blue-500">niesamowitą</span>{' '}
              aplikację
            </h1>
            <p className="text-base lg:text-lg xl:text-xl">
              która pomoże Ci znaleźć idealną
              <br /> książkę dla Ciebie!
            </p>
          </div>
        </div>
        <div className="hidden w-1/2 p-4 md:block">
          <div className="phoneContainer">
            <DevicePhoneMobileIcon className="mobilePhone" strokeWidth=".4" />
            <BookOpenIcon className="bookIcon" strokeWidth="1.4" />
            <h2 className="bookText text-2xl lg:text-3xl 2xl:text-5xl">
              Match<span className="text-blue-500">Book</span>
            </h2>
          </div>
        </div>
      </div>
      <a href="#action">
        <ChevronDoubleDownIcon className="fa-chevron-down bounce-top h-12 w-12" />
      </a>
      <div className="white-block white-block-left"></div>
    </>
  );
}
