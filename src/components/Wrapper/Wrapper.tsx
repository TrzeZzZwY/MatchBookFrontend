// src/components/Wrapper.tsx
import React, { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto my-0 w-full max-w-7xl px-5 ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
