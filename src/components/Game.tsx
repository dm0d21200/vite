import React, { useState } from "react";
import { questions } from "../data/questions";
import "./Game.css";

const Game: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Sound and celebration functions
  const playCorrectSound = () => {
    // Create a simple success sound using Web Audio API
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    // Create a sequence of notes for a celebratory sound
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 (major chord)

    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      oscillator.type = "sine";

      // Create a nice envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.3,
        audioContext.currentTime + 0.05 + index * 0.1
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5 + index * 0.1
      );

      oscillator.start(audioContext.currentTime + index * 0.1);
      oscillator.stop(audioContext.currentTime + 0.5 + index * 0.1);
    });
  };

  const playGameCompleteSound = () => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    // Victory fanfare - ascending major scale
    const frequencies = [
      261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25,
    ]; // C major scale

    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      oscillator.type = "triangle";

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.2,
        audioContext.currentTime + 0.05 + index * 0.1
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3 + index * 0.1
      );

      oscillator.start(audioContext.currentTime + index * 0.1);
      oscillator.stop(audioContext.currentTime + 0.3 + index * 0.1);
    });
  };

  const playIncorrectSound = () => {
    // Create a "buzzer" sound for incorrect answers
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    // Create a descending dissonant sound
    const frequencies = [200, 150]; // Low, dissonant frequencies

    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      oscillator.type = "sawtooth"; // Harsh sound for incorrect

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.15,
        audioContext.currentTime + 0.05 + index * 0.2
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.4 + index * 0.2
      );

      oscillator.start(audioContext.currentTime + index * 0.2);
      oscillator.stop(audioContext.currentTime + 0.4 + index * 0.2);
    });
  };

  const triggerTryAgain = () => {
    setShowTryAgain(true);
    playIncorrectSound();

    // Hide "try again" message after animation
    setTimeout(() => {
      setShowTryAgain(false);
    }, 1000);
  };

  const triggerCelebration = () => {
    setShowCelebration(true);
    playCorrectSound();

    // Play additional celebratory sound with delay
    setTimeout(() => {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      // Create a rising series of notes for extra celebration
      const frequencies = [523.25, 587.33, 659.25, 698.46, 783.99, 880.0];

      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = "triangle";

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.2,
          audioContext.currentTime + 0.05 + index * 0.08
        );
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.3 + index * 0.08
        );

        oscillator.start(audioContext.currentTime + index * 0.08);
        oscillator.stop(audioContext.currentTime + 0.3 + index * 0.08);
      });
    }, 300);

    // Hide celebration after animation
    setTimeout(() => {
      setShowCelebration(false);
    }, 1800); // Extended celebration time
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent changing answer after selection

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      triggerCelebration(); // Trigger enhanced tada effect and sound

      // Move to next question after celebration finishes
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          setGameFinished(true);
          // Play completion sound when game finishes
          setTimeout(() => {
            playGameCompleteSound();
          }, 500);
        }
      }, 2200); // Increased to allow celebration to complete
    } else {
      triggerTryAgain(); // Trigger "try again" message and sound

      // Move to next question after 1.5 seconds
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          setGameFinished(true);
          // Play completion sound when game finishes
          setTimeout(() => {
            playGameCompleteSound();
          }, 500);
        }
      }, 1500);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setGameFinished(false);
    setShowCelebration(false);
    setShowTryAgain(false);
  };

  // We're using SVG images with their own backgrounds, so no background colors are needed

  if (gameFinished) {
    return (
      <div className="game-container">
        <div className="game-finished">
          <div className="completion-celebration">🏆</div>
          <h2>Game Complete!</h2>
          <p>
            Your score: {score} out of {questions.length}
          </p>
          <div className="score-message">
            {score === questions.length
              ? "🎉 Perfect Score! Amazing! 🎉"
              : score >= questions.length * 0.8
              ? "🌟 Great job! Well done! 🌟"
              : score >= questions.length * 0.6
              ? "👍 Good effort! Keep practicing! 👍"
              : "💪 Nice try! Practice makes perfect! 💪"}
          </div>
          <button onClick={resetGame} className="restart-button">
            Play Again
          </button>

          {/* Add victory confetti rain */}
          <div className="victory-confetti">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className={`victory-confetti-piece confetti-${i % 10}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      {/* Enhanced Celebration Effect */}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="tada-effect">🎉</div>
          <div className="tada-effect-secondary">🎊</div>
          <div className="celebration-text">Correct!</div>
          <div className="star-burst"></div>
          <div className="confetti">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className={`confetti-piece confetti-${i % 10}`} />
            ))}
          </div>
        </div>
      )}

      {/* Try Again Effect */}
      {showTryAgain && (
        <div className="try-again-overlay">
          <div className="try-again-effect">❌</div>
          <div className="try-again-text">Try Again!</div>
        </div>
      )}

      <div className="game-header">
        <div className="header-left">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
        <div className="header-center">
          <div className="score">
            Score: {score}/{questions.length}
          </div>
        </div>
        <div className="header-right">
          <button onClick={resetGame} className="restart-button-small">
            🔄 New Game
          </button>
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQuestion.word}</h2>
        <div className="question-image-container">
          <img
            src={currentQuestion.imageUrl}
            alt={`${currentQuestion.correctAnswer} - ${currentQuestion.category}`}
            className="question-image"
            onError={(e) => {
              // Create a canvas placeholder if SVG fails to load
              const canvas = document.createElement("canvas");
              canvas.width = 400;
              canvas.height = 300;
              // We'll apply border radius to the image element instead
              const ctx = canvas.getContext("2d");
              if (ctx) {
                // Generate a color based on the word
                const colors = [
                  "#FF6B6B",
                  "#4ECDC4",
                  "#45B7D1",
                  "#96CEB4",
                  "#FECA57",
                  "#FF9FF3",
                  "#54A0FF",
                  "#5F27CD",
                ];
                const colorIndex =
                  currentQuestion.correctAnswer.length % colors.length;

                // Fill the entire background
                ctx.fillStyle = colors[colorIndex];
                ctx.fillRect(0, 0, 400, 300);

                // Add a decorative shape
                ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
                ctx.beginPath();
                ctx.arc(200, 150, 100, 0, Math.PI * 2);
                ctx.fill();

                // Add text
                ctx.fillStyle = "white";
                ctx.font = "bold 28px Arial";
                ctx.textAlign = "center";
                ctx.fillText(
                  currentQuestion.correctAnswer.toUpperCase(),
                  200,
                  140
                );
                ctx.font = "18px Arial";
                ctx.textAlign = "center";
                ctx.fillText(`(${currentQuestion.category})`, 200, 180);
                ctx.fillText("Image not available", 200, 220);
              }

              // Set the canvas as the fallback image
              e.currentTarget.src = canvas.toDataURL();
              // Ensure the canvas fills the container properly
              e.currentTarget.style.width = "100%";
              e.currentTarget.style.height = "100%";
              e.currentTarget.style.objectFit = "contain";
              // No need for inline border-radius as it's handled by CSS
            }}
          />
        </div>
      </div>

      <div className="answers-grid">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`answer-button ${
              showResult
                ? option === currentQuestion.correctAnswer
                  ? "correct"
                  : option === selectedAnswer
                  ? "incorrect"
                  : ""
                : ""
            }`}
            onClick={() => handleAnswerSelect(option)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="question-counter">
        {currentQuestionIndex + 1} / {questions.length}
      </div>
    </div>
  );
};

export default Game;
