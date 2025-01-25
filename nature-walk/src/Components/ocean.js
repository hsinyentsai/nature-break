import React, { useState, useRef } from 'react';
import starfish from '../Asset/star.svg';
import coconut from '../Asset/coconut.svg';
import crab from '../Asset/crab.svg';
import '../App.css';
import oceanVideo from '../Asset/OceanVideo.mp4'; // Default background for Ocean

export const Ocean = ({ onAnimalClick, animalStage, showMessage, onCheckmarkClick, interactionMode }) => {
    const [backgroundVideo] = useState(oceanVideo); // Default to ocean background
    const videoRef = useRef(null); // Reference to video element

    return (
        <div>
            <div className="background-forest"> {/* Reuse the background class for consistency */}
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    className="background-video fade-in"
                >
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            </div>

            {interactionMode && (
                <>
                    {/* Starfish */}
                    {animalStage === 1 && (
                        <div className="starfish-container" onClick={onAnimalClick}>
                            <img src={starfish} alt="starfish" className="Starfish" />
                        </div>
                    )}
                    {animalStage === 1 && showMessage && (
                        <div className="popup-main">
                            <p>It's okay ☀️ you can lie down and be lazy like the starfish for a minute! 😊</p>
                            <button onClick={onCheckmarkClick}>✔️</button>
                        </div>
                    )}

                    {/* Coconut */}
                    {animalStage === 2 && (
                        <div className="coconut-container" onClick={onAnimalClick}>
                            <img src={coconut} alt="coconut" className="Coconut" />
                        </div>
                    )}
                    {animalStage === 2 && showMessage && (
                        <div className="popup-main">
                            <p>Imagine yourself sipping fresh coconut water 🥥 by the beach. Take a deep breath and refresh your mind. 🌊</p>
                            <button onClick={onCheckmarkClick}>✔️</button>
                        </div>
                    )}

                    {/* Crab */}
                    {animalStage === 3 && (
                        <div className="crab-container" onClick={onAnimalClick}>
                            <img src={crab} alt="crab" className="Crab" />
                        </div>
                    )}
                    {animalStage === 3 && showMessage && (
                        <div className="popup-main">
                            <p>The crab is scuttling sideways! 🦀 Take a moment to stretch and move around. A little motion can re-energize you! 😊</p>
                            <button onClick={onCheckmarkClick}>✔️</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
