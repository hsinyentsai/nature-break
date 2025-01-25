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
    }, 5 * 60 * 100); // 5 minutes in milliseconds

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
          <p>Welcome to your Virtual Nature Walk! 🌱 </p>
          <p>Let the animals guide you 😊 </p> 
          <p> Click on them to uncover soothing messages!</p>
        </div>
      )}

      {sessionPopup && (
          <div className="popup-main">
            <button className="close-btn-main" onClick={() => setSessionPopup(false)}>X</button>
            <p>Your session has ended. How do you feel? 😊</p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
              <button onClick={() => setSessionPopup(false)}>I want to stay and relax 🌱</button>
              <button onClick={() => window.close()}>I feel refreshed and ready to work 🏋🏻‍♂️ </button>
            </div>
          </div>
        )}

      <IconMenu onSelect={setSelectedComponent} />
      {renderComponent()}
    </div>
  );
}

export default App;
