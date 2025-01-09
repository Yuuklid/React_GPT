import React, { useState, useEffect } from "react";
import { Clock, Pause, Play } from "lucide-react";

const Timer = () => {
  // State declarations
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Lifecycle effect for timer logic
  useEffect(() => {
    let intervalId: number | null = null;

    if (isRunning) {
      // Component mount / Update lifecycle
      setStartTime(Date.now() - seconds * 1000);
      intervalId = window.setInterval(() => {
        setSeconds(Math.floor((Date.now() - startTime!) / 1000));
      }, 100);
    }

    // Component unmount / cleanup lifecycle
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, startTime]);

  // Event handlers for state updates
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setStartTime(null);
  };

  // Format seconds into MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <div className="flex items-center space-x-4">
        <Clock className="h-12 w-12 text-blue-500" />
        <div className="text-xl font-semibold text-gray-900">
          {formatTime(seconds)}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleStartStop}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          {isRunning ? (
            <>
              <Pause className="h-4 w-4" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span>Start</span>
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;