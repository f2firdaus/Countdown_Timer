import { useEffect, useState } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const Counter = () => {
  const [input, setInput] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer;

    if (isPaused && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    if (seconds === 0) {
      setIsPaused(false);
    }

    return () => clearInterval(timer);
  }, [isPaused, seconds]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    setMinutes(inputValue);
    setSeconds(0);
  };

  const startTimer = () => {
    if (!isNaN(parseInt(minutes)) && seconds >= 0) {
      setIsPaused((prev) => !prev);
      if (seconds === 0) {
        setSeconds(parseInt(minutes) * 60);
      }
    }
  };

  const pauseTimer = () => {
    setIsPaused((prev) => !prev);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsPaused(false);
    setMinutes("");
    setInput("");
  };

  const formatTimes = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    console.log(minutes)
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
 

  return (
    <div className="container">
      <div className="minutes_input">
        <p className="minutes_heading">Enter Minutes</p>
        <div className="input">
          <input type="text" value={input} onChange={handleInputChange} placeholder="Enter Minutes" />
          <p onClick={resetTimer}>
            <GrPowerReset className="reset_circle" />
          </p>
        </div>
        <div className="icons">
          <p onClick={isPaused ? pauseTimer : startTimer}>
            {isPaused ? (
              <FaPauseCircle className="icons_circle" />
            ) : (
              <FaPlayCircle className="icons_circle" />
            )}
          </p>
          <p className="timer">{formatTimes(seconds)}</p>
        </div>
      </div>
    </div>
  );
};

export default Counter;
