import React, { useState } from 'react';
import logo from './Asset/ForrestVideo.mp4';  // Import video file
import bear from './Asset/bear.svg';
import './App.css';

function App() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleMouseEnter = () => {
    setPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <video autoPlay loop className="App-background">
        <source src={logo} type="video/mp4" />
      </video>
      <div className="bear-container">
        <img
          src={bear}
          className="Bear-1"
          alt="bear"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {isPopupVisible && <div className="popup">The bear is drinking water, maybe you should too?</div>}
      </div>
    </>
  );
}

export default App;
