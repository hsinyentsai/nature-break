import React, { useState } from 'react';
import '../App.css';
import { Menu, X } from 'lucide-react'; // Optional: Add icons for better aesthetics

export const IconMenu = ({ onSelect }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="icon-menu">
      <button className="menu-icon" onClick={togglePopup}>
        {isPopupVisible ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isPopupVisible && (
        <div className="popup-menu">
          <div className="menu-option" onClick={() => { onSelect('Forest'); setPopupVisible(false); }}>
            Forest
          </div>
          <div className="menu-option" onClick={() => { onSelect('Ocean'); setPopupVisible(false); }}>
            Ocean
          </div>
          <div className="menu-option" onClick={() => { onSelect('Mountain'); setPopupVisible(false); }}>
            Mountain
          </div>
        </div>
      )}
    </div>
  );
};
