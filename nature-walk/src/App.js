import React, { useState, useEffect } from 'react';
import './App.css';
import { Forest } from './Components/forest';
import { Ocean } from './Components/ocean';
import { Mountain } from './Components/mountain';
import { IconMenu } from './Components/IconMenu';
import { MusicMenu } from './Components/MusicMenu'; // Adjust based on how MusicMenu is exported

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
      <IconMenu onSelect={setSelectedComponent} />

      {/* Music menu */}
      <MusicMenu />

      {/* Render the selected component */}
      {renderComponent()}
    </div>
  );
}

export default App;
