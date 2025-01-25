import React, { useState } from 'react';
import '../App.css';
import { Menu, X } from 'lucide-react'; // Icons for aesthetics

export const IconMenu = ({ onSelect }) => {
  const [isPopupVisible, setPopupVisible] = useState(false); // Toggle the main menu
  const [showMusicMenu, setShowMusicMenu] = useState(false); // Toggle the music menu
  const [audio, setAudio] = useState(null); // For audio playback

  const tracks = [
    { id: 1, name: 'Sunny Forest', src: '/Asset/forest-sunny.mp3' },
    { id: 2, name: 'Windy Forest', src: '/Asset/forest-windy.mp3' },
    { id: 3, name: 'Rainy Forest', src: '/Asset/forest-rainy.mp3' },
    { id: 4, name: 'Snowy Forest', src: '/Asset/forest-snowy.mp3' },
  ];

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
    setShowMusicMenu(false); // Close the music menu if main menu is toggled
  };

  const toggleMusicMenu = () => {
    setShowMusicMenu(!showMusicMenu);
  };

  const handleTrackSelect = (track) => {
    if (audio) {
      audio.pause(); // Stop any currently playing audio
    }
    const newAudio = new Audio(track.src);
    setAudio(newAudio);
    newAudio.play(); // Play the selected track
  };

  return (
    <div className="icon-menu">
      {/* Main Menu Button */}
      <button className="menu-icon" onClick={togglePopup}>
        {isPopupVisible ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Popup Menu */}
      {isPopupVisible && (
        <div className="popup-menu">
          <div
            className="menu-option"
            onClick={() => {
              onSelect('Forest');
              togglePopup();
            }}
          >
            Forest
          </div>
          <div
            className="menu-option"
            onClick={() => {
              onSelect('Ocean');
              togglePopup();
            }}
          >
            Ocean
          </div>
          <div
            className="menu-option"
            onClick={() => {
              onSelect('Mountain');
              togglePopup();
            }}
          >
            Mountain
          </div>
          <div className="menu-option" onClick={toggleMusicMenu}>
            Music
          </div>

          {/* Music Menu */}
          {showMusicMenu && (
            <div className="music-menu">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="menu-option"
                  onClick={() => handleTrackSelect(track)}
                >
                  {track.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
