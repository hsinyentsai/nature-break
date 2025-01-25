import React, { useState, useEffect } from 'react';
import './App.css';
import { Forest } from './Components/forest';
import { Ocean } from './Components/ocean';
import { IconMenu } from './Components/IconMenu';
import { MusicMenu } from './Components/MusicMenu'; // Adjust based on how MusicMenu is exported

function App() {
  const [selectedComponent, setSelectedComponent] = useState('');
  
  

  // Randomly select a background component on page load
  useEffect(() => {
    const components = ['Forest', 'Ocean'];
    const randomComponent = components[Math.floor(Math.random() * components.length)];
    setSelectedComponent(randomComponent);

    // Trigger session timeout popup after 5 minutes
    const sessionTimeout = setTimeout(() => {
      console.log('Session timeout reached');
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearTimeout(sessionTimeout);
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Forest':
        return <Forest />;
      case 'Ocean':
        return <Ocean />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {/* Icon Menu to change components */}
      <IconMenu onSelect={setSelectedComponent} />

      {/* Pass selectedComponent to MusicMenu */}
      <MusicMenu currentScene={selectedComponent} />

      {/* Render the selected component */}
      {renderComponent()}
    </div>
  );
}

export default App;
