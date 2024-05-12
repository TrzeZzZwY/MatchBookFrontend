import React from 'react';
import Navbar from './components/Navbar/Navbar.tsx';
import Header from './components/Header/Header.tsx';
import Tiles from './components/Header/Tiles.tsx';

const App = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Tiles />
    </>
  );
};

export default App;
