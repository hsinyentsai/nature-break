import React, { useState } from 'react';
import logo from '../Asset/Ocean5secvid.mp4'; // Import video file
import star from '../Asset/star.svg';
import shell from '../Asset/shell.svg';
import crab from '../Asset/crab.svg';
import '../App.css';

export const Ocean = () => {
    const [isPopupVisible, setPopupVisible] = useState(false); // Star popup state
    const [isPopupVisible2, setPopupVisible2] = useState(false); // Shell popup state
    const [isPopupVisible3, setPopupVisible3] = useState(false); // Crab popup state

    const handleStarClick = () => {
        setPopupVisible(true);
    };

    const handleShellClick = () => {
        setPopupVisible2(true);
    };

    const handleCrabClick = () => {
        setPopupVisible3(true);
    };

    // Close all popups
    const handleClosePopup = () => {
        setPopupVisible(false);
        setPopupVisible2(false);
        setPopupVisible3(false);
    };

    return (
        <>
            <video autoPlay loop muted className="App-background">
                <source src={logo} type="video/mp4" />
            </video>
            <div className="star-container">
                <img
                    src={star}
                    className="Star"
                    alt="star"
                    onClick={handleStarClick}
                />
            </div>
            <div className="shell-container">
                <img
                    src={shell}
                    className="Shell"
                    alt="shell"
                    onClick={handleShellClick}
                />
            </div>
            <div className="crab-container">
                <img
                    src={crab}
                    className="Crab"
                    alt="crab"
                    onClick={handleCrabClick}
                />
            </div>

            {/* Star Popup */}
            {isPopupVisible && (
                <div className="popup-box">
                    <div className="popup-message">
                        <p>Be a bright star in the ocean's depths! 🌟 Take a moment to shine and relax.</p>
                        <button className="checkmark-button" onClick={handleClosePopup}>
                            ✅
                        </button>
                    </div>
                </div>
            )}

            {/* Shell Popup */}
            {isPopupVisible2 && (
                <div className="popup-box">
                    <div className="popup-message">
                        <p>Slow down like a shell resting on the beach. 🐚 Take a deep breath and feel calm.</p>
                        <button className="checkmark-button" onClick={handleClosePopup}>
                            ✅
                        </button>
                    </div>
                </div>
            )}

            {/* Crab Popup */}
            {isPopupVisible3 && (
                <div className="popup-box">
                    <div className="popup-message">
                        <p>Move sideways like a crab and stretch your body! 🦀 Small movements can make a big difference.</p>
                        <button className="checkmark-button" onClick={handleClosePopup}>
                            ✅
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
