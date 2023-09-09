import { keyboard } from "../i18n.js";

export default function Keyboard(props) {
  function getClassName(key, target, guesses, currentGuessIndex) {
    let classNames = "d-flex justify-content-center rounded cursor-pointer fs-key min-width-28 min-width-sm-35 me-1 px-2 py-3 py-sm-2";
    let bg = "bg-secondary";
    let greenLetters = [];

    for (let i = 0; i < currentGuessIndex; i++) {
      [...guesses[i]].forEach((letter, j) => {
        if (letter != props.toLowerCaseCustom(key, props.language)) {
          return;
        } else if (target.includes(letter) && target.lastIndexOf(letter) == j) {
          bg = "bg-green";
          greenLetters.push(letter);
          return;
        } else if (target.includes(letter) && !greenLetters.includes(letter)) {
          bg = "bg-yellow";
          return;
        } else if (!target.includes(letter)) {
          bg = "bg-grey text-secondary";
          return;
        }
      })
    }
    return `${classNames} ${bg}`;
  }

  return (
    <div className="my-3">
      {keyboard[props.language].map((row, i) => (
        <div className="d-flex justify-content-center mb-2" key={i}>
          {row.map((item) => (
            <div
              key={item}
              className={getClassName(item, props.target, props.guesses, props.currentGuessIndex)}
              value={item}
              onClick={() => props.handleMove(item)}
            >
              {item}
            </div>
          ))}
        </div>
      ))} 
    </div>
  )
}
