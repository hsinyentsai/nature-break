import React, { useState, useEffect } from 'react';
import { Music, X } from 'lucide-react'; // Optional: Add icons for better aesthetics
import '../MusicMenu.css'; // Corrected path for CSS file

export const MusicMenu = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track if the audio is playing

  const tracks = [
    { id: 1, icon: <img src="/icons/sun.png" alt="Sunny" className="weather-icon" />, src: '/Asset/forest-sunny.mp3' },
    { id: 2, icon: <img src="/icons/wind.png" alt="Windy" className="weather-icon" />, src: '/Asset/forest-windy.mp3' },
    { id: 3, icon: <img src="/icons/rain.png" alt="Rainy" className="weather-icon" />, src: '/Asset/forest-rainy.mp3' },
    { id: 4, icon: <img src="/icons/snow.png" alt="Snowy" className="weather-icon" />, src: '/Asset/forest-snowy.mp3' },
  ];

  useEffect(() => {
    const defaultAudio = new Audio('/Asset/forest-sunny.mp3'); // Sunny track
    setAudio(defaultAudio); // Set the default audio in state
  }, []);

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  const handleTrackSelect = (track) => {
    if (audio) {
      audio.pause(); // Stop current playback
    }

    const newAudio = new Audio(track.src);

    // Add replay functionality
    newAudio.addEventListener('ended', () => {
      newAudio.currentTime = 0; // Reset to the beginning
      newAudio.play(); // Replay the audio
    });

    setAudio(newAudio);
    newAudio.play();
    setIsPlaying(true); // Set playback state to true
  };

  const togglePlayPause = () => {
    if (!audio) return; // If no audio is set, do nothing
    if (isPlaying) {
      audio.pause(); // Pause the audio
    } else {
      audio.play(); // Resume the audio
    }
    setIsPlaying(!isPlaying); // Toggle the playback state
  };

  return (
    <div className="music-menu">
      {/* Music Icon */}
      <button className="music-icon" onClick={toggleDropdown}>
        {isDropdownVisible ? <X size={24} /> : <Music size={24} />}
      </button>

      {/* Music Dropdown */}
      {isDropdownVisible && (
        <div className="music-dropdown">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="music-option"
              onClick={() => handleTrackSelect(track)}
            >
              {track.icon}
            </div>
          ))}
          <div className="music-controls">
            {/* Play/Pause Button */}
            <button className="control-button" onClick={togglePlayPause}>
              <img
                src="/icons/pnp.png"
                alt="Play/Pause"
                className="control-icon"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
