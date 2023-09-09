import { useState, useEffect } from "react";
import Boxes from "./components/Boxes";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import PopUp from "./components/PopUp";
import LanguageSelection from "./components/LanguageSelection";
import { allAnswers, allWords, alphabet, msgNotEnough, msgNotFound } from "./i18n.js";
import "./App.css";

const wordLength = 5;
const rowCount = 6;

function toLowerCaseCustom(letter, language="tr") {
  if (letter == "İ") {
    return "i";
  } else if (language == "tr" && letter == "I") {
    return "ı";
  } else {
    return letter.toLowerCase();
  }
}

function randomWord(language="tr") {
  return allAnswers[language][Math.floor(Math.random() * allAnswers[language].length)].toLowerCase();
}

export default function App() {
  let [language, setLanguage] = useState("tr");
  let [isPlaying, setIsPlaying] = useState(true);
  let [isWon, setIsWon] = useState(false);
  let [disabled, setDisabled] = useState(false);
  let [target, setTarget] = useState(randomWord(language));
  let [guesses, setGuesses] = useState(Array(rowCount).fill(""));
  let [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  let [showPopUp, setShowPopUp] = useState(false);
  let [popUpMessage, setPopUpMessage] = useState("");

  console.log(target);

  function changeLanguage(lang) {
    if (lang == language) return;
    document.documentElement.lang = lang;
    setLanguage(lang);
  }

  function handleMove(key) {
    if (disabled) return;

    let guess = guesses[currentGuessIndex];
    key = toLowerCaseCustom(key, language);

    if (key == "enter") {
      if (guess.length < wordLength) {
        setPopUpMessage(msgNotEnough[language]);
        setShowPopUp(true);
      } else if (guess.length == wordLength) {
        if (allWords[language].includes(guess)) {
          checkGameEnd();
          setCurrentGuessIndex(currentGuessIndex + 1);
        } else {
          setPopUpMessage(msgNotFound[language]);
          setShowPopUp(true);
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
    setTarget(randomWord(language));
  }

  function handleKeyPress(event) {
    if (disabled && event.key == "Enter") {
      playAgain();
    } else if (disabled) return;

    let key = toLowerCaseCustom(event.key, language);
    if (key == "backspace") {
      handleMove("⌫");
    } else if (key == "enter") {
      handleMove("enter");
    } else if (key.length === 1 && alphabet[language].includes(key)) {
      handleMove(key);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowPopUp(false);
      setPopUpMessage("");
    }, 1500);
    return () => clearTimeout(timer);
  }, [showPopUp]);

  useEffect(() => {
    playAgain();
  }, [language]);

  return (
    <div className="position-relative">
      {showPopUp && <PopUp message={popUpMessage} /> }
      {!isPlaying && <GameOver language={language} playAgain={playAgain} isWon={isWon} target={target} />}
      <LanguageSelection changeLanguage={changeLanguage} language={language} />
      <div className="text-center fs-1 text-uppercase p-2 pt-4">Tırtıl</div>
      {guesses.map((guess, i) => (
        <Boxes key={i} index={i} currentGuessIndex={currentGuessIndex} guess={guess} target={target} />
      ))}
      <Keyboard
        handleMove={handleMove}
        target={target}
        guesses={guesses}
        currentGuessIndex={currentGuessIndex}
        toLowerCaseCustom={(letter, language) => toLowerCaseCustom(letter, language)}
        language={language}
      />
    </div>
  )
}

