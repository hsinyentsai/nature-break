import React, { useState, useEffect } from 'react';
import './App.css';
import { Forest } from './Components/forest';
import { Ocean } from './Components/ocean';
import { IconMenu } from './Components/IconMenu';
import { MusicMenu } from './Components/MusicMenu'; // Adjust based on how MusicMenu is exported

function App() {
  const [selectedComponent, setSelectedComponent] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [sessionPopup, setSessionPopup] = useState(false);
  const [animalStage, setAnimalStage] = useState(0); // 0: none, 1: bear, 2: owl, 3: rabbit
  const [showEndPopup, setShowEndPopup] = useState(false); // End session popup
  const [showMessage, setShowMessage] = useState(false); // Controls the display of the animal's message
  const [interactionMode, setInteractionMode] = useState(true); // true = Interaction, false = Relax

  useEffect(() => {
    const components = ['Forest', 'Ocean'];
    const randomComponent = components[Math.floor(Math.random() * components.length)];
    setSelectedComponent(randomComponent);

    // Trigger session timeout popup after 5 minutes (only in interaction mode)
    if (interactionMode) {
      const sessionTimeout = setTimeout(() => {
        setSessionPopup(true);
      }, 5 * 60 * 1000); // 5 minutes in milliseconds

      return () => clearTimeout(sessionTimeout);
    }
  }, [interactionMode]);

  // Handle progression through animal stages and background changes
  const handleNextAnimal = () => {
    if (interactionMode) {
      if (animalStage === 1) {
        setAnimalStage(2);
      } else if (animalStage === 2) {
        setAnimalStage(3);
      } else if (animalStage === 3) {
        setAnimalStage(0);
        setShowEndPopup(true); // Show the end popup after the rabbit stage
      }
    }
  };

  // Show a different scene (mountain or ocean)
  const handleSceneChange = (scene) => {
    setShowEndPopup(false);
    setSessionPopup(false);
    setSelectedComponent(scene);
  };

  // Show the "how do you feel" popup when session ends
  const handleSessionEnd = () => {
    setSessionPopup(false);
    setShowEndPopup(true);
  };

  // Close the welcome popup and show the bear
  const handleCloseWelcomePopup = () => {
    setShowPopup(false); // Close the welcome popup
    setAnimalStage(1); // Start the animal sequence with the bear
  };

  // Show the message for the current animal
  const handleAnimalClick = () => {
    if (interactionMode) {
      setShowMessage(true); // Show the message for the current animal
    }
  };

  // Handle the checkmark click to proceed to the next animal
  const handleCheckmarkClick = () => {
    setShowMessage(false); // Hide the message
    handleNextAnimal(); // Proceed to the next animal
  };

  const renderComponent = () => {
    switch (selectedComponent) {
        case 'Forest':
            return (
                <Forest
                    onAnimalClick={handleAnimalClick}
                    animalStage={interactionMode ? animalStage : 0} // Show animals only in interaction mode
                    showMessage={interactionMode && showMessage} // Show messages only in interaction mode
                    onCheckmarkClick={handleCheckmarkClick}
                    interactionMode={interactionMode} // Pass interaction mode to Forest
                />
            );
        case 'Ocean':
            return <Ocean />;
        default:
            return null;
    }
};

  return (
    <div className="App">
      {showPopup && interactionMode && (
        <div className="popup-welcome">
          <button className="close-btn-main" onClick={handleCloseWelcomePopup}>X</button>
          <p>Welcome to your Virtual Nature Walk! 🌱</p>
          <p>Let the animals guide you 😊</p>
          <p>Click on them to uncover soothing messages!</p>
        </div>
      )}

      {sessionPopup && interactionMode && (
        <div className="popup-welcome">
          <button className="close-btn-main" onClick={() => setSessionPopup(false)}>X</button>
          <p>Your 5-minute break has ended. How do you feel? 😊</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <button onClick={handleSessionEnd}>I want to stay and relax 🌱</button>
            <button onClick={() => window.close()}>I feel refreshed and ready to work 🏋🏻‍♂️</button>
          </div>
        </div>
      )}

      {showEndPopup && interactionMode && (
        <div className="popup-welcome">
          <button className="close-btn-main" onClick={() => setShowEndPopup(false)}>X</button>
          <p>Great job interacting with the animals! 🌟</p>
          <p>Thanks for your session. Do you want to continue exploring the forest? 🏞️</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <button onClick={() => setShowEndPopup(false)}>Yes, let's continue! 🌿</button>
            <button onClick={() => window.close()}>I'm done for now, thanks! 🙏</button>
          </div>
        </div>
      )}

      {/* Pass selectedComponent to MusicMenu */}
      <MusicMenu currentScene={selectedComponent} />

      {/* Render the selected component */}

      {renderComponent()}

      <div className="menu-bar">
        <div className="mode-selector">
          <button
            onClick={() => setInteractionMode(!interactionMode)}
            className="mode-btn"
          >
            {interactionMode ? 'Switch to Relax' : 'Switch to Interaction'}
          </button>
        </div>
        <IconMenu onSelect={handleSceneChange} />
      </div>
    </div>
  );
}

export default App;
