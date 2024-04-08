import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import BirdsAudio from "../assets/Audio/mixkit-birds-in-the-spring-forest.wav";
import ClockAudio from "../assets/Audio/clock-tick-tock-sound.mp3";

const CommingSoon = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  // Function to add leading zeros
  const addLeadingZero = (value) => {
    return value.toString().padStart(2, "0");
  };

  // State to track if audio autoplay is prevented
  const [autoplayPrevented, setAutoplayPrevented] = useState(false);

  useEffect(() => {
    const birdsAudioElement = document.getElementById("birdsAudio");
    const clockAudioElement = document.getElementById("clockAudio");

    if (birdsAudioElement && clockAudioElement) {
      birdsAudioElement.loop = true;
      clockAudioElement.loop = true;

      // Check if audio can autoplay with sound
      const playPromise1 = birdsAudioElement.play();
      const playPromise2 = clockAudioElement.play();

      if (playPromise1 !== undefined && playPromise2 !== undefined) {
        Promise.all([playPromise1, playPromise2])
          .then(() => {
            // Autoplay started for both audios
          })
          .catch((error) => {
            // Autoplay was prevented, possibly due to browser restrictions
            console.error("Autoplay prevented:", error);
            setAutoplayPrevented(true);
          });
      }
    }
  }, []);

  const handleManualPlay = () => {
    const birdsAudioElement = document.getElementById("birdsAudio");
    const clockAudioElement = document.getElementById("clockAudio");

    if (birdsAudioElement && clockAudioElement) {
      birdsAudioElement.play();
      clockAudioElement.play();
      setAutoplayPrevented(false);
    }
  };

  return (
    <div className="coming_soon">
      <audio
        id="birdsAudio"
        src={BirdsAudio}
        autoPlay
        loop
        style={{ display: "none" }}
      ></audio>
      <audio
        id="clockAudio"
        src={ClockAudio}
        autoPlay
        loop
        style={{ display: "none" }}
      ></audio>
      <div>
        <div className="coming_soon_timer">
          <span id="hours">{addLeadingZero(hours)}</span>
          <span id="minutes">{addLeadingZero(minutes)}</span>
          <span id="seconds">{addLeadingZero(seconds)}</span>
        </div>
        {autoplayPrevented && (
          <button id="play_button" onClick={handleManualPlay}>
            Play Music
          </button>
        )}
      </div>
    </div>
  );
};

export default CommingSoon;
