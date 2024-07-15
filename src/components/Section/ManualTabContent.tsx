import React from 'react';

interface ManualTabContentProps {
  title: string;
  description: string;
  imgSrc: string;
}

const ManualTabContent: React.FC<ManualTabContentProps> = ({
  title,
  description,
  imgSrc,
}) => {
  return (
    <>
      <div className="align-center mx-10 flex flex-col text-center md:flex-1 md:items-start md:text-justify">
        <h4 className="mt-5 text-2xl font-bold text-sunflower-800 md:mt-0 dark:text-sunflower-50">
          {title}
        </h4>
        <p className="mt-4 font-semibold text-sunflower-600 dark:text-sunflower-300	">
          {description}
        </p>
      </div>
      <div className="img-container order-first w-full flex-1 md:order-none">
        <div className="white-block white-block-right md:hidden"></div>
        <img
          src={imgSrc}
          className="h-auto max-h-full w-full object-cover md:h-full"
          alt={title}
        />
        <div className="white-block white-block-left md:hidden"></div>
      </div>
    </>
  );
};

export default ManualTabContent;
