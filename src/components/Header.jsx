import React from 'react';

const Header = () => {
  return (
    <div className="w-full bg-white shadow-sm">
      <header className="w-full bg-[#fdf7e8] flex items-center py-4 px-2 md:px-20">
        <img
          src="/cfpic-logo.png"
          alt="CFPIC Logo"
          className="h-12 w-auto ml-2 md:ml-10"
        />
        <div className="flex-1 flex justify-center">
          <h1
            className="text-center text-[16px] font-semibold md:text-[28px] md:font-semibold"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              lineHeight: '110%',
              letterSpacing: '0%',
              textTransform: 'uppercase',
              color: '#606060'
            }}
          >
            System of Care Coordination <br className="block md:hidden" />Tool
          </h1>
        </div>
      </header>
    </div>
  );
};

export default Header;