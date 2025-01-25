import React, { useState, useRef } from 'react';
import bear from '../Asset/bear.svg';
import owl from '../Asset/Owl.svg';
import rabbit from '../Asset/rabbit.svg';
import '../App.css';
import logo from '../Asset/ForrestVideo.mp4.mp4'; // Default background (bear)

export const Forest = ({ onAnimalClick, animalStage, showMessage, onCheckmarkClick }) => {
    const [backgroundVideo] = useState(logo); // Default to bear background
    const [isFading] = useState(false); // State to manage fading
    const videoRef = useRef(null); // Reference to video element

    return (
        <div>
            <div className="background-forest">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    className={`background-video ${isFading ? 'fade-out' : 'fade-in'}`}
                >
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            </div>

            {/* Bear */}
            {animalStage === 1 && (
                <div className="bear-container" onClick={onAnimalClick}>
                    <img src={bear} alt="bear" className="Bear-1" />
                </div>
            )}
            {animalStage === 1 && showMessage && (
                <div className="popup-main">
                    <p>The bear is drinking water! 💧 You should do so too! 😊</p>
                    <button onClick={onCheckmarkClick}>✔️</button>
                </div>
            )}

            {/* Owl */}
            {animalStage === 2 && (
                <div className="owl-container" onClick={onAnimalClick}>
                    <img src={owl} alt="owl" className="Owl" />
                </div>
            )}
            {animalStage === 2 && showMessage && (
                <div className="popup-main">
                    <p>Take a deep breath 🧘🏻‍♀️ Just like an owl perched quietly in the night 🦉</p>
                    <button onClick={onCheckmarkClick}>✔️</button>
                </div>
            )}

            {/* Rabbit */}
            {animalStage === 3 && (
                <div className="rabbit-container" onClick={onAnimalClick}>
                    <img src={rabbit} alt="rabbit" className="Rabbit" />
                </div>
            )}
            {animalStage === 3 && showMessage && (
                <div className="popup-main">
                    <p>Stretch like a rabbit reaching for the sky, long and gentle! 🐇 A little stretch can make you feel as light and quick as a hop.</p>
                    <button onClick={onCheckmarkClick}>✔️</button>
                </div>
            )}
        </div>
    );
};
