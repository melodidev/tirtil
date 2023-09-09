import { words as wordsEN, answers as answersEN } from "./words/en";
import { words as wordsTR, answers as answersTR } from "./words/tr";

export const alphabet = {
  en: "abcdefghijklmnopqrstuvwxyz",
  tr: "abcçdefgğhıijklmnoöprsştuüvyz",
};

export const allWords = {
  en: wordsEN,
  tr: wordsTR,
};

export const allAnswers = {
  en: answersEN,
  tr: answersTR,
};

export const msgGameOver = {
  en: "Play Again",
  tr: "Yeniden Oyna",
};

export const msgNotEnough = {
  en: "Not enough letters",
  tr: "Yetersiz harf",
};

export const msgNotFound = {
  en: "Not in word list",
  tr: "Kelime listesinde yok",
};

export const keyboard = {
  en: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
  ],
  tr: [
    ["E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ"],
    ["enter", "Z", "C", "V", "B", "N", "M", "Ö", "Ç", "⌫"],
  ],
};
