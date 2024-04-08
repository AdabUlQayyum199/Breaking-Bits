import React, { useEffect, useState } from "react";
// importing assests
import BirdsAudio from "../assets/Audio/mixkit-birds-in-the-spring-forest.wav";
import ClockAudio from "../assets/Audio/clock-tick-tock-sound.mp3";
import Clown from "../assets/images/Clown.png";
import IcpSwap from "../assets/images/icpswap_logo.png";
import InternetICP from "../assets/images/internet-computer-icp-logo.png";
import OpenChat from "../assets/images/openchat_logo.png";
import WindOge from "../assets/images/Windoge98.png";
import Twittercon from "../assets/images/twitter.svg";
import TelegramIcon from "../assets/images/Telegram.svg";
import DiscordIcon from "../assets/images/discord.svg";

const ComingSoon = () => {
  const [remainingTime, setRemainingTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // State to track if audio autoplay is prevented
  const [autoplayPrevented, setAutoplayPrevented] = useState(false);

  useEffect(() => {
    // Set the target deadline in local storage
    const setTargetDeadline = () => {
      const deadline = new Date("2024-04-10T12:00:00"); // April 10th at 12:00 PM
      localStorage.setItem("endingTime", deadline.getTime().toString());

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
    };

    // Calculate remaining time in hours, minutes, and seconds
    const calculateRemainingTime = () => {
      const currentTime = new Date().getTime();
      const endingTime = parseInt(localStorage.getItem("endingTime"), 10);

      if (isNaN(endingTime)) {
        // Handle invalid or missing deadline
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      let timeDiff = endingTime - currentTime;
      if (timeDiff < 0) {
        // Handle case where deadline has passed
        timeDiff = 0;
      }

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    setTargetDeadline();

    const interval = setInterval(() => {
      const remainingTime = calculateRemainingTime();
      setRemainingTime(remainingTime);
    }, 1000);

    return () => clearInterval(interval);
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
      {/* Scoial Icons */}
      <div className="social_icons">
        <a
          href="https://t.me/Breaking_Bits"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img src={TelegramIcon} alt="Telegram Icon" />
        </a>
        <a
          href="https://x.com/Breaking_Bits"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Twittercon} alt="Twitter Icon" />
        </a>
        <a
          href="https://discord.gg/Pv2R2xS2FS"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={DiscordIcon} alt="Discord Icon" />
        </a>
      </div>
      {/* audio_links */}
      <div className="audio_links">
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
      </div>
      {/* coming_soon_timer */}
      <div className="coming_soon_timer">
        <span id="hours">
          {remainingTime.hours.toString().padStart(2, "0")}
        </span>
        <span id="minutes">
          {remainingTime.minutes.toString().padStart(2, "0")}
        </span>
        <span id="seconds">
          {remainingTime.seconds.toString().padStart(2, "0")}
        </span>
      </div>
      {/* button_div */}
      <div className="button_div">
        {autoplayPrevented && (
          <button id="play_button" onClick={handleManualPlay}>
            Play Music
          </button>
        )}
      </div>
      <div className="partner_logos">
        <img src={Clown} alt="Clown image" />
        <img src={InternetICP} alt="Clown image" />
        <img src={OpenChat} alt="Clown image" />
        <img src={IcpSwap} alt="Clown image" />
        <img src={WindOge} alt="Clown image" />
      </div>
    </div>
  );
};

export default ComingSoon;
