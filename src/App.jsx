import { useState, useEffect } from "react";
import Boxes from "./components/Boxes";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import { allWords, allAnswers } from "./wordList";
import "./App.css";

const wordLength = 5;
const rowCount = 6;
const alphabet = "abcçdefgğhıijklmnoöprsştuüvyz";

function toLowerCaseCustom(letter) {
  let lowerCaseLetter = "";

  if (letter == "İ") {
    lowerCaseLetter = "i";
  } else if (letter == "I") {
    lowerCaseLetter = "ı";
  } else {
    lowerCaseLetter = letter.toLowerCase();
  }
  return lowerCaseLetter;
}

function randomWord() {
  return allAnswers[Math.floor(Math.random() * allAnswers.length)].toLowerCase();
}

export default function App() {
  let [isPlaying, setIsPlaying] = useState(true);
  let [isWon, setIsWon] = useState(false);
  let [disabled, setDisabled] = useState(false);
  let [target, setTarget] = useState(randomWord());
  let [guesses, setGuesses] = useState(Array(rowCount).fill(""));
  let [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  console.log(target);

  function handleMove(key) {
    if (disabled) return;

    let guess = guesses[currentGuessIndex];
    key = toLowerCaseCustom(key);

    if (key == "enter") {
      if (guess.length < wordLength) {
        alert("Yetersiz harf");
      } else if (guess.length == wordLength) {
        if (allWords.includes(guess)) {
          checkGameEnd();
          setCurrentGuessIndex(currentGuessIndex + 1);
        } else {
          alert("Kelime listesinde yok");
        }
      }
    } else if (key == "⌫") {
      guess = guess.slice(0, -1);
    } else if (guess.length == wordLength) {
      return;
    } else {
      guess = guess + key;
    }

    const guessesCopy = guesses.map((prevGuess, index) => {
      if (index == currentGuessIndex) {
        return guess;
      }
      return prevGuess;
    });
    setGuesses(guessesCopy);
  }

  function checkGameEnd() {
    if (guesses[currentGuessIndex] == target) {
      setIsPlaying(false);
      setDisabled(true);
      setIsWon(true);
    } else if (currentGuessIndex == rowCount - 1) {
      setIsPlaying(false);
      setDisabled(true);
    }
  }

  function playAgain() {
    setIsPlaying(true);
    setIsWon(false);
    setDisabled(false);
    setGuesses(Array(rowCount).fill(""));
    setCurrentGuessIndex(0);
    setTarget(randomWord());
  }

  function handleKeyPress(event) {
    if (disabled) return;

    let key = toLowerCaseCustom(event.key);
    if (key == "backspace") {
      handleMove("⌫");
    } else if (key == "enter") {
      handleMove("enter");
    } else if (key.length === 1 && alphabet.includes(key)) {
      handleMove(key);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="position-relative">
      {!isPlaying && <GameOver playAgain={playAgain} isWon={isWon} target={target} />}
      <div className="text-center fs-1 text-uppercase m-2 mt-4">Tırtıl</div>
      {guesses.map((guess, i) => <Boxes key={i} index={i} currentGuessIndex={currentGuessIndex} guess={guess} target={target} />)}
      <Keyboard handleMove={handleMove} target={target} guesses={guesses} currentGuessIndex={currentGuessIndex} alphabet={alphabet} toLowerCaseCustom={toLowerCaseCustom} />
    </div>
  )
}

