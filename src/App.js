import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [gifts, setGifts] = useState([]);
  const [gift, setGift] = useState("");
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [displayedGift, setDisplayedGift] = useState("");
  const [finalGift, setFinalGift] = useState(null);

  // Snowflake effect
  useEffect(() => {
    const snowflakeContainer = document.getElementById("snowflake-container");

    const createSnowflake = () => {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";

      // Randomize position, size, and delay
      snowflake.style.left = `${Math.random() * 100}vw`; // Random horizontal position
      snowflake.style.animationDelay = `${Math.random() * 5}s`; // Random start delay
      snowflake.style.width = `${10 + Math.random() * 20}px`; // Random size
      snowflake.style.height = snowflake.style.width;

      // Add snowflake to the container
      snowflakeContainer.appendChild(snowflake);

      // Remove snowflake after animation
      setTimeout(() => {
        snowflake.remove();
      }, 5000); // Match animation duration
    };

    // Create snowflakes every 300ms
    const interval = setInterval(createSnowflake, 300);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Add a gift to the list
  const addGift = () => {
    if (gift.trim()) {
      setGifts([...gifts, gift]);
      setGift("");
    } else {
      alert("Gift cannot be empty!");
    }
  };

  // Start randomization
  const startRandomization = () => {
    if (gifts.length === 0) {
      alert("No gifts left to randomize!");
      return;
    }
  
    setIsRandomizing(true);
    setFinalGift(null);
  
    const interval = setInterval(() => {
      const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
      setDisplayedGift(randomGift);
    }, 100);
  
    setTimeout(() => {
      clearInterval(interval);
  
      // Choose the final gift
      const chosenGift = gifts[Math.floor(Math.random() * gifts.length)];
      setFinalGift(chosenGift);
  
      // Remove the chosen gift from the list
      setGifts((prevGifts) => prevGifts.filter((gift) => gift !== chosenGift));
  
      setIsRandomizing(false);
    }, 3000);
  };

  // Reset the app
  const resetApp = () => {
    setGifts([]);
    setGift("");
    setDisplayedGift("");
    setFinalGift(null);
    setIsRandomizing(false);
  };

  return (
    <div className="app">
      <div id="snowflake-container"></div>

      <div className="container custom-padding">
        <h1 className="text-center mb-5" style={{ color: "#00d919" }}>Gifts Random App</h1>

        <div className="mb-3 d-flex justify-content-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter a gift"
            value={gift}
            onChange={(e) => setGift(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addGift();
              }
            }}
            style={{ maxWidth: "300px" }}
          />
        </div>
        <button className="btn btn-success add-gift-button" onClick={addGift}>
            Add Gift
        </button>
        <p className="text-center">
          You have added <strong>{gifts.length}</strong> gift(s).
        </p>

        <div className="text-center mb-4">
          <button
            className="btn btn-primary me-2"
            onClick={startRandomization}
            disabled={gifts.length === 0 || isRandomizing}
            style={{ color: "#00d919" }}
          >
            Start Random
          </button>
        </div>

        <div className="text-center result-gift">
          {isRandomizing && (
            <p className="text-warning fs-4">Randomizing: {displayedGift}</p>
          )}
          {finalGift && (
            <h2 className="text-light">
              Your Gift Is: <strong>{finalGift}</strong> 🎉
            </h2>
          )}
        </div>

        <div className="text-center mb-4">
          <button className="btn btn-danger" onClick={resetApp}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
