import React, { useState, useEffect } from 'react';
import './App.css';
import { Forest } from './Components/forest';
import { Ocean } from './Components/ocean';
import { Mountain } from './Components/mountain';
import { IconMenu } from './Components/IconMenu';

function App() {
  const [selectedComponent, setSelectedComponent] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [sessionPopup, setSessionPopup] = useState(false);

  // Randomly select a background component on page load
  useEffect(() => {
    const components = ['Forest', 'Ocean', 'Mountain'];
    const randomComponent = components[Math.floor(Math.random() * components.length)];
    setSelectedComponent(randomComponent);

    // Trigger session timeout popup after 5 minutes
    const sessionTimeout = setTimeout(() => {
      setSessionPopup(true);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearTimeout(sessionTimeout);
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Forest':
        return <Forest />;
      case 'Ocean':
        return <Ocean />;
      case 'Mountain':
        return <Mountain />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {showPopup && (
        <div className="popup-main">
          <button className="close-btn-main" onClick={() => setShowPopup(false)}>X</button>
          <p>Welcome to your Virtual Nature Walk! 🌱 Let the animals guide you Click on them to uncover soothing messages!</p>
        </div>
      )}

      {sessionPopup && (
        <div className="popup-main">
          <button className="close-btn-main" onClick={() => setShowPopup(false)}>X</button>
          <p>Your session has ended. Would you like to stay on the website?</p>
          <button onClick={() => setSessionPopup(false)}>Yes</button>
          <button onClick={() => window.close()}>No</button>
        </div>
      )}

      <IconMenu onSelect={setSelectedComponent} />
      {renderComponent()}
    </div>
  );
}

export default App;
