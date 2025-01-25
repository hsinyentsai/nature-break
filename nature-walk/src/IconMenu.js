import React, { useState } from 'react';

function IconMenu({ onSelect }) {
  const [showMusicMenu, setShowMusicMenu] = useState(false); // State to toggle music menu

  const tracks = [
    { id: 1, name: 'Sunny Forest', src: '/music/forest-sunny.mp3' },
    { id: 2, name: 'Windy Forest', src: '/music/forest-windy.mp3' },
    { id: 3, name: 'Rainy Forest', src: '/music/forest-rainy.mp3' },
    { id: 4, name: 'Snowy Forest', src: '/music/forest-snowy.mp3' },
  ];

  const [audio, setAudio] = useState(null); // Audio object for playback

  const handleTrackSelect = (track) => {
    if (audio) {
      audio.pause(); // Stop any currently playing audio
    }
    const newAudio = new Audio(track.src);
    setAudio(newAudio);
    newAudio.play(); // Play the selected track immediately
  };

  const toggleMusicMenu = () => {
    setShowMusicMenu(!showMusicMenu); // Toggle visibility of the music menu
  };

  return (
    <div className="icon-menu">
      <button className="menu-icon" onClick={() => onSelect('Forest')}>
        Forest
      </button>
      <button className="menu-icon" onClick={() => onSelect('Ocean')}>
        Ocean
      </button>
      <button className="menu-icon" onClick={() => onSelect('Mountain')}>
        Mountain
      </button>
      <button className="menu-icon" onClick={toggleMusicMenu}>
        Music
      </button>

      {showMusicMenu && (
        <div className="popup-menu">
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
  );
}

export default IconMenu;
