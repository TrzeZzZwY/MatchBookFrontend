import React from 'react';
import './Buttons.scss';
interface ManualButtonProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const ManualButton: React.FC<ManualButtonProps> = ({
  index,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`my-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border text-lg transition-all duration-300 ease-in-out sm:h-20 sm:w-20 sm:text-2xl 2xl:h-24 2xl:w-24 2xl:text-4xl
        ${
          isActive
            ? 'blueBackround'
            : 'hover:opacity-100 hover:opacity-1 border-opacity-30 darkBackground opacity-80'
        }`}
      onClick={onClick}
    >
      {index + 1}
    </div>
  );
};

export default ManualButton;
