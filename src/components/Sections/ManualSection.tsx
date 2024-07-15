import React, { useState } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import '../Section/Section.scss';
import ManualButtons from '../Buttons/ManualButtons';
import ManualTabContent from '../Section/ManualTabContent';
import tabContent from './tabContent.ts';

const ManualSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('step1');

  const handleSelect = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const currentTabContent = tabContent.find(
    (_, index) => `step${index + 1}` === selectedTab,
  );

  return (
    <Wrapper>
      <section className="mt-10" id="manual">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <h3 className="mx-3 min-w-80 text-center text-3xl font-bold text-sunflower-800 md:text-left md:text-4xl dark:text-sunflower-50">
            Jak używać aplikacji?
          </h3>
          <p className="mx-3 text-center font-semibold text-sunflower-600 md:text-left md:text-base xl:max-w-4xl dark:text-sunflower-300	">
            Aplikacja jest bardzo prosta w obsłudze. Wystarczy, że Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quae eveniet, in
            corporis aut ducimus veniam amet eos aperiam placeat, quibusdam quia
            quisquam quas rem iure!
          </p>
        </div>
        <div className="mt-10 flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
          <ManualButtons
            tabContent={tabContent}
            selectedTab={selectedTab}
            handleSelect={handleSelect}
          />

          <div className="flex w-full flex-1 flex-col md:flex-row md:justify-between">
            {currentTabContent && (
              <ManualTabContent
                title={currentTabContent.title}
                description={currentTabContent.description}
                imgSrc={currentTabContent.imgSrc}
              />
            )}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default ManualSection;
