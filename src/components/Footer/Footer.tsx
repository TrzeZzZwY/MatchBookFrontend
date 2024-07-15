import Wrapper from '../Wrapper/Wrapper';
import './Footer.scss';
import '../Section/Section.scss';

export default function Footer() {
  return (
    <footer className="footerContainer mt-20 w-full bg-sunflower-50 dark:bg-sunflower-950">
      <div className="white-block white-block-dark"></div>

      <Wrapper>
        <div className="mt-10 flex flex-col items-center justify-between text-lg md:flex-row">
          <ul className="mb-4 flex flex-col items-center font-semibold md:mb-0 md:flex-row	">
            <li className="mb-2 mr-0 md:mb-0 md:mr-4">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-sunflower-700 hover:text-sunflower-600 dark:text-gray-300 dark:hover:text-sunflower-400"
              >
                O nas
              </a>
            </li>
            <li className="mb-2 mr-0 md:mb-0 md:mr-4">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-sunflower-700 hover:text-sunflower-600 dark:text-gray-300 dark:hover:text-sunflower-400"
              >
                Zarząd
              </a>
            </li>
            <li className="mb-2 mr-0 md:mb-0 md:mr-4">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-sunflower-700 hover:text-sunflower-600 dark:text-gray-300 dark:hover:text-sunflower-400"
              >
                Kariera
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-sunflower-700 hover:text-sunflower-600 dark:text-gray-300 dark:hover:text-sunflower-400"
              >
                FAQ
              </a>
            </li>
          </ul>
          <ul className="flex flex-col items-center font-semibold md:flex-row	">
            <li className="mb-2 mr-0 md:mb-0 md:mr-4">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-sunflower-700 hover:text-sunflower-600 dark:text-gray-300 dark:hover:text-sunflower-400"
              >
                Polityka prywatności
              </a>
            </li>
            <li className="mb-2 mr-0 md:mb-0 md:mr-4">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-sunflower-700 hover:text-sunflower-600 dark:text-gray-300 dark:hover:text-sunflower-400"
              >
                Regulamin
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-sunflower-700 hover:text-sunflower-600 dark:text-gray-300 dark:hover:text-sunflower-400"
              >
                Kontakt
              </a>
            </li>
          </ul>
        </div>
        <p className="my-5 text-center text-sunflower-800 dark:text-gray-200">
          &copy; 2024 MatchBook All rights reserved
        </p>
      </Wrapper>
    </footer>
  );
}
