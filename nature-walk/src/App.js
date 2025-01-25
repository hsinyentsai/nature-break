import React, { useState } from 'react';
import './App.css';
import { Forest } from './Components/forest';
import { Ocean } from './Components/ocean';
import { Mountain } from './Components/mountain';
import { IconMenu } from './Components/IconMenu';

function App() {
  const [selectedComponent, setSelectedComponent] = useState('Forest');

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
      {renderComponent()}
    </div>
  );
}

export default App;
