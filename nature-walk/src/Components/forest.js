import React, { useState } from 'react';
import logo from '../Asset/Forrest5sec.mp4'; // Import video file
import bear from '../Asset/bear.svg';
import owl from '../Asset/Owl.svg';
import rabbit from '../Asset/rabbit.svg';
import '../App.css';

export const Forest = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);  // Bear popup state
    const [isPopupVisible2, setPopupVisible2] = useState(false); // Owl popup state
    const [isPopupVisible3, setPopupVisible3] = useState(false); // Rabbit popup state

    const handleBearClick = () => {
        setPopupVisible(true);
    };

    const handleOwlClick = () => {
        setPopupVisible2(true);
    };

    const handleRabbitClick = () => {
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
        <div className="bear-container">
            <img
            src={bear}
            className="Bear-1"
            alt="bear"
            onClick={handleBearClick}
            />
        </div>
        <div className="owl-container">
            <img
            src={owl}
            className="Owl"
            alt="owl"
            onClick={handleOwlClick}
            />
        </div>
        <div className="rabbit-container">
            <img
            src={rabbit}
            className="Rabbit"
            alt="rabbit"
            onClick={handleRabbitClick}
            />
        </div>

        {/* Bear Popup */}
        {isPopupVisible && (
            <div className="popup-box">
            <div className="popup-message">
                <p>The bear is drinking water! 💧</p>
                <p>You should do so too! 😊</p>
                <button className="checkmark-button" onClick={handleClosePopup}>
                ✅
                </button>
            </div>
            </div>
        )}

        {/* Owl Popup */}
        {isPopupVisible2 && (
            <div className="popup-box">
            <div className="popup-message">
                <p>
                Take a deep breath 🧘🏻‍♀️ Just like an owl perched quietly in the
                night 🦉
                </p>
                <button className="checkmark-button" onClick={handleClosePopup}>
                ✅
                </button>
            </div>
            </div>
        )}

        {/* Rabbit Popup */}
        {isPopupVisible3 && (
            <div className="popup-box">
            <div className="popup-message">
                <p>
                Stretch like a rabbit reaching for the sky, long and gentle! 🐇 A little stretch can make you feel as light and quick as a hop.
                </p>
                <button className="checkmark-button" onClick={handleClosePopup}>
                ✅
                </button>
            </div>
            </div>
        )}
        </>
    )
};
