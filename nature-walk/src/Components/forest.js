import React, { useState } from 'react';
import logo from '../Asset/ForrestVideo.mp4'; // Import video file
import bear from '../Asset/bear.svg';
import '../App.css';

export const Forest = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleBearClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
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
            onClick={handleBearClick}
            />
        </div>
        {isPopupVisible && (
            <div className="popup-box">
            <div className="popup-message">
                <p>The bear is drinking water! 💧</p>
                <p>You should do so too! 😊</p>
                <button className="checkmark-button" onClick={handleClosePopup}>
                ✅
                </button>
            </div>
            </div>
      )}
    </>
  );
};
