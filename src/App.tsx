import Navbar from './components/Navbar/Navbar.tsx';
import Header from './components/Header/Header.tsx';
import VideoSection from './components/Sections/VideoSection.tsx';
import ScreensSection from './components/Sections/ScreensSection.tsx';
import ManualSection from './components/Sections/ManualSection.tsx';
import Footer from './components/Footer/Footer.tsx';

const App = () => {
  return (
    <>
      <Navbar />
      <Header />
      <VideoSection />
      <ScreensSection />
      <ManualSection />
      <Footer />
    </>
  );
};

export default App;
