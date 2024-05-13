import classNames from 'classnames';
import { useState } from 'react';

export default function HambugerMenu() {
  const [opened, setOpened] = useState(false);

  const toggleMenu = () => {
    setOpened(!opened);
  };

  return (
    <div className="hamburger-menu">
      <div
        className={classNames(`tham tham-e-arrow-turn tham-w-12`, {
          'tham-active': opened,
        })}
        onClick={toggleMenu}
      >
        <div className="tham-box">
          <div className="tham-inner" />
        </div>
      </div>
    </div>
  );
}
