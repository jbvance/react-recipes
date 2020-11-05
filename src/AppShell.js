import React from 'react';
import GradientBar from './components/common/GradientBar';
import Footer from './components/Footer';

const AppShell = ({ children }) => {
  return (
    <>
      <GradientBar />
      <div className="flex">        
        <div className="flex flex-col w-full border-l border-gray-200">         
          <div className="px-4 sm:px-8 py-2 bg-gray-100">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AppShell;
