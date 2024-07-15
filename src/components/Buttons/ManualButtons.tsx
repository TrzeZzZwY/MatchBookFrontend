import React from 'react';
import ManualButton from './ManualButton';

interface ManualButtonsProps {
  tabContent: { title: string; description: string; imgSrc: string }[];
  selectedTab: string;
  handleSelect: (tabName: string) => void;
}

const ManualButtons: React.FC<ManualButtonsProps> = ({
  tabContent,
  selectedTab,
  handleSelect,
}) => {
  return (
    <div className="flex flex-none flex-row justify-center space-x-4 md:flex-col md:justify-normal md:space-x-0">
      {tabContent.map((_, index) => (
        <ManualButton
          key={index}
          index={index}
          isActive={`step${index + 1}` === selectedTab}
          onClick={() => handleSelect(`step${index + 1}`)}
        />
      ))}
    </div>
  );
};

export default ManualButtons;
