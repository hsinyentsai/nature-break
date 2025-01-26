import React, { useState, useEffect } from 'react';
import './App.css';
import { Forest } from './Components/forest';
import { Ocean } from './Components/ocean';
import { IconMenu } from './Components/IconMenu';
import { MusicMenu } from './Components/MusicMenu';

function App() {
  const [selectedScene, setSelectedScene] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [sessionPopup, setSessionPopup] = useState(false);
  const [animalStage, setAnimalStage] = useState(0);
  const [showEndPopup, setShowEndPopup] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [interactionMode, setInteractionMode] = useState(true);

  // Set initial scene only once
  useEffect(() => {
    const scenes = ['Forest', 'Ocean'];
    const randomScene = scenes[Math.floor(Math.random() * scenes.length)];
    setSelectedScene(randomScene);
  }, []); // Empty dependency array ensures this runs only once

  // Separate useEffect for session timeout
  useEffect(() => {
    if (interactionMode) {
      const sessionTimeout = setTimeout(() => {
        setSessionPopup(true);
      }, 5 * 60 * 1000);
      return () => clearTimeout(sessionTimeout);
    }
  }, [interactionMode]);

  const handleNextAnimal = () => {
    if (interactionMode) {
      setAnimalStage(prevStage => {
        if (prevStage === 3) {
          setShowEndPopup(true);
          return 0;
        }
        return prevStage + 1;
      });
    }
  };

  const handleSceneChange = (scene) => {
    setShowEndPopup(false);
    setSessionPopup(false);
    setSelectedScene(scene);
    setAnimalStage(0);
  };

  const handleSessionEnd = () => {
    setSessionPopup(false);
    setShowEndPopup(true);
  };

  const handleCloseWelcomePopup = () => {
    setShowPopup(false);
    setAnimalStage(1);
  };

  const handleAnimalClick = () => {
    if (interactionMode) {
      setShowMessage(true);
    }
  };

  const handleCheckmarkClick = () => {
    setShowMessage(false);
    handleNextAnimal();
  };

  const renderComponent = () => {
    const commonProps = {
      onAnimalClick: handleAnimalClick,
      animalStage: interactionMode ? animalStage : 0,
      showMessage: interactionMode && showMessage,
      onCheckmarkClick: handleCheckmarkClick,
      interactionMode
    };

    switch (selectedScene) {
      case 'Forest':
        return <Forest {...commonProps} />;
      case 'Ocean':
        return <Ocean {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {showPopup && interactionMode && (
        <div className="popup-welcome">
          <button className="close-btn-main" onClick={handleCloseWelcomePopup}>X</button>
          <p>Welcome to Paws For Break! 🐾</p>
          <p>Let the nature guide you 😊</p>
          <p>Click on them to uncover soothing messages!</p>
        </div>
      )}

      {sessionPopup && interactionMode && (
        <div className="popup-welcome">
          <button className="close-btn-main" onClick={() => setSessionPopup(false)}>X</button>
          <p>Your 5-minute break has ended. How do you feel? 😊</p>
          <div className="popup-buttons">
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
          <div className="popup-buttons">
            <button onClick={() => setShowEndPopup(false)}>Yes, let's continue! 🌿</button>
            <button onClick={() => window.close()}>I'm done for now, thanks! 🙏</button>
          </div>
        </div>
      )}

      <MusicMenu currentScene={selectedScene} />
      {renderComponent()}

      <div className="menu-bar">
        <button
          onClick={() => setInteractionMode(!interactionMode)}
          className="mode-btn"
        >
          {interactionMode ? 'Switch to Relax' : 'Switch to Interaction'}
        </button>
        <IconMenu onSelect={handleSceneChange} />
      </div>
    </div>
  );
}

export default App;