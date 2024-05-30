import Wrapper from '../Wrapper/Wrapper';
import './Footer.scss';
import '../Section/Section.scss';

export default function Footer() {
  return (
    <footer className="footerContainer mt-20 w-full">
      <div className="white-block white-block-dark"></div>

      <Wrapper>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between text-lg">
          <ul className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <li className="mr-0 md:mr-4 mb-2 md:mb-0">
              <a href="#" target="_blank" rel="noreferrer">
                O nas
              </a>
            </li>
            <li className="mr-0 md:mr-4 mb-2 md:mb-0">
              <a href="#" target="_blank" rel="noreferrer">
                Zarząd
              </a>
            </li>
            <li className="mr-0 md:mr-4 mb-2 md:mb-0">
              <a href="#" target="_blank" rel="noreferrer">
                Kariera
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noreferrer">
                FAQ
              </a>
            </li>
          </ul>
          <ul className="flex flex-col md:flex-row items-center">
            <li className="mr-0 md:mr-4 mb-2 md:mb-0">
              <a href="#" target="_blank" rel="noreferrer">
                Polityka prywatności
              </a>
            </li>
            <li className="mr-0 md:mr-4 mb-2 md:mb-0">
              <a href="#" target="_blank" rel="noreferrer">
                Regulamin
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noreferrer">
                Kontakt
              </a>
            </li>
          </ul>
        </div>
        <p className="my-5 text-center text-gray-300 ">
          &copy; 2024 MatchBook All rights reserved
        </p>
      </Wrapper>
    </footer>
  );
}
