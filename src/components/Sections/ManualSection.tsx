import React, { useState } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import '../Section/Section.scss';
import ManualButton from '../Buttons/ManualButton';

import image1 from '../../assets/img/1.jpg';
import image2 from '../../assets/img/2.png';
import image3 from '../../assets/img/3.png';
import image4 from '../../assets/img/4.jpg';

const tabContent = [
  {
    title: 'Krok 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias, quas, voluptas, quia quae doloribus quibusdam perspiciatis autem quos doloremque.',
    imgSrc: image1,
  },
  {
    title: 'Krok 2',
    description: 'Description for Step 2.',
    imgSrc: image2,
  },
  {
    title: 'Krok 3',
    description: 'Description for Step 3.',
    imgSrc: image3,
  },
  {
    title: 'Krok 4',
    description: 'Description for Step 4.',
    imgSrc: image4,
  },
];

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
          <h1 className="mx-3 min-w-80 text-center text-3xl font-bold text-gray-800 md:text-left">
            Jak używać aplikacji?
          </h1>
          <p className="mx-3 text-center text-gray-600 md:text-left xl:max-w-4xl">
            Aplikacja jest bardzo prosta w obsłudze. Wystarczy, że Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Vitae, ducimus?
          </p>
        </div>

        <div className="mt-5 flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex  flex-none flex-row justify-center space-x-4 md:flex-col md:justify-normal md:space-x-0">
            {tabContent.map((_, index) => (
              <ManualButton
                key={index}
                index={index}
                isActive={`step${index + 1}` === selectedTab}
                onClick={() => handleSelect(`step${index + 1}`)}
              />
            ))}
          </div>

          <div className="flex w-full flex-1 flex-col md:flex-row md:justify-between ">
            <div className="align-center mx-10 flex flex-col text-center md:flex-1 md:items-start md:text-justify">
              {currentTabContent && (
                <>
                  <h2 className="mt-5 text-2xl font-bold text-gray-800 md:mt-0">
                    {currentTabContent.title}
                  </h2>
                  <p className="mt-4 text-gray-600">
                    {currentTabContent.description}
                  </p>
                </>
              )}
            </div>
            {currentTabContent && (
              <div className="img-container order-first w-full flex-1 md:order-none	">
                <div className="white-block white-block-right md:hidden"></div>
                <img
                  src={currentTabContent.imgSrc}
                  className="h-auto max-h-full w-full object-cover md:h-full"
                  alt={currentTabContent.title}
                />
                <div className="white-block white-block-left md:hidden"></div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default ManualSection;
